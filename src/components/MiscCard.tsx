import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";
import {BillItem} from "@/lib/types";

export const MiscCard = ({ icon: Icon, name, amount, status}:BillItem) => {
    return (
        <Card variant="light" className="gap-3">
            <CardHeader className="flex-row items-center gap-2.5 text-left">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl border border-(--primary)/15 bg-(--primary)/10">
                    <Icon className="text-(--primary) w-4 h-4"/>
                </span>
                <span>{name}</span>
            </CardHeader>
            <h1 className="text-2xl font-semibold tracking-tight tabular-nums">${amount.toLocaleString()}</h1>
            <Badge variant="positive" className="self-start">{status}</Badge>
        </Card>
    )
}
