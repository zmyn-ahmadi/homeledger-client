import React from 'react'
import {Sidebar} from "@/components/Sidebar";
import {Topbar} from "@/components/Topbar";

type PropType = {
    children: React.ReactNode;
}
const HomeledgerLayout = ({ children }: PropType) => {
    return (
        <div className="flex min-h-screen w-full bg-(--bg-main)">
            <Sidebar />
            {/* pb clears the mobile bottom tab bar */}
            <div className="flex-1 min-w-0 flex flex-col px-4 sm:px-6 lg:px-8 py-5 lg:py-6 pb-28 lg:pb-8">
                <Topbar />
                <main className="mt-6 lg:mt-8 mx-auto w-full max-w-[1440px]">{children}</main>
            </div>
        </div>
    )
}
export default HomeledgerLayout;
