"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Users, MapPin, UserRound, Shield } from "lucide-react";
import Image from "next/image";
import { teams as initialTeams, results } from "@/lib/mockData";

type Team = {
  id: number;
  name: string;
  shortName: string;
  founded: number;
  city: string;
  stadium: string;
  coach: string;
  logo: string;
};

type FormState = {
  name: string;
  shortName: string;
  founded: string;
  city: string;
  stadium: string;
  coach: string;
  logo: string;
};

const emptyForm: FormState = { name: "", shortName: "", founded: "", city: "", stadium: "", coach: "", logo: "" };
const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

function toTeam(t: typeof initialTeams[number]): Team {
  return { ...t, city: "", stadium: "", coach: "", logo: "" };
}

function getTeamStats(name: string) {
  let played = 0, won = 0, drawn = 0, lost = 0;
  results.forEach((r) => {
    const isHome = r.homeTeam === name;
    const isAway = r.awayTeam === name;
    if (!isHome && !isAway) return;
    played++;
    const scored = isHome ? r.homeScore : r.awayScore;
    const conceded = isHome ? r.awayScore : r.homeScore;
    if (scored > conceded) won++;
    else if (scored < conceded) lost++;
    else drawn++;
  });
  return { played, won, drawn, lost, points: won * 3 + drawn };
}

function TeamModal({
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
      <div
        className="relative w-full max-w-lg overflow-y-auto rounded-2xl p-6 shadow-2xl"
        style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", maxHeight: "90vh" }}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="font-sans text-sm font-semibold text-white">{editingId ? "Edit Team" : "Add Team"}</h3>
            <p className="mt-0.5 font-sans text-xs text-gray-500">Fill in all team details below</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Identity */}
          <div>
            <label className={labelClass}>Team Name</label>
            <input className={inputClass} placeholder="e.g. Lagos FC" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Short Name / Abbr.</label>
              <input className={inputClass} placeholder="e.g. LFC" maxLength={4} value={form.shortName} onChange={(e) => set("shortName", e.target.value.toUpperCase())} required />
            </div>
            <div>
              <label className={labelClass}>Year Founded</label>
              <input type="number" className={inputClass} placeholder="2024" min={2000} max={2099} value={form.founded} onChange={(e) => set("founded", e.target.value)} required />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>City</label>
              <input className={inputClass} placeholder="e.g. Lagos" value={form.city} onChange={(e) => set("city", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Home Ground / Stadium</label>
              <input className={inputClass} placeholder="e.g. Onikan Stadium" value={form.stadium} onChange={(e) => set("stadium", e.target.value)} />
            </div>
          </div>

          {/* Personnel */}
          <div>
            <label className={labelClass}>Head Coach</label>
            <input className={inputClass} placeholder="e.g. Coach Emeka Obi" value={form.coach} onChange={(e) => set("coach", e.target.value)} />
          </div>

          {/* Logo */}
          <div>
            <label className={labelClass}>Logo / Badge URL (optional)</label>
            <input className={inputClass} placeholder="/badge.webp or https://..." value={form.logo} onChange={(e) => set("logo", e.target.value)} />
          </div>

          {form.logo && (
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                <Image src={form.logo} alt="logo preview" fill className="object-contain" />
              </div>
              <p className="font-sans text-xs text-gray-500">Logo preview</p>
            </div>
          )}

          <div className="mt-2 flex gap-3">
            <button type="submit" className="rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
              {editingId ? "Save Changes" : "Add Team"}
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

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams.map(toTeam));
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setModalOpen(true); };
  const openEdit = (t: Team) => {
    setForm({ name: t.name, shortName: t.shortName, founded: String(t.founded), city: t.city, stadium: t.stadium, coach: t.coach, logo: t.logo });
    setEditingId(t.id);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => setTeams((p) => p.filter((t) => t.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed: Omit<Team, "id"> = {
      name: form.name,
      shortName: form.shortName,
      founded: Number(form.founded),
      city: form.city,
      stadium: form.stadium,
      coach: form.coach,
      logo: form.logo,
    };
    if (editingId !== null) {
      setTeams((p) => p.map((t) => t.id === editingId ? { ...t, ...parsed } : t));
    } else {
      const newId = Math.max(0, ...teams.map((t) => t.id)) + 1;
      setTeams((p) => [...p, { id: newId, ...parsed }]);
    }
    setModalOpen(false);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">Teams</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">{teams.length} teams in the league</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Team
        </button>
      </div>

      {/* Team cards */}
      {teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-16 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Users className="mb-3 h-10 w-10 text-gray-700" />
          <p className="font-sans text-sm text-gray-500">No teams yet.</p>
          <button onClick={openAdd} className="mt-4 rounded-full bg-primary/10 px-4 py-2 font-sans text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
            Add one now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => {
            const stats = getTeamStats(team.name);
            return (
              <div
                key={team.id}
                className="group relative rounded-2xl p-5 transition-all duration-200"
                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Edit / Delete */}
                <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <button onClick={() => openEdit(team)} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-primary">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(team.id)} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-red-500/10 hover:text-red-400">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Badge + identity */}
                <div className="flex items-center gap-4">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    {team.logo ? (
                      <Image src={team.logo} alt={team.name} fill className="rounded-2xl object-contain p-1" />
                    ) : (
                      <span className="font-display text-lg text-primary">{team.shortName}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans text-sm font-semibold text-white">{team.name}</h3>
                    <p className="mt-0.5 font-sans text-xs text-gray-500">Founded {team.founded}</p>
                  </div>
                </div>

                {/* Meta info */}
                {(team.city || team.stadium || team.coach) && (
                  <div className="mt-3 flex flex-col gap-1.5">
                    {team.coach && (
                      <div className="flex items-center gap-2 font-sans text-xs text-gray-500">
                        <UserRound className="h-3 w-3 shrink-0 text-gray-600" />
                        <span className="truncate">{team.coach}</span>
                      </div>
                    )}
                    {team.stadium && (
                      <div className="flex items-center gap-2 font-sans text-xs text-gray-500">
                        <Shield className="h-3 w-3 shrink-0 text-gray-600" />
                        <span className="truncate">{team.stadium}</span>
                      </div>
                    )}
                    {team.city && (
                      <div className="flex items-center gap-2 font-sans text-xs text-gray-500">
                        <MapPin className="h-3 w-3 shrink-0 text-gray-600" />
                        <span className="truncate">{team.city}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Stats row */}
                <div className="mt-4 grid grid-cols-4 gap-2 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  {[
                    { label: "P", value: stats.played },
                    { label: "W", value: stats.won },
                    { label: "D", value: stats.drawn },
                    { label: "Pts", value: stats.points },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-0.5">
                      <span className={`font-display text-xl ${s.label === "Pts" ? "text-primary" : "text-white"}`}>{s.value}</span>
                      <span className="font-sans text-[9px] uppercase tracking-widest text-gray-600">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TeamModal
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
