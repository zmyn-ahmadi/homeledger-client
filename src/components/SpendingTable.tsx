"use client"

import React, {useState} from 'react'
import {Card} from "@/components/ui/Card";
import {Expense, SpendingTableProps, User} from "@/lib/types";
import {ExpenseProfile} from "@/components/ExpenseProfile";


const names: string[] = [ "zamin", "atta", "saif", "ahmad", "dad", "mom" ]
const categories = ["utilities", "food", "rent", "entertainment"]


const getRandomNames = () => {
    return names[Math.floor(Math.random() * names.length)];
}

const getRandomCategory = () => {
    return categories[Math.floor(Math.random() * categories.length)];
}

const getRandomDate = () => {
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    return `${day}/04/2026`
}

const getRandomAmount = () => {
    return Math.floor(Math.random() * 500) + 20;
}


const generateExpenses = (count: number): Expense[] => {
    return Array.from({ length: count }, (_, i) => ({
        ExpenseId: i,
        Amount: getRandomAmount(),
        Date: getRandomDate(),
        Description: getRandomCategory(),
        OwnerId: 0,
        CategoryId: 0,
    }));
};

export const generateUsers = (count: number): User[] => {
    return Array.from({ length: count }, () => ({
        id: crypto.randomUUID(),
        name: getRandomNames(),
        profilePicture: `https://i.pravatar.cc/150?u=${Math.random()}`,
        expenses: generateExpenses(Math.floor(Math.random() * 6) + 3),
    }))
}


export const SpendingTable = ({ className, header } : SpendingTableProps) => {
    const [users] = useState(generateUsers(5));

    return (
        <Card variant="dark" className={className}>
            <h1 className="font-label text-[11px] uppercase tracking-[0.14em] font-medium text-white/45">{header}</h1>
            <div className="flex flex-col item-start gap-4 mt-5">
                {users.map((user) => (
                    <ExpenseProfile key={user.id} user={user} />
                ))}
            </div>
        </Card>
    )
}
