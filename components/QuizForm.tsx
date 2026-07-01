"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { QUESTION_COUNT, QUESTION_DURATION_MS } from "@/lib/quiz";
import type { Participant, Question } from "@/types/db";
import { Timer } from "@/components/Timer";

type QuizFormProps = {
  participant: Participant;
  questions: Question[];
};

export function QuizForm({ participant, questions }: QuizFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isBeginning, setIsBeginning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAnswers = useCallback(
    async (finalAnswers: Record<string, number | null>) => {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);
      setError("");

      const measuredDurationMs =
        startedAtMs === null
          ? null
          : Math.min(
              Math.max(Date.now() - startedAtMs, 0),
              questions.length * QUESTION_DURATION_MS,
            );

      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: finalAnswers,
          measuredDurationMs,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { message?: string };
        setError(payload.message ?? "Could not submit the quiz.");
        setIsSubmitting(false);
        return;
      }

      router.push("/result");
    },
    [isSubmitting, questions.length, router, startedAtMs],
  );

  async function handleReady() {
    setError("");
    setIsBeginning(true);

    const response = await fetch("/api/quiz/begin", { method: "POST" });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
      };
      setError(payload.message ?? "Could not start the quiz.");
      setIsBeginning(false);
      return;
    }

    const payload = (await response.json()) as { startedAtMs: number };
    setStartedAtMs(payload.startedAtMs);
    setHasStarted(true);
    setIsBeginning(false);
  }

  const advanceQuestion = useCallback(
    (answer: number | null) => {
      if (isSubmitting) {
        return;
      }

      const currentQuestion = questions[currentIndex];
      const nextAnswers = { ...answers, [currentQuestion.id]: answer };
      const isLastQuestion = currentIndex === questions.length - 1;

      if (isLastQuestion) {
        void submitAnswers(nextAnswers);
        return;
      }

      setAnswers(nextAnswers);
      setSelectedIndex(null);
      setCurrentIndex((index) => index + 1);
    },
    [answers, currentIndex, isSubmitting, questions, submitAnswers],
  );

  const handleExpire = useCallback(() => {
    advanceQuestion(null);
  }, [advanceQuestion]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  if (!hasStarted) {
    return (
      <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.08] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur">
          <Image
            src="/DNA.png"
            alt="DnA IT"
            width={150}
            height={62}
            className="mx-auto mb-6 h-auto w-32"
          />
          <p className="text-sm font-semibold tracking-[0.3em] text-[#F4D03F]">
            DnA IT × Commvault
          </p>
          <h1 className="mt-4 text-6xl font-black text-white">Ready?</h1>
          <p className="mt-4 text-lg font-semibold text-slate-300">
            Note: you cannot go back to previous questions
          </p>
          {error ? (
            <p className="mt-6 rounded-2xl border border-red-300/30 bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-100">
              {error}
            </p>
          ) : null}
          <button
            type="button"
            onClick={handleReady}
            disabled={isBeginning}
            className="mt-8 w-full rounded-2xl bg-[#F4D03F] px-5 py-4 text-lg font-black text-black shadow-[0_0_24px_rgba(244,208,63,0.18)] hover:bg-[#f7dc6f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isBeginning ? "Starting..." : "I'm ready!"}
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="sticky top-0 z-10 -mx-4 flex flex-col gap-4 border-b border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/DNA.png"
              alt="DnA IT"
              width={120}
              height={50}
              className="h-auto w-24"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F4D03F]">
              Question {currentIndex + 1} of {QUESTION_COUNT}
            </p>
          </div>
          <h1 className="text-3xl font-black text-white">
            Good luck, {participant.full_name}
          </h1>
          <p className="mt-1 text-sm font-semibold text-slate-400">
            No going back. Answer quickly for a better time.
          </p>
        </div>
        <Timer
          key={currentQuestion.id}
          durationMs={QUESTION_DURATION_MS}
          timerKey={currentQuestion.id}
          onExpire={handleExpire}
        />
      </div>

      <fieldset className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
        <legend className="px-2 text-sm font-black uppercase tracking-[0.2em] text-[#F4D03F]">
          Question {currentIndex + 1}
        </legend>
        <p className="mt-3 text-2xl font-bold leading-9 text-white">
          {currentQuestion.prompt}
        </p>
        <div className="mt-6 grid gap-3">
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;

            return (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 text-slate-100 ${
                  isSelected
                    ? "border-[#F4D03F] bg-[#F4D03F]/15 shadow-[0_0_20px_rgba(244,208,63,0.12)]"
                    : "border-white/10 bg-slate-900 hover:border-[#F4D03F]/70 hover:bg-slate-800"
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={optionIndex}
                  checked={isSelected}
                  onChange={() => setSelectedIndex(optionIndex)}
                  className="h-5 w-5 accent-[#F4D03F]"
                />
                <span className="text-lg font-semibold">{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error ? (
        <p className="rounded-2xl border border-red-300/30 bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-100">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        disabled={selectedIndex === null || isSubmitting}
        onClick={() => advanceQuestion(selectedIndex)}
        className="w-full rounded-2xl bg-[#F4D03F] px-5 py-4 text-lg font-black text-black shadow-[0_0_24px_rgba(244,208,63,0.18)] hover:bg-[#f7dc6f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : isLastQuestion ? "Finish" : "Next"}
      </button>
    </section>
  );
}
