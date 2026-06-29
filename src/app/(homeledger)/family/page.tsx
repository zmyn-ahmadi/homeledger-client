"use client";

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

const totalBalance = 35000.0;
const monthlyIncome = 2000.0;
const incomePercent = totalBalance ? (monthlyIncome / totalBalance) * 100 : 0;

const FamilyDashboard = () => {
  const { bills, budgets, loading, error } = useFamilyDashboard();

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
            amount={6200.0}
            type="expense"
            icon={HiArrowSmallDown}
          />
          <InfoPillCard
            header="Income"
            amount={9400.0}
            type="income"
            icon={HiArrowSmallUp}
          />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-stretch gap-4">
        {/* Spending Table of members */}
        <SpendingTable header="Spending Power" className="xl:max-w-md" />

        {/* Activity Feed: user's paying which bills */}
      </div>

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
