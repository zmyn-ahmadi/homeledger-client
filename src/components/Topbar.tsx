"use client";

import React from 'react'
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {IoIosSearch} from "react-icons/io";
import {BsPersonCircle} from "react-icons/bs";
import {FaRegBell} from "react-icons/fa";
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
            {/* Brand (mobile only — sidebar is hidden) */}
            <Link href="/personal" className="lg:hidden flex items-center gap-2 text-white font-medium tracking-tight">
                <span className="text-(--primary) text-lg">✬</span>
                homeledger
            </Link>

            {/* Nav */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/6 bg-white/[0.03] p-1">
                {navItems.map(({ href, label }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "rounded-full px-4 py-1.5 font-label text-sm font-medium transition-colors",
                                active
                                ? "bg-(--primary)/12 text-(--primary)"
                                : "text-white/50 hover:text-white"
                            )}
                        >
                            {label}
                        </Link>
                    )
                })}
            </nav>

            {/* Search */}
            <div className="relative hidden md:block w-full max-w-xs">
                <IoIosSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                <input
                    id="search-input"
                    type="text"
                    name="search-input"
                    placeholder="Search insights..."
                    className="w-full pl-10 pr-3 py-2 rounded-full border border-white/8 bg-white/[0.04] text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-(--primary)/40 focus:ring-1 focus:ring-(--primary)/30"
                />
            </div>

            {/* Quick actions */}
            <div className="hidden xl:flex items-center gap-2">
                <button className="text-xs text-(--primary) bg-(--primary)/10 hover:bg-(--primary)/20 py-1.5 px-3.5 rounded-full font-medium transition-colors">+ Income</button>
                <button className="text-xs text-(--error) bg-(--error)/10 hover:bg-(--error)/20 py-1.5 px-3.5 rounded-full font-medium transition-colors">− Expense</button>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 text-white/70">
                <div className="hidden sm:block">
                    <ConnectBankButton />
                </div>
                <button aria-label="Notifications" className="flex items-center justify-center h-9 w-9 rounded-full border border-white/8 bg-white/[0.03] hover:text-white hover:bg-white/8 transition-colors cursor-pointer">
                    <FaRegBell className="w-3.5 h-3.5" />
                </button>
                <Link href="/settings" aria-label="Settings" className="flex items-center justify-center h-9 w-9 rounded-full border border-white/8 bg-white/[0.03] hover:text-white hover:bg-white/8 transition-colors">
                    <BsPersonCircle className="w-4 h-4" />
                </Link>
            </div>
        </header>
    )
}
