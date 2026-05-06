"use client";

import React, {useState} from 'react'
import {Button} from "@/components/ui/Button";

export const ConnectBankButton = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleConnect(){
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/basiq/connect",{
                method: "POST" })

            if(!res.ok){
                setError("Failed to connect. Please try again later");
                return;
            }

            const data = await res.json();
            console.log("data: ", JSON.stringify(data, null, 2));
            window.location.href = data.data.consentUrl;
        }catch(error){
            setError("Network Error. Please try again later");
        }finally{
            setLoading(false);
        }

    }
    return (
        <div className="flex flex-col items-center">
            <Button variant="outlined" onClick={handleConnect} disabled={loading} className="px-3 text-sm">
                { loading ? "Connecting..." : "Connect Bank" }
            </Button>
            {error && <p className="text-(--error) text-[10px] mt-1">{error}</p>}
        </div>
    )
}
