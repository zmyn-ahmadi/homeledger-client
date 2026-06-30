import { Bill, Budget } from "./types";
import { safeJson } from "./utils";

// GET: family bills -> /api/dashboard/family/bills
export const fetchFamilyBills = async (): Promise<Bill[]> => {
  const res = await fetch("/api/dashboard/family/bills", { method: "GET" });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Failed to load family bills");
  }

  return safeJson<Bill[]>(res, []);
};

// GET: family budgets -> /api/dashboard/family/budgets
export const fetchFamilyBudgets = async (): Promise<Budget[]> => {
  const res = await fetch("/api/dashboard/family/budgets", { method: "GET" });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Failed to load family budgets");
  }

  return safeJson<Budget[]>(res, []);
};
