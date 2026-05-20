"use client";

import { useMemo, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Bar } from "@/components/ui/Bar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { budgets, categories } from "@/lib/data";
import { BalanceCard } from "@/components/BalanceCard";
import { AddBudgetModal } from "@/components/AddBudgetModal";

const BudgetsPage = () => {
  const [addOpen, setAddOpen] = useState(false);

  const totals = useMemo(() => {
    const totalBudget = 5000;
    const spent = categories
      .filter((c) => c.amount < 0)
      .reduce((acc, c) => acc + Math.abs(c.amount), 0);
    const remaining = Math.max(totalBudget - spent, 0);
    const overall = Math.min(Math.round((spent / totalBudget) * 100), 100);
    return { totalBudget, spent, remaining, overall };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col items-start gap-1 text-white">
          <h1 className="font-sans text-4xl font-bold">Budgets</h1>
          <p className="font-label text-white/50">
            Set limits, stay on track, and see what's left
          </p>
        </div>
        <Button variant="primary" onClick={() => setAddOpen(true)}>
          + New Budget
        </Button>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-3 gap-5">
        <BalanceCard
          header="Monthly Budget"
          balance={totals.totalBudget}
          stat={`${totals.overall}% used`}
          badgeLabel="May 2026"
        />

        <Card variant="light" className="gap-4">
          <CardHeader>Spent So Far</CardHeader>
          <h2 className="text-3xl text-white font-bold tracking-tight">
            ${totals.spent.toLocaleString()}
          </h2>
          <Bar
            orientation="horizontal"
            color={totals.overall < 80 ? "primary" : "danger"}
            value={totals.overall}
          />
        </Card>

        <Card variant="light" className="gap-4">
          <CardHeader>Remaining</CardHeader>
          <h2 className="text-3xl text-white font-bold tracking-tight">
            ${totals.remaining.toLocaleString()}
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="info">on track</Badge>
            <span className="text-xs text-white/50">until end of month</span>
          </div>
        </Card>
      </div>

      {/* Active Budgets */}
      <Card variant="dark" className="gap-6">
        <div className="flex items-center justify-between">
          <CardHeader className="text-left">Active Budgets</CardHeader>
          <span className="text-xs text-white/40">
            {budgets.length} categories
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {budgets.map((b) => {
            const Icon = b.icon;
            const value = Math.min(Math.max(b.percentage, 0), 100);
            const color =
              value < 50 ? "primary" : value < 80 ? "primary" : "danger";
            const status =
              value < 50 ? "Healthy" : value < 80 ? "Watch" : "Over limit";

            return (
              <div
                key={b.label}
                className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-(--bg-surface-container-highest) p-2 rounded-full">
                      <Icon className="text-white w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-white font-medium">
                        {b.label}
                      </span>
                      <span className="text-xs text-white/40">{status}</span>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      value < 80 ? "text-white" : "text-(--error)"
                    }`}
                  >
                    {value}%
                  </span>
                </div>
                <Bar orientation="horizontal" color={color} value={value} />
              </div>
            );
          })}
        </div>
      </Card>
      <AddBudgetModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
};

export default BudgetsPage;
