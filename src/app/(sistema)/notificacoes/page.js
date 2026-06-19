import ActivityItem from "@/components/features/home/ActivityItem"
import HomeFooter from "@/components/features/home/HomeFooter"

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
        <div className="flex flex-1 flex-col gap-10 min-h-0">

            <div className="flex flex-1 flex-col border border-[#AAAAAA] rounded-xl px-5 py-3 shadow-lg min-h-0">
                <h2 className="text-[#103D85] font-bold text-[22px] shrink-0">
                    Notificações
                </h2>
                <div className="border-t border-[#AAAAAA] mt-2 mb-3 -mx-5 shrink-0" />
                <ul className="flex-1 flex flex-col gap-1 overflow-y-auto min-h-0 pr-2">
                    {notificacoes.map((item) => (
                        <ActivityItem key={item.id} {...item} />
                    ))}
                </ul>
            </div>

            <HomeFooter />
        </div>
    )
}