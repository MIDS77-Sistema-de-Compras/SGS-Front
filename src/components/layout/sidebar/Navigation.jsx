"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { admRoutes, coordenadorRoutes, docenteRoutes, supervisorRoutes, compradorRoutes } from "@/app/config/navigation"
import { isRouteActive } from "@/components/layout/sidebar/routeMatch"

export function Navigation({ userRole }) {
    const pathname = usePathname()

    const routesMap = {
        ADMIN: admRoutes,
        COORDENADOR: coordenadorRoutes,
        SUPERVISOR: supervisorRoutes,
        COMPRADOR: compradorRoutes,
        DOCENTE: docenteRoutes,
    }

    const routes = routesMap[userRole] || []
    const allHrefs = routes.map((route) => route.href)

    return (
        <nav>
            <ul className="flex flex-col gap-2">
                {routes.map((route) => {
                    const isActive = isRouteActive(pathname, route.href, allHrefs)

                    const IconComponent = route.icon

                    return (
                        <li key={route.href}>
                            <Link
                                href={route.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`
                                    flex items-center gap-5 px-4 py-3 rounded-xl font-medium text-[15px]
                                    transition-all duration-200 ease-in-out group active:scale-[0.98]                                         
                                    ${isActive
                                        ? "bg-[#3366cc] dark:bg-[#1A4A9E] text-white shadow-md font-semibold"
                                        : "hover:bg-white/10 text-white/90"
                                    }
                                `}
                            >
                                <div className={`transition-transform duration-200 group-hover:scale-105 
                                    ${isActive ? "opacity-100" : "opacity-80"}`}>
                               
                                    {typeof route.icon === "string" ? (
                                        <Image
                                            src={route.icon}
                                            alt={`Ícone ${route.label}`}
                                            width={22}
                                            height={22}
                                            priority
                                        />
                                    ) : (
                                        <IconComponent 
                                            size={22} 
                                            strokeWidth={2.2} 
                                            className="shrink-0 text-white" 
                                        />
                                    )}
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