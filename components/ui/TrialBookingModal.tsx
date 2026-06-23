"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { Check } from "lucide-react";

const inputClass =
  "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 p-3 font-sans text-sm text-white outline-none focus:border-primary transition-colors duration-200 placeholder:text-gray-600";

const labelClass = "mb-1 block font-sans text-sm text-white/70";

type FormState = Record<string, string>;

function TrialForm({ onSubmit }: { onSubmit: () => void }) {
  const [form, setForm] = useState<FormState>({});
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  return (
    <>
      <h2 className="font-display text-2xl text-white">BOOK YOUR TRIAL</h2>
      <p className="mt-2 font-sans text-sm text-muted">
        Fill in your details and we&apos;ll get back to you within 24 hours.
      </p>
      <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div>
          <label className={labelClass}>Full Name</label>
          <input className={inputClass} placeholder="e.g. Adewale Ogundimu" value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input className={inputClass} placeholder="+234 800 000 0000" value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Age</label>
          <input type="number" min={10} max={19} className={inputClass} placeholder="Between 10–19" value={form.age ?? ""} onChange={(e) => set("age", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Program Interest</label>
          <select className={inputClass} value={form.program ?? ""} onChange={(e) => set("program", e.target.value)} required>
            <option value="" disabled>Select a program</option>
            <option>Grassroots U13</option>
            <option>Rising Players U16</option>
            <option>Elite &amp; Exposure U19</option>
          </select>
        </div>
        <button type="submit" className="mt-2 w-full rounded-full bg-primary py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
          Book My Trial
        </button>
        <p className="text-center font-sans text-xs text-muted">No commitment required. Just show up and play.</p>
      </form>
    </>
  );
}

function RegisterTeamForm({ onSubmit }: { onSubmit: () => void }) {
  const [form, setForm] = useState<FormState>({});
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  return (
    <>
      <h2 className="font-display text-2xl text-white">REGISTER YOUR TEAM</h2>
      <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div>
          <label className={labelClass}>Team Name</label>
          <input className={inputClass} placeholder="e.g. Lagos United FC" value={form.teamName ?? ""} onChange={(e) => set("teamName", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Contact Person Name</label>
          <input className={inputClass} placeholder="Full name" value={form.contact ?? ""} onChange={(e) => set("contact", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input className={inputClass} placeholder="+234 800 000 0000" value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input type="email" className={inputClass} placeholder="team@email.com" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Age Group</label>
          <select className={inputClass} value={form.ageGroup ?? ""} onChange={(e) => set("ageGroup", e.target.value)} required>
            <option value="" disabled>Select age group</option>
            <option>U13</option>
            <option>U16</option>
            <option>U19</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Number of Players</label>
          <input type="number" min={5} className={inputClass} placeholder="e.g. 18" value={form.players ?? ""} onChange={(e) => set("players", e.target.value)} required />
        </div>
        <button type="submit" className="mt-2 w-full rounded-full bg-primary py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
          Register Team
        </button>
      </form>
    </>
  );
}

function SubmitContentForm({ onSubmit }: { onSubmit: () => void }) {
  const [form, setForm] = useState<FormState>({});
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  return (
    <>
      <h2 className="font-display text-2xl text-white">SUBMIT YOUR CONTENT</h2>
      <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div>
          <label className={labelClass}>Your Name</label>
          <input className={inputClass} placeholder="Full name" value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input type="email" className={inputClass} placeholder="you@email.com" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Content Type</label>
          <select className={inputClass} value={form.type ?? ""} onChange={(e) => set("type", e.target.value)} required>
            <option value="" disabled>Select type</option>
            <option>Match Photos</option>
            <option>Training Videos</option>
            <option>Player Story</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea rows={3} className={inputClass} placeholder="Brief description of the content..." value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Google Drive / Dropbox Link</label>
          <input className={inputClass} placeholder="https://drive.google.com/..." value={form.link ?? ""} onChange={(e) => set("link", e.target.value)} />
        </div>
        <button type="submit" className="mt-2 w-full rounded-full bg-primary py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
          Submit Content
        </button>
      </form>
    </>
  );
}

function ShareStoryForm({ onSubmit }: { onSubmit: () => void }) {
  const [form, setForm] = useState<FormState>({});
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  return (
    <>
      <h2 className="font-display text-2xl text-white">SHARE YOUR STORY</h2>
      <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div>
          <label className={labelClass}>Player Name</label>
          <input className={inputClass} placeholder="Full name" value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Age</label>
          <input type="number" min={10} max={19} className={inputClass} placeholder="Between 10–19" value={form.age ?? ""} onChange={(e) => set("age", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Team</label>
          <input className={inputClass} placeholder="e.g. Ibadan United" value={form.team ?? ""} onChange={(e) => set("team", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Program</label>
          <input className={inputClass} placeholder="e.g. Rising Players Program" value={form.program ?? ""} onChange={(e) => set("program", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Brief Story</label>
          <textarea rows={4} className={inputClass} placeholder="Tell us your TFP journey..." value={form.story ?? ""} onChange={(e) => set("story", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Contact Phone</label>
          <input className={inputClass} placeholder="+234 800 000 0000" value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} required />
        </div>
        <button type="submit" className="mt-2 w-full rounded-full bg-primary py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
          Share My Story
        </button>
      </form>
    </>
  );
}

function SecureSlotForm({ prefill, onSubmit }: { prefill: Record<string, string>; onSubmit: () => void }) {
  const [form, setForm] = useState<FormState>({ tier: prefill.tier ?? "", ...prefill });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  return (
    <>
      <h2 className="font-display text-2xl text-white">SECURE YOUR SLOT</h2>
      <p className="mt-2 font-sans text-sm text-muted">
        Partnership slots are limited. Fill in your details and we&apos;ll confirm your spot within 24 hours.
      </p>
      <form className="mt-6 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div>
          <label className={labelClass}>Your Name</label>
          <input className={inputClass} placeholder="Full name" value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Organisation</label>
          <input className={inputClass} placeholder="Company or brand name" value={form.org ?? ""} onChange={(e) => set("org", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input className={inputClass} placeholder="+234 800 000 0000" value={form.phone ?? ""} onChange={(e) => set("phone", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input type="email" className={inputClass} placeholder="you@company.com" value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Partnership Tier</label>
          <select className={inputClass} value={form.tier ?? ""} onChange={(e) => set("tier", e.target.value)} required>
            <option value="" disabled>Select a tier</option>
            <option value="Bronze">Bronze — Community Partner</option>
            <option value="Silver">Silver — Growth Partner</option>
            <option value="Gold">Gold — Champion Partner</option>
          </select>
        </div>
        <button type="submit" className="mt-2 w-full rounded-full bg-primary py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
          Secure My Slot
        </button>
        <p className="text-center font-sans text-xs text-muted">We&apos;ll reach out to confirm your partnership details.</p>
      </form>
    </>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
        <Check className="h-8 w-8 text-primary" />
      </div>
      <h2 className="mt-6 font-display text-3xl text-white">SUBMITTED!</h2>
      <p className="mt-3 font-sans text-sm text-muted">We&apos;ll be in touch within 24 hours.</p>
      <button
        onClick={onClose}
        className="mt-8 rounded-full bg-primary px-8 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Close
      </button>
    </div>
  );
}

export default function TrialBookingModal() {
  const { isOpen, modalType, prefill, closeModal } = useModal();
  const [submitted, setSubmitted] = useState(false);

  // Reset submitted state when modal opens
  useEffect(() => {
    if (isOpen) setSubmitted(false);
  }, [isOpen, modalType]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen && !modalType) return null;

  const content = submitted ? (
    <SuccessState onClose={closeModal} />
  ) : modalType === "trial" ? (
    <TrialForm onSubmit={() => setSubmitted(true)} />
  ) : modalType === "register-team" ? (
    <RegisterTeamForm onSubmit={() => setSubmitted(true)} />
  ) : modalType === "submit-content" ? (
    <SubmitContentForm onSubmit={() => setSubmitted(true)} />
  ) : modalType === "share-story" ? (
    <ShareStoryForm onSubmit={() => setSubmitted(true)} />
  ) : modalType === "secure-slot" ? (
    <SecureSlotForm prefill={prefill} onSubmit={() => setSubmitted(true)} />
  ) : null;

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Desktop modal: centered */}
      <div
        className={`absolute left-1/2 top-1/2 hidden w-full max-w-lg -translate-x-1/2 -translate-y-1/2 md:block transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div className="relative max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d0d0d] p-8">
          {/* Close */}
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute right-4 top-4 text-white/60 transition-colors hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {content}
        </div>
      </div>

      {/* Mobile modal: drawer from bottom */}
      <div
        className={`absolute bottom-0 left-0 right-0 md:hidden transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="max-h-[90vh] overflow-y-auto rounded-t-3xl bg-[#0d0d0d] p-6">
          {/* Drag handle */}
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-gray-600" />
          {/* Close */}
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute right-4 top-4 text-white/60 transition-colors hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {content}
        </div>
      </div>
    </div>
  );
}
