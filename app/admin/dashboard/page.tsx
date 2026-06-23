"use client";

import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  Users, Calendar, Newspaper, Trophy,
  CalendarPlus, ImageIcon, TrendingUp, ArrowUpRight,
} from "lucide-react";
import { fixtures, results, standings, teams } from "@/lib/mockData";

/* Derived chart data */
const pointsData = [...standings]
  .sort((a, b) => b.points - a.points)
  .map((s) => ({
    team: teams.find((t) => t.name === s.team)?.shortName ?? s.team.slice(0, 3),
    points: s.points,
    won: s.won,
  }));

const goalsData = teams.map((team) => {
  const scored =
    results.filter((r) => r.homeTeam === team.name).reduce((n, r) => n + r.homeScore, 0) +
    results.filter((r) => r.awayTeam === team.name).reduce((n, r) => n + r.awayScore, 0);
  return { team: team.shortName, goals: scored };
}).sort((a, b) => b.goals - a.goals);

/* Activity timeline */
const activity = [
  { icon: Calendar,  color: "bg-blue-500/20 text-blue-400",   text: "Lagos FC vs Abuja Stars fixture added",          time: "2m ago",    date: "Today" },
  { icon: Trophy,    color: "bg-amber-500/20 text-amber-400", text: "Result updated: Enugu Warriors 1–0 PHC",          time: "1h ago",    date: "Today" },
  { icon: Newspaper, color: "bg-purple-500/20 text-purple-400", text: "New article: Three Players Selected",           time: "3h ago",    date: "Today" },
  { icon: ImageIcon, color: "bg-pink-500/20 text-pink-400",   text: "Gallery updated — 12 new photos added",           time: "5h ago",    date: "Today" },
  { icon: Users,     color: "bg-primary/20 text-primary",     text: "Ibadan United team profile updated",              time: "Yesterday", date: "Yesterday" },
];

const quickActions = [
  { label: "Add Fixture", icon: CalendarPlus, href: "/admin/fixtures", accent: "group-hover:text-blue-400" },
  { label: "Add Result",  icon: Trophy,       href: "/admin/results",  accent: "group-hover:text-amber-400" },
  { label: "Add News",    icon: Newspaper,    href: "/admin/news",     accent: "group-hover:text-purple-400" },
  { label: "Gallery",     icon: ImageIcon,    href: "/admin/gallery",  accent: "group-hover:text-pink-400" },
];

const kpis = [
  { value: "500+", label: "Players",         sub: "Registered",    icon: Users,        accent: "text-primary",     bg: "bg-primary/10"      },
  { value: "20",   label: "Teams",           sub: "Active",        icon: Trophy,       accent: "text-amber-400",   bg: "bg-amber-500/10"    },
  { value: "3",    label: "Fixtures",        sub: "This week",     icon: Calendar,     accent: "text-blue-400",    bg: "bg-blue-500/10"     },
  { value: "3",    label: "Articles",        sub: "Published",     icon: Newspaper,    accent: "text-purple-400",  bg: "bg-purple-500/10"   },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#0d0d0d] px-3 py-2 shadow-xl">
      <p className="font-sans text-xs text-gray-400">{label}</p>
      <p className="font-display text-lg text-white">{payload[0].value}</p>
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="flex flex-col gap-6">

      {/* Welcome banner */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 md:p-8"
        style={{ background: "linear-gradient(135deg, #0d1f14 0%, #111 60%, #0d0d0d 100%)", border: "1px solid rgba(27,138,62,0.2)" }}
      >
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-5"
          style={{ background: "radial-gradient(circle at 70% 50%, #1B8A3E 0%, transparent 70%)" }}
        />
        <div className="relative flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-sans text-xs text-gray-500">{today}</p>
            <h1 className="mt-1 font-display text-3xl text-white md:text-4xl">WELCOME BACK, ADMIN</h1>
            <p className="mt-1 font-sans text-sm text-gray-400">Here&apos;s what&apos;s happening in the 2026 TFP season.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/admin/fixtures" className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-sans text-xs font-semibold text-white transition-colors hover:bg-primary-dark">
              <CalendarPlus className="h-3.5 w-3.5" />
              Add Fixture
            </Link>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-2xl p-5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-start justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${k.bg}`}>
                  <Icon className={`h-4.5 w-4.5 ${k.accent}`} />
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-gray-600" />
              </div>
              <p className={`mt-4 font-display text-4xl ${k.accent}`}>{k.value}</p>
              <p className="mt-1 font-sans text-sm font-semibold text-white">{k.label}</p>
              <p className="font-sans text-xs text-gray-500">{k.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts + Right panel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Charts column */}
        <div className="flex flex-col gap-6 lg:col-span-2">

          {/* Points leaderboard chart */}
          <div className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-sans text-sm font-semibold text-white">Points Leaderboard</h2>
                <p className="mt-0.5 font-sans text-xs text-gray-500">Season 2026 standings</p>
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pointsData} barSize={28}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="team" tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} width={24} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="points" fill="#1B8A3E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Goals scored chart */}
          <div className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-sans text-sm font-semibold text-white">Goals Scored</h2>
                <p className="mt-0.5 font-sans text-xs text-gray-500">By team this season</p>
              </div>
              <Trophy className="h-4 w-4 text-amber-400" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={goalsData} barSize={28}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="team" tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 11, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} width={24} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="goals" fill="#d97706" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Upcoming Fixtures */}
          <div className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-sans text-sm font-semibold text-white">Upcoming Fixtures</h2>
                <p className="mt-0.5 font-sans text-[10px] text-gray-500">Afigio 2026 Season</p>
              </div>
              <Link href="/admin/fixtures" className="font-sans text-xs text-primary hover:text-primary-light transition-colors">
                Manage all
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {fixtures.map((f) => (
                <div key={f.id} className="flex items-center gap-4 rounded-xl p-4" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="flex-1 text-center">
                    <p className="font-sans text-sm font-semibold text-white">{f.homeTeam}</p>
                  </div>
                  <div className="flex flex-col items-center px-3">
                    <span className="font-display text-lg text-primary">VS</span>
                    <span className="mt-0.5 font-sans text-[10px] text-gray-500">{formatDate(f.date)} · {f.time}</span>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="font-sans text-sm font-semibold text-white">{f.awayTeam}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-6">

          {/* Quick Actions */}
          <div className="rounded-2xl p-5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 className="mb-4 font-sans text-sm font-semibold text-white">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.label}
                    href={a.href}
                    className={`group flex flex-col items-center gap-2 rounded-xl p-4 text-center transition-all duration-150 hover:border-white/10 ${a.accent}`}
                    style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <Icon className={`h-5 w-5 text-gray-500 transition-colors ${a.accent}`} />
                    <span className="font-sans text-[10px] text-gray-400">{a.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="flex-1 rounded-2xl p-5" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 className="mb-5 font-sans text-sm font-semibold text-white">Recent Activity</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/[0.06]" />

              <div className="flex flex-col gap-5">
                {activity.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="relative flex gap-4 pl-1">
                      {/* Icon dot on timeline */}
                      <div className={`relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${item.color}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 pt-0.5">
                        <p className="font-sans text-xs leading-relaxed text-gray-300">{item.text}</p>
                        <p className="mt-1 font-sans text-[10px] text-gray-600">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
