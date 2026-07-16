import Image from "next/image";
import Link from "next/link";
import { UserRoundCog } from 'lucide-react';

export default function AdmFooter() {
    return (
        <footer className="flex gap-15 mt-auto">
            <Link
                href="/auditoria"
                className="flex flex-1 rounded-xl bg-[#103D85] dark:bg-[#1A4A9E] py-4 px-50 gap-3 items-center justify-center shadow-lg transition-all active:scale-[0.98] hover:bg-[#3366cc] dark:hover:bg-[#2456b0]"
            >
                <Image
                    src="/images/icons/analise-registros.png"
                    alt="Icone de Análise de Registros"
                    width={20}
                    height={20}
                />
                <p className="text-white font-bold">
                    Análise de Registros
                </p>
            </Link>
            <Link
                href="/solicitacoes"
                className="flex flex-1 rounded-xl border border-gray-100 dark:border-transparent bg-white dark:bg-[#E2E2EA] py-4 px-50 gap-3 justify-center items-center shadow-sm transition-all active:scale-[0.98] hover:bg-gray-100 dark:hover:bg-[#d2d2da] text-gray-800 dark:text-[#1A2233]"
            >
                <UserRoundCog size={25} />
                <p className="font-bold">
                    Gerenciar Usuários
                </p>
            </Link>
        </footer>
    )
}