"use client";

import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { acceptInvitation } from "@/lib/familyApi";
import { LuUsers } from "react-icons/lu";

function InviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await acceptInvitation(code);

      if (res.ok) {
        setAccepted(true);
        // give the user a moment to read the confirmation
        setTimeout(() => router.push("/family"), 1500);
        return;
      }

      if (res.status === 401) {
        // not logged in — come back here after logging in
        router.push(`/login?next=${encodeURIComponent(`/invite?code=${code}`)}`);
        return;
      }

      setError(res.message || "Failed to accept invitation");
    } catch {
      setError("Network Error. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(56_250_91/0.1),transparent_70%)]"
      />
      <div className="relative flex flex-col gap-7 rounded-3xl border border-white/8 bg-(--bg-surface-container-low)/80 backdrop-blur-xl p-8 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--primary)/10 text-(--primary)">
            <LuUsers className="h-6 w-6" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">
            Family invitation
          </h1>
          <p className="text-sm text-(--text-secondary)/70">
            You&apos;ve been invited to join a family on HomeLedger and share
            bills, budgets and spending together.
          </p>
        </div>

        {!code ? (
          <p className="rounded-xl border border-(--error)/20 bg-(--error)/10 px-4 py-2.5 text-center text-xs font-label text-(--error)">
            This invitation link is invalid — no code found. Ask for a new
            invite.
          </p>
        ) : accepted ? (
          <p className="rounded-xl border border-(--primary)/20 bg-(--primary)/10 px-4 py-2.5 text-center text-xs font-label text-(--primary)">
            You&apos;ve joined the family! Taking you to the family
            dashboard...
          </p>
        ) : (
          <>
            {error && (
              <p className="rounded-xl border border-(--error)/20 bg-(--error)/10 px-4 py-2.5 text-center text-xs font-label text-(--error)">
                {error}
              </p>
            )}

            <Button
              variant="primary"
              onClick={handleAccept}
              disabled={loading}
              className="w-full py-2.5 shadow-[0_0_30px_-8px_rgb(56_250_91/0.5)] disabled:opacity-60"
            >
              {loading ? "Joining..." : "Accept Invitation"}
            </Button>
          </>
        )}

        <p className="text-center text-xs text-(--text-secondary)/50">
          Not expecting this?{" "}
          <Link
            href="/"
            className="text-(--primary) hover:text-(--primary-container) transition-colors font-medium"
          >
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense>
      <InviteContent />
    </Suspense>
  );
}
