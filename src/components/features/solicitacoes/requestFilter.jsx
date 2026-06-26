'use client';

import Input from '@/components/ui/input/Input';
import Image from 'next/image';


export default function SolicitacoesFilter({
    status,
    setStatus,
    data,
    setData,
    busca,
    setBusca,
    statusDisponiveis,
}) {
    const temFiltroAtivo = status !== "" || data !== "" || busca !== "";

    const limparFiltros = () => {
        setStatus("");
        setData("");
        setBusca("");
    };

    return (
        <div className="bg-white rounded-xl border border-[#AAAAAA] flex flex-row items-center justify-between p-2 gap-3">
            <span className="pl-3 text-[18px] text-[#133D87]">
                Filtrar
            </span>

            <div className="flex flex-row items-center gap-3">
                <div className="relative w-[140px]">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="appearance-none pl-3 w-full py-2 border border-[#AAAAAA] rounded-xl text-sm text-[#374151] bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#103D85]"
                    >
                        <option value="">Status</option>
                        {statusDisponiveis.map((item) => (
                            <option key={item.id} value={item.nome}>
                                {item.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-[140px]">
                    <Input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="!h-auto py-2 text-sm !border-[#AAAAAA]"
                    />
                </div>

                <div className="flex flex-row items-center w-[260px] px-3 border border-[#AAAAAA] rounded-xl text-sm focus-within:ring-1 focus-within:ring-[#103D85]">
                    <Image
                        src="/images/icons/lupa.png"
                        alt="Ícone de lupa"
                        width={21}
                        height={21}
                        className="w-5 h-5"
                    />

                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="pl-2 w-full py-2 text-sm focus:outline-none focus:ring-0 border-none bg-transparent"
                    />
                </div>

            </div>
        </div>
    );
}