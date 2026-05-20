"use client";

import { useEffect, useRef, useState } from "react";

type TimerProps = {
  durationMs: number;
  timerKey: string | number;
  onExpire: () => void;
};

export function Timer({ durationMs, timerKey, onExpire }: TimerProps) {
  const [remainingMs, setRemainingMs] = useState(durationMs);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const startedAtMs = Date.now();

    const interval = window.setInterval(() => {
      const nextRemaining = Math.max(
        durationMs - (Date.now() - startedAtMs),
        0,
      );

      setRemainingMs(nextRemaining);

      if (nextRemaining === 0) {
        window.clearInterval(interval);
        onExpireRef.current();
      }
    }, 250);

    return () => window.clearInterval(interval);
  }, [durationMs, timerKey]);

  const seconds = Math.ceil(remainingMs / 1000);

  return (
    <div className="rounded-3xl border border-[#F4D03F]/40 bg-[#F4D03F]/10 px-5 py-4 text-center shadow-[0_0_24px_rgba(244,208,63,0.14)]">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F4D03F]">
        Time left
      </p>
      <p className="text-5xl font-black tabular-nums text-white">{seconds}s</p>
    </div>
  );
}
