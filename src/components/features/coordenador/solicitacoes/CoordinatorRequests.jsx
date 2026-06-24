"use client";

import { useState } from "react";
import Topbar from "@/components/layout/topbar/Topbar";
import CoordinatorRequestFilters from "./CoordinatorRequestFilters";
import RequestItem from "./RequestItem";
import { coordinatorRequests, requestTabs } from "./requestData";

export default function CoordinatorRequests() {
    const [activeTab, setActiveTab] = useState("PENDENTE");

    return (
        <div className="flex flex-1 flex-col pb-4 gap-4">
            <Topbar />
            <CoordinatorRequestFilters />
            <section className="flex-1 bg-white border border-gray-300 rounded-[14px] shadow-sm overflow-hidden flex flex-col">
                <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
                    <h2 className="text-[#103D85] font-bold text-[22px]">Solicitações pendentes</h2>
                    <div className="flex bg-[#F4F4F4]/70 rounded-full p-0.5 border border-gray-200 shadow-sm">
                        {requestTabs.map((tab) => (
                            <button type="button" key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-1.5 rounded-full font-bold text-[12px] tracking-wider transition-all ${activeTab === tab ? "text-[#103D85] bg-white shadow-sm" : "text-gray-400 hover:text-gray-600"}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </header>
                <div className="flex flex-col pb-6 overflow-y-auto">
                    {coordinatorRequests.map((request, index) => (
                        <RequestItem key={request.id} title={request.title} subtitle={request.subtitle} time={request.time} isOdd={index % 2 === 0} />
                    ))}
                </div>
            </section>
        </div>
    );
}