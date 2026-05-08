// components/RowMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface RowMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

export default function RowMenu({ onEdit, onDelete }: RowMenuProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="text-white/40 hover:text-white hover:bg-white/10 p-1.5 rounded-md transition-colors"
                aria-label="More options"
            >
                <HiOutlineDotsHorizontal className="w-4 h-4" />
            </button>

            {open && (
                <div className="absolute right-0 top-[calc(100%+6px)] z-20 min-w-[140px] p-1 rounded-xl border border-white/10 bg-neutral-900 shadow-xl">
                    <button
                        onClick={() => { setOpen(false); onEdit(); }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                    >
                        <FiEdit2 className="w-3.5 h-3.5" />
                        Edit
                    </button>
                    <button
                        onClick={() => { setOpen(false); onDelete(); }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <FiTrash2 className="w-3.5 h-3.5" />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}