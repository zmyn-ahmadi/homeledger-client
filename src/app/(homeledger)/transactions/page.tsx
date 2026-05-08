"use client";

import { useMemo, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import PillSwitcher from "@/components/bill/TabSwitcher";
import { Activities } from "@/lib/data";
import { ActivityItem } from "@/lib/types";
import { IoIosSearch } from "react-icons/io";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type Filter = "all" | "income" | "expense";

const formatCurrency = (n: number) =>
    `${n < 0 ? "-" : "+"}$${Math.abs(n).toLocaleString("en-AU", { minimumFractionDigits: 2 })}`;

const Page = () => {
    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return Activities
            .filter((t) => {
                if (filter === "income") return t.amount > 0;
                if (filter === "expense") return t.amount < 0;
                return true;
            })
            .filter((t) =>
                t.name.toLowerCase().includes(search.toLowerCase())
            );
    }, [filter, search]);

    const totals = useMemo(() => {
        const income = Activities
            .filter((t) => t.amount > 0)
            .reduce((acc, t) => acc + t.amount, 0);
        const expense = Activities
            .filter((t) => t.amount < 0)
            .reduce((acc, t) => acc + Math.abs(t.amount), 0);
        return { income, expense, net: income - expense };
    }, []);

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col items-start gap-1 text-white">
                <h1 className="font-sans text-4xl font-bold">Transactions</h1>
                <p className="font-label text-white/50">
                    Every dollar in and out, in one place
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-5">
                <Card variant="light" className="gap-4">
                    <CardHeader>Total Income</CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="bg-(--primary)/15 p-2 rounded-full">
                            <HiArrowSmallUp className="text-(--primary) w-5 h-5" />
                        </div>
                        <h2 className="text-3xl text-white font-bold tracking-tight">
                            ${totals.income.toLocaleString()}
                        </h2>
                    </div>
                </Card>

                <Card variant="light" className="gap-4">
                    <CardHeader>Total Expenses</CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="bg-(--error)/20 p-2 rounded-full">
                            <HiArrowSmallDown className="text-(--error) w-5 h-5" />
                        </div>
                        <h2 className="text-3xl text-white font-bold tracking-tight">
                            ${totals.expense.toLocaleString()}
                        </h2>
                    </div>
                </Card>

                <Card variant="light" className="gap-4">
                    <CardHeader>Net Flow</CardHeader>
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl text-white font-bold tracking-tight">
                            ${totals.net.toLocaleString()}
                        </h2>
                        <Badge variant="info">{Activities.length} txns</Badge>
                    </div>
                </Card>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
                <PillSwitcher
                    options={["All", "Income", "Expenses"]}
                    defaultIndex={0}
                    onChange={(i) =>
                        setFilter(i === 1 ? "income" : i === 2 ? "expense" : "all")
                    }
                />

                <div className="relative">
                    <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search transactions"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-3 py-2 rounded-full bg-white/5 text-sm text-white placeholder:text-white/40 outline-none focus:bg-white/10 transition-colors"
                    />
                </div>
            </div>

            {/* Transactions list */}
            <Card variant="dark" className="gap-2">
                <div className="flex items-start justify-between">
                    <CardHeader className="text-left">All Transactions</CardHeader>
                    <HiOutlineDotsHorizontal className="text-white shrink-0" />
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-12 text-white/40 text-sm">
                        No transactions found
                    </div>
                ) : (
                    <div className="flex flex-col gap-1.5 mt-2">
                        {filtered.map((t: ActivityItem, i) => {
                            const Icon = t.icon;
                            const isIncome = t.amount > 0;
                            return (
                                <div
                                    key={`${t.name}-${i}`}
                                    className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3.5 transition-colors hover:bg-white/[0.06]"
                                >
                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                        <div className="bg-(--bg-surface-container-highest) p-2.5 rounded-full">
                                            <Icon className="text-white w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="text-sm font-medium text-white truncate">
                                                {t.name}
                                            </span>
                                            <span className="text-xs text-white/50">
                                                {t.status}
                                            </span>
                                        </div>
                                    </div>

                                    <span
                                        className={`text-sm font-semibold tabular-nums ${
                                            isIncome ? "text-(--primary)" : "text-(--error)"
                                        }`}
                                    >
                                        {formatCurrency(t.amount)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Page;
