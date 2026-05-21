import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

const protectedRoutes = [
  "/personal",
  "/family",
  "/settings",
  "/transactions",
  "/budgets",
];

export async function proxy(req: NextRequest) {
  const isProtected = protectedRoutes.some((p) =>
    req.nextUrl.pathname.startsWith(p),
  );
  if (!isProtected) return NextResponse.next();

  const accessToken = req.cookies.get("access_token")?.value;

  if (accessToken) {
    try {
      await jwtVerify(accessToken, secret, {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
      });
      return NextResponse.next();
    } catch {
      // expired — fall through to refresh
    }
  }

  const refreshRes = await fetch(`${process.env.API_URL}/api/token/refresh`, {
    method: "POST",
    headers: { cookie: req.headers.get("cookie") ?? "" },
  });

  if (!refreshRes.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { accessToken: newToken } = await refreshRes.json();

  const res = NextResponse.next();

  // Forward rotated refreshToken cookie from .NET
  const setCookie = refreshRes.headers.get("set-cookie");
  if (setCookie) res.headers.append("set-cookie", setCookie);

  // Set new access token
  res.cookies.set("access_token", newToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 15,
    path: "/",
  });

  return res;
}

export const config = {
  matcher: [
    "/personal/:path*",
    "/family/:path*",
    "/settings/:path*",
    "/transactions/:path*",
    "/budgets/:path*",
  ],
};
