// components/ConfirmDialog.tsx
"use client";

import { useEffect } from "react";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: React.ReactNode;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
                                          open, title, message, confirmLabel = "Confirm", onConfirm, onCancel,
                                      }: ConfirmDialogProps) {
    // ESC to close
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => e.key === "Escape" && onCancel();
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onCancel}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl border border-white/10 bg-(--bg-surface-container-low)/95 backdrop-blur-2xl p-5 flex flex-col gap-3 shadow-2xl"
            >
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{message}</p>
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={onCancel}
                        className="text-sm font-medium px-4 py-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="text-sm font-medium px-4 py-2 rounded-full bg-(--error)/90 text-white hover:bg-(--error) transition-colors"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}