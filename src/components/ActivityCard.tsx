import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { InfoCard } from "@/components/ui/InfoCard";
import { Badge } from "@/components/ui/Badge";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ActivityCardProps } from "@/lib/types";

export const ActivityCard = ({ label, data, type }: ActivityCardProps) => {
  const infoCardVariant = type === "bills" ? "upcoming" : "normal";

  return (
    <Card variant="dark" className="flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <CardHeader className="text-left">{label}</CardHeader>
        <HiOutlineDotsHorizontal className="text-white shrink-0" />
      </div>
      <div className="flex flex-col items-start justify-between gap-4 w-full">
        {data.slice(0, 2).map(({ icon: Icon, Name, status, Amount }) => {
          const badgeVariant =
            type === "bills"
              ? `${status === "upcoming" ? "negative" : `${status === "paid" ? "positive" : "neutral"}`}`
              : "info";

          return (
            <InfoCard key={Name} variant={infoCardVariant} className="w-full">
              <div className="flex items-center gap-4">
                <div className="bg-(--bg-surface-container-highest) p-2 rounded-full">
                  {Icon && <Icon className="text-white" />}
                </div>
                <div className="flex flex-col items-start text-sm">
                  <p className="text-white font-medium font-label">{Name}</p>
                  <Badge variant="neutral" className="-mt-1 font-bold">
                    {status}
                  </Badge>
                </div>
              </div>
              <Badge variant={badgeVariant} className="text-sm font-bold">
                ${Amount}
              </Badge>
              {/* the amount should be dynamic based on either its income or expense -> - or +*/}
            </InfoCard>
          );
        })}
      </div>
    </Card>
  );
};
