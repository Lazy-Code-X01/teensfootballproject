"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { standings as initialStandings, results, teams } from "@/lib/mockData";

type Row = {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
};

function getShortName(name: string) {
  return teams.find((t) => t.name === name)?.shortName ?? name.slice(0, 3).toUpperCase();
}

function TeamBadge({ shortName }: { shortName: string }) {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] font-display text-xs text-white">
      {shortName}
    </div>
  );
}

function recalculate(): Row[] {
  const map: Record<string, Row> = {};

  teams.forEach((t) => {
    map[t.name] = { position: 0, team: t.name, played: 0, won: 0, drawn: 0, lost: 0, points: 0 };
  });

  results.forEach((r) => {
    const home = map[r.homeTeam];
    const away = map[r.awayTeam];
    if (!home || !away) return;

    home.played++;
    away.played++;

    if (r.homeScore > r.awayScore) {
      home.won++; home.points += 3;
      away.lost++;
    } else if (r.homeScore < r.awayScore) {
      away.won++; away.points += 3;
      home.lost++;
    } else {
      home.drawn++; home.points += 1;
      away.drawn++; away.points += 1;
    }
  });

  return Object.values(map)
    .sort((a, b) => b.points - a.points || b.won - a.won)
    .map((row, i) => ({ ...row, position: i + 1 }));
}

export default function StandingsPage() {
  const [standings, setStandings] = useState<Row[]>(initialStandings);
  const [recalculated, setRecalculated] = useState(false);

  const handleRecalculate = () => {
    setStandings(recalculate());
    setRecalculated(true);
    setTimeout(() => setRecalculated(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-base font-semibold text-white">League Standings</h2>
          <p className="mt-0.5 font-sans text-xs text-gray-500">Afijio 2026 Season · {standings.length} teams</p>
        </div>
        <button
          onClick={handleRecalculate}
          className="flex items-center gap-2 self-start rounded-full bg-white/[0.06] px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${recalculated ? "text-primary" : "text-gray-400"}`} />
          {recalculated ? "Updated!" : "Recalculate"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["#", "Team", "P", "W", "D", "L", "Pts"].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-widest text-gray-500 ${
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
                  className={`border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.03] ${
                    row.position <= 3 ? "border-l-2 border-l-primary" : "border-l-2 border-l-transparent"
                  }`}
                >
                  <td className="px-4 py-4 text-center font-sans text-sm text-gray-500">{row.position}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <TeamBadge shortName={getShortName(row.team)} />
                      <span className="font-sans text-sm font-semibold text-white">{row.team}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center font-sans text-sm text-gray-300">{row.played}</td>
                  <td className="px-4 py-4 text-center font-sans text-sm text-gray-300">{row.won}</td>
                  <td className="px-4 py-4 text-center font-sans text-sm text-gray-300">{row.drawn}</td>
                  <td className="px-4 py-4 text-center font-sans text-sm text-gray-300">{row.lost}</td>
                  <td className="px-4 py-4 text-center font-display text-lg font-bold text-primary">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2">
        <span className="h-3 w-0.5 rounded-full bg-primary" />
        <span className="font-sans text-xs text-gray-500">Green bar = top 3 promotion positions</span>
      </div>

    </div>
  );
}
