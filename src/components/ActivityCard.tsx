import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ActivityCardProps, BillItem, ActivityItem } from "@/lib/types";
import { LuMoveHorizontal } from "react-icons/lu";
import { categoryIconMap } from "@/lib/icons";

export const ActivityCard = (props: ActivityCardProps) => {
  const { label, data, type, categoryMap } = props;
  const infoCardVariant = type === "bills" ? "upcoming" : "normal";

  return (
    <Card variant="dark" className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <CardHeader className="text-left">{label}</CardHeader>
        <HiOutlineDotsHorizontal className="text-white/40 shrink-0" />
      </div>

      <div className="flex flex-col items-start gap-2 w-full">
        {type === "bills"
          ? (data as BillItem[]).slice(0, 2).map((item) => {
              const { Name, status, Amount, CategoryId } = item;
              const iconKey = CategoryId ? categoryMap[CategoryId] : ""; // Icon
              const Icon = categoryIconMap[iconKey] ?? LuMoveHorizontal;

              return (
                <InfoCard
                  key={item.BillId}
                  variant={infoCardVariant}
                  className="w-full"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/8 bg-white/[0.04]">
                      {Icon && <Icon className="text-white/80 w-4 h-4" />}
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="text-sm text-white font-medium">{Name}</p>
                      <span className="text-xs text-white/40 font-label">
                        {status}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-(--error)">
                    -${Amount}
                  </span>
                </InfoCard>
              );
            })
          : (data as ActivityItem[]).slice(0, 2).map((item, i) => {
              const {
                Description,
                status,
                Amount,
                CategoryId,
                type: itemType,
              } = item;
              const isIncome = itemType === "income";
              const amountLabel = isIncome ? `+$${Amount}` : `-$${Amount}`;

              const iconKey = categoryMap[CategoryId]; // Icon
              const Icon = categoryIconMap[iconKey] ?? LuMoveHorizontal;

              return (
                <InfoCard
                  key={item.ExpenseId + i ?? item.IncomeId + i}
                  variant={infoCardVariant}
                  className="w-full"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/8 bg-white/[0.04]">
                      {Icon && <Icon className="text-white/80 w-4 h-4" />}
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="text-sm text-white font-medium">
                        {Description}
                      </p>
                      <span className="text-xs text-white/40 font-label">
                        {status}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      isIncome ? "text-(--primary)" : "text-(--error)"
                    }`}
                  >
                    {amountLabel}
                  </span>
                </InfoCard>
              );
            })}
      </div>
    </Card>
  );
};
