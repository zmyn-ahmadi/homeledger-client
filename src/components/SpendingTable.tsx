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
        id: crypto.randomUUID(),
        amount: getRandomAmount(),
        date: getRandomDate(),
        category: getRandomCategory()
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
            <h1 className="text-white font-bold tracking-wide">{header}</h1>
            <div className="flex flex-col item-start gap-4 mt-4">
                {users.map((user) => (
                    <ExpenseProfile key={user.id} user={user} />
                ))}
            </div>
        </Card>
    )
}
