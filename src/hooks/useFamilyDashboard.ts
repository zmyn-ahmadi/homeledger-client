import { useState, useEffect } from "react";
import { Bill, Budget, Income, MemberActivity } from "@/lib/types";
import {
  fetchFamilyBills,
  fetchFamilyBudgets,
  fetchFamilyExpenses,
  fetchFamilyIncomes,
} from "@/lib/familyApi";

// Loads the family dashboard data (bills + budgets).
export function useFamilyDashboard() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<MemberActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError("");

      const [billsRes, budgetsRes, expensesRes, incomesRes] =
        await Promise.allSettled([
          fetchFamilyBills(),
          fetchFamilyBudgets(),
          fetchFamilyExpenses(),
          fetchFamilyIncomes(),
        ]);

      if (!active) return;

      if (billsRes.status === "fulfilled") setBills(billsRes.value ?? []);
      if (budgetsRes.status === "fulfilled") setBudgets(budgetsRes.value ?? []);
      if (expensesRes.status === "fulfilled")
        setExpenses(expensesRes.value ?? []);
      if (incomesRes.status === "fulfilled") setIncomes(incomesRes.value ?? []);

      const messages = [billsRes, budgetsRes, expensesRes, incomesRes]
        .filter((r) => r.status === "rejected")
        .map((r) => (r as PromiseRejectedResult).reason?.message)
        .filter(Boolean);

      if (messages.length) setError(messages.join(" • "));

      setLoading(false);
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return { bills, budgets, expenses, incomes, loading, error };
}
