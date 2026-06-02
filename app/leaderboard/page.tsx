import Image from "next/image";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_16%_18%,_rgba(244,208,63,0.18),_transparent_24%),radial-gradient(circle_at_88%_12%,_rgba(244,208,63,0.14),_transparent_28%),linear-gradient(135deg,_#000000,_#060606_52%,_#111111)] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,208,63,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,208,63,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-0 leaderboard-neural-bg" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#F4D03F]/10 to-transparent opacity-40 [animation:dnaScan_9s_linear_infinite]" />

      <div className="relative z-10 flex h-full flex-col px-10 py-8">
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
                DnA IT × Commvault
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
              DnA IT × Commvault - Gen AI Trivia Challenge - Powered by AI
            </span>
            <span className="px-10">
              DnA IT × Commvault - Gen AI Trivia Challenge - Powered by AI
            </span>
            <span className="px-10">
              DnA IT × Commvault - Gen AI Trivia Challenge - Powered by AI
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
