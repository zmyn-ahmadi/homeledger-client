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
        <p>Connecting to your bank...</p>
    )
}
export default BasiqCallback
