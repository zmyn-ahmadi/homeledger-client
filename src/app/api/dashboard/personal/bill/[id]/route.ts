import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { getErrorMessage } from "@/lib/utils";

// PUT: update bill
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();

    console.log(
      "FORWARDNING TO BACKEND:",
      `${process.env.API_URL}/api/bill/${id}`,
    );

    const res = await fetch(`${process.env.API_URL}/api/bill/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    console.log("BACKEND RESPONSE STATUS:", res.status);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const statusMsg = getErrorMessage(res.status);

      return NextResponse.json(
        { error: err, message: statusMsg },
        { status: res.status },
      );
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
