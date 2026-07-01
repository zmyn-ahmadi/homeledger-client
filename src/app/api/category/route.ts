import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { safeJson } from "@/lib/utils";

export async function GET() {
  // get the access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
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

    const data = await safeJson<{ CategoryId: number; Name: string }[]>(
      response,
      [],
    );
    const categories = data.map((c) => ({
      categoryId: c.CategoryId,
      name: c.Name,
      ...c,
    }));

    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// POST: /api/category
export async function POST(req: NextRequest) {
  // get the access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // parse incoming JSON body
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    // call api endpoint
    const response = await fetch(`${process.env.API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    // check the status
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await safeJson<{ CategoryId?: number; Name?: string }>(
      response,
      {},
    );
    const category = {
      categoryId: data.CategoryId,
      name: data.Name,
      ...data,
    };

    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to create category" },
      { status: 500 },
    );
  }
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
