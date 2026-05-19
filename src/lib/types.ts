import { IconType } from "react-icons";

export type DataCardProps =
  | {
      type: "category";
      label: string;
      data: CategoryItem[];
    }
  | {
      type: "budget";
      label: string;
      data: BudgetItem[];
    };

export type CategoryItem = {
  icon: IconType;
  label: string;
  amount: number;
};

export type BudgetItem = {
  icon: IconType;
  label: string;
  percentage: number;
};

export type StatCardProps = {
  symbol: IconType;
  header: string;
  amount: number;
  barValue: number;
};

export type BalanceCardProps = {
  header: string;
  balance: number;
  stat?: number | string;
  badgeLabel?: string;
  className?: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: IconType;
};

export type BillItem = {
  icon: IconType;
  name: string;
  status: string;
  amount: number;
};

export type ActivityItem = {
  name: string;
  amount: number;
  note: string;
  date: Date;
  icon: IconType;
};
export type ActivityCardProps =
  | {
      type: "bills";
      label: string;
      data: BillItem[];
    }
  | {
      type: "activity";
      label: string;
      data: ActivityItem[];
      categoryMap: Record<number, string>;
    };

export type InfoPillCardProps = {
  header: string;
  amount: number;
  type: "expense" | "income";
  icon: IconType;
};

export type SpendingTableProps = {
  className?: string;
  header: string;
};

export type transactionItem = {
  icon: IconType;
  name: string;
  date: Date;
  user: User;
  amount: number;
  category: string;
};

// temp
export type Expense = {
  id: string;
  amount: number;
  date: string;
  category: string;
};

export type User = {
  id: string;
  name: string;
  profilePicture: string;
  expenses: Expense[];
};

export type ExpenseProfileProps = {
  user: User;
};

// types/bill.ts
export type BillStatus = "upcoming" | "overdue" | "paid";

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string; // ISO format: "2026-05-10"
  status: BillStatus;
  paidBy: string;
  scope: "personal" | "family";
}
