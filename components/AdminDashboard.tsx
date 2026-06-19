import Image from "next/image";
import Link from "next/link";
import { resetLeaderboardAction } from "@/app/admin/actions";
import { AdminParticipantForm } from "@/components/AdminParticipantForm";
import { AdminQuestionForm } from "@/components/AdminQuestionForm";
import { formatDuration } from "@/lib/ranking";
import type { Participant, Question } from "@/types/db";

type AdminDashboardProps = {
  questions: Question[];
  participants: Participant[];
  attempts: Participant[];
};

export function AdminDashboard({
  questions,
  participants,
  attempts,
}: AdminDashboardProps) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-4">
      <header className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/DNA.png"
              alt="DnA IT"
              width={120}
              height={50}
              className="h-auto w-24"
            />
            <p className="text-xs font-bold tracking-[0.3em] text-[#F4D03F]">
              DnA IT × Nutanix
            </p>
          </div>
          <h1 className="mt-1 text-3xl font-black text-white">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Manage booth questions, results, exports, and leaderboard resets.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/leaderboard"
            className="rounded-xl border border-white/15 px-3 py-2 text-xs font-black text-white hover:bg-white/10"
          >
            View leaderboard
          </Link>
          <a
            href="/api/admin/export"
            className="rounded-xl bg-[#F4D03F] px-3 py-2 text-xs font-black text-black hover:bg-[#f7dc6f]"
          >
            Export CSV
          </a>
          <a
            href="/api/admin/export-questions"
            className="rounded-xl border border-[#F4D03F]/40 bg-black/35 px-3 py-2 text-xs font-black text-[#F4D03F] hover:bg-[#F4D03F]/10"
          >
            Export Questions to CSV
          </a>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-xl border border-white/15 px-3 py-2 text-xs font-black text-white hover:bg-white/10">
              Log out
            </button>
          </form>
        </div>
      </header>

      <nav className="sticky top-0 z-20 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-slate-950/90 p-2 backdrop-blur">
        {[
          ["#questions", "Questions"],
          ["#participants", "Participants"],
          ["#results", "Results"],
          ["#reset", "Reset"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-xl px-3 py-2 text-xs font-black text-slate-200 hover:bg-white/10 hover:text-white"
          >
            {label}
          </a>
        ))}
      </nav>

      <section className="grid gap-3 md:grid-cols-3">
        <StatCard label="Questions" value={questions.length} />
        <StatCard label="Participants" value={participants.length} />
        <StatCard label="Finished attempts" value={attempts.length} />
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Add question</h2>
            <p className="text-xs text-slate-300">
              Four options are required. The correct answer is zero-based in the
              database but shown here as Option 1-4.
            </p>
          </div>
        </div>
        <AdminQuestionForm />
      </section>

      <section
        id="questions"
        className="scroll-mt-20 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
      >
        <h2 className="text-xl font-black text-white">Questions</h2>
        <p className="mt-1 text-xs text-slate-300">
          Click a question row to expand and edit it.
        </p>
        <div className="mt-3 grid gap-2">
          {questions.map((question) => (
            <AdminQuestionForm key={question.id} question={question} />
          ))}
          {questions.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
              No questions yet.
            </p>
          ) : null}
        </div>
      </section>

      <section
        id="participants"
        className="scroll-mt-20 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
      >
        <h2 className="text-xl font-black text-white">Participants</h2>
        <p className="mt-1 text-xs text-slate-300">
          Edit participant identity fields or delete a participant and their
          result.
        </p>
        <div className="mt-3 grid gap-3">
          {participants.map((participant) => (
            <AdminParticipantForm
              key={participant.id}
              participant={participant}
            />
          ))}
          {participants.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
              No participants yet.
            </p>
          ) : null}
        </div>
      </section>

      <section
        id="results"
        className="scroll-mt-20 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
      >
        <h2 className="text-xl font-black text-white">Attempts / Results</h2>
        <AdminTable
          columns={["Rank", "Name", "Company", "Score", "Duration", "Finished"]}
          empty="No finished attempts yet."
          rows={attempts.map((participant, index) => [
            `#${index + 1}`,
            participant.full_name,
            participant.company,
            `${participant.score}/5`,
            formatDuration(participant.duration_ms),
            participant.finished_at
              ? formatStableDateTime(participant.finished_at)
              : "-",
          ])}
        />
      </section>

      <section
        id="reset"
        className="scroll-mt-20 rounded-2xl border border-red-300/30 bg-red-500/10 p-4"
      >
        <h2 className="text-xl font-black text-white">Reset leaderboard</h2>
        <p className="mt-1 max-w-3xl text-xs leading-5 text-red-100">
          This deletes all participants and answer records. Questions are kept.
          Use this when the booth team wants to start a fresh contest.
        </p>
        <details className="mt-3 rounded-xl border border-red-300/30 bg-slate-950/60 p-3">
          <summary className="cursor-pointer text-xs font-black text-red-100">
            I understand. Show reset confirmation.
          </summary>
          <form action={resetLeaderboardAction} className="mt-3">
            <button className="rounded-xl bg-red-400 px-4 py-2 text-xs font-black text-slate-950 hover:bg-red-300">
              Confirm reset leaderboard
            </button>
          </form>
        </details>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function AdminTable({
  columns,
  rows,
  empty,
}: {
  columns: string[];
  rows: string[][];
  empty: string;
}) {
  if (rows.length === 0) {
    return (
      <p className="mt-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
        {empty}
      </p>
    );
  }

  return (
    <div className="mt-3 overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="border-b border-[#F4D03F]/40 bg-[#F4D03F]/15 text-[#F4D03F]">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-3 py-2 text-xs font-black">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.join("-")} className="border-t border-white/10">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className="bg-slate-950/60 px-3 py-2 text-xs text-slate-200"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatStableDateTime(value: string) {
  return `${new Date(value).toISOString().slice(0, 19).replace("T", " ")} UTC`;
}
