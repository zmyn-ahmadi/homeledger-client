import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { getHeaders, getErrorMessage, safeJson } from "@/lib/utils";

export async function POST(req: NextRequest) {
  // Authentication
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // Get the request body content
  let reqBody;
  try {
    reqBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  try {
    // POST: /api/budget
    const res = await fetch(`${process.env.API_URL}/api/budget`, {
      method: "POST",
      headers: getHeaders(accessToken),
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const statusMsg = getErrorMessage(res.status);
      return NextResponse.json(
        { error: `${err}: [${statusMsg}]` },
        { status: res.status },
      );
    }

    const data = await safeJson(res, {});
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to create budget" },
      { status: 500 },
    );
  }
}

export async function GET() {
  // Authentication
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    // api call
    const res = await fetch(`${process.env.API_URL}/api/budget`, {
      method: "GET",
      headers: getHeaders(accessToken),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const statusMsg = getErrorMessage(res.status);
      return NextResponse.json(
        { error: `${err}: [${statusMsg}]` },
        { status: res.status },
      );
    }

    const data = await safeJson(res, []);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch budgets" },
      { status: 500 },
    );
  }
}
