import Link from "next/link";
import {
  MdDashboard,
  MdGroup,
  MdReceiptLong,
  MdAccountBalanceWallet,
  MdInsights,
  MdLockOutline,
} from "react-icons/md";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: MdDashboard,
    title: "Personal Dashboard",
    body: "Balance, income, and expenses at a glance — with a daily salary tracker that earns as you work.",
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
  },
];

export default function LandingPage() {
  return (
      <div className="min-h-screen w-full text-white">
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
          <Link
              href="/"
              className="flex items-center gap-3 text-xl tracking-tight font-medium"
          >
            <span className="text-(--primary) text-2xl">✬</span>
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
        </header>

        <main className="px-6 md:px-12 pb-20">
          {/* Hero */}
          <section className="relative mx-auto max-w-5xl pt-16 md:pt-24 pb-20 text-center">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-72 w-72 rounded-full bg-(--primary)/20 blur-3xl"
            />
            <div className="relative flex flex-col items-center gap-6">
            <span className="text-(--primary) font-label text-xs uppercase tracking-[0.2em]">
              ✬ Personal & family finance
            </span>
              <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight max-w-3xl">
                Every dollar, every household,{" "}
                <span className="bg-linear-to-r from-(--primary) to-(--primary-container) bg-clip-text text-transparent">
                in one ledger.
              </span>
              </h1>
              <p className="text-(--text-secondary) text-base md:text-lg max-w-2xl">
                Track balances, budgets, bills, and shared family spending — without
                spreadsheets, without spying. Connect your bank once and let
                homeledger do the bookkeeping.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <Link href="/register">
                  <Button variant="primary">Create your account</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outlined">I already have one</Button>
                </Link>
              </div>
              <p className="text-white/30 font-label text-xs">
                No credit card. Read-only bank access.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-2 mb-10">
            <span className="text-white/40 font-label text-[11px] uppercase tracking-[0.2em]">
              What you get
            </span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Built for the way money actually moves
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map(({ icon: Icon, title, body }) => (
                  <Card
                      key={title}
                      variant="light"
                      className="gap-3 font-normal"
                  >
                    <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-(--primary)/10 text-(--primary)">
                    <Icon className="w-5 h-5" />
                  </span>
                      <h3 className="text-base font-medium">{title}</h3>
                    </div>
                    <p className="text-(--text-secondary) text-sm leading-relaxed">
                      {body}
                    </p>
                  </Card>
              ))}
            </div>
          </section>

          {/* CTA strip */}
          <section className="mx-auto max-w-5xl mt-20">
            <Card
                variant="dark"
                className="items-center text-center gap-5 py-12 px-8 border border-white/5"
            >
              <span className="text-(--primary) text-3xl">✬</span>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-xl">
                Stop guessing where the month went.
              </h2>
              <p className="text-(--text-secondary) text-sm md:text-base max-w-lg font-normal">
                Sign up in under a minute. Your dashboard is waiting on the other
                side.
              </p>
              <div className="flex items-center gap-3">
                <Link href="/register">
                  <Button variant="primary">Get Started Free</Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary">Log In</Button>
                </Link>
              </div>
            </Card>
          </section>
        </main>

        <footer className="border-t border-white/5 px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40 font-label">
        <span className="flex items-center gap-2">
          <span className="text-(--primary)">✬</span> homeledger ©{" "}
          {new Date().getFullYear()}
        </span>
          <span>Built for personal &amp; family finance.</span>
        </footer>
      </div>
  );
}

