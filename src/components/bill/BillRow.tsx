// components/BillRow.tsx
"use client";

import { Bill } from "@/types/bill";

interface BillRowProps {
    bill: Bill;
    onMarkPaid?: (id: string) => void;
}

const statusStyles: Record<Bill["status"], string> = {
    upcoming: "bg-blue-500/15 text-blue-400",
    overdue:  "bg-red-500/15 text-red-400",
    paid:     "bg-emerald-500/15 text-emerald-400",
};

const formatCurrency = (n: number) =>
    n.toLocaleString("en-AU", { style: "currency", currency: "AUD" });

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-AU", { month: "short", day: "2-digit" });

export default function BillRow({ bill, onMarkPaid }: BillRowProps) {
    const isPaid = bill.status === "paid";

    return (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3.5 transition-colors hover:bg-white/[0.06]">
            <div className="flex flex-col gap-1 min-w-0 flex-1">
                <span className="text-sm font-medium text-white truncate">{bill.name}</span>
                <div className="flex items-center gap-2 text-xs text-white/50">
                    <span>{formatDate(bill.dueDate)}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                    <span className="text-white/60">Paid by {bill.paidBy}</span>
                </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${statusStyles[bill.status]}`}>
          {bill.status}
        </span>
                <span className="text-sm font-semibold text-white tabular-nums">
          {formatCurrency(bill.amount)}
        </span>
                <button
                    onClick={() => !isPaid && onMarkPaid?.(bill.id)}
                    disabled={isPaid}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                        isPaid
                            ? "bg-white/5 text-white/30 cursor-not-allowed"
                            : "bg-white text-black hover:bg-white/90"
                    }`}
                >
                    Mark paid
                </button>
            </div>
        </div>
    );
}