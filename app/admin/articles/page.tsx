"use client";

import { useState, useEffect } from "react";
import {
  Plus, Pencil, Trash2, X, BookOpen,
  Calendar, ChevronLeft, ChevronRight, Globe, FileText,
} from "lucide-react";
import Image from "next/image";
import ImageUploadField from "@/components/admin/ImageUploadField";

type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  image: string;
  author: string;
  published: boolean;
  date: string;
  createdAt: string;
};

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  image: string;
  author: string;
  published: boolean;
  date: string;
};

const PAGE_SIZE = 9;
const CATEGORIES = ["Announcement", "Match Report", "Player News", "Club News", "General"];

const emptyForm: FormState = {
  title: "", slug: "", excerpt: "", body: "",
  category: "General", image: "", author: "TFP Team",
  published: false, date: new Date().toISOString().split("T")[0],
};

const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

const categoryStyle: Record<string, string> = {
  "Announcement": "bg-primary/15 text-primary border-primary/20",
  "Player News":  "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Match Report": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Club News":    "bg-purple-500/15 text-purple-400 border-purple-500/20",
  "General":      "bg-gray-500/15 text-gray-400 border-gray-500/20",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function formatDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function readTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function ArticleModal({
  open, editingId, form, onClose, onSubmit, set,
}: {
  open: boolean;
  editingId: number | null;
  form: FormState;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleTitleChange = (v: string) => {
    set("title", v);
    if (!editingId) set("slug", slugify(v));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-8">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl p-6 shadow-2xl" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>

        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="font-sans text-sm font-semibold text-white">
              {editingId ? "Edit Article" : "New Article"}
            </h3>
            <p className="mt-0.5 font-sans text-xs text-gray-500">
              Fill in the details, write the body, then publish or save as draft.
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">

          {/* Title */}
          <div>
            <label className={labelClass}>Title *</label>
            <input
              className={inputClass}
              placeholder="Article headline..."
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className={labelClass}>Slug (URL path) *</label>
            <input
              className={inputClass}
              placeholder="article-url-slug"
              value={form.slug}
              onChange={(e) => set("slug", slugify(e.target.value))}
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className={labelClass}>Excerpt / Summary *</label>
            <textarea
              rows={2}
              className={`${inputClass} resize-none`}
              placeholder="A short description shown in listings..."
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              required
            />
          </div>

          {/* Body */}
          <div>
            <label className={labelClass}>Article Body</label>
            <textarea
              rows={10}
              className={`${inputClass} resize-y`}
              placeholder="Write the full article here. Separate paragraphs with a blank line."
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
            />
            <p className="mt-1 font-sans text-[10px] text-gray-600">
              Separate paragraphs with a blank line. {readTime(form.body)} min read.
            </p>
          </div>

          {/* Row: category + date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                className={inputClass}
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
          </div>

          {/* Row: author + image */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Author</label>
              <input
                className={inputClass}
                placeholder="TFP Team"
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
              />
            </div>
            <ImageUploadField label="Cover Image (optional)" value={form.image} onChange={(url) => set("image", url)} />
          </div>

          {/* Publish toggle */}
          <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3">
            <div>
              <p className="font-sans text-sm font-semibold text-white">
                {form.published ? "Published" : "Draft"}
              </p>
              <p className="font-sans text-xs text-gray-500">
                {form.published ? "Visible to everyone on the blog" : "Only visible to admins"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => set("published", !form.published)}
              className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${form.published ? "bg-primary" : "bg-gray-700"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          {/* Actions */}
          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {form.published ? <Globe className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
              {editingId ? "Save Changes" : (form.published ? "Publish Article" : "Save as Draft")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/articles?all=1")
      .then((r) => r.json())
      .then((data) => { setArticles(data); setLoading(false); });
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setModalOpen(true); };
  const openEdit = (a: Article) => {
    setForm({
      title: a.title, slug: a.slug, excerpt: a.excerpt, body: a.body,
      category: a.category, image: a.image, author: a.author,
      published: a.published, date: a.date,
    });
    setEditingId(a.id);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      const res = await fetch(`/api/articles/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setArticles((prev) => prev.map((a) => a.id === editingId ? updated : a));
    } else {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const created = await res.json();
      setArticles((prev) => [created, ...prev]);
    }
    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const filtered = articles.filter((a) => {
    if (filter === "published") return a.published;
    if (filter === "draft") return !a.published;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = {
    all: articles.length,
    published: articles.filter((a) => a.published).length,
    draft: articles.filter((a) => !a.published).length,
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <p className="font-sans text-sm text-gray-500">Loading...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">Blog Articles</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">
            {counts.published} published · {counts.draft} draft
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          New Article
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
        {(["all", "published", "draft"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setFilter(tab); setPage(1); }}
            className={`flex-1 rounded-lg px-4 py-2 font-sans text-xs font-semibold capitalize transition-all duration-150 ${
              filter === tab
                ? "bg-primary/[0.12] text-white"
                : "text-gray-500 hover:text-gray-200"
            }`}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* Cards */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-16 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <BookOpen className="mb-3 h-10 w-10 text-gray-700" />
          <p className="font-sans text-sm text-gray-500">No articles here.</p>
          <button onClick={openAdd} className="mt-4 rounded-full bg-primary/10 px-4 py-2 font-sans text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
            Write one now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paginated.map((a) => {
            const badge = categoryStyle[a.category] ?? categoryStyle["General"];
            return (
              <div
                key={a.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:border-white/10"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Thumbnail */}
                <div className="relative h-[160px] w-full shrink-0 overflow-hidden">
                  {a.image ? (
                    <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-white/[0.03]">
                      <BookOpen className="h-8 w-8 text-gray-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute left-3 top-3">
                    <span className={`rounded-full px-2.5 py-0.5 font-sans text-[10px] font-semibold border ${
                      a.published
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    }`}>
                      {a.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  {/* Hover actions */}
                  <div className="absolute right-3 top-3 flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <button
                      onClick={() => openEdit(a)}
                      className="rounded-lg bg-black/60 p-1.5 text-gray-300 backdrop-blur-sm transition-colors hover:text-primary"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(a.id)}
                      className="rounded-lg bg-black/60 p-1.5 text-gray-300 backdrop-blur-sm transition-colors hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-semibold ${badge}`}>
                      {a.category}
                    </span>
                    <span className="flex items-center gap-1 font-sans text-[10px] text-gray-600">
                      <Calendar className="h-2.5 w-2.5" />
                      {formatDate(a.date || a.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-sans text-sm font-semibold leading-snug text-white line-clamp-2">{a.title}</h3>
                  <p className="mt-1.5 flex-1 font-sans text-xs leading-relaxed text-gray-500 line-clamp-2">{a.excerpt}</p>
                  <p className="mt-3 font-sans text-[10px] text-gray-600">
                    by {a.author} · {readTime(a.body)} min read
                  </p>
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
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg font-sans text-xs font-semibold transition-colors ${page === n ? "bg-primary text-white" : "text-gray-500 hover:bg-white/[0.06] hover:text-white"}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Delete confirm overlay */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 className="font-sans text-sm font-semibold text-white">Delete Article?</h3>
            <p className="mt-2 font-sans text-xs text-gray-500">This action cannot be undone.</p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="rounded-full bg-red-500 px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-sans text-sm font-semibold text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ArticleModal
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
