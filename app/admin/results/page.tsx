"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
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

const PAGE_SIZE = 9;
const emptyForm: FormState = { homeTeam: "", awayTeam: "", homeScore: "", awayScore: "", date: "" };
const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

function getOutcome(homeScore: number, awayScore: number) {
  if (homeScore > awayScore) return { label: "Home Win", style: "bg-primary/15 text-primary border-primary/20" };
  if (homeScore < awayScore) return { label: "Away Win", style: "bg-blue-500/15 text-blue-400 border-blue-500/20" };
  return { label: "Draw", style: "bg-gray-500/15 text-gray-400 border-gray-500/20" };
}

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "—";
}

function getShortName(name: string) {
  return teams.find((t) => t.name === name)?.shortName ?? name.slice(0, 3).toUpperCase();
}

function ResultModal({
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
            <h3 className="font-sans text-sm font-semibold text-white">{editingId ? "Edit Result" : "New Result"}</h3>
            <p className="mt-0.5 font-sans text-xs text-gray-500">Enter the final match score</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <div className="sm:col-span-2">
              <label className={labelClass}>Date</label>
              <input type="date" className={inputClass} value={form.date} onChange={(e) => set("date", e.target.value)} required />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="submit" className="rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
              {editingId ? "Save Changes" : "Add Result"}
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

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>(initialResults);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [page, setPage] = useState(1);

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setModalOpen(true); };

  const openEdit = (r: Result) => {
    setForm({ homeTeam: r.homeTeam, awayTeam: r.awayTeam, homeScore: String(r.homeScore), awayScore: String(r.awayScore), date: r.date });
    setEditingId(r.id);
    setModalOpen(true);
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
    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const paginated = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">Match Results</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">{results.length} results recorded this season</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Result
        </button>
      </div>

      {/* Result cards */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-16 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Calendar className="mb-3 h-10 w-10 text-gray-700" />
          <p className="font-sans text-sm text-gray-500">No results yet.</p>
          <button onClick={openAdd} className="mt-4 rounded-full bg-primary/10 px-4 py-2 font-sans text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
            Add one now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {paginated.map((r) => {
            const outcome = getOutcome(r.homeScore, r.awayScore);
            const homeWon = r.homeScore > r.awayScore;
            const awayWon = r.awayScore > r.homeScore;
            return (
              <div
                key={r.id}
                className="group relative flex flex-col rounded-2xl p-5 transition-all duration-200 hover:border-white/10"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Outcome + actions */}
                <div className="mb-4 flex items-center justify-between">
                  <span className={`rounded-full border px-2.5 py-1 font-sans text-[10px] font-semibold ${outcome.style}`}>
                    {outcome.label}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <button onClick={() => openEdit(r)} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-primary">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(r.id)} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-red-500/10 hover:text-red-400">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Teams + score */}
                <div className="flex flex-1 items-center gap-2">
                  <div className="flex flex-1 flex-col items-center gap-1">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-xs ${homeWon ? "bg-primary/20 text-primary" : "bg-white/[0.06] text-white"}`}>
                      {getShortName(r.homeTeam)}
                    </div>
                    <p className={`text-center font-sans text-xs font-semibold ${homeWon ? "text-white" : "text-gray-400"}`}>{r.homeTeam}</p>
                  </div>

                  <div className="flex flex-col items-center px-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-display text-3xl ${homeWon ? "text-white" : "text-gray-500"}`}>{r.homeScore}</span>
                      <span className="font-sans text-sm text-gray-700">–</span>
                      <span className={`font-display text-3xl ${awayWon ? "text-white" : "text-gray-500"}`}>{r.awayScore}</span>
                    </div>
                    <span className="mt-0.5 font-sans text-[9px] uppercase tracking-widest text-gray-600">FT</span>
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-1">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-xs ${awayWon ? "bg-blue-500/20 text-blue-400" : "bg-white/[0.06] text-white"}`}>
                      {getShortName(r.awayTeam)}
                    </div>
                    <p className={`text-center font-sans text-xs font-semibold ${awayWon ? "text-white" : "text-gray-400"}`}>{r.awayTeam}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="mt-4 flex items-center gap-2 border-t pt-4 font-sans text-[11px] text-gray-500" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <Calendar className="h-3 w-3 shrink-0" />
                  {formatDate(r.date)}
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
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, results.length)} of {results.length}
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

      {/* Modal */}
      <ResultModal
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
