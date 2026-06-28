import { Bill, ActivityItem } from "./types";

// ---------------------------------- BILL ---------------------------------------
// Fetch bills for personal from /api/bills
export const fetchBills = async () => {
  const res = await fetch("/api/dashboard/personal/bill", {
    method: "GET",
  });

  if (!res.ok) {
    return;
  }

  const data = await res.json();
  return data;
};

export const postBill = async (data: Omit<Bill, "BillId"> & { BillId?: number }) => {
  try {
    const res = await fetch("/api/dashboard/personal/bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error("Failed to create bill", error);
      return;
    }
    return res.json();
  } catch (err) {
    console.error("Network error: ", err);
  }
};

export const putBill = async (id: number, data: Bill) => {
  try {
    const res = await fetch(`/api/dashboard/personal/bill/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error(`Failed to update bill: ${id}`, error);
      return;
    }
  } catch (err) {
    console.error("Network error: ", err);
  }
};

export const deleteBill = async (id: number) => {
  try {
    const res = await fetch(`/api/dashboard/personal/bill/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      console.error(`Failed to delete bill: ${id}`, error);
      return;
    }
  } catch (err) {
    console.error("Network error", err);
  }
};
// ------------------------------------------------------------------------------------

// ---------------------- TRANSACTIONS -------------------------

export interface fetchTransactionsParams {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCategoryMap: (map: Record<number, string>) => void;
  setActivities: (data: ActivityItem[]) => void;
}
export const fetchTransactions = async ({
  setLoading,
  setError,
  setCategoryMap,
  setActivities,
}: fetchTransactionsParams) => {
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
    setActivities(transactions);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "[fetchTransactions]: Server error",
    );
  } finally {
    setLoading(false);
  }
};
