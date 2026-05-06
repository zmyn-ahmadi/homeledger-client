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
                "inline-flex items-start py-1.5 rounded-md text-xs font-medium tracking-tight font-label",
                {
                    "text-(--primary)": variant === "positive",
                    "text-(--error)": variant === "negative",
                    "text-(--text-secondary)": variant === "neutral",
                    "font-bold text-(--primary) p-1 px-3 w-20 bg-(--primary)/20": variant === "info",
                },
                className
            )}
        >
            {children}
        </span>
    )
}
