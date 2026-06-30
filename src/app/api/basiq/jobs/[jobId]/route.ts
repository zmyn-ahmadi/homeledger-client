import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { safeJson } from "@/lib/utils";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ jobId: string }> },
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { jobId } = await params;

  try {
    const res = await fetch(`${process.env.API_URL}/api/basiq/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return NextResponse.json({ success: false });
    const data = await safeJson(res, {});
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch job status" },
      { status: 500 },
    );
  }
}

