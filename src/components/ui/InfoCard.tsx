import React from 'react'
import { cn } from "@/lib/utils"

type InfoCardProps = {
    variant?: "normal" | "upcoming" | "paid";
    className?: string;
    children?: React.ReactNode
}
export const InfoCard = ({ variant, children, className, ...props}: InfoCardProps) => {
    return (
        <div className={cn(
            "flex items-center justify-between gap-2 rounded-xl border p-3 transition-colors",
            {
                "border-white/5 bg-white/[0.03] hover:bg-white/[0.05]":variant === "upcoming",
                "border-white/5 bg-white/[0.05] hover:bg-white/[0.07]":variant === "paid",
                "border-transparent hover:bg-white/[0.03]":variant === "normal",
            },
            className
        )}
             {...props}
        >
            {children}
        </div>
    )
}
