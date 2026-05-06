import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {GoHome} from "react-icons/go";
import {StatCardProps} from "@/lib/types";
import {Bar} from "@/components/ui/Bar";
import {cn} from "@/lib/utils";

export const StatCard = ({ symbol: Icon, header, amount, barValue }: StatCardProps) => {
    return (
        <Card variant="light" className="flex flex-col items-start gap-2">
            <CardHeader className="text-left text-(--text-secondary)">
                <Icon className={cn(
                    "rounded-full p-1.5",
                    amount > 0
                    ? "bg-(--primary)/20"
                    : "bg-(--error)/60"
                )} size={40}/>
                <span>{header}</span>
            </CardHeader>
            <h1 className="text-2xl tracking-normal">${amount.toLocaleString()}</h1>
            <Bar orientation="horizontal" color="primary" value={barValue} className="mt-2" />
        </Card>
    )
}
