"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users, Calendar, Newspaper, Trophy,
  CalendarPlus, ImageIcon, PlayCircle, Building2,
} from "lucide-react";

type Fixture = { id: number; homeTeam: string; awayTeam: string; date: string; time: string; status: string };

const quickActions = [
  { label: "Add Fixture",   icon: CalendarPlus, href: "/admin/fixtures"   },
  { label: "Add Result",    icon: Trophy,       href: "/admin/results"    },
  { label: "Add News",      icon: Newspaper,    href: "/admin/news"       },
  { label: "Gallery",       icon: ImageIcon,    href: "/admin/gallery"    },
  { label: "Highlights",    icon: PlayCircle,   href: "/admin/highlights" },
  { label: "Sponsors",      icon: Building2,    href: "/admin/sponsors"   },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const [counts, setCounts] = useState({ teams: 0, fixtures: 0, news: 0, gallery: 0 });
  const [upcoming, setUpcoming] = useState<Fixture[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/teams").then((r) => r.json()),
      fetch("/api/fixtures").then((r) => r.json()),
      fetch("/api/news").then((r) => r.json()),
      fetch("/api/gallery").then((r) => r.json()),
    ]).then(([teams, fixtures, news, gallery]) => {
      setCounts({ teams: teams.length, fixtures: fixtures.length, news: news.length, gallery: gallery.length });
      setUpcoming(
        (fixtures as Fixture[])
          .filter((f) => f.status === "upcoming" || f.status === "live")
          .slice(0, 4)
      );
    });
  }, []);

  const kpis = [
    { value: counts.teams,    label: "Teams",    icon: Users,      accent: "text-primary",     bg: "bg-primary/10"    },
    { value: counts.fixtures, label: "Fixtures", icon: Calendar,   accent: "text-blue-400",    bg: "bg-blue-500/10"   },
    { value: counts.news,     label: "Articles", icon: Newspaper,  accent: "text-purple-400",  bg: "bg-purple-500/10" },
    { value: counts.gallery,  label: "Photos",   icon: ImageIcon,  accent: "text-pink-400",    bg: "bg-pink-500/10"   },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* Welcome banner */}
      <div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{ background: "linear-gradient(135deg, #0d1f14 0%, #111 60%, #0d0d0d 100%)", border: "1px solid rgba(27,138,62,0.2)" }}
      >
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-5"
          style={{ background: "radial-gradient(circle at 70% 50%, #1B8A3E 0%, transparent 70%)" }}
        />
        <div className="relative flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-sans text-xs text-gray-500">{today}</p>
            <h1 className="mt-1 font-display text-2xl text-white md:text-3xl">WELCOME BACK, ADMIN</h1>
            <p className="mt-1 font-sans text-sm text-gray-400">2026 TFP Season</p>
          </div>
          <Link
            href="/admin/fixtures"
            className="mt-4 flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-sans text-xs font-semibold text-white transition-colors hover:bg-primary-dark sm:mt-0"
          >
            <CalendarPlus className="h-3.5 w-3.5" />
            Add Fixture
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-2xl p-5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${k.bg}`}>
                <Icon className={`h-4 w-4 ${k.accent}`} />
              </div>
              <p className={`mt-4 font-display text-3xl ${k.accent}`}>{k.value}</p>
              <p className="mt-1 font-sans text-sm font-semibold text-white">{k.label}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Upcoming fixtures */}
        <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-sans text-sm font-semibold text-white">Upcoming Fixtures</h2>
            <Link href="/admin/fixtures" className="font-sans text-xs text-primary transition-colors hover:text-primary-light">
              Manage all
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="py-8 text-center font-sans text-sm text-gray-600">No upcoming fixtures.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map((f) => (
                <div key={f.id} className="flex items-center gap-4 rounded-xl px-4 py-3" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <p className="flex-1 text-right font-sans text-sm font-semibold text-white">{f.homeTeam}</p>
                  <div className="flex flex-col items-center px-2">
                    <span className="font-display text-base text-primary">VS</span>
                    <span className="font-sans text-[10px] text-gray-500">{formatDate(f.date)} · {f.time}</span>
                  </div>
                  <p className="flex-1 font-sans text-sm font-semibold text-white">{f.awayTeam}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl p-5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 className="mb-4 font-sans text-sm font-semibold text-white">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.label}
                  href={a.href}
                  className="group flex flex-col items-center gap-2 rounded-xl p-4 text-center transition-all duration-150 hover:bg-white/[0.04]"
                  style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <Icon className="h-5 w-5 text-gray-500 transition-colors group-hover:text-primary" />
                  <span className="font-sans text-[10px] text-gray-400 group-hover:text-white transition-colors">{a.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
