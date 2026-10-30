"use client";

import { StatCard } from "@/components/StatCard";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import { WorkTracker } from "@/components/WorkTracker";
import { Chart } from "@/components/Chart";
import { DataCard } from "@/components/DataCard";
import { ActivityCard } from "@/components/ActivityCard";
import { BalanceCard } from "@/components/BalanceCard";
import { PageHeader } from "@/components/PageHeader";
import {
  getErrorMessage,
  getTotalExpenseByCategory,
  getCategoryMap,
  sumThisMonth,
} from "@/lib/utils";
import { postWorkDays } from "@/lib/api";
import { Income, Expense, Bill, Budget, BillItem } from "@/lib/types";
import { useState, useEffect, useMemo } from "react";

const salaryPerDay = 317.42;

const PersonalDashboard = () => {
  // Required data value from backend
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expense, setExpenses] = useState<Expense[]>([]);

  const [bills, setBills] = useState<Bill[]>([]);

  // budgets
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [totalExpenseByCat, setTotalExpenseByCat] = useState([]);
  // -------------

  const [recentActivities, setRecentActivities] = useState([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});

  // Category Spend Card
  const [categorySpend, setCategorySpend] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const billItems: BillItem[] = bills.map((b) => ({
    BillId: b.BillId,
    Name: b.Name,
    Amount: b.Amount,
    status: b.Status,
  }));

  // then pass billItems instead of bills:
  <ActivityCard
    type="bills"
    label="Upcoming Bills"
    data={billItems}
    categoryMap={categoryMap}
  />;

  const fetchIncomes = async () => {
    // initialze the states
    setError("");
    setLoading(true);

    // api call
    try {
      // call api
      const response = await fetch("/api/dashboard/personal/income", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const statusErrorMessage = getErrorMessage(response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${statusErrorMessage}`);
      }

      // convert to JSON format
      const data = await response.json();
      setIncomes(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "[fetchIncomes]: Server error",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    setLoading(false);
    setError("");

    try {
      const res = await fetch("/api/dashboard/personal/expense", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const statusMsg = getErrorMessage(res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${statusMsg}`);
      }

      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "[fetchExpense]: Server error",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchBills = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dashboard/personal/bill", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const statusMsg = getErrorMessage(res.status);
      if (!res.ok) throw new Error(`HTTP error! status: ${statusMsg}`);

      const data = await res.json();
      setBills(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "[fetchBills]: Server error",
      );
    } finally {
      setLoading(false);
    }
  };

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

  const fetchRecentActivities = async () => {
    setLoading(true);
    setError("");

    try {
      const [transRes, catRes] = await Promise.all([
        fetch("/api/dashboard/personal/transactions"),
        fetch("/api/category"),
      ]);

      if (!transRes.ok) {
        setError("Failed to load transactions");
        return;
      }
      if (!catRes.ok) {
        setError("Failed to load categories");
        return;
      }

      const [transactions, cats] = await Promise.all([
        transRes.json(),
        catRes.json(),
      ]);

      // build a map: { 1: icon ...}
      const map: Record<number, string> = {};
      for (const c of cats) {
        map[c.CategoryId] = c.Icon;
      }

      setCategoryMap(map);
      setRecentActivities(transactions);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "[fetchRecentActivities]: Server error",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorySpend = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dashboard/personal/category-spend");

      if (!res.ok) {
        setError("Failed to load category-spend");
        return;
      }

      const data = await res.json();
      setCategorySpend(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "[fetchCategorySpend]: Server error",
      );
    } finally {
      setLoading(false);
    }
  };

  const saveWorkDays = async ({ daysWorked }: { daysWorked: number[] }) => {
    // Monday of the current week (local time) — matches the M..S order of the tracker
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));

    const pad = (n: number) => String(n).padStart(2, "0");
    const weekStartDate = `${monday.getFullYear()}-${pad(monday.getMonth() + 1)}-${pad(monday.getDate())}`;

    await postWorkDays({
      WeekStartDate: weekStartDate,
      DaysWorked: daysWorked.map(Boolean),
    });
  };

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
    fetchBills();
    fetchRecentActivities();
    fetchCategorySpend();
    fetchBudgetData();
  }, []);

  const totalIncomes = useMemo(() => {
    return incomes.reduce((total, income) => total + income.Amount, 0);
  }, [incomes]);

  const totalExpenses = useMemo(() => {
    return expense.reduce((total, exp) => total + exp.Amount, 0);
  }, [expense]);

  const monthlyIncome = sumThisMonth(incomes);
  const monthlyExpense = sumThisMonth(expense);
  const incomePercent = totalIncomes
    ? Math.min((monthlyIncome / totalIncomes) * 100, 100)
    : 0;
  const expensePercent = monthlyIncome
    ? Math.min((monthlyExpense / monthlyIncome) * 100, 100)
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Personal Dashboard"
        subtitle="Your money at a glance"
      />

      {/* Top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* Total Balance */}
        <BalanceCard
          header={"Total Balance"}
          balance={totalIncomes - totalExpenses}
          className="sm:col-span-2"
        />
        <StatCard
          symbol={HiArrowSmallDown}
          header="Monthly Income"
          amount={monthlyIncome}
          barValue={incomePercent}
        />
        <StatCard
          symbol={HiArrowSmallUp}
          header="Monthly Expenses"
          amount={monthlyExpense}
          barValue={expensePercent}
        />
        <WorkTracker salaryPerDay={salaryPerDay} onSubmit={saveWorkDays} />
      </div>

      <div className="flex flex-col xl:flex-row items-stretch gap-4">
        <Chart className="h-96 xl:h-auto xl:flex-[1.3]" />

        {/* Side cards */}
        <div className="flex flex-col gap-4 xl:flex-1">
          <ActivityCard
            type="bills"
            label="Upcoming Bills"
            data={billItems}
            categoryMap={categoryMap}
          />
          <ActivityCard
            type="activity"
            label="Recent Activity"
            data={recentActivities}
            categoryMap={categoryMap}
          />
        </div>
      </div>

      {error && <p className="text-sm text-(--error)">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DataCard type="category" label="Category Spend" data={categorySpend} />
        <DataCard
          type="budget"
          label="Active Budgets"
          data={budgets}
          totalExpense={categorySpend}
          categoryMap={categoryMap}
        />
      </div>
    </div>
  );
};
export default PersonalDashboard;
