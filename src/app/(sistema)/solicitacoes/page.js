'use client';

import TopBar from "@/components/topbar/Topbar";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/login/Input";

export default function TodasSolicitacoes() {

    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [busca, setBusca] = useState("");

    const statusDisponiveis = [
        { id: 1, nome: "Em análise" },
        { id: 2, nome: "Reprovado" },
        { id: 3, nome: "Parcial Aprovado" },
        { id: 4, nome: "Aprovado" }
    ]

    const STATUS_CORES = {
        "Em análise": "bg-[#EDAE28]",
        "Reprovado": "bg-[#E30613]",
        "Parcial Aprovado": "bg-[#0084FF]",
        "Aprovado": "bg-[#4CAF50]"
    };

    return(
        <>
            <div className="bg-white rounded-xl border border-[#797979] flex flex-row justify-between p-2">
                <div className='flex flex-row items-center px-4'>
                    <Image
                        src={'/images/icons/filtrar.png'}
                        alt="Ícone de filtros"
                        height={21}
                        width={21}
                        className="w-5 h-5"
                    >

                    </Image>

                    <div className='text-xl text-[#133D87] pl-3 pr-64'>
                        <p>Filtrar</p>
                    </div>
                </div>

                <div className="relative">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="appearance-none pl-3 w-[200px] py-2 border border-[#797979] rounded-xl text-sm text-[#374151] bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#103D85]"
                    >

                        <option value="">Status</option>
                        {statusDisponiveis.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.nome}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="relative">
                        <Input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="!h-auto py-2 text-sm !border-[#797979]"
                        />
                </div>

                <div className='flex flex-row items-center w-[400px] px-3 border border-[#797979] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#103D85]'>
                    <Image
                        src={'/images/icons/lupa.png'}
                        alt="Ícone de lupa"
                        height={21}
                        width={21}
                        className="w-5 h-5"
                    >
                    </Image>

                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className='pl-2 w-full py-2 text-sm focus:outline-none focus:ring-0 border-none bg-transparent'
                    />
                </div>
            </div>
        </>
    )

}