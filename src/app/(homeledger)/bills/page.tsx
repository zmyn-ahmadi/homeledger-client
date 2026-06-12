// app/bills/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
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

import { fetchBills, postBill, putBill, deleteBill } from "@/lib/api";

const BillsPage = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [billToDelete, setBillToDelete] = useState<Bill | null>(null);

  useEffect(() => {
    const loadBills = async () => {
      const data = await fetchBills();
      setBills(data ?? []);
    };
    loadBills();
  }, []);

  const { totalUpcoming, totalOverdue, totalNotPaid } = useMemo(() => {
    let totalUpcoming = 0;
    let totalOverdue = 0;
    let totalNotPaid = 0;

    for (const b of bills) {
      if (b.Status === "Upcoming") totalUpcoming += b.Amount;
      else if (b.Status === "Overdue") totalOverdue += b.Amount;
      else if (b.Status === "NotPaid") totalNotPaid += b.Amount;
    }
    return { totalUpcoming, totalOverdue, totalNotPaid };
  }, [bills]);

  const scope: "personal" | "family" = activeTab === 0 ? "personal" : "family";

  const handleMarkPaid = async (id: number) => {
    // Find the target bill
    const targetBill = bills.find((b) => b.BillId === id);
    if (!targetBill) return;

    // Create the updated bill obj
    const updatedBill = { ...targetBill, Status: "Paid" };

    // Update the local state
    setBills((prev) => prev.map((b) => (b.BillId === id ? updatedBill : b)));

    // Send the updatedBill object to the server;
    try {
      await putBill(targetBill.BillId, updatedBill);
    } catch (error) {
      console.error("Failed to update bill status on server:", error);
      // Rollback to previous state if the database write fails
      setBills(previousBills);
      alert("Could not update bill status. Please try again.");
    }
  };

  const handleSubmit = async (
    data: Omit<Bill, "BillId"> & { BillId?: number },
  ) => {
    // --- MODE 1: UPDATE AN EXISTING BILL ---
    console.log(data.BillId);
    if (data.BillId) {
      // 1. Capture previous state for an optimistic rollback fallback
      const previousBills = [...bills];

      // 2. Format the updated object to match standard Bill type
      const updatedBill = { ...data } as Bill;

      // 3. Optimistically update local UI instantly
      setBills((prev) =>
        prev.map((b) => (b.BillId === data.BillId ? updatedBill : b)),
      );

      try {
        // 4. Fire the PUT request using data.id
        await putBill(data.BillId, updatedBill);
        setBills(previousBills);
      } catch (error) {
        console.error("Failed to update bill status on server:", error);
        setBills(previousBills);
        alert("Could not update bill status. Please try again.");
      }

      setEditingBill(null);
      return;
    }

    // --- MODE 2: CREATE A NEW BILL ---
    let status: BillStatus = "NotPaid";
    const curr_date = new Date();
    const due_date = new Date(data.DueDate);

    if (due_date < curr_date) status = "Overdue";
    else if (due_date > curr_date) status = "Upcoming";

    try {
      // 1. Send creation data to database, capturing response with its new ID
      const newBill = await postBill({ ...data, Status: status });
      if (!newBill) return;

      // 2. Append new server-verified object to the local list seamlessly
      setBills((prev) => [...prev, newBill]);
    } catch (error) {
      console.error("Failed to save bill:", error);
    }
  };

  const handleDelete = async () => {
    if (!billToDelete) return;
    setBills((prev) => prev.filter((b) => b.BillId !== billToDelete.BillId));

    try {
      await deleteBill(billToDelete.BillId);
    } catch (error) {
      console.error("Failed to delete bill:", error);
    }

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
            balance={totalUpcoming}
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
