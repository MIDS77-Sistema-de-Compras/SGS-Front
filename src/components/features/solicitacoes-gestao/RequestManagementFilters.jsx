'use client';

import { Input } from '@/components/ui/input/Input';
import Dropdown from '@/components/ui/select/Dropdown';
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
        <div className="bg-white dark:bg-[#1A2233] rounded-xl border border-gray-100 shadow-sm dark:border-white/10 flex flex-row items-center justify-between p-2 gap-3 flex-wrap">
            <div className="flex flex-row items-center px-4 gap-2">
                <span className="text-xl text-[#133D87] dark:text-[#E2E2EA]">
                    Filtrar
                </span>
            </div>

            <div className="flex flex-row items-center gap-3 flex-wrap">
                <div className="w-[190px]">
                    <Dropdown
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Status"
                        options={STATUS_OPTIONS}
                    />
                </div>

                <div className="w-[190px]">
                    <Dropdown
                        name="cr"
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
                    <Dropdown
                        name="supervisor"
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