"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Bar } from "@/components/ui/Bar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getCategoryMap, getTotalExpenseByCategory } from "@/lib/utils";
import { categoryIconMap } from "@/lib/icons";
import { BalanceCard } from "@/components/BalanceCard";
import { AddBudgetModal } from "@/components/AddBudgetModal";
import { PageHeader } from "@/components/PageHeader";
import { Budget, Category, CategoryExpense } from "@/lib/types";

const BudgetsPage = () => {
  const [addOpen, setAddOpen] = useState(false);

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});
  const [totalExpenseByCat, setTotalExpenseByCat] = useState<CategoryExpense[]>(
    [],
  );

  const [loading, setLoading] = useState(false);
  const [erro, setError] = useState("");

  const fetchBudgetData = async () => {
    setLoading(true);
    setError("");

    try {
      const [budgetRes, catRes, categoryTotalExpRes] = await Promise.all([
        fetch("/api/budget", { method: "GET" }),
        fetch("/api/category", { method: "GET" }),
        fetch("/api/dashboard/personal/category-spend", { method: "GET" }),
      ]);

      if (!budgetRes.ok) {
        setError("Failed to load budgets");
        return;
      }

      if (!catRes.ok) {
        setError("Failed to load categories");
        return;
      }

      if (!categoryTotalExpRes.ok) {
        setError("Failed to load total expenses by category");
        return;
      }

      const [budgetData, categoryData, categoryTotalExpData] =
        await Promise.all([
          budgetRes.json(),
          catRes.json(),
          categoryTotalExpRes.json(),
        ]);

      // creates a category map
      const catMap = getCategoryMap(categoryData);
      setCategoryMap(catMap);

      setBudgets(budgetData);
      setTotalExpenseByCat(categoryTotalExpData);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "[fetchBudgetData]: Server error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const totals = useMemo(() => {
    const totalBudget = budgets.reduce((acc, b) => acc + b.LimitAmount, 0);
    const spent = totalExpenseByCat.reduce((acc, c) => acc + c.Total, 0);
    const remaining = Math.max(totalBudget - spent, 0);
    const overall = Math.min(Math.round((spent / totalBudget) * 100), 100);
    return { totalBudget, spent, remaining, overall };
  }, [budgets, totalExpenseByCat]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Spending limits"
        title="Budgets"
        subtitle="Set limits, stay on track, and see what's left"
      >
        <Button variant="primary" onClick={() => setAddOpen(true)}>
          + New Budget
        </Button>
      </PageHeader>

      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <BalanceCard
          header="Monthly Budget"
          balance={totals.totalBudget}
          stat={`${totals.overall}% used`}
          badgeLabel="May 2026"
        />

        <Card variant="light" className="gap-4">
          <CardHeader>Spent So Far</CardHeader>
          <h2 className="text-2xl md:text-3xl text-white font-semibold tracking-tight tabular-nums">
            ${totals.spent?.toLocaleString()}
          </h2>
          <Bar
            orientation="horizontal"
            color={totals.overall < 80 ? "primary" : "danger"}
            value={totals.overall}
          />
        </Card>

        <Card variant="light" className="gap-4">
          <CardHeader>Remaining</CardHeader>
          <h2 className="text-2xl md:text-3xl text-white font-semibold tracking-tight tabular-nums">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((b) => {
            const iconKey = categoryMap[b.CategoryId];
            const Icon = categoryIconMap[iconKey];

            const limitAmount = b.LimitAmount;
            const categoryId = b.CategoryId;
            const totalExp = getTotalExpenseByCategory(
              categoryId,
              totalExpenseByCat,
            );
            var percentageVal = (totalExp / limitAmount) * 100;

            const color =
              percentageVal < 50
                ? "primary"
                : percentageVal < 80
                  ? "primary"
                  : "danger";
            const status =
              percentageVal < 50
                ? "Healthy"
                : percentageVal < 80
                  ? "Watch"
                  : "Over limit";

            return (
              <div
                key={b.Name}
                className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-(--bg-surface-container-highest) p-2 rounded-full">
                      <Icon className="text-white w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-white font-medium">
                        {b.Name}
                      </span>
                      <span className="text-xs text-white/40">{status}</span>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      percentageVal < 80 ? "text-white" : "text-(--error)"
                    }`}
                  >
                    {percentageVal.toFixed(2)}%
                  </span>
                </div>
                <Bar
                  orientation="horizontal"
                  color={color}
                  value={percentageVal}
                />
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
