import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE = "dna_admin";
export const PARTICIPANT_COOKIE = "dna_participant";
export const QUIZ_BEGIN_COOKIE = "dna_quiz_begin";

function getCookieSecret() {
  const secret = process.env.ADMIN_COOKIE_SECRET;

  if (!secret) {
    throw new Error("Missing required environment variable: ADMIN_COOKIE_SECRET");
  }

  return secret;
}

function sign(value: string) {
  return crypto
    .createHmac("sha256", getCookieSecret())
    .update(value)
    .digest("base64url");
}

export function signCookieValue(value: string) {
  return `${value}.${sign(value)}`;
}

export function verifyCookieValue(signedValue: string | undefined) {
  if (!signedValue) {
    return null;
  }

  const separator = signedValue.lastIndexOf(".");

  if (separator === -1) {
    return null;
  }

  const value = signedValue.slice(0, separator);
  const signature = signedValue.slice(separator + 1);
  const expected = sign(value);

  if (signature.length !== expected.length) {
    return null;
  }

  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (!crypto.timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  return value;
}

export async function isAdminSession() {
  const cookieStore = await cookies();
  return verifyCookieValue(cookieStore.get(ADMIN_COOKIE)?.value) === "admin";
}

export async function requireAdminSession() {
  const isAdmin = await isAdminSession();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }
}

export function isAdminRequest(request: NextRequest) {
  return verifyCookieValue(request.cookies.get(ADMIN_COOKIE)?.value) === "admin";
}

export function setAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, signCookieValue("admin"), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function setParticipantCookie(response: NextResponse, participantId: string) {
  response.cookies.set(PARTICIPANT_COOKIE, signCookieValue(participantId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 4,
  });
}

export async function getParticipantIdFromCookie() {
  const cookieStore = await cookies();
  return verifyCookieValue(cookieStore.get(PARTICIPANT_COOKIE)?.value);
}

export function setQuizBeginCookie(
  response: NextResponse,
  participantId: string,
  startedAtMs: number,
) {
  response.cookies.set(
    QUIZ_BEGIN_COOKIE,
    signCookieValue(`${participantId}:${startedAtMs}`),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
    },
  );
}

export async function getQuizBeginFromCookie(participantId: string) {
  const cookieStore = await cookies();
  const value = verifyCookieValue(cookieStore.get(QUIZ_BEGIN_COOKIE)?.value);

  if (!value) {
    return null;
  }

  const [cookieParticipantId, startedAtMs] = value.split(":");

  if (cookieParticipantId !== participantId) {
    return null;
  }

  const parsedStartedAtMs = Number(startedAtMs);

  if (!Number.isFinite(parsedStartedAtMs)) {
    return null;
  }

  return parsedStartedAtMs;
}
