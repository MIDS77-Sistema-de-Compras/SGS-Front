'use client'

import Image from 'next/image';
import Button from '@/components/ui/button/Button';

const PERMISSOES = {
    'ADMIN': ['COORDENADOR', 'SUPERVISOR', 'DOCENTE', 'COMPRADOR'],
    'COORDENADOR': ['SUPERVISOR', 'DOCENTE'],
    'SUPERVISOR': ['DOCENTE'],
    'DOCENTE': [],
    'COMPRADOR': []
}

export default function AccessLevelSelector({ value, onChange, roleAtual }) {
    const niveis = PERMISSOES[roleAtual] || []

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7 mb-2">
            {niveis.map((nivel) => (
                <Button
                    key={nivel}
                    variant={value === nivel ? 'primary' : 'outline'}
                    onClick={() => onChange(nivel)}
                    className="w-full"
                >
                    <Image
                        src="/images/adm/usuario.png"
                        alt=""
                        width={14}
                        height={14}
                        className={`w-auto h-3.5 duration-200 ${value === nivel ? 'brightness-0 invert' : ''}`}
                    />
                    {nivel}
                </Button>
            ))}
        </div>
    );
}
