"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sidebarRoutes } from "@/app/config/navigation"

export function Navigation(){
    const pathname = usePathname()

    return (
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
    )
}