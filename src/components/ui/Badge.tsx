import React from 'react'
import { cn } from "@/lib/utils"

type BadgeProps = {
    variant: "positive" | "negative" | "neutral" | "info";
    children?: React.ReactNode;
    className?: string;
};

export const Badge = ({ variant = "neutral", children, className }: BadgeProps) => {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium tracking-tight font-label",
                {
                    "bg-(--primary)/10 text-(--primary)": variant === "positive",
                    "bg-(--error)/10 text-(--error)": variant === "negative",
                    "bg-white/6 text-white/55": variant === "neutral",
                    "bg-(--primary)/15 text-(--primary)": variant === "info",
                },
                className
            )}
        >
            {children}
        </span>
    )
}
