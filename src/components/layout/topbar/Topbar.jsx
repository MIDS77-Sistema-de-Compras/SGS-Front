"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Topbar() {
    const pathname = usePathname();

    if (pathname.includes("configuracoes")) return null;

    return (
        <div className="flex w-full mt-8 gap-10 items-center">
            <Image 
                src="/images/logos/sgs-blue.png"
                alt="Logo SGS"
                width={115}
                height={50}
            />
            <h1 className="text-[24px] font-semibold text-[#103D85]">
                Sistema de Gestão de Solicitações
            </h1>
        </div>
    )
}