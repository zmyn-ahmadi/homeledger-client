import React from 'react'
import { cn } from "@/lib/utils"

type BarProps = {
    value?: number;
    orientation?: "horizontal" | "vertical";
    color?: "primary" | "success" | "danger" | "dashed";
    className?: string;
}

export const Bar = ({
    value = 50,
    orientation = "horizontal",
    color = "primary",
    className
}: BarProps) => {
    return (
        <div className={cn(
            "relative overflow-hidden rounded-full",
            "bg-white/8",
            orientation === "horizontal" && "w-full h-1.5",
            orientation === "vertical" && "h-32 w-1.5",
            className
        )}>
            <span
            className={cn(
                "absolute rounded-full transition-all duration-500",
                {
                    "bg-linear-to-r from-(--primary-container) to-(--primary) shadow-[0_0_8px_rgb(56_250_91/0.35)]": color == "primary" && orientation === "horizontal",
                    "bg-linear-to-t from-(--primary-container) to-(--primary) shadow-[0_0_8px_rgb(56_250_91/0.35)]": color == "primary" && orientation === "vertical",
                    "bg-(--success)": color == "success",
                    "bg-(--error)/80": color == "danger",
                    "bg-none border border-dashed border-white/25": color == "dashed",
                },
                orientation === "horizontal" && "h-full left-0 top-0",
                orientation === "vertical" && "w-full bottom-0 left-0"
            )}
            style={
                orientation === "horizontal"
                    ? { width: `${value}%` }
                    : { height: `${value}%` }
            }
            />
        </div>
    )
}
