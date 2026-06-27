"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Building2, ExternalLink } from "lucide-react";

type Tier = "Platinum" | "Gold" | "Silver" | "Bronze";

type Sponsor = {
  id: number;
  name: string;
  tier: Tier;
  logo: string;
  website: string;
  since: string;
};

type FormState = {
  name: string;
  tier: Tier;
  logo: string;
  website: string;
  since: string;
};

const initialSponsors: Sponsor[] = [
  { id: 1, name: "Stanbic IBTC",       tier: "Platinum", logo: "",  website: "https://stanbicibtc.com",  since: "2024" },
  { id: 2, name: "MTN Nigeria",         tier: "Gold",     logo: "",  website: "https://mtn.ng",           since: "2025" },
  { id: 3, name: "Oyo State Ministry",  tier: "Gold",     logo: "",  website: "",                         since: "2024" },
  { id: 4, name: "Adidas West Africa",  tier: "Silver",   logo: "",  website: "",                         since: "2026" },
  { id: 5, name: "Local Foods Co.",     tier: "Bronze",   logo: "",  website: "",                         since: "2026" },
];

const TIERS: Tier[] = ["Platinum", "Gold", "Silver", "Bronze"];

const tierStyle: Record<Tier, { badge: string; glow: string; dot: string }> = {
  Platinum: { badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",  glow: "border-l-cyan-400",   dot: "bg-cyan-400"   },
  Gold:     { badge: "bg-amber-500/15 text-amber-300 border-amber-500/20", glow: "border-l-amber-400", dot: "bg-amber-400"  },
  Silver:   { badge: "bg-gray-400/15 text-gray-300 border-gray-400/20",  glow: "border-l-gray-400",   dot: "bg-gray-400"   },
  Bronze:   { badge: "bg-orange-700/20 text-orange-300 border-orange-700/20", glow: "border-l-orange-600", dot: "bg-orange-500" },
};

const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

function SponsorModal({
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
            <h3 className="font-sans text-sm font-semibold text-white">{editingId ? "Edit Sponsor" : "Add Sponsor"}</h3>
            <p className="mt-0.5 font-sans text-xs text-gray-500">Fill in the sponsor details below</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Sponsor Name</label>
            <input className={inputClass} placeholder="e.g. Stanbic IBTC" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tier</label>
              <select className={inputClass} value={form.tier} onChange={(e) => set("tier", e.target.value as Tier)}>
                {TIERS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Year Joined</label>
              <input type="number" className={inputClass} placeholder="2026" min={2020} max={2099} value={form.since} onChange={(e) => set("since", e.target.value)} required />
            </div>
          </div>
          <div>
            <label className={labelClass}>Logo URL (optional)</label>
            <input className={inputClass} placeholder="/logo.webp or https://..." value={form.logo} onChange={(e) => set("logo", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Website (optional)</label>
            <input className={inputClass} placeholder="https://..." value={form.website} onChange={(e) => set("website", e.target.value)} />
          </div>
          <div className="mt-2 flex gap-3">
            <button type="submit" className="rounded-full bg-primary px-5 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
              {editingId ? "Save Changes" : "Add Sponsor"}
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

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", tier: "Gold", logo: "", website: "", since: "" });

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const openAdd = () => { setForm({ name: "", tier: "Gold", logo: "", website: "", since: "" }); setEditingId(null); setModalOpen(true); };
  const openEdit = (s: Sponsor) => { setForm({ name: s.name, tier: s.tier, logo: s.logo, website: s.website, since: s.since }); setEditingId(s.id); setModalOpen(true); };
  const handleDelete = (id: number) => setSponsors((p) => p.filter((s) => s.id !== id));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = { name: form.name, tier: form.tier, logo: form.logo, website: form.website, since: form.since };
    if (editingId !== null) {
      setSponsors((p) => p.map((s) => s.id === editingId ? { ...s, ...parsed } : s));
    } else {
      const newId = Math.max(0, ...sponsors.map((s) => s.id)) + 1;
      setSponsors((p) => [...p, { id: newId, ...parsed }]);
    }
    setModalOpen(false);
    setEditingId(null);
  };

  const grouped = TIERS.map((tier) => ({ tier, items: sponsors.filter((s) => s.tier === tier) })).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">Sponsors</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">{sponsors.length} sponsors across {grouped.length} tiers</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Sponsor
        </button>
      </div>

      {/* Tier groups */}
      {sponsors.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-16 text-center" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Building2 className="mb-3 h-10 w-10 text-gray-700" />
          <p className="font-sans text-sm text-gray-500">No sponsors yet.</p>
          <button onClick={openAdd} className="mt-4 rounded-full bg-primary/10 px-4 py-2 font-sans text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
            Add one now
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {grouped.map(({ tier, items }) => {
            const style = tierStyle[tier];
            return (
              <div key={tier}>
                {/* Tier header */}
                <div className="mb-3 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400">{tier}</h3>
                  <span className="font-sans text-xs text-gray-600">({items.length})</span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((s) => (
                    <div
                      key={s.id}
                      className={`group relative flex items-center gap-4 rounded-2xl border-l-2 p-4 transition-all duration-200 ${style.glow}`}
                      style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      {/* Logo placeholder */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
                        {s.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.logo} alt={s.name} className="h-8 w-8 object-contain" />
                        ) : (
                          <Building2 className="h-5 w-5 text-gray-600" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-sans text-sm font-semibold text-white truncate">{s.name}</p>
                          {s.website && (
                            <a href={s.website} target="_blank" rel="noopener noreferrer" className="shrink-0 text-gray-600 hover:text-primary transition-colors">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`rounded-full border px-2 py-0.5 font-sans text-[10px] font-semibold ${style.badge}`}>{s.tier}</span>
                          <span className="font-sans text-[10px] text-gray-600">Since {s.since}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        <button onClick={() => openEdit(s)} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-white/[0.06] hover:text-primary">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDelete(s.id)} className="rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-red-500/10 hover:text-red-400">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <SponsorModal
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
