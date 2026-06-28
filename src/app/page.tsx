import Link from "next/link";
import {
  MdDashboard,
  MdGroup,
  MdReceiptLong,
  MdAccountBalanceWallet,
  MdInsights,
  MdLockOutline,
  MdArrowForward,
  MdTrendingUp,
} from "react-icons/md";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: MdDashboard,
    title: "Personal Dashboard",
    body: "Balance, income, and expenses at a glance — with a daily salary tracker that earns as you work.",
    wide: true,
  },
  {
    icon: MdGroup,
    title: "Family Ledger",
    body: "Share a household view with the people you live with. Split bills, align budgets, no awkward IOUs.",
  },
  {
    icon: MdAccountBalanceWallet,
    title: "Smart Budgets",
    body: "Set category caps, watch them fill in real time, and get nudges before you blow through them.",
  },
  {
    icon: MdReceiptLong,
    title: "Upcoming Bills",
    body: "Rent, utilities, subscriptions — surfaced before they hit, so nothing surprises you on payday.",
  },
  {
    icon: MdInsights,
    title: "Reports & Analytics",
    body: "Trends across months, categories, and accounts. Pretty charts, useful answers.",
  },
  {
    icon: MdLockOutline,
    title: "Bank-grade Privacy",
    body: "Connect accounts via Basiq with read-only access. Your credentials never touch our servers.",
    wide: true,
  },
];

const steps = [
  {
    n: "01",
    title: "Create your account",
    body: "Email, password, done. No card required.",
  },
  {
    n: "02",
    title: "Connect your bank",
    body: "Read-only via Basiq. Transactions flow in on their own.",
  },
  {
    n: "03",
    title: "See where the month goes",
    body: "Budgets, bills, and family spending — one ledger.",
  },
];

const sparkBars = [38, 52, 44, 66, 58, 80, 72, 92, 64, 85, 78, 100];

function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-12 bottom-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgb(56_250_91/0.13),transparent_70%)]"
      />
      <div className="relative rounded-3xl border border-white/10 bg-(--bg-surface-bright)/60 backdrop-blur-2xl p-2 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.8)]">
        <div className="rounded-2xl bg-(--bg-main)/90 p-6 md:p-8">
          {/* window chrome */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-(--primary)/60" />
            </div>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/30">
              June 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {/* balance + sparkline */}
            <div className="sm:col-span-3 flex flex-col justify-between gap-6">
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2">
                  Household balance
                </p>
                <p className="text-4xl md:text-5xl font-semibold tracking-tight tabular-nums">
                  $12,408<span className="text-white/30">.52</span>
                </p>
                <p className="mt-2 inline-flex items-center gap-1 text-(--primary) text-xs font-label">
                  <MdTrendingUp className="h-3.5 w-3.5" /> +4.2% this month
                </p>
              </div>
              <div className="flex items-end gap-1.5 h-16">
                {sparkBars.map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className={
                      i === sparkBars.length - 1
                        ? "flex-1 rounded-full bg-linear-to-t from-(--primary-container) to-(--primary)"
                        : "flex-1 rounded-full bg-white/8"
                    }
                  />
                ))}
              </div>
            </div>

            {/* side cards */}
            <div className="sm:col-span-2 flex flex-col gap-3">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
                  Groceries budget
                </p>
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden mb-2">
                  <div className="h-full w-[68%] rounded-full bg-linear-to-r from-(--primary-container) to-(--primary)" />
                </div>
                <p className="text-xs text-(--text-secondary) tabular-nums">
                  $412 <span className="text-white/30">of $600</span>
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
                  Next bill
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rent</span>
                  <span className="text-sm tabular-nums text-(--text-secondary)">
                    $1,850
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-label text-(--warning)/80">
                  due in 3 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip text-white">
      {/* ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[120vh] bg-grid-faint [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20rem] h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-(--primary)/10 blur-[120px]"
      />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-(--bg-main)/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg tracking-tight font-medium"
          >
            <span className="text-(--primary) text-lg">✬</span>
            homeledger
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outlined" className="text-sm">
                Log In
              </Button>
            </Link>
            <Link href="/register" className="hidden sm:block">
              <Button variant="primary" className="text-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative px-6 md:px-12 pb-24">
        {/* Hero */}
        <section className="mx-auto max-w-5xl pt-20 md:pt-28 pb-16 text-center">
          <div className="flex flex-col items-center gap-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-(--primary)/20 bg-(--primary)/5 px-4 py-1.5 font-label text-[11px] uppercase tracking-[0.22em] text-(--primary)">
              ✬ Personal &amp; family finance
            </span>
            <h1 className="max-w-4xl text-[2.75rem] leading-[1.04] md:text-7xl font-semibold tracking-tighter text-balance">
              Every dollar, every household,{" "}
              <span className="bg-linear-to-r from-(--primary) via-(--primary) to-(--primary-container) bg-clip-text text-transparent">
                in one ledger.
              </span>
            </h1>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-(--text-secondary)/90">
              Track balances, budgets, bills, and shared family spending —
              without spreadsheets, without spying. Connect your bank once and
              let homeledger do the bookkeeping.
            </p>
            <div className="mt-1 flex flex-col sm:flex-row items-center gap-3">
              <Link href="/register">
                <Button
                  variant="primary"
                  className="px-8 py-3 text-base shadow-[0_0_40px_-8px_rgb(56_250_91/0.5)]"
                >
                  Create your account
                  <MdArrowForward className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outlined" className="px-8 py-3 text-base">
                  I already have one
                </Button>
              </Link>
            </div>
            <p className="font-label text-xs tracking-wide text-white/30">
              No credit card · Read-only bank access · Free to start
            </p>
          </div>
        </section>

        {/* Product preview */}
        <section className="mx-auto max-w-6xl mb-28">
          <DashboardPreview />
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <span className="font-label text-[11px] uppercase tracking-[0.22em] text-(--primary)/80">
              What you get
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              Built for the way money actually moves
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, body, wide }, i) => (
              <div
                key={title}
                className={`group relative flex flex-col gap-4 rounded-3xl border border-white/8 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-(--primary)/25 hover:bg-(--primary)/[0.04] ${
                  wide ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--primary)/15 bg-(--primary)/10 text-(--primary) transition-colors group-hover:bg-(--primary)/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-label text-[11px] tracking-[0.2em] text-white/15 tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-medium tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-(--text-secondary)/80">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-5xl mt-28">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="font-label text-[11px] uppercase tracking-[0.22em] text-(--primary)/80">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Up and running in three steps
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8">
            {steps.map(({ n, title, body }) => (
              <div
                key={n}
                className="flex flex-col gap-3 bg-(--bg-surface-container-low) p-7"
              >
                <span className="font-label text-xs tracking-[0.2em] text-(--primary) tabular-nums">
                  {n}
                </span>
                <h3 className="text-base font-medium tracking-tight">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-(--text-secondary)/70">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-(--bg-surface-container-low) px-8 py-16 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_-20%,rgb(56_250_91/0.18),transparent_70%)]"
            />
            <div className="relative flex flex-col items-center gap-5">
              <span className="text-(--primary) text-3xl">✬</span>
              <h2 className="max-w-xl text-3xl md:text-4xl font-semibold tracking-tight text-balance">
                Stop guessing where the month went.
              </h2>
              <p className="max-w-md text-sm md:text-base leading-relaxed text-(--text-secondary)/80">
                Sign up in under a minute. Your dashboard is waiting on the
                other side.
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Link href="/register">
                  <Button
                    variant="primary"
                    className="px-7 shadow-[0_0_40px_-8px_rgb(56_250_91/0.5)]"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outlined">Log In</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3 px-6 py-7 font-label text-xs text-white/35">
          <span className="flex items-center gap-2">
            <span className="text-(--primary)">✬</span> homeledger ©{" "}
            {new Date().getFullYear()}
          </span>
          <span>Built for personal &amp; family finance.</span>
        </div>
      </footer>
    </div>
  );
}
