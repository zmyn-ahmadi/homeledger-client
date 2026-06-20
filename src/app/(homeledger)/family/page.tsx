"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/StatCard";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import { Bills } from "@/lib/data";
import { BalanceCard } from "@/components/BalanceCard";
import { InfoPillCard } from "@/components/InfoPillCard";
import { MiscCard } from "@/components/MiscCard";
import { generateUsers, SpendingTable } from "@/components/SpendingTable";
import { GoHome } from "react-icons/go";
import { FaUtensils, FaShoppingCart } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { transactionItem, User } from "@/lib/types";
import { TransactionCard } from "@/components/TransactionCard";
import { PageHeader } from "@/components/PageHeader";
import { fetchBills, fetchTransactions } from "@/lib/api";

const totalBalance = 35000.0;
const monthlyIncome = 2000.0;
const incomePercent = totalBalance ? (monthlyIncome / totalBalance) * 100 : 0;

const FamilyDashboard = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadBills = async () => {
      const data = await fetchBills();
      setBills(data ?? []);
    };
    loadBills();
  }, []);

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
        {/*
        <TransactionCard
          header="Family Activity Feed"
          transactions={transactions}
        />
*/}

        {/* Side cards */}
        <SpendingTable header="Spending Power" className="xl:max-w-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/*{Bills.map(({ icon, name, status, amount }) => (
          <MiscCard
            key={name}
            icon={icon}
            name={name}
            status={status}
            amount={amount}
          />
        ))}
        */}
      </div>
    </div>
  );
};
export default FamilyDashboard;
