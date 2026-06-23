"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { results as initialResults, teams } from "@/lib/mockData";

type Result = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
};

type FormState = {
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  date: string;
};

const emptyForm: FormState = { homeTeam: "", awayTeam: "", homeScore: "", awayScore: "", date: "" };

const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2 font-sans text-sm text-white outline-none focus:border-primary transition-colors";
const labelClass = "mb-1 block font-sans text-xs text-gray-400";

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>(initialResults);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setFormOpen(true); };

  const openEdit = (r: Result) => {
    setForm({ homeTeam: r.homeTeam, awayTeam: r.awayTeam, homeScore: String(r.homeScore), awayScore: String(r.awayScore), date: r.date });
    setEditingId(r.id);
    setFormOpen(true);
  };

  const handleDelete = (id: number) => setResults((p) => p.filter((r) => r.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = { homeTeam: form.homeTeam, awayTeam: form.awayTeam, homeScore: Number(form.homeScore), awayScore: Number(form.awayScore), date: form.date };
    if (editingId !== null) {
      setResults((p) => p.map((r) => r.id === editingId ? { ...r, ...parsed } : r));
    } else {
      const newId = Math.max(0, ...results.map((r) => r.id)) + 1;
      setResults((p) => [...p, { id: newId, ...parsed }]);
    }
    setFormOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div>

      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-sans text-base font-semibold text-white">All Results</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Add Result
        </button>
      </div>

      {/* Collapsible form */}
      {formOpen && (
        <div className="mb-6 rounded-xl border border-gray-800 bg-[#111] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-sans text-sm font-semibold text-white">{editingId ? "Edit Result" : "New Result"}</h3>
            <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Home Team</label>
                <select className={inputClass} value={form.homeTeam} onChange={(e) => set("homeTeam", e.target.value)} required>
                  <option value="" disabled>Select team</option>
                  {teams.map((t) => <option key={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Away Team</label>
                <select className={inputClass} value={form.awayTeam} onChange={(e) => set("awayTeam", e.target.value)} required>
                  <option value="" disabled>Select team</option>
                  {teams.map((t) => <option key={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Home Score</label>
                <input type="number" min={0} className={inputClass} placeholder="0" value={form.homeScore} onChange={(e) => set("homeScore", e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Away Score</label>
                <input type="number" min={0} className={inputClass} placeholder="0" value={form.awayScore} onChange={(e) => set("awayScore", e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input type="date" className={inputClass} value={form.date} onChange={(e) => set("date", e.target.value)} required />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="submit" className="rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
                {editingId ? "Save Changes" : "Add Result"}
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
                {["Match", "Score", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-sans text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-b border-gray-800/50 transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-sans text-sm text-white">
                    {r.homeTeam} <span className="text-gray-500">vs</span> {r.awayTeam}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-display text-base text-white">
                      {r.homeScore} <span className="text-primary">–</span> {r.awayScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-gray-400">{formatDate(r.date)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(r)} className="text-gray-500 transition-colors hover:text-primary">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(r.id)} className="text-gray-500 transition-colors hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center font-sans text-sm text-gray-500">
                    No results yet. Add one above.
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
