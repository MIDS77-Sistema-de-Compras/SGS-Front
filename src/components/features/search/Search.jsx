"use client";

import { Input } from "@/components/ui/input/Input";
import { SearchCard } from "./SearchCard";
import SearchCardSkeleton from "./SearchCardSkeleton";
import { useCRSearch } from "@/hooks/useCRSearch";

export function Search({
    placeholder = "🔍︎ Pesquisar CR...",
}) {
    const { filteredCRs, search, setSearch, loading, error } = useCRSearch();

    return (
        <div className="w-full xl:w-[380px] xl:shrink-0 flex flex-col border border-gray-100 shadow-sm dark:border-white/10 dark:bg-[#1A2233] rounded-xl min-h-0">

            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/10">
                <h1 className="font-bold text-[#103D85] dark:text-[#E2E2EA] text-[22px]">
                    Busca de CR
                </h1>
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
                    {loading && <SearchCardSkeleton />}

                    {error && !loading && (
                        <div className="text-center text-red-400 py-6">
                            {error}
                        </div>
                    )}

                    {!loading && !error && filteredCRs.length > 0 &&
                        filteredCRs.map((cr) => (
                            <SearchCard
                                key={cr.id}
                                cr={cr}
                            />
                        ))
                    }

                    {!loading && !error && filteredCRs.length === 0 && (
                        <div className="text-center text-gray-400 dark:text-[#C3C6D3] py-6">
                            Nenhum resultado encontrado
                        </div>
                    )}
                </div>

            </div>

            <div className="flex justify-center items-center gap-2 mb-5">
                <div className="w-10 h-2 bg-gray-300 dark:bg-white/20 rounded-full"></div>
                <div className="w-3 h-2 bg-gray-300 dark:bg-white/20 rounded-full"></div>
                <div className="w-10 h-2 bg-gray-300 dark:bg-white/20 rounded-full"></div>
            </div>
        </div>
    );
}
