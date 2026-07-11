// POST: /api/workdays

import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { safeJson } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    // api call
    const response = await fetch(`${process.env.API_URL}/api/workdays`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json({ error: error }, { status: response.status });
    }

    const data = await safeJson(response, {});
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to save work days" },
      { status: 500 },
    );
  }
}
