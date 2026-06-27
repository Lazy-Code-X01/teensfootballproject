"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { galleryItems as initialGallery } from "@/lib/mockMedia";

type GalleryItem = { id: number; image: string; caption: string };
type FormState = { image: string; caption: string };

const PAGE_SIZE = 12;
const emptyForm: FormState = { image: "", caption: "" };
const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

function GalleryModal({
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
      <div className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="font-sans text-sm font-semibold text-white">{editingId ? "Edit Photo" : "Add Photo"}</h3>
            <p className="mt-0.5 font-sans text-xs text-gray-500">Provide an image URL and caption</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Image URL</label>
            <input className={inputClass} placeholder="/photo.webp or https://..." value={form.image} onChange={(e) => set("image", e.target.value)} required />
          </div>
          {form.image && (
            <div className="relative h-40 w-full overflow-hidden rounded-xl bg-white/[0.03]">
              <Image src={form.image} alt="preview" fill className="object-cover" />
            </div>
          )}
          <div>
            <label className={labelClass}>Caption</label>
            <input className={inputClass} placeholder="e.g. Pre-match team talk" value={form.caption} onChange={(e) => set("caption", e.target.value)} required />
          </div>
          <div className="mt-2 flex gap-3">
            <button type="submit" className="rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
              {editingId ? "Save Changes" : "Add Photo"}
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

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(initialGallery);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [page, setPage] = useState(1);

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const openAdd = () => { setForm(emptyForm); setEditingId(null); setModalOpen(true); };
  const openEdit = (item: GalleryItem) => { setForm({ image: item.image, caption: item.caption }); setEditingId(item.id); setModalOpen(true); };
  const handleDelete = (id: number) => setItems((p) => p.filter((i) => i.id !== id));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setItems((p) => p.map((i) => i.id === editingId ? { ...i, ...form } : i));
    } else {
      const newId = Math.max(0, ...items.map((i) => i.id)) + 1;
      setItems((p) => [...p, { id: newId, ...form }]);
    }
    setModalOpen(false);
    setEditingId(null);
  };

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const paginated = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">Gallery</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">{items.length} photos</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Photo
        </button>
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-16 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <ImageIcon className="mb-3 h-10 w-10 text-gray-700" />
          <p className="font-sans text-sm text-gray-500">No photos yet.</p>
          <button onClick={openAdd} className="mt-4 rounded-full bg-primary/10 px-4 py-2 font-sans text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
            Add one now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {paginated.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl"
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image src={item.image} alt={item.caption} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                {/* Overlay actions */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <p className="mb-2 font-sans text-[11px] leading-tight text-white/90">{item.caption}</p>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEdit(item)} className="flex items-center gap-1 rounded-lg bg-white/20 px-2.5 py-1.5 font-sans text-[10px] text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                      <Pencil className="h-3 w-3" /> Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="flex items-center gap-1 rounded-lg bg-red-500/30 px-2.5 py-1.5 font-sans text-[10px] text-red-200 backdrop-blur-sm transition-colors hover:bg-red-500/50">
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="font-sans text-xs text-gray-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, items.length)} of {items.length}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`flex h-8 w-8 items-center justify-center rounded-lg font-sans text-xs font-semibold transition-colors ${page === n ? "bg-primary text-white" : "text-gray-500 hover:bg-white/[0.06] hover:text-white"}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <GalleryModal open={modalOpen} editingId={editingId} form={form} onClose={() => { setModalOpen(false); setEditingId(null); }} onSubmit={handleSubmit} set={set} />
    </div>
  );
}
