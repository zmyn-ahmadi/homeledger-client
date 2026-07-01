import { Bill, Budget, Expense, Income } from "./types";
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

// GET: Family Members' expenses -> /api/dashboard/family/expenses
export const fetchFamilyExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("/api/dashboard/family/expenses", { method: "GET" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Failed to load family members' expenses");
  }

  return safeJson<Expense[]>(res, []);
};
// GET: Family Members' incomes -> /api/dashboard/family/incomes
export const fetchFamilyIncomes = async (): Promise<Income[]> => {
  const res = await fetch("/api/dashboard/family/incomes", { method: "GET" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Failed to load family members' incomes");
  }

  return safeJson<Income[]>(res, []);
};
