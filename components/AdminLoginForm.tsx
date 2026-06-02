"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: formData.get("password") }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
      };
      setError(payload.message ?? "Login failed.");
      setIsSubmitting(false);
      return;
    }

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.08] p-8 shadow-2xl shadow-black/30 backdrop-blur"
    >
      <Image
        src="/DNA.png"
        alt="DnA IT"
        width={145}
        height={60}
        className="mb-6 h-auto w-32"
      />
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#F4D03F]">
        Admin
      </p>
      <h1 className="mt-3 text-4xl font-black text-white">DnA Team Login</h1>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        Enter the booth admin password to manage questions and results.
      </p>

      <label className="mt-6 block text-sm font-bold text-slate-100">
        Password
        <input
          name="password"
          type="password"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-base text-slate-950 outline-none focus:border-[#F4D03F] focus:ring-4 focus:ring-[#F4D03F]/20"
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
        className="mt-6 w-full rounded-2xl bg-[#F4D03F] px-5 py-4 text-base font-black text-black hover:bg-[#f7dc6f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Checking..." : "Log in"}
      </button>
    </form>
  );
}
