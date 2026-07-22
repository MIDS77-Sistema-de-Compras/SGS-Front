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
        <div className="w-full min-[1450px]:w-[380px] min-[1450px]:shrink-0 flex flex-col border border-gray-100 shadow-sm dark:border-white/10 dark:bg-[#1A2233] rounded-xl min-h-0 max-h-[70vh] min-[1450px]:max-h-none min-[1450px]:h-full">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/10">
                <h1 className="font-bold text-[#103D85] dark:text-[#E2E2EA] text-[20px] sm:text-[22px]">
                    Busca de CR
                </h1>
            </div>

            <div className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-6 flex-1 min-h-0">

                <Input
                    type="text"
                    variant="form"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="scroll-native grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 flex-1 min-h-0 overflow-y-auto pr-1 auto-rows-max content-start">
                    {loading && <SearchCardSkeleton />}

                    {error && !loading && (
                        <div className="col-span-full text-center text-red-400 py-6">
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
                        <div className="col-span-full text-center text-gray-400 dark:text-[#C3C6D3] py-6">
                            Nenhum resultado encontrado
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}