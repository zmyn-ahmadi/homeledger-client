import React from "react";

const titles: Record<string, string> = {
  overview: "Overview",
  reports: "Reports",
  analytics: "Analytics",
  bills: "Bills",
};

const Page = () => {
  const title = titles["bills"];
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/6 bg-(--bg-surface-container-low)/60 px-6 py-24 text-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgb(56_250_91/0.08),transparent_70%)]"
      />
      <span className="text-(--primary) text-3xl">✬</span>
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        {title} is on the way
      </h1>
      <p className="max-w-sm text-sm text-white/45">
        We&apos;re building this view right now. Your {title.toLowerCase()} will
        live here soon.
      </p>
    </div>
  );
};
export default Page;
