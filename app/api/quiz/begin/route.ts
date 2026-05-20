import { NextResponse } from "next/server";
import {
  getParticipantIdFromCookie,
  getQuizBeginFromCookie,
  setQuizBeginCookie,
} from "@/lib/admin";
import { getQuizForParticipant } from "@/lib/quiz";

export async function POST() {
  try {
    const participantId = await getParticipantIdFromCookie();

    if (!participantId) {
      return NextResponse.json(
        { message: "Please register before starting the quiz." },
        { status: 401 },
      );
    }

    const quiz = await getQuizForParticipant(participantId);

    if (!quiz) {
      return NextResponse.json(
        { message: "Quiz session was not found." },
        { status: 404 },
      );
    }

    if (quiz.participant.finished_at) {
      return NextResponse.json(
        { message: "This quiz has already been submitted." },
        { status: 409 },
      );
    }

    const existingStartedAtMs = await getQuizBeginFromCookie(participantId);
    const startedAtMs = existingStartedAtMs ?? Date.now();
    const response = NextResponse.json({ startedAtMs });

    if (!existingStartedAtMs) {
      setQuizBeginCookie(response, participantId, startedAtMs);
    }

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unexpected error while starting the quiz." },
      { status: 500 },
    );
  }
}
