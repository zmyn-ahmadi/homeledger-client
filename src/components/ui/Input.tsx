import React from 'react'
import {cn} from "@/lib/utils";
import {IconType} from "react-icons";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    icon: IconType;
}
export const Input = ({ className, icon:Icon, ...props }: InputProps) => {
    return (
        <div className="relative w-full">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
                className={cn(
                    "w-full py-2.5 pl-10 pr-4 rounded-full bg-(--bg-surface-container-high)/50 text-white text-sm placeholder:text-white/10 placeholder:text-[12px] placeholder:tracking-wide outline-none",
                    className)}
                {...props}
            />
        </div>
    )
}
