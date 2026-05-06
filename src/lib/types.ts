import {IconType} from "react-icons";

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
    symbol: IconType,
    header: string,
    amount: number,
    barValue: number,
};

export type BalanceCardProps = {
    header: string,
    balance: number,
    stat: number,
    className: string,
};

export type NavItem = {
   href: string,
   label: string,
   icon: IconType
};

export type BillItem = {
    icon: IconType;
    name: string;
    status: string;
    amount: number;
};

export type ActivityItem = {
    icon: IconType;
    name: string;
    status: string;
    amount: number;
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
};

export type InfoPillCardProps = {
    header: string;
    amount: number;
    type: "expense" | "income";
    icon: IconType;
}


export type SpendingTableProps = {
    className?: string;
    header: string;
}


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
}

export type User = {
    id: string;
    name: string;
    profilePicture: string;
    expenses: Expense[];
}

export type ExpenseProfileProps = {
    user: User;
};