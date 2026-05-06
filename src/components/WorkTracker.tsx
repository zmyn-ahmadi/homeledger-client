"use client";

import React, {useState} from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { SlCalender } from "react-icons/sl";
import {Bar} from "@/components/ui/Bar";

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
        <Card variant="light" className="flex flex-col gap-4 p-5">
            {/* Top */}
            <div className="flex items-start justify-between w-full">
                <CardHeader className="flex items-start gap-3 text-(--text-secondary)">
                    <SlCalender className="w-4 h-4" />
                    <span>Estimated Salary</span>
                </CardHeader>
                <span className="text-xs text-(--text-secondary)">
                  {today}
                </span>
            </div>

            {/* Middle */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    ${estimatedSalary.toLocaleString()}
                </h1>
                <p className="text-xs text-(--text-secondary)">
                    {totalDays} days worked
                </p>
            </div>

            {/* Bottom (7 bars) */}
            <div className="flex justify-between gap-1 w-full">
                {daysWorked.map((worked, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 w-full" onClick={() => toggleDay(i)}>
                        {
                            worked ?
                                <Bar orientation="horizontal" color="primary" value={100} className="h2 transition-all duration-300" />
                                :
                                <Bar orientation="horizontal" color="dashed" value={100} className="h2 transition-all duration-300" />
                        }
                        <span className="text-[10px] text-(--text-secondary)">
                          {days[i]}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
};