import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {StatCardProps} from "@/lib/types";
import {Bar} from "@/components/ui/Bar";
import {cn} from "@/lib/utils";

export const StatCard = ({ symbol: Icon, header, amount, barValue }: StatCardProps) => {
    return (
        <Card variant="light" className="flex flex-col items-start justify-between gap-3">
            <CardHeader className="text-left">
                <span className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-xl border",
                    amount > 0
                    ? "border-(--primary)/15 bg-(--primary)/10 text-(--primary)"
                    : "border-(--error)/15 bg-(--error)/10 text-(--error)"
                )}>
                    <Icon className="w-5 h-5" />
                </span>
                <span>{header}</span>
            </CardHeader>
            <h1 className="text-2xl font-semibold tracking-tight tabular-nums">${amount.toLocaleString()}</h1>
            <Bar orientation="horizontal" color="primary" value={barValue} className="mt-1" />
        </Card>
    )
}
