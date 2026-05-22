import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getErrorMessage(status) {
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

export function getHeaders(accessToken: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

export function getCategoryMap(categories) {
  const map: Record<number, string> = {};
  for (const c of categories) {
    map[c.CategoryId] = c.Icon;
  }
  return map;
}

// Get the total expense by each category compared to budget category
export const getTotalExpenseByCategory = (catId: number, expenses: []) => {
  return expenses
    .filter((e) => e.CategoryId === catId)
    .reduce((acc, e) => acc + e.Total, 0);
};
