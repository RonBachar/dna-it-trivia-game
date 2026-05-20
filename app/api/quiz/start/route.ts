import { NextResponse } from "next/server";
import { setParticipantCookie } from "@/lib/admin";
import { startQuiz } from "@/lib/quiz";
import { validateParticipant } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const validation = validateParticipant(await request.json());

    if (!validation.ok) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 },
      );
    }

    const result = await startQuiz(
      validation.value.fullName,
      validation.value.company,
    );

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    const response = NextResponse.json({ ok: true });
    setParticipantCookie(response, result.participant.id);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unexpected error while starting the quiz." },
      { status: 500 },
    );
  }
}
