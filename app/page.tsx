import Image from "next/image";
import Link from "next/link";
import { RegistrationForm } from "@/components/RegistrationForm";
import { QUESTION_COUNT } from "@/lib/quiz";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,208,63,0.18),_transparent_35%),linear-gradient(135deg,_#000000,_#0b0b0b_55%,_#111111)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <section className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Image
              src="/DNA.png"
              alt="DNA IT"
              width={170}
              height={70}
              priority
              className="mb-8 h-auto w-36 md:w-44"
            />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#F4D03F]">
              DnA IT × Commvault
            </p>
            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-7xl">
              Gen AI Trivia Challenge
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Register once, answer {QUESTION_COUNT} IT trivia questions, and
              race the clock for a spot on the booth leaderboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-200">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                {QUESTION_COUNT} Questions
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                20 Seconds Per Question!
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                One Entry Per Participant
              </span>
            </div>
            <Link
              href="/leaderboard"
              className="mt-8 inline-flex rounded-full border border-[#F4D03F]/60 px-5 py-3 text-sm font-bold text-[#F4D03F] shadow-[0_0_24px_rgba(244,208,63,0.12)] hover:bg-[#F4D03F] hover:text-black"
            >
              View leaderboard
            </Link>
          </div>
          <RegistrationForm />
        </section>
      </div>
    </main>
  );
}
