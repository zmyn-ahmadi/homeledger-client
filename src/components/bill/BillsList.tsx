// components/BillsList.tsx
"use client";

import { useMemo } from "react";
import { Bill } from "@/types/bill";
import BillRow from "./BillRow";

interface BillsListProps {
    bills: Bill[];
    scope: "personal" | "family";
    searchQuery?: string;
    onMarkPaid?: (id: string) => void;
    onEdit?: (bill: Bill) => void;
    onDelete?: (bill: Bill) => void;
}

const monthKey = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
};

const monthLabel = (iso: string) =>
    new Date(iso).toLocaleDateString("en-AU", { month: "long", year: "numeric" });

const formatCurrency = (n: number) =>
    n.toLocaleString("en-AU", { style: "currency", currency: "AUD" });

export default function BillsList({ bills, scope, searchQuery = "", onMarkPaid, onEdit, onDelete }: BillsListProps) {
    const grouped = useMemo(() => {
        const filtered = bills
            .filter((b) => b.scope === scope)
            .filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

        const groups = new Map<string, { label: string; bills: Bill[]; total: number }>();
        for (const bill of filtered) {
            const key = monthKey(bill.dueDate);
            if (!groups.has(key)) {
                groups.set(key, { label: monthLabel(bill.dueDate), bills: [], total: 0 });
            }
            const g = groups.get(key)!;
            g.bills.push(bill);
            g.total += bill.amount;
        }
        return Array.from(groups.entries());
    }, [bills, scope, searchQuery]);

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
                            key={bill.id}
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