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
            "inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 rounded-full px-6 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
              {
                  "text-(--text-primary) font-semibold bg-linear-to-r from-(--primary) to-(--primary-container) shadow-[0_0_24px_-10px_rgb(56_250_91/0.7)] hover:brightness-110": variant === "primary",
                  "text-white/70 bg-white/8 backdrop-blur-md hover:bg-white/12 hover:text-white": variant === "secondary",
                  "text-(--text-primary) bg-white hover:bg-white/90": variant === "inverted",
                  "text-(--text-secondary) border border-white/12 bg-transparent backdrop-blur-md hover:border-(--primary)/40 hover:text-(--primary) hover:bg-(--primary)/5": variant === "outlined",
              },
              className
          )}
          {...props}
      >
          {children}
      </button>
  )
};
