import Link from "next/link";
import { redirect } from "next/navigation";
import { QuizForm } from "@/components/QuizForm";
import { getParticipantIdFromCookie } from "@/lib/admin";
import { getQuizForParticipant } from "@/lib/quiz";

export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const participantId = await getParticipantIdFromCookie();

  if (!participantId) {
    redirect("/");
  }

  const quiz = await getQuizForParticipant(participantId);

  if (!quiz) {
    redirect("/");
  }

  if (quiz.participant.finished_at) {
    redirect("/result");
  }

  if (quiz.questions.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
          <h1 className="text-3xl font-black">Quiz unavailable</h1>
          <p className="mt-3 text-slate-300">
            No questions were found for this session. Please ask the booth team
            to reset your entry.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-2xl bg-[#F4D03F] px-5 py-3 font-black text-black"
          >
            Back to registration
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <QuizForm participant={quiz.participant} questions={quiz.questions} />
      </div>
    </main>
  );
}
