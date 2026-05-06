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
            "flex items-center justify-between gap-2 rounded-md p-3",
            {
                "bg-(--bg-surface-container-low)":variant === "upcoming",
                "bg-(--bg-surface-container-high)":variant === "paid",
                "bg-none":variant === "normal",
            },
            className
        )}
             {...props}
        >
            {children}
        </div>
    )
}
