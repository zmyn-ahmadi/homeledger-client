import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // Forward the refreshToken cookie that .NET expects
    const incomingCookies = req.headers.get("cookie") ?? "";

    const apiRes = await fetch(`${process.env.API_URL}/api/token/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": incomingCookies, // ✅ pass the refreshToken cookie through
        },
    });

    if (!apiRes.ok) {
        return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
    }

    const { accessToken } = await apiRes.json();

    const res = NextResponse.json({ success: true });

    // Forward the rotated refreshToken cookie from .NET
    const setCookie = apiRes.headers.get("set-cookie");
    if (setCookie) res.headers.set("set-cookie", setCookie);

    // Update access token cookie
    const cookieStore = await cookies();
    cookieStore.set("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 15,
        path: "/",
    });

    return res;
}