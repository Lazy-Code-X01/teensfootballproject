"use client";
import { useState, useRef } from "react";
import { Upload, Loader2, AlertCircle } from "lucide-react";

const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

export default function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = "/image.webp or https://...",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(false);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) { setUploadError(true); return; }
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setUploadError(true);
    } catch {
      setUploadError(true);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex gap-2">
        <input
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className={`flex shrink-0 items-center justify-center rounded-xl border bg-[#1a1a1a] px-3 transition-colors disabled:opacity-50 ${uploadError ? "border-red-500/50 text-red-400" : "border-gray-800 text-gray-500 hover:border-primary hover:text-primary"}`}
          title={uploadError ? "Upload failed — try again" : "Upload image"}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : uploadError ? <AlertCircle className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>
    </div>
  );
}
