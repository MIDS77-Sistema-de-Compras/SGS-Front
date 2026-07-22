'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input/Input';
import { api } from '@/service/api';

export default function ServiceAutocomplete({ value, onChange, onSelectProvision, placeholder, error }) {
    const [allProvisions, setAllProvisions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    async function ensureLoaded() {
        if (loaded) return;
        try {
            setLoading(true);
            const results = await api.get('/provisions');
            setAllProvisions(Array.isArray(results) ? results : []);
            setLoaded(true);
        } catch {
            setAllProvisions([]);
        } finally {
            setLoading(false);
        }
    }

    const query = (value || '').trim().toLowerCase();
    const suggestions = query.length >= 1
        ? allProvisions.filter((provision) => provision.name?.toLowerCase().includes(query))
        : allProvisions;

    function handleSelect(provision) {
        onChange(provision.name);
        onSelectProvision?.(provision);
        setIsOpen(false);
    }

    return (
        <div ref={containerRef} className="relative w-full">
            <Input
                variant="form"
                placeholder={placeholder}
                value={value || ""}
                error={error}
                onChange={(event) => {
                    onChange(event.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => {
                    ensureLoaded();
                    setIsOpen(true);
                }}
                autoComplete="off"
            />

            {isOpen && (
                <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto scrollbar-thin rounded-xl border border-gray-100 bg-white shadow-sm dark:border-white/15 dark:bg-[#303746]">
                    {loading && (
                        <div className="px-4 py-2.5 text-sm text-gray-400 dark:text-[#8A8FA3]">Buscando...</div>
                    )}
                    {!loading && suggestions.map((provision) => (
                        <button
                            type="button"
                            key={provision.id}
                            onClick={() => handleSelect(provision)}
                            className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm text-gray-800 hover:bg-[#103D85]/10 dark:text-[#E2E2EA] dark:hover:bg-white/10"
                        >
                            <span className="truncate">{provision.name}</span>
                            {provision.totalValue != null && (
                                <span className="shrink-0 text-xs text-gray-400 dark:text-[#8A8FA3]">
                                    R$ {Number(provision.totalValue).toFixed(2)}
                                </span>
                            )}
                        </button>
                    ))}
                    {!loading && loaded && suggestions.length === 0 && (
                        <div className="px-4 py-2.5 text-sm text-gray-400 dark:text-[#8A8FA3]">
                            Nenhum serviço encontrado — será cadastrado um novo.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
