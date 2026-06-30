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
