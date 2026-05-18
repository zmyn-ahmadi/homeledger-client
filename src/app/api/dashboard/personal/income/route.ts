/*
     - total balance - account
     - monthly income -
     - monthly expense -
     - days worked
     - daily income - chart --> get days worked
     - bills
     - recent transactions
     - category spend
     - active budgets
 */

import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

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
  const data = await apiRes.json();

  return NextResponse.json(data);
}
