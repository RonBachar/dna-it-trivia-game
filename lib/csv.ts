import type { Participant } from "@/types/db";
import { formatDuration } from "@/lib/ranking";

function escapeCsv(value: string | number | null) {
  const raw = value === null ? "" : String(value);

  if (!/[",\n\r]/.test(raw)) {
    return raw;
  }

  return `"${raw.replace(/"/g, '""')}"`;
}

export function participantsToCsv(participants: Participant[]) {
  const rows = [
    [
      "Rank",
      "Full name",
      "Company",
      "Score",
      "Duration",
      "Finished at",
    ],
    ...participants.map((participant, index) => [
      index + 1,
      participant.full_name,
      participant.company,
      participant.score,
      formatDuration(participant.duration_ms),
      participant.finished_at,
    ]),
  ];

  return rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
}
