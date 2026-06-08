import { LeaderboardRotator } from "@/components/LeaderboardRotator";

export default function LeaderboardPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_16%_18%,_rgba(244,208,63,0.18),_transparent_24%),radial-gradient(circle_at_88%_12%,_rgba(244,208,63,0.14),_transparent_28%),linear-gradient(135deg,_#000000,_#060606_52%,_#111111)] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(244,208,63,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(244,208,63,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute inset-0 leaderboard-neural-bg" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[#F4D03F]/10 to-transparent opacity-40 [animation:dnaScan_9s_linear_infinite]" />

      <LeaderboardRotator />
    </main>
  );
}
