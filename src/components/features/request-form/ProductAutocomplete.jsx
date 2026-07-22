'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input/Input';
import { api } from '@/service/api';

export default function ProductAutocomplete({
    value,
    onChange,
    onSelectProduct,
    placeholder,
    error,
}) {
    const [allProducts, setAllProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    async function ensureLoaded() {
        if (loaded) return;

        try {
            setLoading(true);

            const results = await api.get('/products');

            setAllProducts(Array.isArray(results) ? results : []);
            setLoaded(true);
        } catch {
            setAllProducts([]);
        } finally {
            setLoading(false);
        }
    }

    const query = (value || '').trim().toLowerCase();

    const suggestions =
        query.length >= 1
            ? allProducts.filter((product) =>
                product.name?.toLowerCase().includes(query)
            )
            : allProducts;

    function handleSelect(product) {
        onChange(product.name);
        onSelectProduct?.(product);
        setIsOpen(false);
    }

    return (
        <div ref={containerRef} className="relative w-full">
            <Input
                variant="form"
                placeholder={placeholder}
                value={value || ''}
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
                        <div className="px-4 py-2.5 text-sm text-gray-400 dark:text-[#8A8FA3]">
                            Buscando...
                        </div>
                    )}

                    {!loading &&
                        suggestions.map((product) => (
                            <button
                                type="button"
                                key={product.id}
                                onClick={() => handleSelect(product)}
                                className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm text-gray-800 hover:bg-[#103D85]/10 dark:text-[#E2E2EA] dark:hover:bg-white/10"
                            >
                                <span>{product.name}</span>

                                {product.code && (
                                    <span className="shrink-0 text-xs text-gray-400 dark:text-[#8A8FA3]">
                                        {product.code}
                                    </span>
                                )}
                            </button>
                        ))}

                    {!loading &&
                        loaded &&
                        suggestions.length === 0 && (
                            <div className="px-4 py-2.5 text-sm text-gray-400 dark:text-[#8A8FA3]">
                                Nenhum produto encontrado — será cadastrado um novo.
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}
