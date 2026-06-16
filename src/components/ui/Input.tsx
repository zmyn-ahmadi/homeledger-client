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
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
            <input
                className={cn(
                    "w-full py-2.5 pl-10 pr-4 rounded-xl border border-white/8 bg-white/[0.04] text-white text-sm placeholder:text-white/25 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30",
                    className)}
                {...props}
            />
        </div>
    )
}
