// GET: /api/transactions

import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  // get the access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const [expenseRes, incomeRes] = await Promise.all([
    fetch(`${process.env.API_URL}/api/expense`, { headers }),
    fetch(`${process.env.API_URL}/api/income`, { headers }),
  ]);

  if (!expenseRes.ok) {
    const err = await expenseRes.json().catch(() => ({}));
    return NextResponse.json({ error: err }, { status: expenseRes.status });
  }

  if (!incomeRes.ok) {
    const err = await incomeRes.json().catch(() => ({}));
    return NextResponse.json({ error: err }, { status: incomeRes.status });
  }

  const [expenses, incomes] = await Promise.all([
    expenseRes.json(),
    incomeRes.json(),
  ]);

  const transactions = [
    ...expenses.map((e: any) => ({ ...e, type: "expense" })),
    ...incomes.map((i: any) => ({ ...i, type: "income" })),
  ].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

  return NextResponse.json(transactions);
}
