"use client";

import { useEffect, useState } from "react";
import { formatDuration } from "@/lib/ranking";
import type { Participant } from "@/types/db";

type LeaderboardPayload = {
  participants: Participant[];
  updatedAt: string;
};

export function LeaderboardTable() {
  const [payload, setPayload] = useState<LeaderboardPayload>({
    participants: [],
    updatedAt: new Date().toISOString(),
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const mountedTimeout = window.setTimeout(() => setHasMounted(true), 0);

    async function loadLeaderboard() {
      const response = await fetch("/api/leaderboard", { cache: "no-store" });

      if (!response.ok) {
        return;
      }

      const nextPayload = (await response.json()) as LeaderboardPayload;

      if (isMounted) {
        setPayload(nextPayload);
      }
    }

    void loadLeaderboard();
    const interval = window.setInterval(loadLeaderboard, 5000);

    return () => {
      isMounted = false;
      window.clearTimeout(mountedTimeout);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#F4D03F]/20 bg-black/55 p-5 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F4D03F]/80 to-transparent" />
      <div className="pointer-events-none absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#F4D03F]/10 to-transparent opacity-50 [animation:dnaScan_6s_linear_infinite]" />
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F4D03F]">
            Live Top 10
          </p>
          <h1 className="text-6xl font-black text-white">Leaderboard</h1>
        </div>
        <p className="text-right text-sm text-slate-400">
          Auto-refreshes every 5s
          <br />
          {hasMounted ? new Date(payload.updatedAt).toLocaleTimeString() : ""}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-[#F4D03F]/40 bg-[#F4D03F]/15 text-[#F4D03F]">
            <tr>
              <th className="px-5 py-4 text-lg font-black">#</th>
              <th className="px-5 py-4 text-lg font-black">Participant</th>
              <th className="px-5 py-4 text-lg font-black">Company</th>
              <th className="px-5 py-4 text-lg font-black">Score</th>
              <th className="px-5 py-4 text-lg font-black">Time</th>
            </tr>
          </thead>
          <tbody>
            {payload.participants.map((participant, index) => (
              <tr
                key={participant.id}
                className={`border-t border-white/10 ${
                  index === 0
                    ? "bg-[#F4D03F]/12 [animation:dnaGlowPulse_3s_ease-in-out_infinite]"
                    : "bg-slate-950/80"
                }`}
              >
                <td
                  className={`px-5 py-5 text-3xl font-black ${
                    index === 0 ? "text-[#F4D03F]" : "text-[#E5E9ED]"
                  }`}
                >
                  {index + 1}
                </td>
                <td className="px-5 py-5 text-2xl font-black text-white">
                  {index === 0 ? (
                    <span className="mr-3 rounded-full border border-[#F4D03F]/50 px-3 py-1 text-sm text-[#F4D03F]">
                      #1
                    </span>
                  ) : null}
                  {participant.full_name}
                </td>
                <td className="px-5 py-5 text-xl text-slate-300">
                  {participant.company}
                </td>
                <td className="px-5 py-5 text-2xl font-black text-white">
                  {participant.score}/5
                </td>
                <td className="px-5 py-5 text-xl font-bold text-slate-200">
                  {formatDuration(participant.duration_ms)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payload.participants.length === 0 ? (
        <p className="py-12 text-center text-xl font-semibold text-slate-300">
          Waiting for the first finished quiz.
        </p>
      ) : null}
    </div>
  );
}
