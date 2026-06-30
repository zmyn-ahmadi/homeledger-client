import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest){
    let body;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!apiRes.ok){
            const err =  await apiRes.json().catch(() => ({}));
            return NextResponse.json({ error: err }, { status: apiRes.status });
        }

        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json(
            { error: "Internal Server Error", message: "Registration failed" },
            { status: 500 },
        );
    }
}
