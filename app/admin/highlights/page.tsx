"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Play, ExternalLink } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

type Highlight = {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  date: string;
};

type FormState = {
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  date: string;
};

const emptyForm: FormState = { title: "", thumbnail: "", videoUrl: "", duration: "", date: "" };

const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

function HighlightModal({
  open, editingId, form, onClose, onSubmit, set,
}: {
  open: boolean;
  editingId: number | null;
  form: FormState;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  set: (k: keyof FormState, v: string) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl p-6 shadow-2xl" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="font-sans text-sm font-semibold text-white">{editingId ? "Edit Highlight" : "Add Highlight"}</h3>
            <p className="mt-0.5 font-sans text-xs text-gray-500">Paste a YouTube or video link</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input className={inputClass} placeholder="e.g. Dannaz FC vs Madux — Match Highlights" value={form.title} onChange={(e) => set("title", e.target.value)} required />
          </div>

          <div>
            <label className={labelClass}>Video URL</label>
            <input className={inputClass} placeholder="https://youtube.com/watch?v=..." value={form.videoUrl} onChange={(e) => set("videoUrl", e.target.value)} />
          </div>

          <ImageUploadField
            label="Thumbnail (optional)"
            value={form.thumbnail}
            onChange={(url) => set("thumbnail", url)}
            placeholder="/thumbnail.webp or https://..."
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Duration</label>
              <input className={inputClass} placeholder="e.g. 5:22" value={form.duration} onChange={(e) => set("duration", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input type="date" className={inputClass} value={form.date} onChange={(e) => set("date", e.target.value)} required />
            </div>
          </div>

          <div className="mt-2 flex gap-3">
            <button type="submit" className="rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
              {editingId ? "Save Changes" : "Add Highlight"}
            </button>
            <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

export default function HighlightsPage() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    fetch("/api/highlights")
      .then((r) => r.json())
      .then((data) => { setHighlights(data); setLoading(false); });
  }, []);

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const openAdd = () => { setForm(emptyForm); setEditingId(null); setModalOpen(true); };
  const openEdit = (h: Highlight) => {
    setForm({ title: h.title, thumbnail: h.thumbnail, videoUrl: h.videoUrl, duration: h.duration, date: h.date });
    setEditingId(h.id);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/highlights/${id}`, { method: "DELETE" });
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      const res = await fetch(`/api/highlights/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const updated = await res.json();
      setHighlights((prev) => prev.map((h) => (h.id === editingId ? updated : h)));
    } else {
      const res = await fetch("/api/highlights", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const created = await res.json();
      setHighlights((prev) => [created, ...prev]);
    }
    setModalOpen(false);
    setEditingId(null);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><p className="font-sans text-sm text-gray-500">Loading...</p></div>;

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">Highlights</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">{highlights.length} video{highlights.length !== 1 ? "s" : ""} · shown on the Media page</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Highlight
        </button>
      </div>

      {highlights.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-16 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Play className="mb-3 h-10 w-10 text-gray-700" />
          <p className="font-sans text-sm text-gray-500">No highlights yet.</p>
          <button onClick={openAdd} className="mt-4 rounded-full bg-primary/10 px-4 py-2 font-sans text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
            Add one now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.id} className="group relative flex flex-col overflow-hidden rounded-2xl" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>

              {/* Thumbnail */}
              <div className="relative h-40 w-full bg-white/[0.04]">
                {h.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={h.thumbnail} alt={h.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Play className="h-8 w-8 text-gray-700" />
                  </div>
                )}
                {h.duration && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 font-sans text-xs text-white">
                    {h.duration}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="font-sans text-sm font-semibold leading-snug text-white">{h.title}</p>
                <div className="flex items-center justify-between">
                  <p className="font-sans text-xs text-gray-500">{formatDate(h.date)}</p>
                  {h.videoUrl && (
                    <a href={h.videoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => openEdit(h)} className="rounded-lg bg-black/60 p-1.5 text-gray-400 backdrop-blur-sm transition-colors hover:text-primary">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(h.id)} className="rounded-lg bg-black/60 p-1.5 text-gray-400 backdrop-blur-sm transition-colors hover:text-red-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      <HighlightModal
        open={modalOpen}
        editingId={editingId}
        form={form}
        onClose={() => { setModalOpen(false); setEditingId(null); }}
        onSubmit={handleSubmit}
        set={set}
      />
    </div>
  );
}
