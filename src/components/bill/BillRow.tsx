// components/BillRow.tsx
"use client";

import { Bill } from "@/types/bill";
import RowMenu from "./RowMenu";

interface BillRowProps {
  bill: Bill;
  onMarkPaid?: (id: number) => void;
  onEdit?: (bill: Bill) => void;
  onDelete?: (bill: Bill) => void;
}

const statusStyles: Record<Bill["Status"], string> = {
  Upcoming: "bg-(--warning)/10 text-(--warning)",
  Overdue: "bg-(--error)/15 text-(--error)",
  Paid: "bg-(--primary)/15 text-(--primary)",
  NotPaid: "bg-white/10 text-white/60",
};

const formatCurrency = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD" });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-AU", { month: "short", day: "2-digit" });

export default function BillRow({
  bill,
  onMarkPaid,
  onEdit,
  onDelete,
}: BillRowProps) {
  const isPaid = bill.Status === "Paid";

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3.5 transition-colors hover:bg-white/[0.06]">
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="text-sm font-medium text-white truncate">
          {bill.Name}
        </span>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>{formatDate(bill.DueDate)}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
          {/* Next Bill date => RecurringFrequency(weekly, monthly) */}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${statusStyles[bill.Status]}`}
        >
          {bill.Status}
        </span>
        <span className="text-sm font-semibold text-white tabular-nums min-w-[72px] text-right">
          {formatCurrency(bill.Amount)}
        </span>
        <button
          onClick={() => !isPaid && onMarkPaid?.(bill.BillId)}
          disabled={isPaid}
          className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
            isPaid
              ? "bg-white/5 text-white/30 cursor-not-allowed"
              : "bg-(--primary)/15 text-(--primary) hover:bg-(--primary)/25"
          }`}
        >
          Mark paid
        </button>
        <RowMenu
          onEdit={() => onEdit?.(bill)}
          onDelete={() => onDelete?.(bill)}
        />
      </div>
    </div>
  );
}
