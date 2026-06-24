"use client"

import { usePathname } from "next/navigation"

export function Profile({ name, role }){
    const pathname = usePathname()

    let displayRole = role || "Docente"
    let displayName = name || "Elis Jasper"

    if (pathname?.startsWith('/coordenador')) {
        displayRole = "Coordenador"
        displayName = "Coordenador"
    } else if (pathname?.startsWith('/admin')) {
        displayRole = "Administrador"
        displayName = "Admin"
    }

    return(
        <div className="flex items-center gap-3 px-2">
            <div className="rounded-full w-12 h-12 bg-gray-200 border-2 border-white/20 flex-shrink-0" />
            <div className="overflow-hidden">
                <p className="text-xs text-white/70 font-light">{displayRole}</p>
                <p className="font-semibold text-base truncate">{displayName}</p>
            </div>
        </div>
    )
}