import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function csvEscape(value: string) {
  const needsQuotes = /[",\n\r]/.test(value);
  const escaped = value.replaceAll('"', '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

function questionsToCsv(
  questions: Array<{
    prompt: string;
    options: string[];
    correct_index: number;
  }>,
) {
  const header = [
    "Question",
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Correct Answer",
  ].join(",");

  const rows = questions.map((question) => {
    const options = question.options ?? [];
    const correctAnswer = String((question.correct_index ?? 0) + 1);

    return [
      csvEscape(question.prompt ?? ""),
      csvEscape(options[0] ?? ""),
      csvEscape(options[1] ?? ""),
      csvEscape(options[2] ?? ""),
      csvEscape(options[3] ?? ""),
      csvEscape(correctAnswer),
    ].join(",");
  });

  return `${header}\n${rows.join("\n")}\n`;
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("questions")
    .select("*")
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json(
      { message: "Could not export questions." },
      { status: 500 },
    );
  }

  const csv = `\uFEFF${questionsToCsv(
    (data ?? []).map((question) => ({
      prompt: question.prompt,
      options: question.options,
      correct_index: question.correct_index,
    })),
  )}`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="questions_export_${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}

