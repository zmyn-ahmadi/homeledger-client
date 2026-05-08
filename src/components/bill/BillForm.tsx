// components/BillForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Bill } from "@/types/bill";
import { IoAdd, IoClose } from "react-icons/io5";

interface BillFormProps {
    scope: "personal" | "family";
    initialBill?: Bill | null;       // when set, form is in edit mode
    onSubmit: (bill: Omit<Bill, "id"> & { id?: string }) => void;
    onCancel?: () => void;
    forceOpen?: boolean;              // open from external trigger (edit)
}

export default function BillForm({ scope, initialBill, onSubmit, onCancel, forceOpen }: BillFormProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [paidBy, setPaidBy] = useState("");

    // Sync with edit mode
    useEffect(() => {
        if (initialBill) {
            setOpen(true);
            setName(initialBill.name);
            setAmount(String(initialBill.amount));
            setDueDate(initialBill.dueDate);
            setPaidBy(initialBill.paidBy);
        }
    }, [initialBill]);

    useEffect(() => {
        if (forceOpen) setOpen(true);
    }, [forceOpen]);

    const reset = () => {
        setName(""); setAmount(""); setDueDate(""); setPaidBy("");
    };

    const handleSubmit = () => {
        if (!name || !amount || !dueDate || !paidBy) return;
        onSubmit({
            id: initialBill?.id,
            name,
            amount: parseFloat(amount),
            dueDate,
            paidBy,
            scope,
            status: initialBill?.status ?? "upcoming",
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
                    <span className="text-sm font-medium text-white/70">Add a new bill</span>
                </div>
            </button>
        );
    }

    const isEdit = !!initialBill;

    return (
        <div className="flex flex-col gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center text-sm font-semibold">
            <IoAdd />
          </span>
                    <span className="text-sm font-medium text-white">
            {isEdit ? "Edit bill" : "New bill"}
          </span>
                </div>
                <button onClick={handleCancel} className="text-white/40 hover:text-white">
                    <IoClose className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-2">
                <input
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
                <input
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                    placeholder="Paid by"
                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-blue-500"
                />
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