"use client";

import { useActionState } from "react";
import {
  addQuestionAction,
  deleteQuestionAction,
  updateQuestionAction,
  type QuestionActionState,
} from "@/app/admin/actions";
import type { Question } from "@/types/db";

type AdminQuestionFormProps = {
  question?: Question;
};

const initialQuestionState: QuestionActionState = {
  type: "idle",
  message: "",
};

export function AdminQuestionForm({ question }: AdminQuestionFormProps) {
  const [updateState, updateAction, isUpdating] = useActionState(
    updateQuestionAction,
    initialQuestionState,
  );

  if (question) {
    const displayedQuestion = updateState.question ?? question;
    const fieldKey = [
      displayedQuestion.id,
      displayedQuestion.updated_at,
      displayedQuestion.prompt,
      displayedQuestion.correct_index,
      displayedQuestion.is_active,
      displayedQuestion.options.join("|"),
    ].join(":");

    return (
      <div className="rounded-2xl border border-white/10 bg-slate-950/70">
        <div className="flex items-start gap-2 p-3">
          <details className="min-w-0 flex-1">
            <summary className="cursor-pointer list-none text-sm font-bold leading-6 text-white marker:hidden">
              <span className="mr-2 text-[#F4D03F]">Edit</span>
              {displayedQuestion.prompt}
              {!displayedQuestion.is_active ? (
                <span className="ml-2 rounded-full border border-yellow-300/30 px-2 py-0.5 text-xs text-yellow-100">
                  inactive
                </span>
              ) : null}
            </summary>
            <form
              action={updateAction}
              className="mt-3 border-t border-white/10 pt-3"
            >
              <input type="hidden" name="id" value={displayedQuestion.id} />
              <QuestionFields key={fieldKey} question={displayedQuestion} />
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="rounded-xl bg-[#F4D03F] px-4 py-2 text-xs font-black text-black hover:bg-[#f7dc6f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdating ? "Saving..." : "Save question"}
                </button>
                {updateState.message ? (
                  <p
                    className={`text-xs font-bold ${
                      updateState.type === "error"
                        ? "text-red-100"
                        : "text-[#F4D03F]"
                    }`}
                  >
                    {updateState.message}
                  </p>
                ) : null}
              </div>
            </form>
          </details>

          <details className="shrink-0">
            <summary className="cursor-pointer list-none rounded-xl border border-red-300/40 px-3 py-2 text-xs font-black text-red-100 hover:bg-red-500/15 marker:hidden">
              Delete
            </summary>
            <div className="absolute right-6 z-10 mt-2 w-72 rounded-2xl border border-red-300/30 bg-slate-950 p-4 shadow-2xl shadow-black/40">
              <p className="text-sm leading-6 text-red-100">
                Permanently delete this question?
              </p>
              <form action={deleteQuestionAction} className="mt-3">
                <input type="hidden" name="id" value={displayedQuestion.id} />
                <button className="rounded-xl bg-red-400 px-4 py-2 text-xs font-black text-slate-950 hover:bg-red-300">
                  Confirm delete
                </button>
              </form>
            </div>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
      <form action={addQuestionAction}>
        <QuestionFields />
        <button
          type="submit"
          className="mt-4 rounded-2xl bg-[#F4D03F] px-5 py-3 text-sm font-black text-black hover:bg-[#f7dc6f]"
        >
          Add question
        </button>
      </form>
    </div>
  );
}

function QuestionFields({ question }: { question?: Question }) {
  return (
    <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-slate-100">
          Prompt
          <textarea
            name="prompt"
            required
            minLength={5}
            maxLength={500}
            defaultValue={question?.prompt ?? ""}
            className="mt-1 min-h-16 w-full rounded-xl border border-white/10 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-[#F4D03F] focus:ring-4 focus:ring-[#F4D03F]/20"
            placeholder="Question prompt"
          />
        </label>

        <div className="grid gap-2 md:grid-cols-2">
          {[0, 1, 2, 3].map((index) => (
            <label key={index} className="text-sm font-bold text-slate-100">
              Option {index + 1}
              <input
                name={`option-${index}`}
                required
                maxLength={200}
                defaultValue={question?.options[index] ?? ""}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-[#F4D03F] focus:ring-4 focus:ring-[#F4D03F]/20"
              />
            </label>
          ))}
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-100">
            Correct answer
            <select
              name="correctIndex"
              defaultValue={question?.correct_index ?? 0}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-[#F4D03F] focus:ring-4 focus:ring-[#F4D03F]/20"
            >
              {[0, 1, 2, 3].map((index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 self-end rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-slate-100">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={question?.is_active ?? true}
              className="h-5 w-5 accent-[#F4D03F]"
            />
            Active question
          </label>
        </div>
    </div>
  );
}
