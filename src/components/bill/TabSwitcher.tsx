// components/PillSwitcher.tsx
"use client";

import { useState } from "react";

interface PillSwitcherProps {
    options: string[];
    defaultIndex?: number;
    onChange?: (index: number, value: string) => void;
    variant?: "dark" | "light";
}

export default function PillSwitcher({
                                         options,
                                         defaultIndex = 0,
                                         onChange,
                                         variant = "dark",
                                     }: PillSwitcherProps) {
    const [active, setActive] = useState(defaultIndex);

    const handleClick = (i: number) => {
        setActive(i);
        onChange?.(i, options[i]);
    };

    const trackClass =
        variant === "dark"
            ? "bg-[#1e1e1e]"
            : "bg-neutral-200 dark:bg-neutral-700";

    const activeClass =
        variant === "dark"
            ? "bg-[#2e2e2e] text-neutral-100"
            : "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm";

    const inactiveClass =
        variant === "dark"
            ? "text-neutral-500 hover:text-neutral-300"
            : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300";

    return (
        <div className={`inline-flex rounded-full p-1 gap-0.5 ${trackClass}`} role="tablist">
            {options.map((opt, i) => (
                <button
                    key={opt}
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => handleClick(i)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                        active === i ? activeClass : inactiveClass
                    }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}