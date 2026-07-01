'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input/Input';
import { Select } from '@/components/ui/select/Select';
import { STATUS_OPTIONS } from './requestStatusOptions';

export default function RequestManagementFilters({
    status,
    setStatus,
    cr,
    setCr,
    supervisor,
    setSupervisor,
    busca,
    setBusca,
    crs,
    supervisores,
}) {
    return (
        <div className="bg-white rounded-xl border border-[#797979] flex flex-row items-center justify-between p-2 gap-3 flex-wrap">
            <div className="flex flex-row items-center px-4 gap-2">
                <Image
                    src="/images/icons/filtrar.png"
                    alt="Ícone de filtros"
                    width={21}
                    height={21}
                    className="w-5 h-5 dark:invert dark:brightness-90"
                />

                <span className="text-xl text-[#133D87] dark:text-[#E2E2EA]">
                    Filtrar
                </span>
            </div>

            <div className="flex flex-row items-center gap-3 flex-wrap">
                <div className="w-[190px]">
                    <Select
                        variant="form"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Status"
                        options={STATUS_OPTIONS}
                    />
                </div>

                <div className="w-[190px]">
                    <Select
                        variant="form"
                        value={cr}
                        onChange={(e) => setCr(e.target.value)}
                        placeholder="CR"
                        options={[
                            { value: '', label: 'Todos os CRs' },
                            ...crs.map((crBranch) => ({
                                value: crBranch.id,
                                label: crBranch.crCode,
                            })),
                        ]}
                    />
                </div>

                <div className="w-[190px]">
                    <Select
                        variant="form"
                        value={supervisor}
                        onChange={(e) => setSupervisor(e.target.value)}
                        placeholder="Supervisor"
                        options={[
                            { value: '', label: 'Todos os supervisores' },
                            ...supervisores.map((nome) => ({
                                value: nome,
                                label: nome,
                            })),
                        ]}
                    />
                </div>

                <div className="w-[260px]">
                    <Input
                        variant="form"
                        value={busca}
                        placeholder="Buscar..."
                        iconSrc="/images/icons/lupa.png"
                        iconAlt="Buscar"
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
