"use client";

import React, { useState } from "react";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // Navigations
  const router = useRouter();

  // FORM Input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Submit Button callback
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // call api
    try {
      // request object
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Something went wrong. Please try again later");
        return;
      }

      await router.push("/personal");
    } catch (error) {
      setError("Network Error. Please try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(56_250_91/0.1),transparent_70%)]"
      />
      <div className="relative flex flex-col gap-7 rounded-3xl border border-white/8 bg-(--bg-surface-container-low)/80 backdrop-blur-xl p-8 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-(--text-secondary)/70">
            Log in to pick up where you left off.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-1.5">
            <Label name="Email" className="text-white/40 text-xs" />
            <Input
              icon={MdOutlineEmail}
              type="email"
              id="email"
              name="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border border-white/8 bg-(--bg-main)/60 placeholder:text-white/25 focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label name="Password" className="text-white/40 text-xs" />
            <Input
              icon={MdOutlineLock}
              type="password"
              id="password"
              name="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border border-white/8 bg-(--bg-main)/60 placeholder:text-white/25 focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30 transition-colors"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-(--error)/20 bg-(--error)/10 px-4 py-2.5 text-center text-xs font-label text-(--error)">
              {error}
            </p>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="mt-1 w-full py-2.5 shadow-[0_0_30px_-8px_rgb(56_250_91/0.5)] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-white/8" />
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/25">
            New here?
          </span>
          <span className="h-px flex-1 bg-white/8" />
        </div>

        <p className="text-center text-sm text-(--text-secondary)/70 -mt-2">
          <Link
            href="/register"
            className="text-(--primary) hover:text-(--primary-container) transition-colors font-medium"
          >
            Create an account
          </Link>{" "}
          — it takes under a minute.
        </p>
      </div>
    </div>
  );
}
