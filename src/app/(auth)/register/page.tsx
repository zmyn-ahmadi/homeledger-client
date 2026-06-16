"use client";
import React, { useState } from "react";
import {
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlinePhone,
} from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inputStyles =
  "rounded-xl border border-white/8 bg-(--bg-main)/60 placeholder:text-white/25 focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30 transition-colors";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FullName: fullName,
          Email: email,
          Password: password,
          Phone: phone,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Something went wrong. Please try again.");
        return;
      }
      router.push("/login?registered=true");
    } catch (error) {
      setError("Network Error. Please check your connection.");
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
            Create your account
          </h1>
          <p className="text-sm text-(--text-secondary)/70">
            One ledger for every dollar in the house.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-1.5">
            <Label name="Full Name" className="text-white/40 text-xs" />
            <Input
              icon={MdOutlinePerson}
              type="text"
              id="fname"
              name="FullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={inputStyles}
            />
          </div>

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
              className={inputStyles}
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
              className={inputStyles}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label name="Phone Number" className="text-white/40 text-xs" />
            <Input
              icon={MdOutlinePhone}
              type="text"
              id="phone"
              name="Phone"
              placeholder="04xx xxx xxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputStyles}
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
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-white/8" />
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/25">
            Already a member?
          </span>
          <span className="h-px flex-1 bg-white/8" />
        </div>

        <p className="text-center text-sm text-(--text-secondary)/70 -mt-2">
          <Link
            href="/login"
            className="text-(--primary) hover:text-(--primary-container) transition-colors font-medium"
          >
            Log in
          </Link>{" "}
          to your existing account.
        </p>
      </div>
    </div>
  );
}
