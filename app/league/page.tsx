"use client";

import { useState } from "react";
import { teams, fixtures, results, standings } from "@/lib/mockData";
import { useModal } from "@/context/ModalContext";

type Tab = "fixtures" | "results" | "standings" | "teams";

const tabs: { key: Tab; label: string }[] = [
  { key: "fixtures",  label: "Fixtures"  },
  { key: "results",   label: "Results"   },
  { key: "standings", label: "Standings" },
  { key: "teams",     label: "Teams"     },
];

function TeamBadge({ shortName, size = "md" }: { shortName: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-12 w-12 text-sm", lg: "h-16 w-16 text-base" };
  return (
    <div className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full bg-white/10 font-display font-bold text-white`}>
      {shortName}
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function getShortName(teamName: string) {
  return teams.find((t) => t.name === teamName)?.shortName ?? teamName.slice(0, 3).toUpperCase();
}

export default function LeaguePage() {
  const [activeTab, setActiveTab] = useState<Tab>("fixtures");
  const { openModal } = useModal();

  return (
    <main>

      {/* Section 1: Hero */}
      <section
        className="relative flex min-h-[50vh] items-center justify-center pt-20"
        style={{
          backgroundImage: "url('/league-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="font-display text-5xl leading-none text-white md:text-8xl">
            AFIGIO
          </h1>
          <p className="mt-4 font-sans text-sm leading-relaxed text-white/60 md:text-base">
            TFP&apos;s official football league — 6 competitive teams, structured fixtures, and a full season of real matches.
          </p>
        </div>
      </section>

      {/* Section 1b: What is Afigio */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-block rounded-full border border-[#888888] px-4 py-1 font-sans text-sm text-dark">
                Under TFP
              </span>
              <h2 className="mt-4 font-display text-4xl leading-none text-dark md:text-5xl">
                WHAT IS AFIGIO?
              </h2>
              <p className="mt-6 font-sans text-sm leading-relaxed text-muted">
                Afigio is the competitive football league that operates under the TFP umbrella. While TFP sets the vision for youth football development in Nigeria, Afigio is where that vision plays out on the pitch — with 6 active teams, a full season calendar, and real competitive football for young players.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-muted">
                Every fixture, every result, every goal scored in Afigio is a step towards TFP&apos;s bigger mission: building Nigeria&apos;s next generation of football talent.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["6", "Competing Teams"], ["3", "Seasons Run"], ["100+", "Matches Played"], ["500+", "Players Developed"]].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-dark p-6">
                  <p className="font-display text-4xl text-primary">{v}</p>
                  <p className="mt-1 font-sans text-xs text-muted">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sticky Tab Bar */}
      <div className="sticky top-16 z-40 border-b border-white/10 bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 py-4 font-sans text-sm font-semibold transition-colors duration-200 ${
                  activeTab === tab.key ? "text-primary" : "text-muted hover:text-white"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-dark py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Fixtures */}
          {activeTab === "fixtures" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {fixtures.map((f) => (
                <div key={f.id} className="flex flex-col rounded-2xl bg-[#0d0d0d] p-6">

                  {/* Date + venue */}
                  <div className="mb-6">
                    <p className="font-sans text-xs font-semibold uppercase tracking-widest text-primary">
                      {formatDate(f.date)}
                    </p>
                    <p className="mt-1 font-sans text-xs text-muted">{f.venue}</p>
                  </div>

                  {/* Teams */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <TeamBadge shortName={getShortName(f.homeTeam)} />
                      <p className="font-sans text-xs font-semibold text-white">{f.homeTeam}</p>
                    </div>

                    <span className="font-display text-2xl text-primary">VS</span>

                    <div className="flex flex-col items-center gap-2 text-center">
                      <TeamBadge shortName={getShortName(f.awayTeam)} />
                      <p className="font-sans text-xs font-semibold text-white">{f.awayTeam}</p>
                    </div>
                  </div>

                  {/* Kick-off time */}
                  <div className="mt-6 flex justify-end">
                    <span className="font-sans text-sm font-bold text-white">{f.time} WAT</span>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {activeTab === "results" && (
            <div className="flex flex-col gap-3">
              {results.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between rounded-xl bg-[#0d0d0d] px-6 py-4"
                >
                  {/* Home */}
                  <div className="flex w-[35%] items-center gap-3">
                    <TeamBadge shortName={getShortName(r.homeTeam)} size="sm" />
                    <span className="font-sans text-sm font-semibold text-white">{r.homeTeam}</span>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl text-white">{r.homeScore}</span>
                    <span className="font-sans text-xs text-muted">—</span>
                    <span className="font-display text-2xl text-white">{r.awayScore}</span>
                  </div>

                  {/* Away */}
                  <div className="flex w-[35%] items-center justify-end gap-3">
                    <span className="font-sans text-sm font-semibold text-white">{r.awayTeam}</span>
                    <TeamBadge shortName={getShortName(r.awayTeam)} size="sm" />
                  </div>

                  {/* Date */}
                  <span className="hidden font-sans text-xs text-muted md:block">{formatDate(r.date)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Standings */}
          {activeTab === "standings" && (
            <div className="overflow-hidden rounded-2xl bg-[#0d0d0d]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {["#", "Team", "P", "W", "D", "L", "Pts"].map((h) => (
                      <th
                        key={h}
                        className={`px-4 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-muted ${
                          h === "Team" ? "text-left" : "text-center"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row) => (
                    <tr
                      key={row.position}
                      className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                        row.position <= 3 ? "border-l-2 border-l-primary" : "border-l-2 border-l-transparent"
                      }`}
                    >
                      <td className="px-4 py-4 text-center font-sans text-sm text-muted">{row.position}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <TeamBadge shortName={getShortName(row.team)} size="sm" />
                          <span className="font-sans text-sm font-semibold text-white">{row.team}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center font-sans text-sm text-white">{row.played}</td>
                      <td className="px-4 py-4 text-center font-sans text-sm text-white">{row.won}</td>
                      <td className="px-4 py-4 text-center font-sans text-sm text-white">{row.drawn}</td>
                      <td className="px-4 py-4 text-center font-sans text-sm text-white">{row.lost}</td>
                      <td className="px-4 py-4 text-center font-display text-sm font-bold text-primary">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Teams */}
          {activeTab === "teams" && (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="group flex flex-col items-center gap-3 rounded-2xl bg-[#0d0d0d] p-6 text-center transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 font-display text-base font-bold text-white transition-colors duration-300 group-hover:bg-primary/20 group-hover:text-primary">
                    {team.shortName}
                  </div>
                  <p className="font-sans text-xs font-semibold text-white">{team.name}</p>
                  <p className="font-sans text-[10px] text-muted">Est. {team.founded}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* CTA Strip */}
      <section className="bg-primary py-16">
        <div className="flex flex-col items-center gap-6 px-6 text-center">
          <h2 className="font-display text-3xl leading-none text-white md:text-5xl">
            WANT YOUR TEAM IN AFIGIO?
          </h2>
          <p className="max-w-md font-sans text-sm text-white/80">
            Register your team under TFP&apos;s Afigio league and compete in structured fixtures across the season.
          </p>
          <button
            onClick={() => openModal("register-team")}
            className="rounded-full bg-white px-8 py-3 font-sans text-sm font-semibold text-dark transition-colors hover:bg-white/90"
          >
            Register Your Team
          </button>
        </div>
      </section>

    </main>
  );
}
