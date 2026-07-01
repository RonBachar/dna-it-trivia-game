import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getParticipantIdFromCookie } from "@/lib/admin";
import { getQuizForParticipant, getRank, QUESTION_COUNT } from "@/lib/quiz";
import { formatDuration } from "@/lib/ranking";
import { ResultCelebration } from "@/components/ResultCelebration";

export const dynamic = "force-dynamic";

function getResultContent(score: number) {
  if (score === QUESTION_COUNT) {
    return {
      headline: "PERFECT SCORE! 🏆",
      message: "Outstanding work. You claimed the strongest possible result.",
      cardClass:
        "border-[#F4D03F]/45 bg-[#F4D03F]/12 shadow-[0_0_72px_rgba(244,208,63,0.32)] result-perfect-entry",
      headlineClass: "text-[#F4D03F]",
    };
  }

  if (score >= 4) {
    return {
      headline: "Great score! 💪",
      message: "Strong performance. Well played!",
      cardClass:
        "border-[#F4D03F]/30 bg-white/[0.08] shadow-[0_0_42px_rgba(244,208,63,0.18)] result-card-entry",
      headlineClass: "text-white",
    };
  }

  if (score >= 1) {
    return {
      headline: "Nice run! 🎯",
      message: "Good effort - thanks for taking the challenge!",
      cardClass: "border-white/10 bg-white/[0.08] shadow-2xl shadow-black/30 result-card-entry",
      headlineClass: "text-white",
    };
  }

  return {
    headline:
      "So close! You need at least one correct answer to enter the leaderboard. Better luck next time! 🤖",
    message: "Your entry is complete and your result has been finalized.",
    cardClass: "border-white/10 bg-white/[0.05] shadow-2xl shadow-black/30 result-card-entry",
    headlineClass: "text-slate-200",
  };
}

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
  const score = quiz.participant.score;
  const resultContent = getResultContent(score);

  return (
    <main className="flex min-h-screen items-center bg-[radial-gradient(circle_at_top,_rgba(244,208,63,0.16),_transparent_35%),linear-gradient(135deg,_#000000,_#111111)] px-6 py-10">
      <ResultCelebration score={score} />
      <section
        className={`mx-auto w-full max-w-3xl rounded-[2rem] p-8 text-center backdrop-blur ${resultContent.cardClass}`}
      >
        <Image
          src="/dna-it-white-logo.svg"
          alt="DnA IT"
          width={150}
          height={41}
          className="mx-auto mb-6 h-auto w-32"
        />
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F4D03F]">
          Final score
        </p>
        <h1
          className={`mt-3 text-4xl font-black sm:text-5xl ${resultContent.headlineClass}`}
        >
          {resultContent.headline}
        </h1>
        <p className="mt-4 text-6xl font-black text-[#F4D03F]">
          {score} / {QUESTION_COUNT}
        </p>
        <p className="mt-4 text-xl text-slate-300">
          {resultContent.message}
        </p>
        <p className="mt-3 text-lg text-slate-300">
          <span className="font-bold text-white">
            {quiz.participant.full_name}
          </span>
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Leaderboard
            </p>
            <p className="mt-2 text-3xl font-black text-[#F4D03F]">
              {rank ? `#${rank}` : "Not entered"}
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

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="rounded-2xl bg-[#F4D03F] px-6 py-4 font-black text-black shadow-[0_0_24px_rgba(244,208,63,0.18)] hover:bg-[#f7dc6f]"
          >
            Back to start
          </Link>
        </div>
      </section>
    </main>
  );
}
