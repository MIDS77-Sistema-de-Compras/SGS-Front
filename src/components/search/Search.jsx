"use client";

import { useMemo, useState } from "react";
import { Input } from "../login/Input";
import { SearchCard } from "./SearchCard";

export function Search({
    data = [],
    placeholder = "Buscar CR...",
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
    <div
        className="
            w-full max-w-[380px]
            mx-auto
            border border-gray-400
            rounded-[25px]
            overflow-hidden
            bg-[#FFFFFF]
            shadow-md
        "
    >
        {/* TOPO */}
        <div
            className="
                flex items-center justify-between
                px-4 py-3
                bg-[#efeff2]
                border-b border-gray-300
            "
        >
            <div className="flex items-center gap-3">
                <span className="text-[#103D85] text-2base">
                    ↺
                </span>

                <h1 className="font-bold text-[#103D85] text-1base">
                    Busca de CR
                </h1>
            </div>

            <div
                className="
                    bg-[#d9dde7]
                    text-[#103D85]
                    text-xs
                    font-bold
                    px-2 py-1
                    rounded-xl
                "
            >
                RECENTES
            </div>
        </div>

        {/* CONTEÚDO */}
        <div className="p-2 flex flex-col gap-2">

            <Input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex flex-col gap-2">
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

        {/* BARRINHAS DE BAIXO */}
        <div className="flex justify-center itens-center gap-2 py-5">
            <div className="w-10 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-10 h-2 bg-gray-300 rounded-full"></div>
        </div>
    </div>
);
}