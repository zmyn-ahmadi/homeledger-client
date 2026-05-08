// components/Toggle.tsx
"use client";

import { useState } from "react";

interface ToggleProps {
    label?: string;
    description?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    onLabel?: string;
    offLabel?: string;
    onChange?: (checked: boolean) => void;
}

export default function Toggle({
                                   label,
                                   description,
                                   defaultChecked = false,
                                   disabled = false,
                                   onLabel = "On",
                                   offLabel = "Off",
                                   onChange,
                               }: ToggleProps) {
    const [checked, setChecked] = useState(defaultChecked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        onChange?.(e.target.checked);
    };

    return (
        <label
            className={`flex items-center justify-between gap-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 ${
                disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
            }`}
        >
            {(label || description) && (
                <div className="flex flex-col gap-0.5">
                    {label && (
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {label}
            </span>
                    )}
                    {description && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {description}
            </span>
                    )}
                </div>
            )}

            <div className="flex items-center gap-2 flex-shrink-0">
                {/* State label */}
                <span
                    className={`text-xs font-medium w-7 text-right transition-colors duration-150 ${
                        checked ? "text-blue-500" : "text-neutral-400 dark:text-neutral-500"
                    }`}
                >
          {checked ? onLabel : offLabel}
        </span>

                {/* Track */}
                <div className="relative">
                    <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked}
                        disabled={disabled}
                        onChange={handleChange}
                    />
                    <div className="w-11 h-6 rounded-full bg-neutral-300 dark:bg-neutral-600 transition-colors duration-200 peer-checked:bg-blue-500" />
                    <div className="absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-5" />
                </div>
            </div>
        </label>
    );
}