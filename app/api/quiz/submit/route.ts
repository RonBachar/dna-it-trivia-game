import { NextResponse } from "next/server";
import {
  getParticipantIdFromCookie,
  getQuizBeginFromCookie,
} from "@/lib/admin";
import { QUIZ_DURATION_MS, submitQuiz } from "@/lib/quiz";
import { parseQuizSubmission } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const participantId = await getParticipantIdFromCookie();

    if (!participantId) {
      return NextResponse.json(
        { message: "Please register before submitting a quiz." },
        { status: 401 },
      );
    }

    const submission = parseQuizSubmission(await request.json());

    if (!submission) {
      return NextResponse.json(
        { message: "Submitted answers are invalid." },
        { status: 400 },
      );
    }

    const quizStartedAtMs = await getQuizBeginFromCookie(participantId);

    if (!quizStartedAtMs) {
      return NextResponse.json(
        { message: "Quiz timer was not started." },
        { status: 400 },
      );
    }

    const serverDurationMs = Math.min(
      Math.max(Date.now() - quizStartedAtMs, 0),
      QUIZ_DURATION_MS,
    );
    const participant = await submitQuiz(
      participantId,
      submission.answers,
      serverDurationMs,
    );

    if (!participant) {
      return NextResponse.json(
        { message: "Quiz session was not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unexpected error while submitting the quiz." },
      { status: 500 },
    );
  }
}
