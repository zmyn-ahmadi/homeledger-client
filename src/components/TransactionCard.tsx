import React from 'react'
import {Card} from "@/components/ui/Card";
import {transactionItem} from "@/lib/types";

type TransactionCardProps = {
    header: string;
    transactions: transactionItem[];
}

export const TransactionCard = ({ header, transactions }: TransactionCardProps ) => {
    return (
        <Card variant="dark" className="gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-white">{header}</h1>
                <button className="text-(--primary)">View all transactions</button>
            </div>
            <div className="flex flex-col item-start gap-4 text-white">
                {
                    transactions.slice(0,5).map((transaction) => {
                        const Icon = transaction.icon;
                      return (
                          <div key={transaction.user.id} className="flex item-center justify-between">
                              <div className="flex items-center gap-4">
                                  <Icon  className="bg-white/5 text-white/70 rounded-full h-10 w-10 p-2.5" />
                                  <div className="flex flex-col items-start justify-between">
                                      <h2 className="text-lg">{transaction.name}</h2>
                                      <div className="flex items-center gap-2 text-sm">
                                          <p className="text-white/20 font-medium">{transaction.date.toDateString()}</p>
                                          <span className="rounded-full bg-white/50 p-[2.5px]"/>
                                          <p className="text-white bg-white/5 py-1 px-2 rounded-4xl">{transaction.user.name}</p>
                                      </div>
                                  </div>

                              </div>
                              <div className="flex flex-col items-end">
                                  <p className="text-(--error) text-lg">-${transaction.amount.toLocaleString()}</p>
                                  <span className="text-white/20 text-sm font-medium">{transaction.category}</span>
                              </div>
                          </div>
                      )
                    })
                }
            </div>
        </Card>
    )
}
