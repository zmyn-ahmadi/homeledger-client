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
            cn("rounded-2xl py-5 px-5 font-sans w-full flex flex-col border border-white/6",
                {
                    "bg-(--bg-surface-container-high)/80 backdrop-blur-xl text-white": variant === "light",
                    "bg-(--bg-surface-container-low)/90 backdrop-blur-xl": variant === "dark",
                    "bg-(--bg-surface-container-high)/80 backdrop-blur-xl rounded-2xl flex-row items-center justify-between h-22": variant === "small",
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
        <div className={cn("flex flex-col items-left justify-between text-white/45 uppercase font-label gap-3 font-medium tracking-[0.14em] text-[11px]", className)}>
            {children}
        </div>
    )
}
