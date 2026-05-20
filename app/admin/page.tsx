import { AdminDashboard } from "@/components/AdminDashboard";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { isAdminSession } from "@/lib/admin";
import { compareRank } from "@/lib/ranking";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAdmin = await isAdminSession();

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(244,208,63,0.16),_transparent_35%),linear-gradient(135deg,_#000000,_#111111)] px-6 py-10">
        <AdminLoginForm />
      </main>
    );
  }

  const supabase = getSupabaseAdmin();
  const [{ data: questions, error: questionsError }, { data: participants, error: participantsError }] =
    await Promise.all([
      supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: true })
        .order("id", { ascending: true }),
      supabase
        .from("participants")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

  if (questionsError) {
    throw questionsError;
  }

  if (participantsError) {
    throw participantsError;
  }

  const participantRows = participants ?? [];
  const attempts = participantRows
    .filter((participant) => participant.finished_at)
    .sort(compareRank);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(244,208,63,0.14),_transparent_35%),linear-gradient(135deg,_#000000,_#111111)]">
      <AdminDashboard
        questions={questions ?? []}
        participants={participantRows}
        attempts={attempts}
      />
    </main>
  );
}
