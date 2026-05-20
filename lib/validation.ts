export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

export function validateParticipant(input: unknown): ValidationResult<{
  fullName: string;
  company: string;
}> {
  const data = input as Record<string, unknown>;
  const fullName = String(data.fullName ?? "").trim().replace(/\s+/g, " ");
  const company = String(data.company ?? "").trim().replace(/\s+/g, " ");

  if (fullName.length < 2 || fullName.length > 80) {
    return { ok: false, message: "Please enter your full name." };
  }

  if (company.length < 2 || company.length > 80) {
    return { ok: false, message: "Please enter your company." };
  }

  return { ok: true, value: { fullName, company } };
}

export function validateQuestion(input: FormData): ValidationResult<{
  prompt: string;
  options: string[];
  correctIndex: number;
  isActive: boolean;
}> {
  const prompt = String(input.get("prompt") ?? "").trim();
  const options = [0, 1, 2, 3].map((index) =>
    String(input.get(`option-${index}`) ?? "").trim(),
  );
  const correctIndex = Number(input.get("correctIndex"));
  const isActive = input.get("isActive") === "on";

  if (prompt.length < 5 || prompt.length > 500) {
    return { ok: false, message: "Question prompt must be 5-500 characters." };
  }

  if (options.some((option) => option.length < 1 || option.length > 200)) {
    return { ok: false, message: "All four options are required." };
  }

  if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) {
    return { ok: false, message: "Choose the correct answer." };
  }

  return { ok: true, value: { prompt, options, correctIndex, isActive } };
}

export function parseSubmittedAnswers(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }

  const answers = (input as Record<string, unknown>).answers;

  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return null;
  }

  const parsed: Record<string, number | null> = {};

  for (const [questionId, selectedIndex] of Object.entries(answers)) {
    if (selectedIndex === null) {
      parsed[questionId] = null;
      continue;
    }

    const index = Number(selectedIndex);

    if (!Number.isInteger(index) || index < 0 || index > 3) {
      return null;
    }

    parsed[questionId] = index;
  }

  return parsed;
}

export function parseQuizSubmission(input: unknown) {
  const answers = parseSubmittedAnswers(input);

  if (!answers || !input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }

  const measuredDurationMs = (input as Record<string, unknown>).measuredDurationMs;

  if (measuredDurationMs !== null && measuredDurationMs !== undefined) {
    const duration = Number(measuredDurationMs);

    if (!Number.isFinite(duration) || duration < 0) {
      return null;
    }

    return { answers, measuredDurationMs: duration };
  }

  return { answers, measuredDurationMs: null };
}
