// TODO:
// 1. add 'Status' entry into Bill model
// 2. Implement "Mark Paid" button in BillList -> it should change the status = paid

// app/bills/page.tsx
"use client";

import { useState, useEffect } from "react";
import { BalanceCard } from "@/components/BalanceCard";
import PillSwitcher from "@/components/bill/TabSwitcher";
import BillsList from "@/components/bill/BillsList";
import BillForm from "@/components/bill/BillForm";
import ConfirmDialog from "@/components/bill/ConfirmDialog";
import { Bill } from "@/types/bill";
import { IoIosSearch } from "react-icons/io";
import {
  RecurringFrequency,
  RecurringFrequencyType,
  FREQUENCY_LABELS,
} from "@/lib/types";

const BillsPage = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [billToDelete, setBillToDelete] = useState<Bill | null>(null);

  // Fetch bills for personal from /api/bills
  const fetchBills = async () => {
    const res = await fetch("/api/dashboard/personal/bill", {
      method: "GET",
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();
    setBills(data);
  };

  const postBill = async (data: Bill) => {
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
    } catch (err) {
      console.error("Network error: ", err);
    }
  };

  const putBill = async (id: number, data: Bill) => {
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

  useEffect(() => {
    fetchBills();
  }, []);

  const scope: "personal" | "family" = activeTab === 0 ? "personal" : "family";

  const handleMarkPaid = async (id: number) => {
    // Find the target bill
    const targetBill = bills.find((b) => b.BillId === id);
    console.log(targetBill);

    if (!targetBill) return;

    // Create the updated bill obj
    const updatedBill = { ...targetBill, Status: "Paid" as const };

    // Update the local state
    setBills((prev) => prev.map((b) => (b.BillId === id ? updatedBill : b)));

    // Send the updatedBill object to the server;
    await putBill(targetBill.BillId, updatedBill);
  };

  const handleSubmit = async (data: Omit<Bill, "BillId"> & { id?: string }) => {
    if (data.BillId) {
      // Update
      setBills((prev) =>
        prev.map((b) =>
          b.BillId === data.BillId ? ({ ...b, ...data } as Bill) : b,
        ),
      );
    } else {
      await postBill(data);
      // Create
      // const newBill: Bill = { ...data, id: crypto.randomUUID() };
      // setBills((prev) => [...prev, newBill]);
    }
    setEditingBill(null);
  };

  const handleDelete = () => {
    if (!billToDelete) return;
    setBills((prev) => prev.filter((b) => b.BillId !== billToDelete.BillId));
    setBillToDelete(null);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-1 text-white">
          <h1 className="font-sans text-4xl font-bold">Bills Management</h1>
          <p className="font-label text-white/50">
            Track and manage your recurring commitments
          </p>
        </div>
        <div className="flex items-center gap-5">
          <BalanceCard
            header="Personal Upcoming"
            balance={1240}
            stat="3 Bills Due this week"
            badgeLabel="Next Rent (May 10)"
          />
          <BalanceCard
            header="Family Upcoming"
            balance={2850}
            stat="5 Shared Bills"
            badgeLabel="Pending Mortgage (May 12)"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <PillSwitcher
          options={["Personal Bills", "Family Bills"]}
          defaultIndex={activeTab}
          onChange={(i) => setActiveTab(i)}
        />
        <div className="relative">
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search bills"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-3 py-2 rounded-full bg-white/5 text-sm text-white placeholder:text-white/40 outline-none focus:bg-white/10 transition-colors"
          />
        </div>
      </div>

      {/* Add / Edit form */}
      <BillForm
        scope={scope}
        initialBill={editingBill}
        onSubmit={handleSubmit}
        onCancel={() => setEditingBill(null)}
      />

      {/* List */}
      <BillsList
        bills={bills}
        scope={scope}
        searchQuery={search}
        onMarkPaid={handleMarkPaid}
        onEdit={(bill) => setEditingBill(bill)}
        onDelete={(bill) => setBillToDelete(bill)}
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!billToDelete}
        title="Delete bill?"
        message={
          <>
            Are you sure you want to delete{" "}
            <b className="text-white">{billToDelete?.name}</b>? This cannot be
            undone.
          </>
        }
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setBillToDelete(null)}
      />
    </div>
  );
};

export default BillsPage;
