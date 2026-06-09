"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input/Input";
import { SearchCard } from "./SearchCard";

export function Search({
    data = [],
    placeholder = "🔍︎ Pesquisar CR...",
}) {
    const [search, setSearch] = useState("");

    const filteredData = useMemo(() => {
        const termo = search.toLowerCase();

        return data.filter((item) =>
            Object.values(item)
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .includes(termo)
        );
    }, [search, data]);

    return (
        <div className="w-[380px] flex flex-col border border-[#AAAAAA] rounded-xl shadow-md min-h-0">

            <div className="flex items-center justify-between px-5 py-3 border-b border-[#AAAAAA]">
                <h1 className="font-bold text-[#103D85] text-[22px]">
                    Busca de CR
                </h1>

                <div className="bg-gray-200 text-[#103D85] text-[12px] font-bold px-2 py-1 rounded-xl">
                    RECENTES
                </div>
            </div>

            <div className="p-5 flex flex-col gap-6 flex-1 min-h-0">

                <Input
                    type="text"
                    variant="form"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex flex-col gap-5 flex-1 overflow-y-auto pr-2">
                    {filteredData.length > 0 ? (
                        filteredData.map((cr) => (
                            <SearchCard
                                key={cr.id}
                                cr={cr}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-400 py-6">
                            Nenhum resultado encontrado
                        </div>
                    )}
                </div>

            </div>

            <div className="flex justify-center itens-center gap-2 mb-5">
                <div className="w-10 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-10 h-2 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );
}
