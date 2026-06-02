"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/quiz/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.get("fullName"),
        company: formData.get("company"),
      }),
    });

    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setError(payload.message ?? "Could not start the quiz.");
      setIsSubmitting(false);
      return;
    }

    router.push("/quiz");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#F4D03F]/25 bg-black/45 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.55),0_0_42px_rgba(244,208,63,0.1)] backdrop-blur-xl md:p-8"
    >
      <h2 className="text-3xl font-black tracking-tight text-white">
        Join the challenge now!
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        Use your real full name and company. Each participant can compete once.
      </p>

      <label className="mt-6 block text-sm font-bold text-slate-100">
        Full name
        <input
          name="fullName"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-base text-slate-950 outline-none focus:border-[#F4D03F] focus:ring-4 focus:ring-[#F4D03F]/20"
          placeholder="What's your name?"
        />
      </label>

      <label className="mt-4 block text-sm font-bold text-slate-100">
        Company
        <input
          name="company"
          required
          minLength={2}
          maxLength={80}
          autoComplete="organization"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-base text-slate-950 outline-none focus:border-[#F4D03F] focus:ring-4 focus:ring-[#F4D03F]/20"
          placeholder="Company Name"
        />
      </label>

      {error ? (
        <p className="mt-4 rounded-2xl border border-red-300/30 bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-100">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-2xl border border-[#fff4a3]/50 bg-[#F4D03F] px-5 py-4 text-base font-black text-black shadow-[0_14px_34px_rgba(244,208,63,0.28),inset_0_1px_0_rgba(255,255,255,0.55)] hover:bg-[#ffe16a] hover:shadow-[0_18px_44px_rgba(244,208,63,0.42),inset_0_1px_0_rgba(255,255,255,0.65)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Starting..." : "Start quiz"}
      </button>
    </form>
  );
}
