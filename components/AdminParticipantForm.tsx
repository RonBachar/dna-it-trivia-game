"use client";

import { useActionState } from "react";
import {
  deleteParticipantAction,
  updateParticipantAction,
  type ParticipantActionState,
} from "@/app/admin/actions";
import { formatDuration } from "@/lib/ranking";
import type { Participant } from "@/types/db";

type AdminParticipantFormProps = {
  participant: Participant;
};

const initialState: ParticipantActionState = {
  type: "idle",
  message: "",
};

export function AdminParticipantForm({
  participant,
}: AdminParticipantFormProps) {
  const [updateState, updateAction, isUpdating] = useActionState(
    updateParticipantAction,
    initialState,
  );
  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteParticipantAction,
    initialState,
  );

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
      <form action={updateAction} className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
        <input type="hidden" name="id" value={participant.id} />

        <label className="text-xs font-bold text-slate-100">
          Full name
          <input
            name="fullName"
            required
            minLength={2}
            maxLength={80}
            defaultValue={participant.full_name}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-[#F4D03F] focus:ring-4 focus:ring-[#F4D03F]/20"
          />
        </label>

        <label className="text-xs font-bold text-slate-100">
          Company
          <input
            name="company"
            required
            minLength={2}
            maxLength={80}
            defaultValue={participant.company}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-[#F4D03F] focus:ring-4 focus:ring-[#F4D03F]/20"
          />
        </label>

        <div className="flex items-end">
          <button
            disabled={isUpdating}
            className="w-full rounded-xl bg-[#F4D03F] px-4 py-2 text-xs font-black text-black hover:bg-[#f7dc6f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      <div className="mt-3 grid gap-2 text-xs text-slate-300 md:grid-cols-4">
        <Info label="Status" value={participant.finished_at ? "Finished" : "In progress"} />
        <Info label="Score" value={`${participant.score}/5`} />
        <Info label="Duration" value={formatDuration(participant.duration_ms)} />
        <Info
          label="Started"
          value={formatStableDateTime(participant.started_at)}
        />
      </div>

      {updateState.message ? (
        <p
          className={`mt-3 rounded-xl border px-3 py-2 text-xs font-semibold ${
            updateState.type === "error"
              ? "border-red-300/30 bg-red-500/15 text-red-100"
              : "border-emerald-300/30 bg-emerald-500/15 text-emerald-100"
          }`}
        >
          {updateState.message}
        </p>
      ) : null}

      <details className="mt-3 rounded-xl border border-red-300/30 bg-red-500/10 p-3">
        <summary className="cursor-pointer text-xs font-black text-red-100">
          Delete participant
        </summary>
        <p className="mt-2 text-xs leading-5 text-red-100">
          This removes {participant.full_name} and their answers/result from the
          leaderboard.
        </p>
        <form action={deleteAction} className="mt-3">
          <input type="hidden" name="id" value={participant.id} />
          <button
            disabled={isDeleting}
            className="rounded-xl bg-red-400 px-4 py-2 text-xs font-black text-slate-950 hover:bg-red-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Confirm delete participant"}
          </button>
        </form>
        {deleteState.message ? (
          <p
            className={`mt-3 rounded-xl border px-3 py-2 text-xs font-semibold ${
              deleteState.type === "error"
                ? "border-red-300/30 bg-red-500/15 text-red-100"
                : "border-emerald-300/30 bg-emerald-500/15 text-emerald-100"
            }`}
          >
            {deleteState.message}
          </p>
        ) : null}
      </details>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-0.5 font-semibold text-slate-200">{value}</p>
    </div>
  );
}

function formatStableDateTime(value: string) {
  return `${new Date(value).toISOString().slice(0, 19).replace("T", " ")} UTC`;
}
