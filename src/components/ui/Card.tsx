import React from 'react'
import { cn } from "@/lib/utils"

type CardProps = {
    children?: React.ReactNode;
    className?: string;
    variant?: "light" | "dark" | "small";
};

export const Card = ({ children, className, variant }: CardProps) => {
    return (
        <div className={
            cn("rounded-3xl py-5 px-5 font-bold leading-wide font-sans w-full flex flex-col",
                {
                    "bg-(--bg-surface-container-high) backdrop-blur-xl text-white": variant === "light",
                    "bg-(--bg-surface-container-low) backdrop-blur-xl": variant === "dark",
                    "bg-(--bg-surface-container-high) backdrop-blur-xl rounded-4xl flex-row items-center justify-between h-22": variant === "small",
                },
            className,
            )}
        >
            {children}
        </div>
    )
}

export const CardHeader = ({ children, className }:CardProps) => {
    return (
        <div className={cn("flex flex-col items-left justify-between text-(--text-secondary) uppercase font-label gap-3 font-medium tracking-tight text-xs", className)}>
            {children}
        </div>
    )
}
