"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin";
import { createParticipantKey, normalizeText } from "@/lib/normalize";
import { getSupabaseAdmin } from "@/lib/supabase";
import { validateParticipant, validateQuestion } from "@/lib/validation";
import type { Question } from "@/types/db";

export type ParticipantActionState = {
  type: "idle" | "success" | "error";
  message: string;
};

export type QuestionActionState = {
  type: "idle" | "success" | "error";
  message: string;
  question?: Question;
};

function getQuestionId(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Missing question id.");
  }

  return id;
}

function getParticipantId(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Missing participant id.");
  }

  return id;
}

export async function addQuestionAction(formData: FormData) {
  await requireAdminSession();

  const validation = validateQuestion(formData);

  if (!validation.ok) {
    throw new Error(validation.message);
  }

  const { prompt, options, correctIndex, isActive } = validation.value;
  const { error } = await getSupabaseAdmin().from("questions").insert({
    prompt,
    options,
    correct_index: correctIndex,
    is_active: isActive,
  });

  if (error) {
    throw error;
  }

  revalidatePath("/admin");
}

export async function updateQuestionAction(
  _previousState: QuestionActionState,
  formData: FormData,
): Promise<QuestionActionState> {
  await requireAdminSession();

  const id = getQuestionId(formData);
  const validation = validateQuestion(formData);

  if (!validation.ok) {
    return { type: "error", message: validation.message };
  }

  const { prompt, options, correctIndex, isActive } = validation.value;
  const { data: savedQuestion, error } = await getSupabaseAdmin()
    .from("questions")
    .update({
      prompt,
      options,
      correct_index: correctIndex,
      is_active: isActive,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return { type: "error", message: "Could not save question." };
  }

  revalidatePath("/admin");

  return {
    type: "success",
    message: "Saved.",
    question: savedQuestion,
  };
}

export async function deleteQuestionAction(formData: FormData) {
  await requireAdminSession();

  const id = getQuestionId(formData);
  const supabase = getSupabaseAdmin();
  const { error: answersError } = await supabase
    .from("answers")
    .delete()
    .eq("question_id", id);

  if (answersError) {
    throw answersError;
  }

  const { error: questionError } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);

  if (questionError) {
    throw questionError;
  }

  revalidatePath("/admin");
}

export async function resetLeaderboardAction() {
  await requireAdminSession();

  const supabase = getSupabaseAdmin();
  const { error: answersError } = await supabase
    .from("answers")
    .delete()
    .not("id", "is", null);

  if (answersError) {
    throw answersError;
  }

  const { error: participantsError } = await supabase
    .from("participants")
    .delete()
    .not("id", "is", null);

  if (participantsError) {
    throw participantsError;
  }

  revalidatePath("/admin");
  revalidatePath("/leaderboard");
}

export async function updateParticipantAction(
  _previousState: ParticipantActionState,
  formData: FormData,
): Promise<ParticipantActionState> {
  await requireAdminSession();

  const id = getParticipantId(formData);
  const validation = validateParticipant({
    fullName: formData.get("fullName"),
    company: formData.get("company"),
  });

  if (!validation.ok) {
    return { type: "error", message: validation.message };
  }

  const { fullName, company } = validation.value;
  const normalizedFullName = normalizeText(fullName);
  const normalizedCompany = normalizeText(company);
  const participantKey = createParticipantKey(fullName, company);
  const supabase = getSupabaseAdmin();

  const { data: duplicate, error: duplicateError } = await supabase
    .from("participants")
    .select("id")
    .eq("participant_key", participantKey)
    .neq("id", id)
    .maybeSingle();

  if (duplicateError) {
    throw duplicateError;
  }

  if (duplicate) {
    return {
      type: "error",
      message: "Another participant already exists with this name and company.",
    };
  }

  const { error } = await supabase
    .from("participants")
    .update({
      full_name: fullName,
      company,
      normalized_full_name: normalizedFullName,
      normalized_company: normalizedCompany,
      participant_key: participantKey,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return {
        type: "error",
        message: "Another participant already exists with this name and company.",
      };
    }

    throw error;
  }

  revalidatePath("/admin");
  revalidatePath("/leaderboard");

  return { type: "success", message: "Participant updated." };
}

export async function deleteParticipantAction(
  _previousState: ParticipantActionState,
  formData: FormData,
): Promise<ParticipantActionState> {
  await requireAdminSession();

  const id = getParticipantId(formData);
  const { error } = await getSupabaseAdmin()
    .from("participants")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/admin");
  revalidatePath("/leaderboard");

  return { type: "success", message: "Participant and attempt deleted." };
}
