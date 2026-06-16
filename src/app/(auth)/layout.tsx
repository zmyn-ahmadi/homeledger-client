import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-clip text-white">
      {/* ambient backdrop — mirrors the landing page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-16rem] h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-(--primary)/10 blur-[110px]"
      />

      <header className="relative z-10 px-6 py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-lg tracking-tight font-medium"
        >
          <span className="text-(--primary) text-xl">✬</span>
          homeledger
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 pb-16">
        {children}
      </main>
    </div>
  );
}
