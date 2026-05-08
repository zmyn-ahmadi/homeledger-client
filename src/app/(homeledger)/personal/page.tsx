"use client";

import {StatCard} from "@/components/StatCard";
import {HiArrowSmallDown, HiArrowSmallUp} from "react-icons/hi2";
import {WorkTracker} from "@/components/WorkTracker";
import {Chart} from "@/components/Chart";
import {Activities, Bills, budgets, categories} from "@/lib/data";
import {DataCard} from "@/components/DataCard";
import {ActivityCard} from "@/components/ActivityCard";
import {BalanceCard} from "@/components/BalanceCard";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

const totalBalance = 35000.00;
const monthlyIncome = 2000.00;
const monthlyExpense = 1050.00;
const incomePercent = totalBalance
? (monthlyIncome / totalBalance) * 100
: 0;
const expensePercent = totalBalance
    ? (monthlyExpense / totalBalance) * 100
    : 0;
const salaryPerDay = 317.42;

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const jobId = searchParams.get("jobId");
        if(!jobId) return;

        fetch(`/api/basiq/jobs/${jobId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log("success");
                    // Clean up the URL
                    router.replace("/personal");
                } else {
                    console.log("failed")
                }
            })
            .catch(() => console.log("failed"));
    }, []);

    return (
        <div className="grid grid-cols-12 gap-5">

            {/* Main contents */}
            <div className="col-span-12 flex flex-col gap-5">
                {/* Top cards */}
                <div className="grid grid-cols-5 gap-4">

                    {/* Total Balance */}
                    <BalanceCard header={"Total Balance"} balance={totalBalance} stat={5.2} badgeLabel="vs. last month" className="col-span-2" />
                    <StatCard symbol={HiArrowSmallDown} header="Monthly Income" amount={monthlyIncome} barValue={incomePercent} />
                    <StatCard symbol={HiArrowSmallUp} header="Monthly Expenses" amount={-monthlyExpense} barValue={expensePercent} />
                    <WorkTracker salaryPerDay={salaryPerDay} />

                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1/4">
                        <Chart className="h-112" />
                    </div>

                    {/* Side cards */}
                    <div className="flex flex-col gap-4 flex-1">
                        <ActivityCard type="bills" label="Upcoming Bills" data={Bills} />
                        <ActivityCard type="activity" label="Recent Activity" data={Activities} />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 col-span-12">
                <DataCard type="category" label="Category Spend" data={categories} />
                <DataCard type="budget" label="Active Budgets" data={budgets} />
            </div>

        </div>
    )
}
export default Page;