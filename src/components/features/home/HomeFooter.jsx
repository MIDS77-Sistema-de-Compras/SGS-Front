import Image from "next/image";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

export default function HomeFooter() {
    return (
        <footer className="flex gap-15 mt-auto">
            <Link
                href="/solicitacoes/criar"
                className="flex flex-1 rounded-xl bg-[#103D85] dark:bg-[#1A4A9E] py-4 px-50 gap-3 items-center justify-center shadow-lg transition-all active:scale-[0.98] hover:bg-[#3366cc] dark:hover:bg-[#2456b0]"
            >
                <Image
                    src="/images/home/nova-solicitacao.png"
                    alt="Icone de Nova Solicitação"
                    width={25}
                    height={25}
                />
                <p className="text-white font-bold">
                    Nova Solicitação
                </p>
            </Link>
            <Link
                href="/solicitacoes"
                className="flex flex-1 rounded-xl border border-[#AAAAAA] dark:border-transparent bg-white dark:bg-[#E2E2EA] py-4 px-50 gap-3 justify-center items-center shadow-lg transition-all active:scale-[0.98] hover:bg-gray-100 dark:hover:bg-[#d2d2da] text-gray-800 dark:text-[#1A2233]"
            >
                <ClipboardList size={22} strokeWidth={2.2} className="shrink-0" />
                <p className="font-bold">
                    Minhas Solicitações
                </p>
            </Link>
        </footer>
    )
}