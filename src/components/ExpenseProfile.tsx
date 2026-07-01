import React from "react";
import { Bar } from "@/components/ui/Bar";
import { MemberActivity, MemberExpenseSummary } from "@/lib/types";
import Image from "next/image";

type ExpenseProfileProps = {
  item: MemberExpenseSummary;
};

export const ExpenseProfile = ({ item }: ExpenseProfileProps) => {
  const monthlyExpense = item.totalAmount;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={"/default-avatar.jpg"}
          alt="profile picture"
          width={40}
          height={40}
          className="rounded-full ring-2 ring-(--primary)/50 ring-offset-2 ring-offset-(--bg-surface-container-low) object-cover"
        />
        <div className="flex flex-col item-start gap-0.5 text-sm">
          <h2 className="text-white font-medium capitalize">{item.FullName}</h2>
          <p className="text-xs text-white/40 tabular-nums">
            Spent ${monthlyExpense.toLocaleString()}
          </p>
        </div>
      </div>
      <Bar
        orientation="horizontal"
        color={`${monthlyExpense % 101 > 50 ? "danger" : "primary"}`}
        value={monthlyExpense % 101}
        className="w-[40%]"
      />
    </div>
  );
};
