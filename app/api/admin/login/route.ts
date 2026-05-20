import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/admin";

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { message: "Admin password is not configured." },
      { status: 500 },
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { message: "Incorrect admin password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  setAdminCookie(response);
  return response;
}
