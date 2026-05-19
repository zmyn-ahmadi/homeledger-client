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
    ...c,
  }));

  return NextResponse.json(categories);
}

// export async function GET(req: NextRequest, { params }: { params: { id: number }) {
//   // get the access token
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("access_token")?.value;
//
//   if (!accessToken) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }
//
//   const { id } = await params;
//
//   // call api endpoint
//   const response = await fetch(`${process.env.API_URL}/api/categories/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//
//   // check the status
//   if (!response.ok) {
//     // if resonse.json() - empty string, an HTML error page, .. catch returns an empty object
//     const err = await response.json().catch(() => ({}));
//     return NextResponse.json({ error: err }, { status: response.status });
//   }
//
//   const data = await response.json();
//   return NextResponse.json(data);
// }
