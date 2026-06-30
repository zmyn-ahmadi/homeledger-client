import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getErrorMessage, safeJson } from "@/lib/utils";

// GET: get family budgets
export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/family/budgets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const statusMsg = getErrorMessage(response.status);

      return NextResponse.json(
        { error: err, message: statusMsg },
        { status: response.status },
      );
    }

    const data = await safeJson(response, []);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to fetch family budgets.",
      },
      { status: 500 },
    );
  }
}
