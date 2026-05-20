import type { Participant } from "@/types/db";

export function compareRank(a: Participant, b: Participant) {
  if (b.score !== a.score) {
    return b.score - a.score;
  }

  const aDuration = a.duration_ms ?? Number.MAX_SAFE_INTEGER;
  const bDuration = b.duration_ms ?? Number.MAX_SAFE_INTEGER;

  if (aDuration !== bDuration) {
    return aDuration - bDuration;
  }

  return (
    new Date(a.finished_at ?? 0).getTime() -
    new Date(b.finished_at ?? 0).getTime()
  );
}

export function formatDuration(durationMs: number | null) {
  if (durationMs === null) {
    return "-";
  }

  const seconds = Math.max(0, Math.round(durationMs / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
