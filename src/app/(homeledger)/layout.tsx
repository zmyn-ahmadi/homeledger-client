import React from 'react'
import {Sidebar} from "@/components/Sidebar";
import {Topbar} from "@/components/Topbar";

type PropType = {
    children: React.ReactNode;
}
const HomeledgerLayout = ({ children }: PropType) => {
    return (
        <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 flex-col gap-5 bg-(--bg-main) px-8 py-6">
                <Topbar />
                <main className="mt-8">{children}</main>
            </div>
        </div>
    )
}
export default HomeledgerLayout;
