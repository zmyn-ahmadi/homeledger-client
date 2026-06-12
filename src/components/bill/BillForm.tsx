// components/BillForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Bill } from "@/types/bill";
import { IoAdd, IoClose } from "react-icons/io5";
import { RecurringFrequencySelect } from "@/components/RecurringFrequencySelect";
import {
  RecurringFrequency,
  RecurringFrequencyType,
  FREQUENCY_LABELS,
} from "@/lib/types";

interface BillFormProps {
  scope: "personal" | "family";
  initialBill?: Bill | null; // when set, form is in edit mode
  onSubmit: (bill: Omit<Bill, "BillId"> & { BillId?: number }) => void;
  onCancel?: () => void;
  forceOpen?: boolean; // open from external trigger (edit)
}

export default function BillForm({
  scope,
  initialBill,
  onSubmit,
  onCancel,
  forceOpen,
}: BillFormProps) {
  const [open, setOpen] = useState(false);

  // form fields
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [recurringFrequency, setRecurringFrequency] =
    useState<RecurringFrequencyType>(RecurringFrequency.WEEKLY);
  const [notes, setNotes] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  // Sync with edit mode
  useEffect(() => {
    if (initialBill) {
      setOpen(true);
      setName(initialBill.Name);
      setAmount(String(initialBill.Amount));
      setDueDate(initialBill.DueDate.split("T")[0]);
      setNotes(initialBill.Notes ?? "");
      setIsPaid(initialBill.Status === "Paid");

      // Map backend frequency label back to the select's key
      const freqKey = Object.entries(FREQUENCY_LABELS).find(
        ([, label]) => label === initialBill.RecurringFrequency,
      )?.[0] as RecurringFrequencyType | undefined;
      setRecurringFrequency(freqKey ?? RecurringFrequency.WEEKLY);
    }
  }, [initialBill]);

  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  const reset = () => {
    setName("");
    setAmount("");
    setDueDate("");
    setRecurringFrequency(RecurringFrequency.WEEKLY);
    setNotes("");
    setIsPaid(false);
  };

  const handleSubmit = () => {
    if (
      !name ||
      !amount ||
      !dueDate ||
      recurringFrequency === undefined ||
      recurringFrequency === null ||
      recurringFrequency === "" ||
      !scope
    )
      return;
    const localDate = new Date(dueDate);
    onSubmit({
      ...(initialBill ? { BillId: initialBill.BillId } : {}),
      Name: name,
      Amount: parseFloat(amount),
      DueDate: localDate.toISOString(),
      RecurringFrequency: FREQUENCY_LABELS[recurringFrequency],
      Notes: notes,
      Scope: scope,
    });
    reset();
    setOpen(false);
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
    onCancel?.();
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center text-sm font-semibold">
            <IoAdd />
          </span>
          <span className="text-sm font-medium text-white/70">
            Add a new bill
          </span>
        </div>
      </button>
    );
  }

  const isEdit = !!initialBill;

  return (
    <div className="flex flex-col gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center text-sm font-semibold">
            <IoAdd />
          </span>
          <span className="text-sm font-medium text-white">
            {isEdit ? "Edit bill" : "New bill"}
          </span>
        </div>
        <button
          onClick={handleCancel}
          className="text-white/40 hover:text-white"
        >
          <IoClose className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (e.g. Rent)"
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-blue-500"
        />
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-blue-500"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-blue-500"
        />
        <RecurringFrequencySelect
          value={recurringFrequency}
          onChange={setRecurringFrequency}
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-blue-500"
        />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-blue-500"
        />
        <label className="flex items-center gap-2 text-sm text-white text-">
          <input
            type="checkbox"
            value={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            placeholder="Is paid?"
            className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-blue-500"
          />
          Is paid?
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="text-xs font-medium px-3.5 py-1.5 rounded-full text-white/50 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
        >
          {isEdit ? "Save changes" : "Add bill"}
        </button>
      </div>
    </div>
  );
}
