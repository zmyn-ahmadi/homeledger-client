"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import PillSwitcher from "@/components/bill/TabSwitcher";
import { Activities } from "@/lib/data";
import { ActivityItem } from "@/lib/types";
import { IoIosSearch } from "react-icons/io";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuMoveHorizontal } from "react-icons/lu";
import { cap } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";

import { categoryIconMap } from "@/lib/icons";

type Filter = "all" | "income" | "expense";

const formatCurrency = (t: type, n: number) =>
  `${t === "income" ? "+" : "-"}$${Math.abs(n).toLocaleString("en-AU", { minimumFractionDigits: 2 })}`;

const Page = () => {
  const [activities, setActivities] = useState([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const [transRes, catRes] = await Promise.all([
        fetch("/api/dashboard/personal/transactions"),
        fetch("/api/category"),
      ]);

      if (!transRes.ok) {
        setError("Failed to load transactions");
        return;
      }
      if (!catRes.ok) {
        setError("Failed to load categories");
        return;
      }

      const [transactions, cats] = await Promise.all([
        transRes.json(),
        catRes.json(),
      ]);

      // build a map: { 1: icon ...}
      const map: Record<number, string> = {};
      for (const c of cats) {
        map[c.CategoryId] = c.Icon;
      }

      setCategoryMap(map);
      setActivities(transactions);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "[fetchTransactions]: Server error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    return activities
      .filter((t) => {
        if (filter === "income") return t.type == "income";
        if (filter === "expense") return t.type == "expense";
        return true;
      })
      .filter((t) =>
        t.Description.toLowerCase().includes(search.toLowerCase()),
      );
  }, [activities, filter, search]);

  const totals = useMemo(() => {
    const income = activities
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.Amount, 0);

    const expense = activities
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + Math.abs(t.Amount), 0);
    return { income, expense, net: income - expense };
  }, [activities]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Money flow"
        title="Transactions"
        subtitle="Every dollar in and out, in one place"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="light" className="gap-4">
          <CardHeader>Total Income</CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-(--primary)/15 p-2 rounded-full">
              <HiArrowSmallUp className="text-(--primary) w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl text-white font-semibold tracking-tight tabular-nums">
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
            <h2 className="text-2xl md:text-3xl text-white font-semibold tracking-tight tabular-nums">
              ${totals.expense.toLocaleString()}
            </h2>
          </div>
        </Card>

        <Card variant="light" className="gap-4">
          <CardHeader>Net Flow</CardHeader>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl text-white font-semibold tracking-tight tabular-nums">
              ${totals.net.toLocaleString()}
            </h2>
            <Badge variant="info">{activities.length} txns</Badge>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <PillSwitcher
          options={["All", "Income", "Expenses"]}
          defaultIndex={0}
          onChange={(i) =>
            setFilter(i === 1 ? "income" : i === 2 ? "expense" : "all")
          }
        />

        <div className="relative w-full sm:w-64">
          <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-full border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
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
              const iicon = categoryMap[t.CategoryId]; // Icon: xxx
              const Icon = categoryIconMap[iicon] ?? LuMoveHorizontal;
              const isIncome = t.type === "income";
              const theDate = new Date(t.Date);
              const hours = theDate.getHours();

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
                        {cap(t.Description)}
                      </span>
                      <span className="text-xs text-white/50">{`${t.Note} - ${hours}hr ago`}</span>
                    </div>
                  </div>

                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      isIncome ? "text-(--primary)" : "text-(--error)"
                    }`}
                  >
                    {formatCurrency(t.type, t.Amount)}
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
