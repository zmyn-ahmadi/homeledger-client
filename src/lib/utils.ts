import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CategoryExpense } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getErrorMessage(status: number) {
  switch (status) {
    case 400:
      return "Invalid request data";
    case 401:
      return "Please log in to continue";
    case 404:
      return "Resource not found";
    case 500:
      return "Server error, try again later";
    case 204:
      return "Successful action, no data to send back";
  }
}

export function sumThisMonth(rows: { Amount: number; Date: string | Date }[]) {
  const now = new Date();
  return rows
    .filter((row) => {
      const date = new Date(row.Date);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((total, row) => total + Number(row.Amount), 0);
}

export function cap(word: string) {
  if (!word) return word;
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

// Parse a Response body as JSON, tolerating an empty body (e.g. the backend
// returns a 2xx with no content when there is no data yet). Returns `fallback`
// when the body is empty or not valid JSON.
export async function safeJson<T>(res: Response, fallback: T): Promise<T> {
  const text = await res.text();
  if (!text) return fallback;
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

// Extract a human-readable message from an API error body, whatever its shape.
// Proxy routes wrap the backend body as { error: <body> }, and the backend body
// itself may be a string, { error: "..." }, or ASP.NET validation problem
// details ({ title, errors: { Field: ["msg"] } }). Always returns a string —
// never an object — so it is safe to render in JSX.
export function getApiErrorMessage(data: unknown, fallback: string): string {
  const fromShape = (value: unknown, depth: number): string | undefined => {
    if (typeof value === "string" && value.trim()) return value;
    if (!value || typeof value !== "object" || depth > 3) return undefined;

    const obj = value as Record<string, unknown>;

    // ASP.NET model validation: { title, errors: { Field: ["message"] } }
    if (obj.errors && typeof obj.errors === "object") {
      const firstField = Object.values(obj.errors as Record<string, unknown>)[0];
      if (Array.isArray(firstField) && typeof firstField[0] === "string")
        return firstField[0];
    }

    return (
      fromShape(obj.error, depth + 1) ??
      fromShape(obj.message, depth + 1) ??
      fromShape(obj.title, depth + 1)
    );
  };

  return fromShape(data, 0) ?? fallback;
}

export function getHeaders(accessToken: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

export function getCategoryMap(categories: { CategoryId: number; Icon: string }[]) {
  const map: Record<number, string> = {};
  for (const c of categories) {
    map[c.CategoryId] = c.Icon;
  }
  return map;
}

// Get the total expense by each category compared to budget category
export const getTotalExpenseByCategory = (
  catId: number,
  expenses: CategoryExpense[],
) => {
  return expenses
    .filter((e) => e.CategoryId === catId)
    .reduce((acc, e) => acc + e.Total, 0);
};
