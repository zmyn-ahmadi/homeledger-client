import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Bar } from "@/components/ui/Bar";
import { cn, cap, getTotalExpenseByCategory } from "@/lib/utils";
import { categoryIconMap } from "@/lib/icons";
import { DataCardProps } from "@/lib/types";
import { LuMoveHorizontal } from "react-icons/lu";

export const DataCard = ({ label, data, type, ...props }: DataCardProps) => {
  const totalExpense = type === "budget" ? props.totalExpense : [];
  const categoryMap = type === "budget" ? props.categoryMap : {};

  return (
    <Card variant="light" className="flex flex-col gap-5 p-5">
      <CardHeader>{label}</CardHeader>

      <div className="flex flex-col gap-4 w-full">
        {data.slice(0, 2).map((item, i) => {
          let value = 0;
          let display = "";
          let color: "primary" | "danger" | "success" = "primary";
          let iconKey = "";
          let Icon = LuMoveHorizontal;

          iconKey = item.Icon;
          Icon = categoryIconMap[iconKey] || LuMoveHorizontal;

          if (type === "category") {
            const total = item.Total;

            value = Math.min(Math.abs(total), 100); // temp scaling
            display = `-$${Math.abs(total)}`;
            color = "danger";
          }

          if (type === "budget") {
            const limitAmount = item.LimitAmount;
            const categoryExpense = totalExpense.find(
              (e) => e.CategoryId === item.CategoryId,
            );
            const total = categoryExpense?.Total ?? 0;
            value =
              limitAmount > 0 ? Math.min((total / limitAmount) * 100, 100) : 0;
            display = `${value.toFixed(0)}%`;

            if (value < 50) color = "primary";
            else if (value < 80) color = "danger";
            else color = "danger";

            iconKey = categoryMap[item.CategoryId];
            Icon = categoryIconMap[iconKey];
          }

          return (
            <div key={i} className="flex flex-col gap-2 w-full">
              {/* Top */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/8 bg-white/[0.04]">
                    <Icon className="w-3.5 h-3.5 shrink-0 text-white/70" />
                  </span>
                  <span className="text-sm text-white font-medium">
                    {type === "category" ? cap(item.Category) : cap(item.Name)}
                  </span>
                </div>

                <span
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    type === "category" ? "text-(--error)" : "text-white/70",
                  )}
                >
                  {display}
                </span>
              </div>

              {/* Bar */}
              <Bar orientation="horizontal" color={color} value={value} />
            </div>
          );
        })}
      </div>
    </Card>
  );
};
