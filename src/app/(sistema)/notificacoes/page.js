// src/app/(sistema)/notificacoes/page.js

import Link from "next/link"
import Image from "next/image"
import ActivityItem from "@/components/features/home/ActivityItem"
import Button from "@/components/ui/button/Button"

const notificacoes = [
    {
        id: 1,
        iconSrc: "/images/home/aprovada.png",
        iconAlt: "Solicitação aprovada",
        title: "Solicitação #1234 aprovada",
        subtitle: "Equipamentos de mecânica",
        time: "Há 2 horas",
    },
    {
        id: 2,
        iconSrc: "/images/home/atualizacao.png",
        iconAlt: "Novo comentário",
        title: "Novo comentário em #1234",
        subtitle: "Aguardando fornecedor terceiro",
        time: "Há 2 horas",
    },
    {
        id: 3,
        iconSrc: "/images/home/recusada.png",
        iconAlt: "Solicitação recusada",
        title: "Solicitação #4321 recusada",
        subtitle: "Equipamentos de mecânica",
        time: "Há 2 horas",
    },
    {
        id: 4,
        iconSrc: "/images/home/atualizacao.png",
        iconAlt: "Nova atualização",
        title: "Nova atualização em #1234",
        subtitle: "Equipamentos de mecânica",
        time: "Há 2 horas",
    },
    {
        id: 5,
        iconSrc: "/images/home/aprovada.png",
        iconAlt: "Solicitação aprovada",
        title: "Solicitação #1234 aprovada",
        subtitle: "Equipamentos de mecânica",
        time: "Há 2 horas",
    },
    {
        id: 6,
        iconSrc: "/images/home/atualizacao.png",
        iconAlt: "Novo comentário",
        title: "Novo comentário em #1234",
        subtitle: "Aguardando fornecedor terceiro",
        time: "Há 2 horas",
    },
    {
        id: 7,
        iconSrc: "/images/home/recusada.png",
        iconAlt: "Solicitação recusada",
        title: "Solicitação #4321 recusada",
        subtitle: "Equipamentos de mecânica",
        time: "Há 2 horas",
    },
    {
        id: 8,
        iconSrc: "/images/home/atualizacao.png",
        iconAlt: "Nova atualização",
        title: "Nova atualização em #1234",
        subtitle: "Equipamentos de mecânica",
        time: "Há 2 horas",
    },
    {
        id: 9,
        iconSrc: "/images/home/aprovada.png",
        iconAlt: "Solicitação aprovada",
        title: "Solicitação #1234 aprovada",
        subtitle: "Equipamentos de mecânica",
        time: "Há 2 horas",
    },
]

export default function Notificacoes() {
    return (
        <div className="p-6 flex flex-col gap-5">

            {/* Card da lista de notificações */}
            <div className="border border-[#AAAAAA] rounded-xl p-5 shadow-lg">
                <h2 className="text-[#103D85] font-bold text-[22px]">
                    Notificações
                </h2>
                <div className="border-t border-[#AAAAAA] mt-2 mb-3 -mx-5" />
                <ul className="flex flex-col gap-1 max-h-[400px] overflow-y-auto">
                    {notificacoes.map((item) => (
                        <ActivityItem key={item.id} {...item} />
                    ))}
                </ul>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-3">
                <Link href="/solicitacoes/criar" className="flex-1">
                    <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        leftIcon={
                            <Image
                                src="/images/home/novaSolicitacao.png"
                                alt=""
                                width={18}
                                height={18}
                            />
                        }
                    >
                        Nova Solicitação
                    </Button>
                </Link>

                <Link href="/solicitacoes" className="flex-1">
                    <Button
                        variant="outline"
                        size="md"
                        fullWidth
                        leftIcon={
                            <Image
                                src="/images/home/minhasSolicitacoes.png"
                                alt=""
                                width={18}
                                height={18}
                            />
                        }
                    >
                        Minhas Solicitações
                    </Button>
                </Link>
            </div>

        </div>
    )
}