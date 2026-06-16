import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {cn} from "@/lib/utils";

type ChartProps = {
    className?: string;
}

const values = [50, 70, 20, 84, 56, 100, 89];
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const peak = Math.max(...values);

export const Chart = ({ className }: ChartProps) => {
    return (
        <Card variant="dark" className={cn("gap-5", className)}>
            <div className="flex items-center justify-between">
                <CardHeader className="text-left">
                    <span>Income Breakdown</span>
                </CardHeader>
                <span className="font-label text-[10px] uppercase tracking-[0.14em] text-white/30">
                    This week
                </span>
            </div>

            <div className="relative flex-1 min-h-0 rounded-2xl border border-white/5 bg-white/[0.02] p-4 overflow-hidden">
                {/* glow at the baseline */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_40%_at_50%_100%,rgb(56_250_91/0.08),transparent_70%)]"
                />
                {/* horizontal gridlines */}
                <div aria-hidden className="absolute inset-x-4 inset-y-4 flex flex-col justify-between">
                    {[0, 1, 2, 3].map((i) => (
                        <span key={i} className="h-px w-full bg-white/4" />
                    ))}
                </div>

                {/* bars */}
                <div className="relative grid grid-cols-7 items-end gap-3 h-full">
                    {values.map((val, i) => (
                        <div key={i} className="flex items-end justify-center h-full">
                            <span
                                style={{ height: `${val}%` }}
                                className={cn(
                                    "w-full max-w-7 rounded-t-md transition-all duration-500",
                                    val === peak
                                        ? "bg-linear-to-t from-(--primary-container) to-(--primary) shadow-[0_0_16px_-2px_rgb(56_250_91/0.5)]"
                                        : "bg-linear-to-t from-(--primary)/15 to-(--primary)/35"
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-7 gap-3 px-4">
                {days.map((day) => (
                    <span key={day} className="font-label text-[10px] tracking-[0.1em] text-white/35 text-center">{day}</span>
                ))}
            </div>
        </Card>
    )
}
