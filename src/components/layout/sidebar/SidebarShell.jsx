"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export function SidebarShell({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const [lastPathname, setLastPathname] = useState(pathname)
    if (pathname !== lastPathname) {
        setLastPathname(pathname)
        setIsOpen(false)
    }

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    useEffect(() => {
        const onKeyDown = (e) => e.key === "Escape" && setIsOpen(false)
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    return (
        <>
            <div className="lg:hidden fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-3 bg-[#103D85] dark:bg-[#0D121F] px-4 shadow-md">
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Abrir menu"
                    aria-expanded={isOpen}
                    className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 active:scale-95"
                >
                    <Menu size={22} strokeWidth={2.2} />
                </button>
                <div className="relative h-5 w-14 shrink-0">
                    <Image
                        src="/images/logos/sgc.png"
                        alt="SGS"
                        fill
                        sizes="56px"
                        className="object-contain object-left"
                    />
                </div>
                <span className="truncate text-sm font-semibold text-white/90">
                    Sistema de Gestão de Solicitações
                </span>
            </div>

            <div
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
                style={{ transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
                className={`lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]
                ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />

            <aside
                style={{ transition: "translate 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
                className={`
                    z-50 bg-[#103D85] dark:bg-[#0D121F] text-white shadow-2xl select-none
                    flex flex-col justify-between gap-8 py-8 px-4
                    fixed inset-y-0 left-0 w-[280px] max-w-[85vw] overflow-y-auto
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:static lg:translate-x-0 lg:h-screen lg:w-72 lg:shrink-0 lg:shadow-xl
                `}
            >
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Fechar menu"
                    className="lg:hidden absolute top-3 right-3 rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <X size={20} strokeWidth={2.2} />
                </button>

                {children}
            </aside>
        </>
    )
}