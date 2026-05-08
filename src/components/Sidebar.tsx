"use client";

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import {NavItems} from "@/lib/data";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/Button";
import {VscRobot} from "react-icons/vsc";
import {FiHelpCircle} from "react-icons/fi";
import {AddTransactionModal} from "@/components/AddTransactionModal";

export const Sidebar = () => {
    const pathname = usePathname();
    const [addOpen, setAddOpen] = useState(false);

    return (
        <>
            <aside className="flex flex-col items-stretch justify-between bg-(--bg-surface-container-low) px-4 py-6 pb-8 h-screen sticky top-0">
                <div className="flex flex-col items-start justify-between gap-8">
                    <Link href="/personal" className="flex items-center gap-4 text-white font-sans text-xl tracking-tight font-medium">
                        <span className="text-(--primary) text-2xl">✬</span>
                        homeledger
                    </Link>

                    <nav className="flex flex-col items-start gap-2 w-full">
                        {NavItems.map(({ href, label, icon: Icon }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 text-sm transition-colors w-full",
                                        active
                                            ? "bg-(--primary)/8 text-(--primary) font-medium"
                                            : "text-(--text-secondary) hover:text-(--primary)",
                                    )}
                                >
                                    <Icon className="w-4 h-5 shrink-0" />
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                </div>
                <div className="flex flex-col items-start justify-between gap-6">
                    <Button variant="primary" onClick={() => setAddOpen(true)}>+ Add Transaction</Button>
                    <div className="flex flex-col items-start gap-2 text-(--text-secondary)">
                        <span className="flex items-center gap-2">
                        <VscRobot />
                            AI Assistant
                        </span>
                        <span className="flex items-center gap-2">
                            <FiHelpCircle />
                            Help
                        </span>
                    </div>
                </div>
            </aside>
            <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
        </>
    )
}
