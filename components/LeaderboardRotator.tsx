"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { InvitationScreen } from "@/components/InvitationScreen";
import { LeaderboardTable } from "@/components/LeaderboardTable";

type Screen = "leaderboard" | "invitation";

export function LeaderboardRotator() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("leaderboard");

  useEffect(() => {
    let cancelled = false;
    let timeoutId = 0;

    function scheduleRotation(screen: Screen) {
      const duration = screen === "leaderboard" ? 15000 : 8000;

      timeoutId = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        const nextScreen: Screen =
          screen === "leaderboard" ? "invitation" : "leaderboard";

        setCurrentScreen(nextScreen);
        scheduleRotation(nextScreen);
      }, duration);
    }

    scheduleRotation("leaderboard");

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative z-10 h-full w-full">
      <div
        className={`leaderboard-screen-layer absolute inset-0 flex h-full flex-col px-10 py-8 transition-opacity duration-500 ${
          currentScreen === "leaderboard"
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={currentScreen !== "leaderboard"}
      >
        <header className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            <Image
              src="/DNA.png"
              alt="DnA IT"
              width={310}
              height={125}
              priority
              className="h-auto w-72"
            />
            <div>
              <p className="text-2xl font-black tracking-[0.42em] text-[#F4D03F]">
                DnA IT × Nutanix
              </p>
              <h1 className="mt-2 text-6xl font-black tracking-tight text-white">
                Gen AI Trivia Challenge
              </h1>
            </div>
          </div>

          <div className="rounded-full border border-[#F4D03F]/35 bg-black/45 px-6 py-3 text-right shadow-[0_0_32px_rgba(244,208,63,0.12)]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#E5E9ED]/70">
              Live Booth Ranking
            </p>
            <p className="mt-1 text-2xl font-black text-[#F4D03F]">Top 10</p>
          </div>
        </header>

        <section className="min-h-0 flex-1 py-7">
          <LeaderboardTable />
        </section>

        <div className="relative h-12 overflow-hidden rounded-full border border-[#F4D03F]/25 bg-black/55 shadow-[0_0_28px_rgba(244,208,63,0.12)]">
          <div className="leaderboard-ticker absolute flex h-full items-center whitespace-nowrap text-2xl font-black tracking-[0.3em] text-[#F4D03F]">
            <span className="px-10">
              DnA IT × Nutanix - Gen AI Trivia Challenge - Powered by AI
            </span>
            <span className="px-10">
              DnA IT × Nutanix - Gen AI Trivia Challenge - Powered by AI
            </span>
            <span className="px-10">
              DnA IT × Nutanix - Gen AI Trivia Challenge - Powered by AI
            </span>
          </div>
        </div>
      </div>

      <div
        className={`leaderboard-screen-layer absolute inset-0 transition-opacity duration-500 ${
          currentScreen === "invitation"
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={currentScreen !== "invitation"}
      >
        <InvitationScreen isVisible={currentScreen === "invitation"} />
      </div>
    </div>
  );
}
