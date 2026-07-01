"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Expense, SpendingTableProps, MemberExpenseSummary } from "@/lib/types";
import { ExpenseProfile } from "@/components/ExpenseProfile";

export const SpendingTable = ({
  data,
  className,
  header,
}: SpendingTableProps) => {
  const groupedData = Object.values(
    data.reduce<Record<number, MemberExpenseSummary>>((acc, expense) => {
      const memberId = expense.UserId;

      if (!acc[memberId]) {
        acc[memberId] = {
          MemberId: memberId,
          FullName: expense.FullName,
          avatar: "",
          totalAmount: 0,
          expenses: [],
        };
      }

      acc[memberId].totalAmount += expense.Amount;
      acc[memberId].expenses.push(expense);

      return acc;
    }, {}),
  ).sort((a, b) => b.totalAmount - a.totalAmount);

  return (
    <Card variant="dark" className={className}>
      <h1 className="font-label text-[11px] uppercase tracking-[0.14em] font-medium text-white/45">
        {header}
      </h1>

      <div className="flex flex-col items-start gap-4 mt-5">
        {groupedData.map((member) => (
          <ExpenseProfile key={member.MemberId} item={member} />
        ))}
      </div>
    </Card>
  );
};
