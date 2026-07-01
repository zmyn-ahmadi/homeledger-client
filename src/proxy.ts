import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

const protectedRoutes = [
  "/personal",
  "/family",
  "/settings",
  "/transactions",
  "/budgets",
  "/bills",
  "/zee",
];

export default async function proxy(req: NextRequest) {
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

  try {
    const refreshRes = await fetch(`${process.env.API_URL}/api/token/refresh`, {
      method: "POST",
      headers: { cookie: req.headers.get("cookie") ?? "" },
    });

    if (!refreshRes.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { accessToken: newToken } = await refreshRes.json();
    const res = NextResponse.next();
    res.cookies.set("access_token", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
    });

    const setCookie = refreshRes.headers.get("set-cookie");
    if (setCookie) res.headers.append("set-cookie", setCookie);

    return res;
  } catch {
    // Backend unreachable or malformed refresh response — send the user to login
    // instead of throwing an unhandled error out of the middleware.
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/personal/:path*",
    "/family/:path*",
    "/settings/:path*",
    "/transactions/:path*",
    "/budgets/:path*",
    "/bills/:path*",
    "/zee/:path*",
  ],
};
