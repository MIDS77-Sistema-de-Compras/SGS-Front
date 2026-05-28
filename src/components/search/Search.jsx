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

        <div className="flex flex-col gap-6 w-full border-red-500 p-10">
            <Input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex flex-col gap-4">
                {filteredData.length > 0 ? (
                    filteredData.map((cr) => (
                        <SearchCard
                            key={cr.cr}
                            cr={cr}
                        />
                    ))
                ) : (
                    <div
                        className="
                            text-center text-gray-400
                            py-10
                        "
                    >
                        Nenhum resultado encontrado
                    </div>
                )}
            </div>
        </div>
    );
}