import { Bill, Budget } from "./types";

// GET: family bills -> /api/dashboard/family/bills
export const fetchFamilyBills = async (): Promise<Bill[]> => {
  const res = await fetch("/api/dashboard/family/bills", { method: "GET" });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Failed to load family bills");
  }

  return res.json();
};

// GET: family budgets -> /api/dashboard/family/budgets
export const fetchFamilyBudgets = async (): Promise<Budget[]> => {
  const res = await fetch("/api/dashboard/family/budgets", { method: "GET" });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Failed to load family budgets");
  }

  return res.json();
};
