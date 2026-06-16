"use client";

import React, {useState} from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { SlCalender } from "react-icons/sl";
import { cn } from "@/lib/utils";

type WorkTrackerProps = {
    salaryPerDay: number;
};

const days = ["M", "T", "W", "T", "F", "S", "S"];

export const WorkTracker = ({salaryPerDay }: WorkTrackerProps) => {
    const today = new Date().toLocaleDateString("en-AU", {
        weekday: "short",
    });

    const [daysWorked, setDaysWorked] = useState([0,0,0,0,0,0,0]);
    const toggleDay = (index: number) => {
        setDaysWorked((prev) =>
        prev.map((day, i) => (i === index ? (day ? 0 : 1) : day))
        );
    }
    const totalDays = daysWorked.reduce((a, b) => a + b, 0);
    const estimatedSalary = totalDays * salaryPerDay;

    return (
        <Card variant="light" className="flex flex-col justify-between gap-4 p-5">
            {/* Top */}
            <div className="flex items-start justify-between w-full">
                <CardHeader className="flex-row items-center gap-2.5 text-left">
                    <SlCalender className="w-3.5 h-3.5 text-(--primary)" />
                    <span>Estimated Salary</span>
                </CardHeader>
                <span className="font-label text-[10px] uppercase tracking-[0.14em] text-white/35">
                  {today}
                </span>
            </div>

            {/* Middle */}
            <div>
                <h1 className="text-2xl font-semibold text-white tracking-tight tabular-nums">
                    ${estimatedSalary.toLocaleString()}
                </h1>
                <p className="text-xs text-white/40">
                    {totalDays} days worked
                </p>
            </div>

            {/* Bottom (7 toggleable day cells) */}
            <div className="flex justify-between gap-1.5 w-full">
                {daysWorked.map((worked, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => toggleDay(i)}
                        className="flex flex-col items-center gap-1.5 flex-1 cursor-pointer group"
                    >
                        <span className={cn(
                            "h-7 w-full rounded-md transition-all duration-200",
                            worked
                                ? "bg-linear-to-t from-(--primary-container) to-(--primary) shadow-[0_0_10px_-2px_rgb(56_250_91/0.5)]"
                                : "border border-dashed border-white/20 group-hover:border-white/40"
                        )} />
                        <span className={cn(
                            "text-[10px] font-label",
                            worked ? "text-(--primary)" : "text-white/35"
                        )}>
                          {days[i]}
                        </span>
                    </button>
                ))}
            </div>
        </Card>
    );
};
