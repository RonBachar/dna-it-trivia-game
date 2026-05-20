import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getParticipantIdFromCookie } from "@/lib/admin";
import { getQuizForParticipant, getRank } from "@/lib/quiz";
import { formatDuration } from "@/lib/ranking";

export const dynamic = "force-dynamic";

export default async function ResultPage() {
  const participantId = await getParticipantIdFromCookie();

  if (!participantId) {
    redirect("/");
  }

  const quiz = await getQuizForParticipant(participantId);

  if (!quiz) {
    redirect("/");
  }

  if (!quiz.participant.finished_at) {
    redirect("/quiz");
  }

  const rank = await getRank(quiz.participant);

  return (
    <main className="flex min-h-screen items-center bg-[radial-gradient(circle_at_top,_rgba(244,208,63,0.16),_transparent_35%),linear-gradient(135deg,_#000000,_#111111)] px-6 py-10">
      <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.08] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur">
        <Image
          src="/DNA.png"
          alt="DNA IT"
          width={150}
          height={62}
          className="mx-auto mb-6 h-auto w-32"
        />
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F4D03F]">
          Final score
        </p>
        <h1 className="mt-3 text-5xl font-black text-white">
          {quiz.participant.score} / {quiz.questions.length}
        </h1>
        <p className="mt-4 text-xl text-slate-300">
          Nice run,{" "}
          <span className="font-bold text-white">
            {quiz.participant.full_name}
          </span>
          .
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Rank
            </p>
            <p className="mt-2 text-3xl font-black text-[#F4D03F]">
              {rank ? `#${rank}` : "-"}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Duration
            </p>
            <p className="mt-2 text-3xl font-black text-white">
              {formatDuration(quiz.participant.duration_ms)}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Company
            </p>
            <p className="mt-2 text-xl font-black text-white">
              {quiz.participant.company}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/leaderboard"
            className="rounded-2xl bg-[#F4D03F] px-5 py-3 font-black text-black shadow-[0_0_24px_rgba(244,208,63,0.18)] hover:bg-[#f7dc6f]"
          >
            View leaderboard
          </Link>
          <Link
            href="/"
            className="rounded-2xl border border-white/15 px-5 py-3 font-black text-white hover:bg-white/10"
          >
            Back to registration
          </Link>
        </div>
      </section>
    </main>
  );
}
