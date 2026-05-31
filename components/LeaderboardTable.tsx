"use client";

import { useEffect, useRef, useState } from "react";
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
  const [changedRows, setChangedRows] = useState<Set<string>>(new Set());
  const previousRanksRef = useRef<Map<string, number>>(new Map());
  const clearPulseTimeoutRef = useRef<number | null>(null);

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
        const previousRanks = previousRanksRef.current;
        const nextChangedRows = new Set<string>();

        nextPayload.participants.forEach((participant, index) => {
          const previousRank = previousRanks.get(participant.id);

          if (previousRanks.size > 0 && previousRank !== index) {
            nextChangedRows.add(participant.id);
          }
        });

        previousRanksRef.current = new Map(
          nextPayload.participants.map((participant, index) => [
            participant.id,
            index,
          ]),
        );

        if (nextChangedRows.size > 0) {
          setChangedRows(nextChangedRows);

          if (clearPulseTimeoutRef.current) {
            window.clearTimeout(clearPulseTimeoutRef.current);
          }

          clearPulseTimeoutRef.current = window.setTimeout(() => {
            setChangedRows(new Set());
          }, 2200);
        }

        setPayload(nextPayload);
      }
    }

    void loadLeaderboard();
    const interval = window.setInterval(loadLeaderboard, 5000);

    return () => {
      isMounted = false;
      window.clearTimeout(mountedTimeout);
      window.clearInterval(interval);

      if (clearPulseTimeoutRef.current) {
        window.clearTimeout(clearPulseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#F4D03F]/20 bg-black/60 p-5 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F4D03F]/90 to-transparent" />
      <div className="pointer-events-none absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#F4D03F]/10 to-transparent opacity-50 [animation:dnaScan_7s_linear_infinite]" />
      <div className="relative z-10 mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xl font-bold uppercase tracking-[0.35em] text-[#F4D03F]">
            Live Top 10 Leaderboard
          </p>
        </div>
        <p className="text-right text-2xl font-bold text-[#E5E9ED]/75">
          Auto-refreshes every 5s
          <br />
          {hasMounted ? new Date(payload.updatedAt).toLocaleTimeString() : ""}
        </p>
      </div>

      <div className="relative z-10 grid min-h-0 flex-1 grid-rows-[auto_1fr] overflow-hidden rounded-3xl border border-white/10">
        <div className="grid grid-cols-[120px_1.7fr_1fr_210px_210px] border-b border-[#F4D03F]/35 bg-[#F4D03F]/10 px-6 py-3 text-2xl font-black uppercase tracking-[0.12em] text-[#F4D03F]">
          <span>Rank</span>
          <span>Participant</span>
          <span>Company</span>
          <span className="text-center">Score</span>
          <span className="text-right">Time</span>
        </div>

        <div className="min-h-0 space-y-2 overflow-hidden bg-black/35 p-3">
          {payload.participants.map((participant, index) => {
            const isFirst = index === 0;
            const hasChanged = changedRows.has(participant.id);

            return (
              <div
                key={participant.id}
                className={`grid items-center rounded-3xl border px-6 text-left ${
                  isFirst
                    ? "grid-cols-[120px_1.7fr_1fr_210px_210px] border-[#F4D03F]/55 bg-[#F4D03F]/12 py-5 shadow-[0_0_48px_rgba(244,208,63,0.28)] [animation:leaderboardFirstGlow_3s_ease-in-out_infinite]"
                    : "grid-cols-[120px_1.7fr_1fr_210px_210px] border-white/10 bg-slate-950/80 py-3"
                } ${hasChanged ? "leaderboard-row-update" : ""}`}
              >
                <div
                  className={`font-black ${
                    isFirst
                      ? "text-7xl text-[#F4D03F]"
                      : "text-5xl text-[#E5E9ED]"
                  }`}
                >
                  {isFirst ? "1" : index + 1}
                </div>

                <div className="min-w-0">
                  {isFirst ? (
                    <p className="mb-1 text-2xl font-black uppercase tracking-[0.18em] text-[#F4D03F]">
                      No. 1
                    </p>
                  ) : null}
                  <p
                    className={`truncate font-black text-white ${
                      isFirst ? "text-5xl" : "text-4xl"
                    }`}
                  >
                    {participant.full_name}
                  </p>
                </div>

                <p
                  className={`truncate font-bold text-[#E5E9ED]/80 ${
                    isFirst ? "text-3xl" : "text-2xl"
                  }`}
                >
                  {participant.company}
                </p>

                <p
                  className={`text-center font-black ${
                    isFirst ? "text-5xl text-[#F4D03F]" : "text-4xl text-white"
                  }`}
                >
                  {participant.score}/5
                </p>

                <p
                  className={`text-right font-black tabular-nums ${
                    isFirst ? "text-4xl text-white" : "text-3xl text-[#E5E9ED]"
                  }`}
                >
                  {formatDuration(participant.duration_ms)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {payload.participants.length === 0 ? (
        <p className="relative z-10 py-28 text-center text-5xl font-black text-[#E5E9ED]">
          Waiting for the first finished quiz.
        </p>
      ) : null}
    </div>
  );
}
