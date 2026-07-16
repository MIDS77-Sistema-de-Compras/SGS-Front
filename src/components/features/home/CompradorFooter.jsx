"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function CompradorFooter() {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <footer className="flex gap-15 mt-auto">
            <Link
                href="/solicitacoes-compra"
                className="flex flex-1 rounded-xl bg-[#103D85] dark:bg-[#1A4A9E] py-4 px-50 gap-3 items-center justify-center shadow-lg transition-all active:scale-[0.98] hover:bg-[#3366cc] dark:hover:bg-[#2456b0]"
            >
                <Image
                    src="/images/icons/request-compra.png"
                    alt="Icone de Solicitações de Compra"
                    width={20}
                    height={20}
                />
                <p className="text-white font-bold">
                    Solicitações de Compra
                </p>
            </Link>

            <Link
                href="/notificacoes"
                className="flex flex-1 rounded-xl border border-gray-100 dark:border-transparent bg-white dark:bg-[#E2E2EA] py-4 px-50 gap-3 justify-center items-center shadow-sm transition-all active:scale-[0.98] hover:bg-gray-100 dark:hover:bg-[#d2d2da] text-gray-800 dark:text-[#1A2233]"
            >
                {mounted ? (
                    <Bell size={22} strokeWidth={2.2} className="shrink-0" />
                ) : (
                    <div className="w-[22px] h-[22px] shrink-0" /> 
                )}
                <p className="font-bold">
                    Notificações
                </p>
            </Link>
        </footer>
    );
}