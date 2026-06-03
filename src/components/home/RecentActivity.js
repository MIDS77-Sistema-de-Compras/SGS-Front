import ActivityItem from "./ActivityItem"

const activities = [
    {
        id: 1,
        iconSrc: "/images/home/aprovada.png",
        iconAlt: "Icone Aprovação",
        title: "Solicitação #1234 aprovada",
        subtitle: "Equipamentos de mecânica",
        time: "Há 2 horas",
    },
    {
        id: 2,
        iconSrc: "/images/home/atualizacao.png",
        iconAlt: "Icone Atualização",
        title: "Novo comentário em #1234",
        subtitle: "Aguardando fornecedor terceiro",
        time: "Há 2 horas",
    },
    {
        id: 3,
        iconSrc: "/images/home/recusada.png",
        iconAlt: "Icone Recusado",
        title: "Solicitação #4321 recusada",
        subtitle: "Equipamentos de mecânica",
        time: "Há 2 horas",
    },
    {
        id: 4,
        iconSrc: "/images/home/atualizacao.png",
        iconAlt: "Icone Atualização",
        title: "Novo comentário em #1234",
        subtitle: "Aguardando fornecedor terceiro",
        time: "Há 2 horas",
    },
]

export default function RecentActivity() {
    return (
        <div className="flex-1 border border-[#AAAAAA] rounded-xl p-5 shadow-lg">
            <h2 className="text-[#103D85] font-bold text-[22px]">
                Atividade Recente
            </h2>
            <div className="border-t border-[#AAAAAA] mt-2 mb-5 -mx-5" />
            <ul className="flex flex-col gap-1">
                {activities.map((item) => (
                    <ActivityItem key={item.id} {...item} />
                ))}
            </ul>
        </div>
    )
}