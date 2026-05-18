// GET: /api/expense
//
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { getErrorMessage } from "@/lib/utils";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // backend api call
  const response = await fetch(`${process.env.API_URL}/api/expense`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // check the status of request
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const statusMsg = getErrorMessage(response.status);

    return NextResponse.json(
      { error: err },
      { status: response.status },
      { errorMessage: statusMsg },
    );
  }

  // convert to json
  const data = await response.json();
  return NextResponse.json(data);
}

// POST: /api/expense
export async function POST(req: NextRequest) {
  // get the accessToken
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // parse incoming JSON body
  const body = await req.json();

  // save the data into database
  const response = await fetch(`${process.env.API_URL}/api/expense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    return NextResponse.json({ error: err }, { status: response.status });
  }

  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: 201 });
}
