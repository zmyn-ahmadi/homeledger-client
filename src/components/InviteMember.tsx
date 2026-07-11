"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MdOutlineEmail } from "react-icons/md";
import { LuUserPlus, LuCopy, LuCheck } from "react-icons/lu";
import { createInvitation } from "@/lib/familyApi";

export const InviteMember = ({ className }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSending(true);

    try {
      const link = await createInvitation(email);
      setInviteLink(link);
      setSentTo(email);
      setEmail("");
      setCopied(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send invitation",
      );
    } finally {
      setSending(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the link is still visible to copy manually
    }
  };

  return (
    <Card variant="dark" className={className}>
      <div className="flex items-center gap-2.5">
        <LuUserPlus className="w-3.5 h-3.5 text-(--primary)" />
        <CardHeader className="text-left">Invite Member</CardHeader>
      </div>

      <p className="mt-2 text-xs text-white/40">
        Send an invitation link by email. The link expires in 24 hours and can
        be used once.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col sm:flex-row gap-3"
      >
        <Input
          icon={MdOutlineEmail}
          type="email"
          id="invite-email"
          name="Email"
          placeholder="member@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-xl border border-white/8 bg-(--bg-main)/60 placeholder:text-white/25 focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30 transition-colors"
        />
        <Button
          variant="secondary"
          type="submit"
          disabled={sending || !email}
          className="py-2 text-xs whitespace-nowrap"
        >
          {sending ? "Sending..." : "Send Invite"}
        </Button>
      </form>

      {error && <p className="mt-3 text-xs text-(--error)">{error}</p>}

      {sentTo && !error && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-xs text-(--primary)">
            Invitation sent to {sentTo}.
          </p>
          {inviteLink && (
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2">
              <span className="flex-1 truncate text-xs text-white/50 tabular-nums">
                {inviteLink}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 text-white/40 hover:text-white transition-colors cursor-pointer"
                title="Copy invite link"
              >
                {copied ? (
                  <LuCheck className="w-3.5 h-3.5 text-(--primary)" />
                ) : (
                  <LuCopy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
