"use client"

import {StatCard} from "@/components/StatCard";
import {HiArrowSmallDown, HiArrowSmallUp} from "react-icons/hi2";
import {Bills} from "@/lib/data";
import {BalanceCard} from "@/components/BalanceCard";
import {InfoPillCard} from "@/components/InfoPillCard";
import {MiscCard} from "@/components/MiscCard";
import {generateUsers, SpendingTable} from "@/components/SpendingTable";
import { GoHome } from "react-icons/go";
import { FaUtensils, FaShoppingCart } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import {transactionItem, User} from "@/lib/types";
import {TransactionCard} from "@/components/TransactionCard";

/*************************************************
        TRANSACTIONS
**************************************************/

const categories = [
    { name: "rent", icon: GoHome },
    { name: "food", icon: FaUtensils },
    { name: "shopping", icon: FaShoppingCart },
    { name: "subscriptions", icon: MdSubscriptions },
];

const getRandomTransaction = (users: User[]): transactionItem => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const user = users[Math.floor(Math.random() * users.length)];

    return {
        icon: category.icon,
        name: `${category.name}`,
        date: new Date(
            2026,
            3,
            Math.floor(Math.random() * 28) + 1
        ),
        user,
        amount: Math.floor(Math.random() * 500) + 20,
        category: category.name
    }
}

const generateTransactions = (
    count: number,
    users: User[],
): transactionItem[] => {
    return Array.from({ length: count }, () => getRandomTransaction(users));
}
// *******************************************************************************

const totalBalance = 35000.00;
const monthlyIncome = 2000.00;
const incomePercent = totalBalance
    ? (monthlyIncome / totalBalance) * 100
    : 0;




const Page = () => {

    /* ************************************
            for transactions
    ***************************************/
    const users = generateUsers(5);
    const transactions = generateTransactions(10, users);

    return (
        <div className="grid grid-cols-12 gap-5">

            {/* Main contents */}
            <div className="col-span-12 flex flex-col gap-7">
                {/* Top cards */}
                <div className="grid grid-cols-5 gap-5">

                    {/* Total Balance */}
                    <BalanceCard header={"Total Balance"} balance={totalBalance} stat={5.2} className="col-span-3" />
                    <StatCard symbol={HiArrowSmallDown} header="Monthly Income" amount={monthlyIncome} barValue={incomePercent} />
                    <div className="flex flex-col gap-5">
                        <InfoPillCard header="Expenses" amount={6200.00} type="expense" icon={HiArrowSmallDown} />
                        <InfoPillCard header="Income" amount={9400.00} type="income" icon={HiArrowSmallUp} />
                    </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1/3 h-112">
                        <TransactionCard header="Family Activity Feed" transactions={transactions} />
                    </div>

                    {/* Side cards */}
                    <SpendingTable header="Spending Power" className="flex-1" />

                </div>
            </div>
            <div className="flex gap-4 col-span-12">
                {
                    Bills.map(({ icon, name, status, amount }) => (
                        <MiscCard key={name} icon={icon} name={name} status={status} amount={amount}/>
                    ))
                }
            </div>

        </div>
    )
}
export default Page;
