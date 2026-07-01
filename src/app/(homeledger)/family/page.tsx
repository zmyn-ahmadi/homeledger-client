"use client";

import { useMemo } from "react";
import { StatCard } from "@/components/StatCard";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import { BalanceCard } from "@/components/BalanceCard";
import { InfoPillCard } from "@/components/InfoPillCard";
import { MiscCard } from "@/components/MiscCard";
import { SpendingTable } from "@/components/SpendingTable";
import { Card, CardHeader } from "@/components/ui/Card";
import { LuReceipt, LuWallet } from "react-icons/lu";
import { PageHeader } from "@/components/PageHeader";
import { useFamilyDashboard } from "@/hooks/useFamilyDashboard";

const FamilyDashboard = () => {
  const { bills, budgets, incomes, expenses, loading, error } =
    useFamilyDashboard();

  const now = new Date();

  const monthlyExpense = expenses
    .filter((e) => {
      const date = new Date(e.Date);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((total, e) => total + Number(e.Amount), 0);

  const monthlyIncome = incomes
    .filter((i) => {
      const date = new Date(i.Date);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((total, i) => total + Number(i.Amount), 0);

  const totalExpenses = expenses.reduce(
    (total, e) => total + Number(e.Amount),
    0,
  );

  const totalIncome = incomes.reduce((total, i) => total + Number(i.Amount), 0);

  const totalBalance = totalIncome - totalExpenses;

  const incomePercent =
    monthlyIncome === 0
      ? 0
      : Math.min((monthlyIncome / totalIncome) * 100, 100);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Household"
        title="Family Dashboard"
        subtitle="Shared spending across your household"
      />

      {/* Top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* Total Balance */}
        <BalanceCard
          header={"Total Balance"}
          balance={totalBalance}
          stat={5.2}
          badgeLabel="vs. last month"
          className="sm:col-span-2 xl:col-span-3"
        />
        <StatCard
          symbol={HiArrowSmallDown}
          header="Monthly Income"
          amount={monthlyIncome}
          barValue={incomePercent}
        />
        <div className="flex flex-col gap-4">
          <InfoPillCard
            header="Expenses"
            amount={monthlyExpense}
            type="expense"
            icon={HiArrowSmallDown}
          />
          <InfoPillCard
            header="Income"
            amount={totalIncome}
            type="income"
            icon={HiArrowSmallUp}
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-stretch gap-4">
        {/* Spending Table of members */}
        {/*
            - a profile pic -> for now just empty avatar
            - Full name
            - Pass the whole Expense

          */}

        {/*<SpendingTable header="Spending Power" className="xl:max-w-md" />*/}
        <SpendingTable
          data={expenses}
          header="Spending Power"
          className="xl:max-w-md"
        />

        {/* Activity Feed: user's paying which bills */}

        {/* Family Bills */}
        <Card variant="dark" className="gap-6">
          <div className="flex items-center justify-between">
            <CardHeader className="text-left">Family Bills</CardHeader>
            <span className="text-xs text-white/40">{bills.length} bills</span>
          </div>

          {loading ? (
            <p className="text-sm text-white/40">Loading family bills…</p>
          ) : bills.length === 0 ? (
            <p className="text-sm text-white/40">No family bills yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bills.map((bill) => (
                <MiscCard
                  key={bill.BillId}
                  icon={LuReceipt}
                  name={bill.Name}
                  amount={bill.Amount}
                  status={bill.Status}
                />
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Family Budgets */}
      <Card variant="dark" className="gap-6">
        <div className="flex items-center justify-between">
          <CardHeader className="text-left">Family Budgets</CardHeader>
          <span className="text-xs text-white/40">
            {budgets.length} budgets
          </span>
        </div>

        {loading ? (
          <p className="text-sm text-white/40">Loading family budgets…</p>
        ) : budgets.length === 0 ? (
          <p className="text-sm text-white/40">No family budgets yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {budgets.map((budget) => (
              <MiscCard
                key={budget.BudgetId}
                icon={LuWallet}
                name={budget.Name}
                amount={budget.LimitAmount}
                status={budget.Period}
              />
            ))}
          </div>
        )}
      </Card>

      {error && <p className="text-sm text-(--error)">{error}</p>}
    </div>
  );
};
export default FamilyDashboard;
