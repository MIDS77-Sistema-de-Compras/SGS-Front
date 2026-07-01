const STATUS_CORES = {
    "Em análise": "bg-[#EDAE28]",
    "Reprovado": "bg-[#E30613]",
    "Parcial Aprovado": "bg-[#0084FF]",
    "Aprovado": "bg-[#4CAF50]",
    "Em atendimento": "bg-[#13BAD6]",
    "Atrasada": "bg-[#F04E4E]",
    "Pedido Cancelado": "bg-[#7C838C]",
    "Recebimento Parcial": "bg-[#F97A22]",
    "Aguardando comprador": "bg-[#9164F6]",
    "Solicitando orçamento": "bg-[#B776F6]",
    "Fundo Rotativo": "bg-[#ED519E]",
    "CD central": "bg-[#68AAFA]",
    "Solicitado pelo portal": "bg-[#EBB715]",
    "Sem produtos": "bg-gray-400",
    // Status reais da entidade Request (backend)
    "Aguardando aprovação": "bg-[#EDAE28]",
    "Recusado": "bg-[#E30613]",
    "Cancelado": "bg-[#71717A]",
    "Entregue": "bg-[#0084FF]"
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