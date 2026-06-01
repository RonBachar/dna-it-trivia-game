import type { Participant, Question } from "@/types/db";
import { createParticipantKey, normalizeText } from "@/lib/normalize";
import { getSupabaseAdmin } from "@/lib/supabase";

export const QUESTION_COUNT = 7;
export const QUESTION_DURATION_MS = 20_000;
export const QUIZ_DURATION_MS = QUESTION_COUNT * QUESTION_DURATION_MS;

function shuffle<T>(items: T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

export async function startQuiz(fullName: string, company: string) {
  const supabase = getSupabaseAdmin();
  const participantKey = createParticipantKey(fullName, company);

  const { data: existing, error: existingError } = await supabase
    .from("participants")
    .select("id")
    .eq("participant_key", participantKey)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    return {
      ok: false as const,
      status: 409,
      message: "You are already registered for this trivia game.",
    };
  }

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("*")
    .eq("is_active", true);

  if (questionsError) {
    throw questionsError;
  }

  if (!questions || questions.length < QUESTION_COUNT) {
    return {
      ok: false as const,
      status: 400,
      message: "The quiz is not ready yet. Please ask the booth team to add questions.",
    };
  }

  const selectedQuestionIds = shuffle(questions)
    .slice(0, QUESTION_COUNT)
    .map((question) => question.id);

  const { data: participant, error: insertError } = await supabase
    .from("participants")
    .insert({
      full_name: fullName,
      company,
      normalized_full_name: normalizeText(fullName),
      normalized_company: normalizeText(company),
      participant_key: participantKey,
      quiz_question_ids: selectedQuestionIds,
      started_at: new Date().toISOString(),
      finished_at: null,
      score: 0,
      duration_ms: null,
    })
    .select("*")
    .single();

  if (insertError) {
    if (insertError.code === "23505") {
      return {
        ok: false as const,
        status: 409,
        message: "You are already registered for this trivia game.",
      };
    }

    throw insertError;
  }

  return { ok: true as const, participant };
}

export async function getQuizForParticipant(participantId: string) {
  const supabase = getSupabaseAdmin();
  const { data: participant, error: participantError } = await supabase
    .from("participants")
    .select("*")
    .eq("id", participantId)
    .maybeSingle();

  if (participantError) {
    throw participantError;
  }

  if (!participant) {
    return null;
  }

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("id,prompt,options,correct_index,is_active,created_at,updated_at")
    .in("id", participant.quiz_question_ids);

  if (questionsError) {
    throw questionsError;
  }

  const sortedQuestions = participant.quiz_question_ids
    .map((questionId) => questions?.find((question) => question.id === questionId))
    .filter(Boolean) as Question[];

  return { participant, questions: sortedQuestions };
}

export async function submitQuiz(
  participantId: string,
  submittedAnswers: Record<string, number | null>,
  durationMs: number,
) {
  const supabase = getSupabaseAdmin();
  const quiz = await getQuizForParticipant(participantId);

  if (!quiz) {
    return null;
  }

  const { participant, questions } = quiz;

  if (participant.finished_at) {
    return participant;
  }

  const allowedQuestionIds = new Set(participant.quiz_question_ids);
  const answerRows = questions.map((question) => {
    const selectedIndex = allowedQuestionIds.has(question.id)
      ? submittedAnswers[question.id] ?? null
      : null;

    return {
      participant_id: participant.id,
      question_id: question.id,
      selected_index: selectedIndex,
      is_correct: selectedIndex === question.correct_index,
    };
  });

  const score = answerRows.filter((answer) => answer.is_correct).length;
  const now = new Date();
  const cappedDurationMs = Math.min(Math.max(durationMs, 0), QUIZ_DURATION_MS);

  const { error: answersError } = await supabase.from("answers").insert(answerRows);

  if (answersError && answersError.code !== "23505") {
    throw answersError;
  }

  const { data: updated, error: updateError } = await supabase
    .from("participants")
    .update({
      score,
      duration_ms: cappedDurationMs,
      finished_at: now.toISOString(),
    })
    .eq("id", participant.id)
    .is("finished_at", null)
    .select("*")
    .maybeSingle();

  if (updateError) {
    throw updateError;
  }

  if (updated) {
    return updated;
  }

  const { data: finished, error: finishedError } = await supabase
    .from("participants")
    .select("*")
    .eq("id", participant.id)
    .single();

  if (finishedError) {
    throw finishedError;
  }

  return finished;
}

export async function getRank(participant: Participant) {
  if (!participant.finished_at || participant.score === 0) {
    return null;
  }

  const supabase = getSupabaseAdmin();
  const { data: participants, error } = await supabase
    .from("participants")
    .select("*")
    .not("finished_at", "is", null)
    .gt("score", 0)
    .order("score", { ascending: false })
    .order("duration_ms", { ascending: true })
    .order("finished_at", { ascending: true });

  if (error) {
    throw error;
  }

  const rankIndex = participants?.findIndex((row) => row.id === participant.id) ?? -1;
  return rankIndex === -1 ? null : rankIndex + 1;
}
