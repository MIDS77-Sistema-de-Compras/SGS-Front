"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export function Footer(){
    const router = useRouter()

    function handleLogout(){
        Cookies.remove("token")
        router.push("/login")
    }

    return (
        <div className="flex flex-col gap-8 px-2">
            <button
                onClick={handleLogout}
                className="flex items-center gap-5 text-white/90 font-medium text-[15px] hover:text-white transition-colors group w-full text-left"
            >
                <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image 
                        src="/images/sair.png"
                        alt="Ícone Sair"
                        width={22}
                        height={22}
                    />
                </div>
                <span>Sair</span>
            </button>
        
            <div className="pt-4 border-t border-white/50 flex flex-col gap-1">
                <div className="w-32 h-auto relative">
                    <Image 
                        src="/images/logoSenai.png"
                        alt="Logo SENAI"
                        width={120}
                        height={30}
                        className="object-contain"
                    />
                </div>
                <p className="text-[10px] text-white/50 leading-tight mt-1">
                    Copyright © 2026 SENAI - Todos os direitos reservados
                </p>
            </div>
        </div>
    )
}