"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Calendar, Clock, MapPin } from "lucide-react";
import { fixtures as initialFixtures, teams } from "@/lib/mockData";

type Fixture = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  status: string;
};

type FormState = {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  status: string;
};

type Filter = "all" | "upcoming" | "live" | "completed";

const emptyForm: FormState = { homeTeam: "", awayTeam: "", date: "", time: "", venue: "", status: "upcoming" };

const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

const statusConfig: Record<string, { label: string; badge: string }> = {
  upcoming:  { label: "Upcoming",  badge: "bg-primary/15 text-primary border-primary/20" },
  live:      { label: "Live",      badge: "bg-red-500/15 text-red-400 border-red-500/20" },
  completed: { label: "Completed", badge: "bg-gray-500/15 text-gray-400 border-gray-500/20" },
};

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : "—";
}

function getShortName(name: string) {
  return teams.find((t) => t.name === name)?.shortName ?? name.slice(0, 3).toUpperCase();
}

function FixtureModal({
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal card */}
      <div className="relative w-full max-w-lg rounded-2xl p-6 shadow-2xl" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="font-sans text-sm font-semibold text-white">{editingId ? "Edit Fixture" : "New Fixture"}</h3>
            <p className="mt-0.5 font-sans text-xs text-gray-500">Fill in the match details below</p>
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
              <label className={labelClass}>Date</label>
              <input type="date" className={inputClass} value={form.date} onChange={(e) => set("date", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Kick-off Time</label>
              <input type="time" className={inputClass} value={form.time} onChange={(e) => set("time", e.target.value)} required />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Venue</label>
              <input className={inputClass} placeholder="e.g. Onikan Stadium" value={form.venue} onChange={(e) => set("venue", e.target.value)} required />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="submit" className="rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
              {editingId ? "Save Changes" : "Add Fixture"}
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

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>(initialFixtures);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [filter, setFilter] = useState<Filter>("all");

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setModalOpen(true); };

  const openEdit = (f: Fixture) => {
    setForm({ homeTeam: f.homeTeam, awayTeam: f.awayTeam, date: f.date, time: f.time, venue: f.venue, status: f.status });
    setEditingId(f.id);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => setFixtures((p) => p.filter((f) => f.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setFixtures((p) => p.map((f) => f.id === editingId ? { ...f, ...form } : f));
    } else {
      const newId = Math.max(0, ...fixtures.map((f) => f.id)) + 1;
      setFixtures((p) => [...p, { id: newId, ...form }]);
    }
    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const counts = {
    all:       fixtures.length,
    upcoming:  fixtures.filter((f) => f.status === "upcoming").length,
    live:      fixtures.filter((f) => f.status === "live").length,
    completed: fixtures.filter((f) => f.status === "completed").length,
  };

  const filtered = filter === "all" ? fixtures : fixtures.filter((f) => f.status === filter);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all",       label: "All" },
    { key: "upcoming",  label: "Upcoming" },
    { key: "live",      label: "Live" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">Afijio Fixtures</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">{counts.all} total · {counts.upcoming} upcoming · {counts.live} live</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Fixture
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 rounded-xl p-1" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 font-sans text-xs font-semibold transition-all duration-150 ${
              filter === tab.key
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-gray-500 hover:text-gray-200"
            }`}
          >
            {tab.label}
            <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${
              filter === tab.key ? "bg-white/20 text-white" : "bg-white/[0.06] text-gray-600"
            }`}>
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Fixture cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-16 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Calendar className="mb-3 h-10 w-10 text-gray-700" />
          <p className="font-sans text-sm text-gray-500">No {filter === "all" ? "" : filter} fixtures yet.</p>
          <button onClick={openAdd} className="mt-4 rounded-full bg-primary/10 px-4 py-2 font-sans text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
            Add one now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((f) => {
            const cfg = statusConfig[f.status] ?? statusConfig.upcoming;
            return (
              <div
                key={f.id}
                className="group relative flex flex-col rounded-2xl p-5 transition-all duration-200 hover:border-white/10"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Status + actions */}
                <div className="mb-4 flex items-center justify-between">
                  <span className={`rounded-full border px-2.5 py-1 font-sans text-[10px] font-semibold ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <button onClick={() => openEdit(f)} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-primary">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(f.id)} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-red-500/10 hover:text-red-400">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Match */}
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] font-display text-xs text-white">
                      {getShortName(f.homeTeam)}
                    </div>
                    <p className="text-center font-sans text-xs font-semibold text-white">{f.homeTeam}</p>
                  </div>
                  <span className="font-display text-xl text-primary">VS</span>
                  <div className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] font-display text-xs text-white">
                      {getShortName(f.awayTeam)}
                    </div>
                    <p className="text-center font-sans text-xs font-semibold text-white">{f.awayTeam}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-4 flex flex-col gap-1.5 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2 font-sans text-[11px] text-gray-500">
                    <Calendar className="h-3 w-3 shrink-0" />
                    {formatDate(f.date)}
                    <span className="text-gray-700">·</span>
                    <Clock className="h-3 w-3 shrink-0" />
                    {f.time} WAT
                  </div>
                  <div className="flex items-center gap-2 font-sans text-[11px] text-gray-500">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {f.venue}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <FixtureModal
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
