import SummaryItem from "./SummaryItem"

const summaryItems = [
    {
        id: 1,
        iconSrc: "/images/home/solPendente.png",
        iconAlt: "Icone Solicitações Pendentes",
        label: "Pendentes",
        count: "05",
    },
    {
        id: 2,
        iconSrc: "/images/home/solAprovada.png",
        iconAlt: "Icone Solicitações Aprovadas",
        label: "Aprovadas",
        count: "05",
    },
    {
        id: 3,
        iconSrc: "/images/home/solRecusada.png",
        iconAlt: "Icone Solicitações Recusadas",
        label: "Recusadas",
        count: "05",
    },
]

export default function SummaryCard() {
    return (
        <div className="border border-[#AAAAAA] rounded-xl px-5 py-3 shadow-lg">
            <div className="flex justify-between mb-7">
                <h2 className="text-[#103D85] font-bold text-[22px]">
                    Resumo
                </h2>
                <p className="text-[#103D85] text-[12px]">
                    Minhas <br /> solicitações
                </p>
            </div>
            <ul className="flex flex-col gap-4">
                {summaryItems.map((item) => (
                    <SummaryItem key={item.id} {...item} />
                ))}
            </ul>
        </div>
    )
}