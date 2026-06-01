"use client";

import { useEffect } from "react";
import { brandConfettiColors, getJsConfetti } from "@/lib/confetti";
import { QUESTION_COUNT } from "@/lib/quiz";

type ResultCelebrationProps = {
  score: number;
};

export function ResultCelebration({ score }: ResultCelebrationProps) {
  useEffect(() => {
    if (score < 4) {
      return;
    }

    let isCancelled = false;

    void getJsConfetti().then((jsConfetti) => {
      if (isCancelled) {
        return;
      }

      void jsConfetti.addConfetti({
        confettiColors: brandConfettiColors,
        confettiNumber: score === QUESTION_COUNT ? 220 : 80,
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [score]);

  return null;
}
