// GET /api/expense/category-totals

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getErrorMessage, safeJson } from "@/lib/utils";

export async function GET() {
  // get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken)
    return NextResponse.json({ error: "Not authenticated " }, { status: 401 });

  try {
    // call endpoint
    const res = await fetch(
      `${process.env.API_URL}/api/expense/category-totals`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // check status
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const statusErroMessage = getErrorMessage(res.status);
      return NextResponse.json(
        { error: `${err}: [${statusErroMessage}]` },
        { status: res.status },
      );
    }

    const data = await safeJson(res, []);
    //  Category
    //  Icon
    //  Total
    //  Count

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to fetch category spend",
      },
      { status: 500 },
    );
  }
}
