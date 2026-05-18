import { cookies } from "next/headers";
import { NextResponse } from "next/server";
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
