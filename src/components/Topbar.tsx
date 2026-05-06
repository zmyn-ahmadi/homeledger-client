"use client";

import React from 'react'
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {IoIosSearch} from "react-icons/io";
import {BsPersonCircle} from "react-icons/bs";
import {FaRegBell} from "react-icons/fa";
import {Button} from "@/components/ui/Button";
import {ConnectBankButton} from "@/components/ConnectBankButton";

type NavItemProps = {
    href: string,
    label: string
};

const navItems: NavItemProps[] = [
    {
        href: "/personal/overview",
        label: "Overview",
    },
    {
        href: "/personal/reports",
        label: "Report",
    },
    {
        href: "/personal/analytics",
        label: "Analytics",
    }
];

export const Topbar = () => {
    const pathname = usePathname();

    return (
        <header className="flex items-center justify-between gap-3 w-full">
            {/* Nav */}
            <nav className="flex items-start gap-4">
                {navItems.map(({ href, label }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "font-medium font-label text-md",
                                active
                                ? "text-(--primary) border-b-2"
                                : "text-(--text-secondary) hover:text-(--primary)"
                            )}
                        >
                            {label}
                        </Link>
                    )
                })}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">

                {/* Search Input */}
                <div className="relative w-full">
                    <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <input
                        id="search-input"
                        type="text"
                        name="search-input"
                        placeholder="Search insights..."
                        className="
                        w-full
                        pl-10 pr-2 py-2
                        rounded-full
                        bg-(--text-secondary)/20
                        text-sm text-white
                        placeholder:text-white/80
                        outline-none
                        "
                    />
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 w-full">
                    <button className="text-xs text-(--primary) bg-(--primary)/20 py-1 px-3 rounded-full font-medium">Add Income</button>
                    <button className="text-xs text-(--error) bg-(--error)/30 py-1 px-3 rounded-full font-medium">Add Expense</button>
                </div>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-4 text-white cursor-pointer">
                <ConnectBankButton />
                <FaRegBell />
                <Link href="/settings">
                    <BsPersonCircle />
                </Link>
            </div>
        </header>
    )
}
