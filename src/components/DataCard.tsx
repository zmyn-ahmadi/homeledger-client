import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Bar } from "@/components/ui/Bar";
import { cn } from "@/lib/utils";
import { DataCardProps } from "@/lib/types";

export const DataCard = ({ label, data, type }: DataCardProps) => {
    return (
        <Card variant="light" className="flex flex-col gap-4 p-5">
            <CardHeader>{label}</CardHeader>

            <div className="flex flex-col gap-4 w-full">
                {data.slice(0,2).map((item, i) => {
                    const Icon = item.icon;

                    let value = 0;
                    let display = "";
                    let color: "primary" | "danger" | "success" = "primary";

                    if (type === "category") {
                        const amount = item.amount;
                        const isExpense = amount < 0;

                        value = Math.min(Math.abs(amount), 100); // temp scaling
                        display = `${isExpense ? "-" : "+"}$${Math.abs(amount)}`;
                        color = isExpense ? "danger" : "primary";
                    }

                    if (type === "budget") {
                        const percentage = item.percentage;

                        value = Math.min(Math.max(percentage, 0), 100);
                        display = `${value.toFixed(0)}%`;

                        if (value < 50) color = "primary";
                        else if (value < 80) color = "danger";
                        else color = "danger";
                    }

                    return (
                        <div key={i} className="flex flex-col gap-1 w-full">
                            {/* Top */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 shrink-0 text-(--text-secondary)" />
                                    <span className="text-sm text-white">
                    {item.label}
                  </span>
                                </div>

                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        type === "category" &&
                                        item.amount < 0 &&
                                        "text-red-400"
                                    )}
                                >
                  {display}
                </span>
                            </div>

                            {/* Bar */}
                            <Bar
                                orientation="horizontal"
                                color={color}
                                value={value}
                            />
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};