// app/bills/page.tsx
"use client";

import { useState } from "react";
import { BalanceCard } from "@/components/BalanceCard";
import PillSwitcher from "@/components/bill/TabSwitcher";
import BillsList from "@/components/bill/BillsList";
import BillForm from "@/components/bill/BillForm";
import ConfirmDialog from "@/components/bill/ConfirmDialog";
import { Bill } from "@/types/bill";
import { IoIosSearch } from "react-icons/io";

const MOCK_BILLS: Bill[] = [
    { id: "1", name: "Rent",     amount: 850,    dueDate: "2026-05-10", status: "upcoming", paidBy: "Zee", scope: "personal" },
    { id: "2", name: "Internet", amount: 79,     dueDate: "2026-05-03", status: "overdue",  paidBy: "Zee", scope: "personal" },
    { id: "3", name: "Spotify",  amount: 11.99,  dueDate: "2026-05-01", status: "paid",     paidBy: "Zee", scope: "personal" },
    { id: "4", name: "Mortgage", amount: 2200,   dueDate: "2026-05-12", status: "upcoming", paidBy: "Sam", scope: "family"   },
];

const BillsPage = () => {
    const [bills, setBills] = useState<Bill[]>(MOCK_BILLS);
    const [activeTab, setActiveTab] = useState(0);
    const [search, setSearch] = useState("");
    const [editingBill, setEditingBill] = useState<Bill | null>(null);
    const [billToDelete, setBillToDelete] = useState<Bill | null>(null);

    const scope: "personal" | "family" = activeTab === 0 ? "personal" : "family";

    const handleMarkPaid = (id: string) => {
        setBills((prev) => prev.map((b) => b.id === id ? { ...b, status: "paid" } : b));
    };

    const handleSubmit = (data: Omit<Bill, "id"> & { id?: string }) => {
        if (data.id) {
            // Update
            setBills((prev) => prev.map((b) => b.id === data.id ? { ...b, ...data } as Bill : b));
        } else {
            // Create
            const newBill: Bill = { ...data, id: crypto.randomUUID() };
            setBills((prev) => [...prev, newBill]);
        }
        setEditingBill(null);
    };

    const handleDelete = () => {
        if (!billToDelete) return;
        setBills((prev) => prev.filter((b) => b.id !== billToDelete.id));
        setBillToDelete(null);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col items-start gap-1 text-white">
                    <h1 className="font-sans text-4xl font-bold">Bills Management</h1>
                    <p className="font-label text-white/50">Track and manage your recurring commitments</p>
                </div>
                <div className="flex items-center gap-5">
                    <BalanceCard header="Personal Upcoming" balance={1240} stat="3 Bills Due this week" badgeLabel="Next Rent (May 10)" />
                    <BalanceCard header="Family Upcoming"  balance={2850} stat="5 Shared Bills"        badgeLabel="Pending Mortgage (May 12)" />
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
                    <>Are you sure you want to delete <b className="text-white">{billToDelete?.name}</b>? This cannot be undone.</>
                }
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setBillToDelete(null)}
            />
        </div>
    );
};

export default BillsPage;