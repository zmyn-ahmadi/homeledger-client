import { useState, useEffect } from "react";
import { Bill, Budget } from "@/lib/types";
import { fetchFamilyBills, fetchFamilyBudgets } from "@/lib/familyApi";

// Loads the family dashboard data (bills + budgets).
export function useFamilyDashboard() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError("");

      const [billsRes, budgetsRes] = await Promise.allSettled([
        fetchFamilyBills(),
        fetchFamilyBudgets(),
      ]);

      if (!active) return;

      if (billsRes.status === "fulfilled") setBills(billsRes.value ?? []);
      if (budgetsRes.status === "fulfilled") setBudgets(budgetsRes.value ?? []);

      const messages = [billsRes, budgetsRes]
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

  return { bills, budgets, loading, error };
}
