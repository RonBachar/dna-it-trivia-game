"use client";

import { useEffect } from "react";
import { brandConfettiColors, getJsConfetti } from "@/lib/confetti";
import type { Participant } from "@/types/db";

type InvitationScreenProps = {
  isVisible: boolean;
  topParticipant?: Participant | null;
};

export function InvitationScreen({
  isVisible,
  topParticipant,
}: InvitationScreenProps) {
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    let cancelled = false;

    void getJsConfetti().then((jsConfetti) => {
      if (cancelled) {
        return;
      }

      void jsConfetti.addConfetti({
        confettiColors: brandConfettiColors,
        confettiNumber: 150,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [isVisible]);

  return (
    <div className="flex h-full flex-col items-center justify-center px-10 py-8 text-center">
      {topParticipant?.full_name ? (
        <div className="mb-16">
          <p className="text-2xl font-black tracking-[0.35em] text-[#F4D03F] sm:text-3xl">
            🏆 THE WINNER IS
          </p>
          <p className="mt-6 text-6xl font-black tracking-tight text-white sm:text-7xl xl:text-8xl">
            {topParticipant.full_name}
          </p>
          <p className="mt-4 text-3xl font-bold text-[#F4D03F]/75 sm:text-4xl">
            {topParticipant.company}
          </p>
        </div>
      ) : null}
      <h2 className="invitation-heading-pulse text-7xl font-black tracking-tight text-[#F4D03F] sm:text-8xl xl:text-9xl">
        PLAY THE CHALLENGE
      </h2>
      <p className="mt-10 whitespace-nowrap text-4xl font-bold text-slate-200">
        Answer 7 questions. Beat the clock. Win prizes.
      </p>
      <p className="mt-14 whitespace-nowrap text-4xl font-black text-[#F4D03F]">
        Win Amazing Prizes
      </p>
      <p className="mt-16 flex items-center justify-center gap-5 text-3xl font-bold text-white sm:text-4xl">
        <span className="invitation-arrow-swing inline-block text-[#F4D03F]">
          ►
        </span>
        <span>Grab a tablet at our booth!!!</span>
        <span className="invitation-arrow-swing-reverse inline-block text-[#F4D03F]">
          ◄
        </span>
      </p>
      <p className="mt-20 text-xl font-bold tracking-[0.42em] text-[#F4D03F]/60 sm:text-2xl">
        DnA IT × Commvault
      </p>
    </div>
  );
}
