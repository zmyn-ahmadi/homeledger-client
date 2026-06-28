import { IconType } from "react-icons";

export type CategorySpendItem = {
  CategoryId: number;
  Category: string;
  Icon: string;
  Total: number;
};

export type DataCardProps =
  | {
      type: "category";
      label: string;
      data: CategorySpendItem[];
    }
  | {
      type: "budget";
      label: string;
      data: Budget[];
      totalExpense: CategoryExpense[];
      categoryMap: Record<number, string>;
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
  BillId: number;
  Name: string;
  Amount: number;
  status: string;
  CategoryId?: number;
};

export type ActivityItem = {
  ExpenseId?: number;
  IncomeId?: number;
  Description: string;
  Amount: number;
  CategoryId: number;
  status: string;
  type: "income" | "expense";
  Date: string;
  Note?: string | null;
  name?: string;
};

export type ActivityCardProps =
  | {
      type: "bills";
      label: string;
      data: BillItem[];
      categoryMap: Record<number, string>;
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

export type User = {
  id: string;
  name: string;
  profilePicture: string;
  expenses: Expense[];
};

export type ExpenseProfileProps = {
  user: User;
};
// ----------------------------------------------

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

export const BILL_STATUS_LABELS: Record<BillStatusType, string> = {
  [BillStatusEnum.UPCOMING]: "Upcoming",
  [BillStatusEnum.OVERDUE]: "Overdue",
  [BillStatusEnum.PAID]: "Paid",
};

// ------------ Budget
export type Period = "Weekly" | "Monthly" | "Yearly" | "Custom";

export interface Budget {
  BudgetId: number;
  Name: string;
  LimitAmount: number;
  Period: Period;
  StartDate: string;
  EndDate?: string | null;
  AlertThreshold: number;
  OwnerId: number;
  CategoryId: number;
}

// CategoryExpense
export interface CategoryExpense {
  CategoryId: number;
  Total: number;
}

// category
export type TransactionType = "Expense" | "Income" | "Both";

export interface Category {
  CategoryId: number;
  Name: string;
  Color: string;
  Icon?: string | null;
  Type: TransactionType;
  OwnerId: number;
}

export interface Income {
  IncomeId: number;
  Amount: number;
  Date: string;
  Description: string;
  Note?: string | null;
  IsRecurring: boolean;
  RecurringFrequency: RecurringFrequencyType;
  OwnerId: number;
}

export interface Expense {
  ExpenseId: number;
  Amount: number;
  Date: string;
  Description: string;
  Note?: string | null;
  OwnerId: number;
  CategoryId: number;
}

export interface Bill {
  BillId: number;
  Name: string;
  Amount: number;
  DueDate: string; // ISO format: "2026-05-10"
  isRecurring?: boolean;
  RecurringFrequency: string;
  Notes: string;
  Scope: string;
  Status: string;
}
