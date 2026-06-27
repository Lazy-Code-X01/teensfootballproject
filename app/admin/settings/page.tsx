"use client";

import { useState } from "react";
import { Save, Check, Globe, Mail, Phone, MapPin, AtSign, Hash, Share2, PlayCircle, Trophy, Users } from "lucide-react";

type SiteSettings = {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  addressIbadan: string;
  addressOyo: string;
};

type SocialSettings = {
  instagram: string;
  twitter: string;
  facebook: string;
  youtube: string;
};

type LeagueSettings = {
  seasonName: string;
  seasonYear: string;
  maxTeams: string;
  matchDuration: string;
};

const inputClass = "w-full rounded-xl bg-[#1a1a1a] border border-gray-800 px-3 py-2.5 font-sans text-sm text-white outline-none focus:border-primary transition-colors placeholder:text-gray-700";
const labelClass = "mb-1.5 block font-sans text-xs text-gray-500";

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="mb-5 border-b pb-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <h3 className="font-sans text-sm font-semibold text-white">{title}</h3>
        <p className="mt-0.5 font-sans text-xs text-gray-500">{description}</p>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [site, setSite] = useState<SiteSettings>({
    siteName:      "Teens Football Project",
    tagline:       "Building Nigeria's next generation of football talent",
    email:         "teensfootballproject@gmail.com",
    phone:         "+234 800 000 0000",
    addressIbadan: "No 2 Akinboade Close, Agodi GRA, Ibadan",
    addressOyo:    "Opposite Alawe Palace, Isaale Alawe First Bank Road, Oyo",
  });

  const [social, setSocial] = useState<SocialSettings>({
    instagram: "https://instagram.com/tfp",
    twitter:   "https://twitter.com/tfp",
    facebook:  "",
    youtube:   "",
  });

  const [league, setLeague] = useState<LeagueSettings>({
    seasonName:     "Afijio League",
    seasonYear:     "2026",
    maxTeams:       "8",
    matchDuration:  "90",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">Settings</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">Configure your TFP site settings</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 self-start rounded-full px-4 py-2 font-sans text-sm font-semibold text-white transition-all sm:self-auto ${
            saved ? "bg-green-600" : "bg-primary hover:bg-primary-dark"
          }`}
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Site Info */}
      <Section title="Site Information" description="General information shown across the public website">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}><span className="flex items-center gap-1.5"><Globe className="h-3 w-3" /> Site Name</span></label>
              <input className={inputClass} value={site.siteName} onChange={(e) => setSite((p) => ({ ...p, siteName: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input className={inputClass} value={site.tagline} onChange={(e) => setSite((p) => ({ ...p, tagline: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}><span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> Email</span></label>
              <input type="email" className={inputClass} value={site.email} onChange={(e) => setSite((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}><span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> Phone</span></label>
              <input className={inputClass} value={site.phone} onChange={(e) => setSite((p) => ({ ...p, phone: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className={labelClass}><span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Address — Ibadan</span></label>
            <input className={inputClass} value={site.addressIbadan} onChange={(e) => setSite((p) => ({ ...p, addressIbadan: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}><span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Address — Oyo</span></label>
            <input className={inputClass} value={site.addressOyo} onChange={(e) => setSite((p) => ({ ...p, addressOyo: e.target.value }))} />
          </div>
        </div>
      </Section>

      {/* Social Links */}
      <Section title="Social Media" description="Links used in the website footer and contact page">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}><span className="flex items-center gap-1.5"><AtSign className="h-3 w-3" /> Instagram</span></label>
            <input className={inputClass} placeholder="https://instagram.com/..." value={social.instagram} onChange={(e) => setSocial((p) => ({ ...p, instagram: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}><span className="flex items-center gap-1.5"><Hash className="h-3 w-3" /> Twitter / X</span></label>
            <input className={inputClass} placeholder="https://twitter.com/..." value={social.twitter} onChange={(e) => setSocial((p) => ({ ...p, twitter: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}><span className="flex items-center gap-1.5"><Share2 className="h-3 w-3" /> Facebook</span></label>
            <input className={inputClass} placeholder="https://facebook.com/..." value={social.facebook} onChange={(e) => setSocial((p) => ({ ...p, facebook: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}><span className="flex items-center gap-1.5"><PlayCircle className="h-3 w-3" /> YouTube</span></label>
            <input className={inputClass} placeholder="https://youtube.com/..." value={social.youtube} onChange={(e) => setSocial((p) => ({ ...p, youtube: e.target.value }))} />
          </div>
        </div>
      </Section>

      {/* League Settings */}
      <Section title="League Configuration" description="Settings for the Afijio league and season">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}><span className="flex items-center gap-1.5"><Trophy className="h-3 w-3" /> League Name</span></label>
            <input className={inputClass} value={league.seasonName} onChange={(e) => setLeague((p) => ({ ...p, seasonName: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}>Season Year</label>
            <input type="number" className={inputClass} value={league.seasonYear} onChange={(e) => setLeague((p) => ({ ...p, seasonYear: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}><span className="flex items-center gap-1.5"><Users className="h-3 w-3" /> Max Teams</span></label>
            <input type="number" className={inputClass} value={league.maxTeams} onChange={(e) => setLeague((p) => ({ ...p, maxTeams: e.target.value }))} />
          </div>
          <div>
            <label className={labelClass}>Match Duration (mins)</label>
            <input type="number" className={inputClass} value={league.matchDuration} onChange={(e) => setLeague((p) => ({ ...p, matchDuration: e.target.value }))} />
          </div>
        </div>
      </Section>

      {/* Danger zone */}
      <div className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid rgba(239,68,68,0.15)" }}>
        <div className="mb-5 border-b pb-4" style={{ borderColor: "rgba(239,68,68,0.1)" }}>
          <h3 className="font-sans text-sm font-semibold text-red-400">Danger Zone</h3>
          <p className="mt-0.5 font-sans text-xs text-gray-500">Irreversible actions — proceed with care</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-sans text-sm font-semibold text-white">Reset Season Data</p>
            <p className="mt-0.5 font-sans text-xs text-gray-500">Clears all fixtures, results, and standings for a fresh season</p>
          </div>
          <button className="self-start rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 font-sans text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20 sm:self-auto">
            Reset Season
          </button>
        </div>
      </div>

      {/* Bottom save */}
      <div className="flex justify-end pb-2">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 rounded-full px-6 py-2.5 font-sans text-sm font-semibold text-white transition-all ${
            saved ? "bg-green-600" : "bg-primary hover:bg-primary-dark"
          }`}
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

    </div>
  );
}
