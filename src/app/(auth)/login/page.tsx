"use client";

import React, { useState } from "react";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { Card } from "@/components/ui/Card";
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
    <Card variant="dark" className="m-auto items-center gap-5 w-90">
      <div className="flex flex-col items-center gap-1">
        <Link href="/" className="flex flex-col items-center">
          <span className="text-(--primary) text-4xl">✬</span>
          <h1 className="text-white text-2xl">homeledger</h1>
        </Link>
        <p className="text-white/20 text-[10px] uppercase">
          Create your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div>
          <Label name="Email" />
          <Input
            icon={MdOutlineEmail}
            type="email"
            id="email"
            name="Email"
            placeholder="homeledger@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label name="Password" />
          <Input
            icon={MdOutlineLock}
            type="password"
            id="password"
            name="Password"
            placeholder=". . . . . . . . ."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <p className="text-(--error) text-center text-xs font-label">
            {error}
          </p>
        )}

        <Button variant="primary" type="submit">
          {loading ? "Logging..." : "Log In"}
        </Button>
      </form>

      <div className="flex items-center gap-2">
        <p className="text-zinc-400 font-label text-sm"> Create new account!</p>
        <Link href="/register" className="text-(--primary)">
          Sign Up
        </Link>
      </div>
    </Card>
  );
}
