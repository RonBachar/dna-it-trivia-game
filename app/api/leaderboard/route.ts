import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("participants")
      .select("*")
      .not("finished_at", "is", null)
      .gt("score", 0)
      .order("score", { ascending: false })
      .order("duration_ms", { ascending: true })
      .order("finished_at", { ascending: true })
      .limit(10);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      participants: data ?? [],
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Could not load leaderboard." },
      { status: 500 },
    );
  }
}
