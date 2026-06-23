"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
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

const emptyForm: FormState = { title: "", excerpt: "", category: "Announcement", image: "" };
const categories = ["Announcement", "Player News", "Match Report", "Club News", "Other"];

const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2 font-sans text-sm text-white outline-none focus:border-primary transition-colors";
const labelClass = "mb-1 block font-sans text-xs text-gray-400";

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setFormOpen(true); };

  const openEdit = (n: NewsItem) => {
    setForm({ title: n.title, excerpt: n.excerpt, category: n.category, image: n.image });
    setEditingId(n.id);
    setFormOpen(true);
  };

  const handleDelete = (id: number) => setNews((p) => p.filter((n) => n.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setNews((p) => p.map((n) => n.id === editingId ? { ...n, ...form } : n));
    } else {
      const newId = Math.max(0, ...news.map((n) => n.id)) + 1;
      setNews((p) => [...p, { id: newId, date: new Date().toISOString().slice(0, 10), ...form }]);
    }
    setFormOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div>

      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-sans text-base font-semibold text-white">All Articles</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Add Article
        </button>
      </div>

      {/* Form */}
      {formOpen && (
        <div className="mb-6 rounded-xl border border-gray-800 bg-[#111] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-sans text-sm font-semibold text-white">{editingId ? "Edit Article" : "New Article"}</h3>
            <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Title</label>
              <input className={inputClass} placeholder="Article title" value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Excerpt</label>
              <textarea rows={3} className={inputClass} placeholder="Short description..." value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Category</label>
                <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Image URL</label>
                <input className={inputClass} placeholder="/image.png or https://..." value={form.image} onChange={(e) => set("image", e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
                {editingId ? "Save Changes" : "Publish Article"}
              </button>
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-full bg-white/10 border border-white/20 px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/20">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#111]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {["Title", "Category", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-sans text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {news.map((n) => (
                <tr key={n.id} className="border-b border-gray-800/50 transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <p className="font-sans text-sm font-semibold text-white">{n.title}</p>
                    <p className="mt-0.5 font-sans text-xs text-gray-500 line-clamp-1">{n.excerpt}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary/20 px-3 py-1 font-sans text-xs text-primary">
                      {n.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-gray-400">{formatDate(n.date)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(n)} className="text-gray-500 transition-colors hover:text-primary">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(n.id)} className="text-gray-500 transition-colors hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {news.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center font-sans text-sm text-gray-500">
                    No articles yet. Add one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
