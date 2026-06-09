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
      totalExpenseByCat: [];
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
export type BillStatus = "Upcoming" | "Overdue" | "Paid";

export interface Bill {
  BillId: number;
  Name: string;
  Amount: number;
  DueDate: string; // ISO format: "2026-05-10"
  isRecurring: boolean;
  RecurringFrequency: number;
  Notes: string;
  Scope: string;
  Status: BillStatus;
}

// -------------------------
// Recurring Frequency
// -------------------------
export const RecurringFrequency = {
  WEEKLY: 0,
  MONTHLY: 1,
  YEARLY: 2,
} as const;

export type RecurringFrequencyType =
  (typeof RecurringFrequency)[keyof typeof RecurringFrequency];

export const FREQUENCY_LABELS: Record<RecurringFrequencyType, string> = {
  [RecurringFrequency.WEEKLY]: "Weekly",
  [RecurringFrequency.MONTHLY]: "Monthly",
  [RecurringFrequency.YEARLY]: "Yearly",
};

// -------------------------
// Bill Status Enum
// -------------------------
export const BillStatusEnum = {
  UPCOMING: 0,
  OVERDUE: 1,
  PAID: 2,
};

export type BillStatusType =
  (typeof BillStatusEnum)[keyof typeof BillStatusEnum];

export const BILL_STATUS_LABELS: Recor<BillStatusType, string> = {
  [BillStatusEnum.UPCOMING]: "Upcoming",
  [BillStatusEnum.OVERDUE]: "Overdue",
  [BillStatusEnum.PAID]: "Paid",
};
