import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {Bar} from "@/components/ui/Bar";

type ChartProps = {
    className?: string;
}

export const Chart = ({ className }: ChartProps) => {
    return (
        <Card variant="dark" className={className}>
            <CardHeader className="text-white tracking-wide font-bold text-md">
                <h1>Income Breakdown</h1>
            </CardHeader>
            <div
                className="
                relative overflow-hidden
                py-4 px-2 mt-5
                rounded-3xl
                bg-linear-to-t from-(--primary)/15 to-(--bg-surface-container-low)/8 backdrop-blur-2xl
                h-[80%]
                "
            >
                <div
                    className="
                    absolute inset-0
                    pointer-events-none
                    "
                    style={{
                        background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(56,250,91,0.08) 0%, transparent 70%)"
                    }}
                />

                {/* chart */}
                <div className="
                    grid grid-cols-7 gap-2
                    w-full
                    absolute bottom-0 right-0
                    ">
                    {[50,70,20,84,56,100,89].map((val, i) => (
                        <div key={val} className="flex flex-col items-center justify-start gap-2">
                            <Bar orientation="vertical" value={val} className="h-60" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 px-2 mt-3">
                {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((day) => (
                    <span key={day} className="text-xs text-white/50 text-center">{day}</span>
                ))}
            </div>
        </Card>
    )
}
