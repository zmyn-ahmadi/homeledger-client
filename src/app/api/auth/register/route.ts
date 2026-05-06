import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();

    const apiRes = await fetch(`${process.env.API_URL}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!apiRes.ok){
        const err =  await apiRes.json().catch(() => ({}));
        return NextResponse.json({ error: err }, { status: apiRes.status });
    }

    return NextResponse.json({ success: true })
}