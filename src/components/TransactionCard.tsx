import React from 'react'
import {Card, CardHeader} from "@/components/ui/Card";
import {transactionItem} from "@/lib/types";
import {cap} from "@/lib/utils";

type TransactionCardProps = {
    header: string;
    transactions: transactionItem[];
}

export const TransactionCard = ({ header, transactions }: TransactionCardProps ) => {
    return (
        <Card variant="dark" className="gap-5">
            <div className="flex items-center justify-between">
                <CardHeader className="text-left">{header}</CardHeader>
                <button className="text-xs font-medium text-(--primary) hover:text-(--primary-container) transition-colors cursor-pointer">View all</button>
            </div>
            <div className="flex flex-col items-start gap-1.5 text-white">
                {
                    transactions.slice(0,5).map((transaction) => {
                        const Icon = transaction.icon;
                      return (
                          <div key={transaction.user.id} className="flex items-center justify-between gap-3 w-full rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.03] px-2 py-2 transition-colors">
                              <div className="flex items-center gap-3.5 min-w-0">
                                  <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl border border-white/8 bg-white/[0.04]">
                                      <Icon className="text-white/80 w-4 h-4" />
                                  </span>
                                  <div className="flex flex-col items-start min-w-0">
                                      <h2 className="text-sm font-medium truncate">{cap(transaction.name)}</h2>
                                      <div className="flex items-center gap-2 text-xs">
                                          <p className="text-white/35">{transaction.date.toLocaleDateString("en-AU", { day: "numeric", month: "short" })}</p>
                                          <span className="h-[3px] w-[3px] rounded-full bg-white/20"/>
                                          <p className="text-white/60 bg-white/5 py-0.5 px-2 rounded-full font-label">{transaction.user.name}</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="flex flex-col items-end shrink-0">
                                  <p className="text-(--error) text-sm font-semibold tabular-nums">-${transaction.amount.toLocaleString()}</p>
                                  <span className="text-white/30 text-xs font-label">{transaction.category}</span>
                              </div>
                          </div>
                      )
                    })
                }
            </div>
        </Card>
    )
}
