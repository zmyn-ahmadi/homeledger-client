import React from 'react'
import {Card} from "@/components/ui/Card";
import {InfoPillCardProps} from "@/lib/types";

export const InfoPillCard = ({ header, amount, type, icon:Icon }: InfoPillCardProps) => {
    return (
        <Card variant="small">
            <div className="flex flex-col items-left">
                <span className="text-(--text-secondary) font-medium tracking-tighter uppercase font-label text-[12px]">{header}</span>
                <span className={`text-xl ${type === "income" ? "text-(--success)" : "text-(--error)"}`}>
                    ${amount.toLocaleString()}
                </span>
            </div>
            <Icon className={`${type === "income" ? "text-(--success)/70" : "text-(--error)/70"}`} size={25} />
        </Card>
    )
}
