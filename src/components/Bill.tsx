import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {InfoCard} from "@/components/ui/InfoCard";
import {MdHome} from "react-icons/md";
import {Badge} from "@/components/ui/Badge";
import {IoIosCheckmarkCircle} from "react-icons/io";
import {IconType} from "react-icons";

type BillProps = {
    icon: IconType;
    label: string;
    status: string;
    amount: number;
};

export const Bill = ({icon: Icon, label, status, amount }: BillProps) => {
    return (
        <Card variant="light" className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
                <CardHeader className="text-left">
                    Upcoming Bills
                </CardHeader>
                <HiOutlineDotsHorizontal className="text-white shrink-0 cursor-pointer" />
            </div>
            <div className="flex flex-col items-start justify-between gap-4 w-full">
                <InfoCard variant="upcoming" className="w-full">
                    <div className="flex items-center gap-4">
                        <div className="bg-(--bg-surface-container-highest) p-2 rounded-full">
                            <Icon className="text-white" />
                        </div>
                        <div className="flex flex-col items-start text-sm">
                            <p className="text-white font-medium font-label">{label}</p>
                            <Badge variant="negative" className="-mt-2 font-bold">{status}</Badge>
                        </div>
                    </div>
                    <p className="text-white font-medium">${amount.toLocaleString()}</p>
                </InfoCard>
            </div>
        </Card>
    )
}
