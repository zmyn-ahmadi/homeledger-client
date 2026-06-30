import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {safeJson} from "@/lib/utils";

export async function POST(){
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if(!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const res = await fetch(`${process.env.API_URL}/api/basiq/connect`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if(!res.ok) return NextResponse.json({ error: "failed to connect" }, { status: res.status });

        const data = await safeJson(res, {});
        return NextResponse.json({data})
    } catch {
        return NextResponse.json(
            { error: "Internal Server Error", message: "Failed to connect to Basiq" },
            { status: 500 },
        );
    }
}