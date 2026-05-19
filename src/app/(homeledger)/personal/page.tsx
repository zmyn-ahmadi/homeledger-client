"use client";

import { StatCard } from "@/components/StatCard";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import { WorkTracker } from "@/components/WorkTracker";
import { Chart } from "@/components/Chart";
import { Activities, Bills, budgets, categories } from "@/lib/data";
import { DataCard } from "@/components/DataCard";
import { ActivityCard } from "@/components/ActivityCard";
import { BalanceCard } from "@/components/BalanceCard";
import { getErrorMessage } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const totalBalance = 35000.0;
const monthlyIncome = 2000.0;
const monthlyExpense = 1050.0;
const incomePercent = totalBalance ? (monthlyIncome / totalBalance) * 100 : 0;
const expensePercent = totalBalance ? (monthlyExpense / totalBalance) * 100 : 0;
const salaryPerDay = 317.42;

/*
 * Data needed for personal dashboard
 *  1 - Total balance (current) (total(/api/income) - total(/api/expense))
 *  2 - Monthly income (api/income) - let's start from this
 *  3 - Monthly expense (/api/expense)
 *
 *  4 - Daily income (for the graph)
 *  7 - Category Spend (expense - category -> get /api/expense filter category and amount)
 *  8 - Active Budgets ( from /api/budgets -> active)
 */

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Required data value from backend
  const [incomes, setIncomes] = useState([]);
  const [expense, setExpenses] = useState([]);
  const [bills, setBills] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const fetchDashboardData = async () => {
  //   // initialze the states
  //   setError("");
  //   setLoading(true);
  //
  //   try {
  //     const [incomesRes, expenseRes, billsRes, budgetsRes, recRes] =
  //       await Promise.all([
  //         fetch("/api/dashboard/personal/income"),
  //         fetch("/api/dashboard/personal/expense"),
  //         fetch("/api/dashboard/personal/bill"),
  //         // fetch("/api/dashboard/personal/budget"),
  //         fetch("/api/dashboard/personal/transactions"),
  //       ]);
  //
  //     if (!incomesRes.ok) {
  //       setError("Failed to load incomes");
  //       return;
  //     }
  //     if (!expenseRes.ok) {
  //       setError("Failed to load expenses");
  //       return;
  //     }
  //     if (!billsRes.ok) {
  //       setError("Failed to load bills");
  //       return;
  //     }
  //     if (!recRes.ok) {
  //       setError("Failed to load transactions");
  //       return;
  //     }
  //     console.log(error);
  //
  //     const [incData, expData, billData, recData] = await Promise.all([
  //       incomesRes.json(),
  //       expenseRes.json(),
  //       billsRes.json(),
  //       // budgetsRes.json(),
  //       recRes.json(),
  //     ]);
  //
  //     console.log("data: ", incData);
  //
  //     setIncomes(incData);
  //     setExpenses(expData);
  //     setBills(billData);
  //     // setBudgets(budData);
  //     setRecentActivities(recData);
  //   } catch (error) {
  //     setError(
  //       error instanceof Error
  //         ? error.message
  //         : "[fetchDashboardData]: Server Error",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

  const fetchBudgets = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dashboard/personal/budget", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setBudgets(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "[fetchBudgets]: Server error",
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

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
    fetchBills();
    fetchRecentActivities();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-5">
      {/* Main contents */}
      <div className="col-span-12 flex flex-col gap-5">
        {/* Top cards */}
        <div className="grid grid-cols-5 gap-4">
          {/* Total Balance */}
          <BalanceCard
            header={"Total Balance"}
            balance={totalBalance}
            stat={5.2}
            badgeLabel="vs. last month"
            className="col-span-2"
          />
          <StatCard
            symbol={HiArrowSmallDown}
            header="Monthly Income"
            amount={incomes[0]?.Amount ?? "-"}
            barValue={incomePercent}
          />
          <StatCard
            symbol={HiArrowSmallUp}
            header="Monthly Expenses"
            amount={-expense[0]?.Amount}
            barValue={expensePercent}
          />
          <WorkTracker salaryPerDay={salaryPerDay} />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1/4">
            <Chart className="h-112" />
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-4 flex-1">
            <ActivityCard
              type="bills"
              label="Upcoming Bills"
              data={bills}
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
      </div>
      <div className="flex gap-4 col-span-12">
        <DataCard type="category" label="Category Spend" data={categories} />
        <DataCard type="budget" label="Active Budgets" data={budgets} />
      </div>
    </div>
  );
};
export default Page;
