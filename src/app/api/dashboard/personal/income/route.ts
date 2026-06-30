// GET: /api/income

import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { safeJson } from "@/lib/utils";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // call endpoint
    const apiRes = await fetch(`${process.env.API_URL}/api/income`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // check status of request
    if (!apiRes.ok) {
      const err = await apiRes.json().catch(() => ({}));
      return NextResponse.json({ error: err }, { status: apiRes.status });
    }

    // get the data from response
    const data = await safeJson(apiRes, []);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch income" },
      { status: 500 },
    );
  }
}

// POST: /api/income

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
    const response = await fetch(`${process.env.API_URL}/api/income`, {
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
      { error: "Internal Server Error", message: "Failed to create income" },
      { status: 500 },
    );
  }
}
