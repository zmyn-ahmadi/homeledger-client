// components/BillsList.tsx
"use client";

import { useMemo } from "react";
import { Bill } from "@/types/bill";
import BillRow from "./BillRow";

interface BillsListProps {
  bills: Bill[];
  scope: "personal" | "family";
  searchQuery?: string;
  onMarkPaid?: (id: number) => void;
  onEdit?: (bill: Bill) => void;
  onDelete?: (bill: Bill) => void;
}

const monthKey = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const monthLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-AU", { month: "long", year: "numeric" });

const formatCurrency = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD" });

export default function BillsList({
  bills,
  scope,
  searchQuery = "",
  onMarkPaid,
  onEdit,
  onDelete,
}: BillsListProps) {
  const grouped = useMemo(() => {
    const filtered = bills
      .filter((b) => {
        // 1. scope comparison
        const matchScope = b.Scope.toLowerCase() === scope.toLowerCase();

        // 2. Check if name includes search query string
        const matchSearch = b.Name.toLowerCase().includes(
          searchQuery.toLowerCase(),
        );

        // 3. must match both conditions
        return matchScope && matchSearch;
      })
      .sort((a, b) => a.DueDate.localeCompare(b.DueDate));

    const groups = new Map<
      string,
      { label: string; bills: Bill[]; total: number }
    >();

    for (const bill of filtered) {
      const key = monthKey(bill.DueDate);
      if (!groups.has(key)) {
        groups.set(key, {
          label: monthLabel(bill.DueDate),
          bills: [],
          total: 0,
        });
      }
      const g = groups.get(key)!;
      g.bills.push(bill);
      g.total += bill.Amount;
    }
    return Array.from(groups.entries());
  }, [bills, searchQuery, scope]);

  if (grouped.length === 0) {
    return (
      <div className="text-center py-12 text-white/40 text-sm">
        No bills found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {grouped.map(([key, group]) => (
        <div key={key} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
              {group.label}
            </span>
            <span className="text-xs font-medium text-white/50 tabular-nums">
              {formatCurrency(group.total)}
            </span>
          </div>
          {group.bills.map((bill) => (
            <BillRow
              key={bill.Name}
              bill={bill}
              onMarkPaid={onMarkPaid}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
