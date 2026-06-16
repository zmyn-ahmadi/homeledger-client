"use client";

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import {NavItems} from "@/lib/data";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/Button";
import {VscRobot} from "react-icons/vsc";
import {FiHelpCircle} from "react-icons/fi";
import {IoAdd} from "react-icons/io5";
import {AddTransactionModal} from "@/components/AddTransactionModal";

export const Sidebar = () => {
    const pathname = usePathname();
    const [addOpen, setAddOpen] = useState(false);

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex w-60 shrink-0 flex-col items-stretch justify-between border-r border-white/5 bg-(--bg-surface-container-low) px-4 py-6 pb-8 h-screen sticky top-0">
                <div className="flex flex-col items-start gap-8">
                    <Link href="/personal" className="flex items-center gap-2.5 px-2 text-white font-sans text-lg tracking-tight font-medium">
                        <span className="text-(--primary) text-xl">✬</span>
                        homeledger
                    </Link>

                    <nav className="flex flex-col items-start gap-1 w-full">
                        <span className="px-3 pb-2 font-label text-[10px] uppercase tracking-[0.2em] text-white/25">
                            Menu
                        </span>
                        {NavItems.map(({ href, label, icon: Icon }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors w-full",
                                        active
                                            ? "bg-(--primary)/10 text-(--primary) font-medium"
                                            : "text-white/55 hover:text-white hover:bg-white/5",
                                    )}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    {label}
                                    {active && (
                                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-(--primary)" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex flex-col items-stretch gap-6">
                    <Button variant="primary" className="w-full" onClick={() => setAddOpen(true)}>
                        <IoAdd className="w-4 h-4" /> Add Transaction
                    </Button>
                    <div className="flex flex-col items-start gap-1 text-sm text-white/45">
                        <span className="flex items-center gap-3 px-3 py-2 rounded-xl w-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                            <VscRobot className="w-4 h-4" />
                            AI Assistant
                        </span>
                        <span className="flex items-center gap-3 px-3 py-2 rounded-xl w-full hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                            <FiHelpCircle className="w-4 h-4" />
                            Help
                        </span>
                    </div>
                </div>
            </aside>

            {/* Mobile bottom tab bar */}
            <nav className="lg:hidden fixed bottom-4 inset-x-4 z-40 flex items-center justify-between gap-1 rounded-2xl border border-white/8 bg-(--bg-surface-container-low)/90 backdrop-blur-2xl px-2 py-2 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.8)]">
                {NavItems.slice(0, 3).map(({ href, label, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-label={label}
                            className={cn(
                                "flex flex-1 items-center justify-center rounded-xl py-2.5 transition-colors",
                                active ? "bg-(--primary)/10 text-(--primary)" : "text-white/45 hover:text-white",
                            )}
                        >
                            <Icon className="w-5 h-5" />
                        </Link>
                    );
                })}
                <button
                    onClick={() => setAddOpen(true)}
                    aria-label="Add transaction"
                    className="flex items-center justify-center rounded-xl mx-1 h-10 w-12 shrink-0 bg-linear-to-r from-(--primary) to-(--primary-container) text-(--text-primary) shadow-[0_0_20px_-6px_rgb(56_250_91/0.7)] active:scale-95 transition-transform"
                >
                    <IoAdd className="w-5 h-5" />
                </button>
                {NavItems.slice(3).map(({ href, label, icon: Icon }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-label={label}
                            className={cn(
                                "flex flex-1 items-center justify-center rounded-xl py-2.5 transition-colors",
                                active ? "bg-(--primary)/10 text-(--primary)" : "text-white/45 hover:text-white",
                            )}
                        >
                            <Icon className="w-5 h-5" />
                        </Link>
                    );
                })}
            </nav>

            <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
        </>
    )
}
