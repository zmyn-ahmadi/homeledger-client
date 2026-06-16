import React from 'react'
import { cn } from "@/lib/utils";

type props = React.HTMLAttributes<HTMLLabelElement> & {
    name: string;
    className?: string;
}
export const Label = ({ name, className, ...props }: props) => {
    return (
        <label {...props} className={cn("text-white/35 uppercase text-xs font-label font-medium tracking-wider", className)}>{ name }</label>
    )
}
