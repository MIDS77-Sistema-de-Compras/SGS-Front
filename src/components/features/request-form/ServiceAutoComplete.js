'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input/Input';
import { api } from '@/service/api';

export default function ServiceAutocomplete({ value, onChange, onSelectProvision, placeholder }) {
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
                <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-sm dark:bg-[#1A2233] dark:border-white/10">
                    {loading && (
                        <div className="px-4 py-2 text-sm text-[#747782]">Buscando...</div>
                    )}
                    {!loading && suggestions.map((provision) => (
                        <button
                            type="button"
                            key={provision.id}
                            onClick={() => handleSelect(provision)}
                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                            <span className="font-medium text-[#103D85] dark:text-[#E2E2EA]">{provision.name}</span>
                            {provision.totalValue != null && (
                                <span className="shrink-0 text-xs text-[#747782]">
                                    R$ {Number(provision.totalValue).toFixed(2)}
                                </span>
                            )}
                        </button>
                    ))}
                    {!loading && loaded && suggestions.length === 0 && (
                        <div className="px-4 py-2 text-sm text-[#747782]">
                            Nenhum serviço encontrado — será cadastrado um novo.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}