import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";
import {BillItem} from "@/lib/types";

export const MiscCard = ({ icon: Icon, name, amount, status}:BillItem) => {
    return (
        <Card variant="light">
            <CardHeader className="text-left text-(--text-secondary)">
                <Icon className="text-(--primary)" size={25}/>
                <span>{name}</span>
            </CardHeader>
            <h1 className="text-2xl">${amount.toLocaleString()}</h1>
            <Badge variant="positive">{status}</Badge>
        </Card>
    )
}
