import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>& {
  variant?: "primary" | "secondary" | "inverted" | "outlined";
}
export const Button = ({
    variant = "primary",
    className,
    children,
    ...props
                }: ButtonProps) => {
  return (
      <button
          className={cn(
            "inline-flex items-center justify-center font-normal transition-colors rounded-full px-6 py-2 cursor-pointer",
              {
                  "text-(--text-primary) font-medium bg-linear-to-r from-(--primary) to-(--primary-container)": variant === "primary",
                  "text-white/50 bg-(--bg-surface-container-high) backdrop-blur-md": variant === "secondary",
                  "text-(--text-primary) bg-white": variant === "inverted",
                  "text-(--text-secondary) border border-[#767575]/40 bg-transparent backdrop-blur-md outline-solid outline-1 hover:bg-(--primary)/50 hover:text-black": variant === "outlined",
              },
              className
          )}
          {...props}
      >
          {children}
      </button>
  )
};