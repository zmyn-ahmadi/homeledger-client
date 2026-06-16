"use client";
import React, {useEffect} from 'react'
import {useRouter, useSearchParams} from "next/navigation";

const BasiqCallback = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get('code');
        const linkId = searchParams.get('linkId');

        console.log("Basiq callback:", {code, linkId});
        // optional: send to backend to sync accounts/transactions
        router.replace("/personal");
    },[])

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-(--bg-main) text-white overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_40%,rgb(56_250_91/0.08),transparent_70%)]"
            />
            <span className="relative h-10 w-10 rounded-full border-2 border-(--primary)/20 border-t-(--primary) animate-spin" />
            <div className="relative flex flex-col items-center gap-1.5 text-center px-6">
                <h1 className="text-lg font-semibold tracking-tight">Connecting to your bank</h1>
                <p className="text-sm text-white/45">Hang tight — we&apos;re finishing the secure handshake.</p>
            </div>
        </div>
    )
}
export default BasiqCallback
