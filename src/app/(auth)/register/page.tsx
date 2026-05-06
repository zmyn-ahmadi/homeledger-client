"use client";
import React, { useState } from "react";
import { MdOutlinePerson, MdOutlineEmail, MdOutlineLock, MdOutlinePhone } from "react-icons/md";
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail]         = useState("");
    const [password, setPassword]   = useState("");
    const [phone, setPhone]         = useState("");
    const [error, setError]         = useState("");
    const [loading, setLoading]     = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true)

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    FullName: fullName,
                    Email: email,
                    Password: password,
                    Phone: phone,
                })
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data?.error || "Something went wrong. Please try again.");
                return;
            }
            await router.push("/login?registered=true");
        }catch(error) {
            setError("Network Error. Please check your connection.");
        }finally {
            setLoading(false)
        }
    }

    return (
        <Card variant="dark" className="m-auto items-center gap-5 w-90">
            <div className="flex flex-col items-center gap-1">
                <span className="text-(--primary) text-4xl">✬</span>
                <h1 className="text-white text-2xl">homeledger</h1>
                <p className="text-white/20 text-[10px] uppercase">Create your account</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2 items-start">
                    <Label name="Full Name" />
                    <Input icon={MdOutlinePerson} type="text" id="fname" name="FullName" placeholder="John Doe"
                           value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>

                <div>
                    <Label name="Email" />
                    <Input icon={MdOutlineEmail} type="email" id="email" name="Email" placeholder="homeledger@gmail.com"
                           value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div>
                    <Label name="Password" />
                    <Input icon={MdOutlineLock} type="password" id="password" name="Password" placeholder=". . . . . . . . ."
                           value={password} onChange={e => setPassword(e.target.value)} required />
                </div>

                <div>
                    <Label name="Phone Number" />
                    <Input icon={MdOutlinePhone} type="text" id="phone" name="Phone" placeholder="04xx xxx xxx"
                           value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>

                {
                    error && (
                        <p className="text-(--error) text-xs text-center">{error}</p>
                    )
                }

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                </Button>
            </form>

            <div className="flex items-center gap-2">
                <p className="text-zinc-400 font-label text-sm">Already have an account?</p>
                <Link href="/login" className="text-(--primary)" >Log In</Link>
            </div>

        </Card>
    );
}