import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { Badge } from "@/components/ui/Badge";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ActivityCardProps } from "@/lib/types";
import { LuMoveHorizontal } from "react-icons/lu";
import { categoryIconMap } from "@/lib/icons";

export const ActivityCard = (props: ActivityCardProps) => {
  const { label, data, type, categoryMap } = props;
  const infoCardVariant = type === "bills" ? "upcoming" : "normal";

  return (
    <Card variant="dark" className="flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <CardHeader className="text-left">{label}</CardHeader>
        <HiOutlineDotsHorizontal className="text-white shrink-0" />
      </div>

      <div className="flex flex-col items-start gap-4 w-full">
        {type === "bills"
          ? (data as BillItem[]).slice(0, 2).map((item) => {
              const { Name, status, Amount, CategoryId } = item;
              const badgeVariant =
                status === "paid"
                  ? "positive"
                  : status === "upcoming"
                    ? "negative"
                    : "neutral";

              const iconKey = categoryMap[CategoryId]; // Icon
              const Icon = categoryIconMap[iconKey] ?? LuMoveHorizontal;

              return (
                <InfoCard
                  key={item.BillId}
                  variant={infoCardVariant}
                  className="w-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-(--bg-surface-container-highest) p-2 rounded-full">
                      {Icon && <Icon className="text-white" />}
                    </div>
                    <div className="flex flex-col items-start text-sm">
                      <p className="text-white font-medium font-label">
                        {Name}
                      </p>
                      <Badge variant="neutral" className="-mt-1 font-bold">
                        {status}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant={badgeVariant} className="text-sm font-bold">
                    -${Amount}
                  </Badge>
                </InfoCard>
              );
            })
          : (data as ActivityItem[]).slice(0, 2).map((item) => {
              const {
                Description,
                status,
                Amount,
                CategoryId,
                type: itemType,
              } = item;
              const amountLabel =
                itemType === "income" ? `+$${Amount}` : `-$${Amount}`;

              const iconKey = categoryMap[CategoryId]; // Icon
              const Icon = categoryIconMap[iconKey] ?? LuMoveHorizontal;

              return (
                <InfoCard
                  key={item.ExpenseId ?? item.IncomeId}
                  variant={infoCardVariant}
                  className="w-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-(--bg-surface-container-highest) p-2 rounded-full">
                      {Icon && <Icon className="text-white" />}
                    </div>
                    <div className="flex flex-col items-start text-sm">
                      <p className="text-white font-medium font-label">
                        {Description}
                      </p>
                      <Badge variant="neutral" className="-mt-1 font-bold">
                        {status}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="info" className="text-sm font-bold">
                    {amountLabel}
                  </Badge>
                </InfoCard>
              );
            })}
      </div>
    </Card>
  );
};
