"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Newspaper, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { newsItems as initialNews } from "@/lib/mockMedia";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
};

type FormState = {
  title: string;
  excerpt: string;
  category: string;
  image: string;
};

const PAGE_SIZE = 6;
const emptyForm: FormState = { title: "", excerpt: "", category: "Announcement", image: "" };
const categories = ["Announcement", "Player News", "Match Report", "Club News", "Other"];

const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

const categoryStyle: Record<string, string> = {
  "Announcement": "bg-primary/15 text-primary border-primary/20",
  "Player News":  "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Match Report": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Club News":    "bg-purple-500/15 text-purple-400 border-purple-500/20",
  "Other":        "bg-gray-500/15 text-gray-400 border-gray-500/20",
};

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

function NewsModal({
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
            <h3 className="font-sans text-sm font-semibold text-white">{editingId ? "Edit Article" : "New Article"}</h3>
            <p className="mt-0.5 font-sans text-xs text-gray-500">Fill in the article details below</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input className={inputClass} placeholder="Article title" value={form.title} onChange={(e) => set("title", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea rows={3} className={`${inputClass} resize-none`} placeholder="Short description..." value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Image URL</label>
              <input className={inputClass} placeholder="/image.webp or https://..." value={form.image} onChange={(e) => set("image", e.target.value)} />
            </div>
          </div>
          <div className="mt-2 flex gap-3">
            <button type="submit" className="rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
              {editingId ? "Save Changes" : "Publish Article"}
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

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [page, setPage] = useState(1);

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const openAdd = () => { setForm(emptyForm); setEditingId(null); setModalOpen(true); };
  const openEdit = (n: NewsItem) => {
    setForm({ title: n.title, excerpt: n.excerpt, category: n.category, image: n.image });
    setEditingId(n.id);
    setModalOpen(true);
  };
  const handleDelete = (id: number) => setNews((p) => p.filter((n) => n.id !== id));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setNews((p) => p.map((n) => n.id === editingId ? { ...n, ...form } : n));
    } else {
      const newId = Math.max(0, ...news.map((n) => n.id)) + 1;
      setNews((p) => [{ id: newId, date: new Date().toISOString().slice(0, 10), ...form }, ...p]);
    }
    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const totalPages = Math.ceil(news.length / PAGE_SIZE);
  const paginated = news.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">Articles</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">{news.length} articles published</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Article
        </button>
      </div>

      {/* Cards */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-16 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Newspaper className="mb-3 h-10 w-10 text-gray-700" />
          <p className="font-sans text-sm text-gray-500">No articles yet.</p>
          <button onClick={openAdd} className="mt-4 rounded-full bg-primary/10 px-4 py-2 font-sans text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
            Add one now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paginated.map((n) => {
            const badge = categoryStyle[n.category] ?? categoryStyle["Other"];
            return (
              <div
                key={n.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:border-white/10"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Thumbnail */}
                <div className="relative h-[160px] w-full shrink-0 overflow-hidden">
                  {n.image ? (
                    <Image src={n.image} alt={n.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-white/[0.03]">
                      <Newspaper className="h-8 w-8 text-gray-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Actions — visible on hover */}
                  <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <button onClick={() => openEdit(n)} className="rounded-lg bg-black/60 p-1.5 text-gray-300 backdrop-blur-sm transition-colors hover:text-primary">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(n.id)} className="rounded-lg bg-black/60 p-1.5 text-gray-300 backdrop-blur-sm transition-colors hover:text-red-400">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`rounded-full border px-2.5 py-1 font-sans text-[10px] font-semibold ${badge}`}>
                      {n.category}
                    </span>
                    <span className="flex items-center gap-1 font-sans text-[10px] text-gray-600">
                      <Calendar className="h-2.5 w-2.5" />
                      {formatDate(n.date)}
                    </span>
                  </div>
                  <h3 className="font-sans text-sm font-semibold leading-snug text-white line-clamp-2">{n.title}</h3>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-gray-500 line-clamp-2">{n.excerpt}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="font-sans text-xs text-gray-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, news.length)} of {news.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg font-sans text-xs font-semibold transition-colors ${
                  page === n ? "bg-primary text-white" : "text-gray-500 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <NewsModal
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
