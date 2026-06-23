"use client";

import { useEffect, useState } from "react";
import { HiSparkles, HiArrowUp } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { useChatStream } from "@/hooks/useChatStream";

// Animated ASCII equalizer — shown while zee is thinking / before tokens stream in.
const BARS = "▁▂▃▄▅▆▇█";

const AsciiLoader = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 90);
    return () => clearInterval(id);
  }, []);

  const bars = Array.from({ length: 6 }, (_, i) => {
    const phase = tick * 0.55 + i * 0.9;
    const level = Math.floor(((Math.sin(phase) + 1) / 2) * (BARS.length - 1));
    return BARS[level];
  }).join("");

  return (
    <span className="flex items-center gap-2 font-mono text-sm text-(--primary)">
      <span className="tracking-tight">{bars}</span>
      <span className="text-xs uppercase tracking-[0.2em] text-(--primary)/60">
        thinking
      </span>
    </span>
  );
};

const Zee = () => {
  const {
    input,
    setInput,
    sendMessage,
    visibleMessages,
    messagesEndRef,
    isLoading,
  } = useChatStream();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {/* LOGO */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-(--primary)/20 bg-(--primary)/10 text-(--primary)">
            <HiSparkles className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-(--bg-main) bg-(--primary)" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              zee AI
            </h2>
            <span className="font-label text-[11px] uppercase tracking-[0.2em] text-(--primary)/70">
              Active Insight Engine
            </span>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-white/45">
          Financial sovereignty through technical precision. Ask zee for
          real-time portfolio analysis, automated budget optimization, or
          transaction forensics.
        </p>
      </div>

      {/* Chat surface */}
      <div className="flex h-[60vh] min-h-[420px] flex-col overflow-hidden rounded-2xl border border-white/6 bg-(--bg-surface-container-low)/90 backdrop-blur-xl">
        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
          {visibleMessages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex items-end gap-2.5",
                msg.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {msg.role === "assistant" && (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-(--primary)/20 bg-(--primary)/10 text-(--primary)">
                  <HiSparkles className="h-4 w-4" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "rounded-br-md bg-(--primary) font-medium text-[#003110]"
                    : "rounded-bl-md border border-white/6 bg-(--bg-surface-container-high)/80 text-white/90",
                )}
              >
                {msg.role === "assistant" && !msg.content ? (
                  <AsciiLoader />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Composer */}
        <div className="border-t border-white/6 p-3 sm:p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-(--bg-surface-container-high)/60 p-1.5 transition-colors focus-within:border-(--primary)/40">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Message zee..."
              className="flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/35 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--primary) text-[#003110] transition-opacity hover:opacity-90 disabled:opacity-40"
              disabled={!input.trim() || isLoading}
            >
              <HiArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zee;
