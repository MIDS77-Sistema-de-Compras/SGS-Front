import { calcularStatusSolicitacao } from '@/lib/utils/calculateRequestStatus';
import StatusBadge from './statusBadge';


export default function SolicitacaoRow({ item, onClick }) {
    const statusSolicitacao = calcularStatusSolicitacao(item.produtos);

    return (
        <div
            onClick={onClick}
            className="flex text-lg items-center justify-between py-5 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition"
        >
            <div className="flex items-center gap-20 px-6">
                <span className="font-bold text-[#333333]">
                    {item.codigo}: Lista de {item.produtos.length}{" "}
                    {item.produtos.length === 1 ? "produto" : "produtos"}
                </span>

                <span className="text-lg text-[#555555] px-6">
                    {new Date(item.data).toLocaleDateString('pt-BR')}
                </span>
            </div>

            <div className="px-6">
                <StatusBadge status={statusSolicitacao} className="px-6 min-w-[180px]" />
            </div>
        </div>
    );
}