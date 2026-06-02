import Image from "next/image";
import Link from "next/link";
import { RegistrationForm } from "@/components/RegistrationForm";
import { QUESTION_COUNT } from "@/lib/quiz";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_8%_8%,_rgba(244,208,63,0.22),_transparent_28%),radial-gradient(circle_at_92%_88%,_rgba(244,208,63,0.16),_transparent_30%),radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.06),_transparent_32%),linear-gradient(135deg,_#000000_0%,_#070707_42%,_#101010_100%)] px-6 py-10">
      <div className="pointer-events-none absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#F4D03F]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-28 h-[32rem] w-[32rem] rounded-full bg-[#F4D03F]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,_transparent_0%,_rgba(244,208,63,0.05)_38%,_transparent_64%)]" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <section className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="relative mb-9 inline-flex">
              <div className="absolute inset-[-28px] rounded-full bg-[#F4D03F]/16 blur-2xl" />
              <Image
                src="/DNA.png"
                alt="DnA IT"
                width={210}
                height={86}
                priority
                className="relative h-auto w-44 md:w-56"
              />
            </div>
            <p className="mb-4 text-sm font-black tracking-[0.42em] text-[#F4D03F] drop-shadow-[0_0_18px_rgba(244,208,63,0.18)]">
              DnA IT × Commvault
            </p>
            <h1 className="registration-heading-shine max-w-3xl text-6xl font-black tracking-[-0.045em] sm:text-8xl">
              Gen AI Trivia Challenge
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-medium leading-9 text-slate-200/90">
              Register once, answer {QUESTION_COUNT} IT trivia questions, and
              race the clock for a spot on the booth leaderboard.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 text-sm font-bold text-slate-100">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F4D03F]/35 bg-black/35 px-5 py-2.5 shadow-[0_0_22px_rgba(244,208,63,0.1)] backdrop-blur">
                <span aria-hidden="true" className="text-[#F4D03F]">?</span>
                {QUESTION_COUNT} Questions
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F4D03F]/35 bg-black/35 px-5 py-2.5 shadow-[0_0_22px_rgba(244,208,63,0.1)] backdrop-blur">
                <span aria-hidden="true" className="text-[#F4D03F]">⏱</span>
                20 Seconds Per Question!
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F4D03F]/35 bg-black/35 px-5 py-2.5 shadow-[0_0_22px_rgba(244,208,63,0.1)] backdrop-blur">
                <span aria-hidden="true" className="text-[#F4D03F]">1</span>
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
