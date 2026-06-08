"use client"
import { useState } from "react"
import RequestItem from "@/components/home/coordenador/RequestItem"
import Topbar from "@/components/topbar/Topbar"

const mockRequests = [
    { id: 1, title: "Solicitação #1234 pendente", subtitle: "Aguardando validação do setor responsável", time: "Há 2 horas" },
    { id: 2, title: "Solicitação #1234 pendente", subtitle: "Aguardando validação do setor responsável", time: "Há 2 horas" },
    { id: 3, title: "Solicitação #1234 pendente", subtitle: "Aguardando validação do setor responsável", time: "Há 2 horas" },
    { id: 4, title: "Solicitação #1234 pendente", subtitle: "Aguardando validação do setor responsável", time: "Há 2 horas" },
    { id: 5, title: "Solicitação #1234 pendente", subtitle: "Aguardando validação do setor responsável", time: "Há 2 horas" },
    { id: 6, title: "Solicitação #1234 pendente", subtitle: "Aguardando validação do setor responsável", time: "Há 2 horas" },
    { id: 7, title: "Solicitação #1234 pendente", subtitle: "Aguardando validação do setor responsável", time: "Há 2 horas" },
    { id: 8, title: "Solicitação #1234 pendente", subtitle: "Aguardando validação do setor responsável", time: "Há 2 horas" },
    { id: 9, title: "Solicitação #1234 pendente", subtitle: "Aguardando validação do setor responsável", time: "Há 2 horas" },
]

export default function SolicitacoesCoordenador() {
    const [activeTab, setActiveTab] = useState("PENDENTE")

    return (
        <div className="flex flex-1 flex-col pb-4 gap-4">
            {/* Header */}
            <Topbar />

            {/* Filter Bar */}
            <div className="flex items-center gap-4 border border-gray-300 rounded-[14px] px-5 py-3 bg-white shadow-sm">
                <button className="flex items-center gap-2 text-[#103D85] font-semibold text-[15px] hover:opacity-80 transition-opacity mr-2 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="#103D85"/>
                    </svg>
                    Filtrar
                </button>

                <div className="relative">
                    <select className="appearance-none border border-gray-300 rounded-full pl-5 pr-10 py-1.5 text-gray-500 bg-white outline-none focus:border-[#103D85] min-w-[120px] text-[14px]">
                        <option>CR</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M7 10L12 15L17 10" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Supervisor" 
                        className="border border-gray-300 rounded-full px-5 py-1.5 text-gray-500 bg-white outline-none focus:border-[#103D85] min-w-[150px] text-[14px]"
                    />
                </div>

                <div className="relative flex-1">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#888"/>
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="w-full border border-gray-300 rounded-full pl-11 pr-6 py-1.5 text-gray-500 bg-white outline-none focus:border-[#103D85] text-[14px]"
                    />
                </div>
            </div>

            {/* Main Container */}
            <div className="flex-1 bg-white border border-gray-300 rounded-[14px] shadow-sm overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
                    <h2 className="text-[#103D85] font-bold text-[22px]">
                        Solicitações pendentes
                    </h2>

                    {/* Tabs */}
                    <div className="flex bg-[#F4F4F4]/70 rounded-full p-0.5 border border-gray-200 shadow-sm">
                        {["PENDENTE", "APROVADAS", "CONCLUÍDAS"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    px-6 py-1.5 rounded-full font-bold text-[12px] tracking-wider transition-all
                                    ${activeTab === tab 
                                        ? "text-[#103D85] bg-white shadow-sm" 
                                        : "text-gray-400 hover:text-gray-600"
                                    }
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col pb-6 overflow-y-auto">
                    {mockRequests.map((req, index) => (
                        <RequestItem 
                            key={req.id}
                            title={req.title}
                            subtitle={req.subtitle}
                            time={req.time}
                            isOdd={index % 2 === 0}
                            onApprove={() => console.log('Aprovar', req.id)}
                            onReject={() => console.log('Recusar', req.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

