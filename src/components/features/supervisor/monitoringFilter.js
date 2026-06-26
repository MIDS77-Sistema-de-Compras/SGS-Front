'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input/Input';
import { Select } from '@/components/ui/select/Select';

export default function MonitoringFilter({
    cr,
    perfil,
    busca,
    setCr,
    setPerfil,
    setBusca,
    crs,
}) {

    return (
        <div className="bg-white rounded-xl border border-[#797979] flex flex-row items-center justify-between p-2 gap-3">
            <div className="flex flex-row items-center px-4 gap-2">
                <Image
                    src="/images/icons/filtrar.png"
                    alt="Ícone de filtros"
                    width={21}
                    height={21}
                    className="w-5 h-5"
                />

                <span className="text-xl text-[#133D87]">
                    Filtrar
                </span>
            </div>

            <div className="flex flex-row items-center gap-3">
                <div className="w-[200px]">
                    <Select
                        variant="form"
                        value={perfil}
                        onChange={(e) => setPerfil(e.target.value)}
                        placeholder="Status"
                        options={[
                            { value: '', label: 'Todos os status' },
                            { value: 'DOCENTE', label: 'Docente' },
                            { value: 'SUPERVISOR', label: 'Supervisor' },
                            { value: 'COORDENADOR', label: 'Coordenador' },
                        ]}
                    />
                </div>

                <div className="w-[200px]">
                    <Select
                        variant="form"
                        value={cr}
                        onChange={(e) => setCr(e.target.value)}
                        options={[
                            { value: '', label: 'Todos os CRs' },
                            ...crs.map((cr) => ({
                                value: cr.id,
                                label: cr.nome,
                            })),
                        ]}
                        placeholder="CRs"
                    />
                </div>

                <div className="w-[300px]">
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