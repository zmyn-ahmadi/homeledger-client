import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";
import {FaArrowTrendUp} from "react-icons/fa6";
import {BalanceCardProps} from "@/lib/types";
import {cn} from "@/lib/utils";

export const BalanceCard = ({ header, balance, stat, badgeLabel, className }: BalanceCardProps) => {
    return (
        <Card variant="dark" className={cn("flex flex-col justify-between gap-6 relative overflow-hidden border-(--primary)/15 shadow-[0_0_60px_-20px_rgb(56_250_91/0.25)]", className
        )}>
            {/* glow aura */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_15%_0%,rgb(56_250_91/0.12),transparent_70%)]"
            />
            <div className="relative flex flex-col items-start gap-3">
                <CardHeader className="text-left">
                    <span>{header}</span>
                </CardHeader>
                <h1 className="text-4xl md:text-5xl text-white font-semibold tracking-tight tabular-nums">
                    ${balance.toLocaleString()}{" "}
                    <span className="uppercase font-label text-xs font-medium text-white/35 tracking-[0.14em]">AUD</span>
                </h1>
            </div>

            <div className="relative flex items-center justify-start gap-2">
                <Badge variant="info" className="flex items-center gap-1.5">
                    {typeof stat === "number" ? (
                        <>
                            <FaArrowTrendUp className="text-sm shrink-0" />
                            <span className="tabular-nums">{stat > 0 ? `+${stat.toFixed(2)}%` : `${stat.toFixed(2)}%`}</span>
                        </>
                    ) : (
                        <p>{stat}</p>
                    )}
                </Badge>
                <p className="text-xs font-medium text-white/40">{badgeLabel}</p>
            </div>
        </Card>
    )
}
