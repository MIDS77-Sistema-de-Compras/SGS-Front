"use client"

import Image from "next/image"
import { logoutAction } from "./actions"

export function Footer() {
    const handleLogout = async () => {
        await logoutAction();
    }

    return (
        <div className="flex flex-col gap-8 px-2">
            <button
                onClick={handleLogout}
                className="flex items-center gap-5 text-white/90 font-medium text-[15px] hover:text-white transition-colors group w-full text-left"
            >
                <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image 
                        src="/images/icons/logout.png"
                        alt="Icone Sair"
                        width={22}
                        height={22}
                    />
                </div>
                <span>Sair</span>
            </button>
        
            <div className="pt-4 border-t border-white/50 flex flex-col gap-1">
                <div className="w-32 h-auto relative">
                    <Image 
                        src="/images/logos/senai-white.png"
                        alt="Logo SENAI"
                        width={120}
                        height={30}
                        className="object-contain h-auto w-auto"
                    />
                </div>
                <p className="text-[10px] text-white/50 leading-tight mt-1">
                    Copyright © 2026 SENAI - Todos os direitos reservados
                </p>
            </div>
        </div>
    )
}
