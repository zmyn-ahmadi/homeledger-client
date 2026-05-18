import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // get the access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // call api endpoint
  const response = await fetch(`${process.env.API_URL}/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // check the status
  if (!response.ok) {
    // if resonse.json() - empty string, an HTML error page, .. catch returns an empty object
    const err = await response.json().catch(() => ({}));
    return NextResponse.json({ error: err }, { status: response.status });
  }

  const data: { CategoryId: number; Name: string }[] = await response.json();
  const categories = data.map((c) => ({
    categoryId: c.CategoryId,
    name: c.Name,
  }));

  return NextResponse.json(categories);
}
