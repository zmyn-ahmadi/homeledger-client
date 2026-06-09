import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { getErrorMessage } from "@/lib/utils";

// GET: Fetch all bills
export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const response = await fetch(`${process.env.API_URL}/api/bill`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const err = await res.json().catch(() => ({}));
    const statusMsg = getErrorMessage(res.status);

    return NextResponse.json(
      { error: err, message: statusMsg },
      { status: res.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

// POST: Create a new bill
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(`${process.env.API_URL}/api/bill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const statusMsg = getErrorMessage(res.status);

    return NextResponse.json(
      { error: err, message: statusMsg },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 201 });
}
