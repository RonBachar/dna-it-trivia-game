import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { participantsToCsv } from "@/lib/csv";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("participants")
    .select("*")
    .not("finished_at", "is", null)
    .order("score", { ascending: false })
    .order("duration_ms", { ascending: true })
    .order("finished_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      { message: "Could not export attempts." },
      { status: 500 },
    );
  }

  const csv = `\uFEFF${participantsToCsv(data ?? [])}`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dna-it-commvault-attempts-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
