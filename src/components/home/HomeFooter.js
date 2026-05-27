import Image from "next/image";
import Link from "next/link";

export default function HomeFooter() {
    return (
        <footer className="flex gap-15 mt-auto">
            <Link
                href="/solicitacoes/criar"
                className="flex flex-1 rounded-xl bg-[#103D85] py-4 px-50 gap-3 items-center justify-center shadow-lg transition-all active:scale-[0.98] hover:bg-[#3366cc]"
            >
                <Image
                    src="/images/home/novaSolicitacao.png"
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
                className="flex flex-1 rounded-xl border border-[#AAAAAA] py-4 px-50 gap-3 justify-center items-center shadow-lg transition-all active:scale-[0.98] hover:bg-gray-100"
            >
                <Image
                    src="/images/home/minhasSolicitacoes.png"
                    alt="Icone de Nova Solicitação"
                    width={30}
                    height={30}
                    className="w-auto h-auto"
                />
                <p className="font-bold">
                    Minhas Solicitações
                </p>
            </Link>
        </footer>
    )
}