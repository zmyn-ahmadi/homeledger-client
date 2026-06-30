import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/token/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!apiRes.ok) {
      const err = await apiRes.json().catch(() => ({}));
      return NextResponse.json({ error: err }, { status: apiRes.status });
    }

    const { accessToken } = await apiRes.json().catch(() => ({}));

    if (!accessToken) {
      return NextResponse.json(
        { error: "Login failed: no access token returned" },
        { status: 502 },
      );
    }

    const res = NextResponse.json({ success: true });

    // ✅ Forward the refreshToken httpOnly cookie set by .NET
    const setCookie = apiRes.headers.get("set-cookie");
    if (setCookie) res.headers.set("set-cookie", setCookie);

    // ✅ Store access token in its own httpOnly cookie (never expose to JS)
    const cookieStore = await cookies();
    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 15, // 15 min
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Login failed" },
      { status: 500 },
    );
  }
}
