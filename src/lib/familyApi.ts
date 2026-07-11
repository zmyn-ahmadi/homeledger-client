import { Bill, Budget, MemberActivity, Income } from "./types";
import { getApiErrorMessage, safeJson } from "./utils";

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
export const fetchFamilyExpenses = async (): Promise<MemberActivity[]> => {
  const res = await fetch("/api/dashboard/family/expenses", { method: "GET" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? "Failed to load family members' expenses");
  }

  return safeJson<MemberActivity[]>(res, []);
};
// POST: create an invitation (emails the invite link) -> /api/family/invitations
export const createInvitation = async (email: string): Promise<string> => {
  const res = await fetch("/api/family/invitations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: email }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(getApiErrorMessage(body, "Failed to send invitation"));
  }

  return safeJson<string>(res, "");
};

// POST: accept an invitation -> /api/family/invitations/[code]/accept
export const acceptInvitation = async (
  code: string,
): Promise<{ ok: boolean; status: number; message?: string }> => {
  const res = await fetch(
    `/api/family/invitations/${encodeURIComponent(code)}/accept`,
    { method: "POST" },
  );

  if (res.ok) return { ok: true, status: res.status };

  const body = await res.json().catch(() => ({}));
  return {
    ok: false,
    status: res.status,
    message: getApiErrorMessage(body, "Failed to accept invitation"),
  };
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
