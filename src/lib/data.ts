import {
  MdHome,
  MdElectricBolt,
  MdWifi,
  MdDirectionsCar,
  MdPhoneIphone,
  MdRestaurant,
  MdLocalGasStation,
  MdSubscriptions,
  MdDirectionsBus,
  MdAttachMoney,
  MdSettings,
  MdAccountBalanceWallet,
  MdDashboard,
  MdGroup,
  MdReceiptLong,
  MdFastfood,
  MdMovie,
  MdShoppingCart,
  MdHealthAndSafety,
} from "react-icons/md";
import {
  FaSpotify,
  FaShoppingCart,
  FaApple,
  FaAmazon,
  FaGamepad,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import {
  ActivityItem,
  BillItem,
  NavItem,
  CategoryItem,
  BudgetItem,
} from "@/lib/types";

export const NavItems: NavItem[] = [
  {
    href: "/personal",
    label: "Personal Dashboard",
    icon: MdDashboard,
  },
  {
    href: "/family",
    label: "Family Dashboard",
    icon: MdGroup,
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: MdReceiptLong,
  },
  {
    href: "/budgets",
    label: "Budgets",
    icon: MdAccountBalanceWallet,
  },
  {
    href: "/bills",
    label: "Bills",
    icon: FaFileInvoiceDollar,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: MdSettings,
  },
];

export const Bills: BillItem[] = [
  {
    icon: MdHome,
    name: "Rent",
    status: "Due in 2 days",
    amount: 1200,
  },
  {
    icon: MdElectricBolt,
    name: "Electricity",
    status: "Due in 5 days",
    amount: 180,
  },
  {
    icon: MdWifi,
    name: "Internet",
    status: "Paid",
    amount: 79,
  },
  {
    icon: MdPhoneIphone,
    name: "Mobile Plan",
    status: "Due tomorrow",
    amount: 45,
  },
  {
    icon: MdDirectionsCar,
    name: "Car Insurance",
    status: "Due in 10 days",
    amount: 320,
  },
  {
    icon: FaSpotify,
    name: "Spotify",
    status: "Paid",
    amount: 12,
  },
  {
    icon: FaShoppingCart,
    name: "Groceries",
    status: "Weekly",
    amount: 150,
  },
];

export const Activities: ActivityItem[] = [
  {
    name: "Apple Store",
    status: "Electronics · 2h ago",
    amount: -199,
    icon: FaApple,
  },
  {
    icon: MdRestaurant,
    name: "McDonald's",
    status: "Food · 3h ago",
    amount: -12,
  },
  {
    icon: MdLocalGasStation,
    name: "Shell",
    status: "Fuel · 5h ago",
    amount: -65,
  },
  {
    icon: FaAmazon,
    name: "Amazon",
    status: "Shopping · Yesterday",
    amount: -89,
  },
  {
    icon: MdSubscriptions,
    name: "Netflix",
    status: "Subscription · 2 days ago",
    amount: -18,
  },
  {
    icon: FaSpotify,
    name: "Spotify",
    status: "Subscription · 3 days ago",
    amount: -12,
  },
  {
    icon: MdDirectionsBus,
    name: "Myki",
    status: "Transport · Today",
    amount: -5,
  },
  {
    icon: MdAttachMoney,
    name: "Salary",
    status: "Income · 1 day ago",
    amount: +1640,
  },
];

export const categories: CategoryItem[] = [
  {
    icon: MdHome,
    label: "Rent",
    amount: -1200,
  },
  {
    icon: MdFastfood,
    label: "Food",
    amount: 320,
  },
  {
    icon: MdDirectionsCar,
    label: "Transport",
    amount: 150,
  },
  {
    icon: MdMovie,
    label: "Entertainment",
    amount: -90,
  },
  {
    icon: FaGamepad,
    label: "Gaming",
    amount: -60,
  },
  {
    icon: MdShoppingCart,
    label: "Shopping",
    amount: -210,
  },
  {
    icon: MdHealthAndSafety,
    label: "Health",
    amount: -80,
  },
];

export const budgets: BudgetItem[] = [
  {
    icon: MdHome,
    label: "Rent",
    percentage: 85,
  },
  {
    icon: MdFastfood,
    label: "Food",
    percentage: 60,
  },
  {
    icon: MdDirectionsCar,
    label: "Transport",
    percentage: 45,
  },
  {
    icon: MdMovie,
    label: "Entertainment",
    percentage: 70,
  },
  {
    icon: FaGamepad,
    label: "Gaming",
    percentage: 30,
  },
  {
    icon: MdShoppingCart,
    label: "Shopping",
    percentage: 55,
  },
  {
    icon: MdHealthAndSafety,
    label: "Health",
    percentage: 20,
  },
];

