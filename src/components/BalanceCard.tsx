import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";
import {FaArrowTrendUp} from "react-icons/fa6";
import {BalanceCardProps} from "@/lib/types";
import {cn} from "@/lib/utils";

export const BalanceCard = ({ header, balance, stat, className }: BalanceCardProps) => {
    return (
        <Card variant="dark" className={cn("flex flex-col gap-6 col-span-2 relative overflow-hidden border-1.5 border-(--primary) shadow-[0_0_30px_8px_rgba(34,197,94,0.13),inset_0_0_40px_2px_rgba(34,197,94,0.06)]" ,className
        )}>
            <div className="flex flex-col items-start gap-3">
                <CardHeader className="text-left text-(--text-secondary)">
                    <span>{header}</span>
                </CardHeader>
                <h1 className="text-6xl text-white font-bold tracking-tight">${balance.toLocaleString()} <span className="uppercase text-sm text-(--text-secondary)">AUD</span></h1>
            </div>

            <div className="flex items-center justify-start gap-2">
                <Badge variant="info" className="flex items-center gap-1">
                    <FaArrowTrendUp className="text-base shrink-0"/>
                    <span>{
                        stat > 0
                        ? `+${stat.toFixed(2)}%`
                        : `-${stat.toFixed(2)}%`
                    }</span>
                </Badge>
                <p className="text-xs font-medium text-(--text-secondary)">vs. last month</p>
            </div>
        </Card>
    )
}
