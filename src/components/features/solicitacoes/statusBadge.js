const STATUS_CORES = {
    "Em análise": "bg-[#EDAE28]",
    "Reprovado": "bg-[#E30613]",
    "Parcial Aprovado": "bg-[#0084FF]",
    "Aprovado": "bg-[#4CAF50]",
    "Em atendimento": "bg-[#11B6D4]",
    "Atrasada": "bg-[#EF4444]",
    "Pedido Cancelado": "bg-[#71717A]",
    "Recebimento Parcial": "bg-[#F97316]",
    "Aguardando comprador": "bg-[#8B5CF6]",
    "Solicitando orçamento": "bg-[#A855F7]",
    "Fundo Rotativo": "bg-[#EC4899]",
    "CD central": "bg-[#3B82F6]",
    "Solicitado pelo portal": "bg-[#E1AD01]",
    "Sem produtos": "bg-gray-400"
};

export function getStatusCor(status) {
    return STATUS_CORES[status] || 'bg-gray-400';
}

export default function StatusBadge({ status, className = "w-[240px]" }) {
    return (
        <button className={`${className} py-1 text-white font-medium text-[13px] rounded-full ${getStatusCor(status)}`}>
            {status}
        </button>
    );
}