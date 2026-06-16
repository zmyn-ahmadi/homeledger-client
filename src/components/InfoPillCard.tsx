import React from 'react'
import {Card} from "@/components/ui/Card";
import {InfoPillCardProps} from "@/lib/types";

export const InfoPillCard = ({ header, amount, type, icon:Icon }: InfoPillCardProps) => {
    const isIncome = type === "income";
    return (
        <Card variant="small">
            <div className="flex flex-col items-start gap-0.5">
                <span className="text-white/40 font-medium tracking-[0.12em] uppercase font-label text-[10px]">{header}</span>
                <span className={`text-xl font-semibold tracking-tight tabular-nums ${isIncome ? "text-(--primary)" : "text-(--error)"}`}>
                    ${amount.toLocaleString()}
                </span>
            </div>
            <span className={`flex items-center justify-center w-9 h-9 rounded-xl border ${isIncome ? "border-(--primary)/15 bg-(--primary)/10 text-(--primary)" : "border-(--error)/15 bg-(--error)/10 text-(--error)"}`}>
                <Icon className="w-5 h-5" />
            </span>
        </Card>
    )
}
