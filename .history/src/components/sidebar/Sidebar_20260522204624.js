"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { sidebarRoutes } from "@/app/config/navigation"

export default function Sidebar(){
    const pathname = usePathname()
    const router = useRouter()

    function handleLogout(){
        Cookies.remove("token")
        router.push("/login")
    }
    
    return(
        <aside className="w-72 bg-[#103D85] h-screen flex flex-col justify-between text-white py-8 px-4 shadow-xl select-none">
            
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3 px-2">
                    <div className="rounded-full w-12 h-12 bg-gray-200 border-2 border-white/20 flex-shrink-0" />
                    <div className="overflow-hidden">
                        <p className="text-xs text-white/70 font-light">Docente</p>
                        <p className="font-semibold text-base truncate">Elis Jasper</p>
                    </div>
                </div>
            
                <nav>
                    <ul className="flex flex-col gap-2">
                        {sidebarRoutes.map((route) => {
                            const isActive = pathname === route.href

                            return(
                                <li key={route.href}>
                                    <Link
                                        href={route.href}
                                        className={`
                                            flex items-center gap-5 px-4 py-3 rounded-xl font-medium text-[15px]
                                            transition-all duration-200 ease-in-out group
                                            ${isActive
                                                ? "bg-[#3366cc] text-white shadow-md font-semibold"
                                                : "hover:bg-white/10 text-white/90"
                                            }
                                        `}
                                    >
                                        <div className={`transition-transform duration-200 group-hover:scale-105 
                                            ${isActive ? "opacity-100" : "opacity-80"}`}>
                                            <Image 
                                                src={route.icon}
                                                alt={`Ícone ${route.label}`}
                                                width={22}
                                                height={22}
                                                priority
                                            />
                                        </div>
                                        <p>{route.label}</p>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

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

                <div className="pt-4 border-t border-white/10 flex flex-col gap-1">
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
            
        </aside>
    )
}