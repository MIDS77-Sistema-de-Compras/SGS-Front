import Modal from "../ui/overlay/Modal";
import { Trash2, UserCheck, UserMinus } from 'lucide-react';

export function ModalUser({ isOpen, onClose, userName = "Carregando...", action = "desativar", onConfirm }) {
    
    const isAtivar = action === "ativar";
    const isExcluir = action === "excluir";
    
    const acaoTexto = action;
    const tituloModal = isAtivar ? "Ativar usuário" : isExcluir ? "Excluir usuário" : "Desativar usuário";
    const textoBotao = isAtivar ? "Ativar" : isExcluir ? "Excluir" : "Desativar";

    let botaoClasse = "";
    if (isAtivar) {
        botaoClasse = "py-2 border border-[#10B981] bg-[#4CAF50] hover:bg-[#37823A] hover:border-[#047857] text-white font-medium rounded-xl transition-colors";
    } else if (isExcluir) {
        botaoClasse = "py-2 border border-[#E30613] bg-[#E30613] hover:bg-[#9F0009] hover:border-[#9F0009] text-white font-medium rounded-xl transition-colors";
    } else {
        botaoClasse = "py-2 border border-[#7D7D7D] bg-[#7D7D7D] hover:bg-[#555555] hover:border-[#555555] text-white font-medium rounded-xl transition-colors";
    }

    let fundoBolinhaClasse = "";
    if (isAtivar) {
        fundoBolinhaClasse = "bg-[#C9FFCB] border-[#A3FFA6]"; 
    } else if (isExcluir) {
        fundoBolinhaClasse = "bg-[#FFCBCB] border-[#FFA3A3]"; 
    } else {
        fundoBolinhaClasse = "bg-gray-100 border-gray-300"; 
    }

    const renderizarIcone = () => {
        if (isAtivar) return <UserCheck size={40} className="text-[#10B981]" />; 
        if (isExcluir) return <Trash2 size={40} className="text-[#E30613]" />; 
        return <UserMinus size={40} className="text-[#7D7D7D]" />; 
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={tituloModal}
            height="h-auto" 
        >
            <div className="flex flex-col justify-center items-center gap-8 w-full">
                <div className="flex flex-col items-center gap-4">
                    <div className={`p-4 rounded-full ${fundoBolinhaClasse} border flex items-center justify-center shadow-sm`}>
                        {renderizarIcone()}
                    </div>

                    <h1 className="text-[18px] text-center text-gray-900 font-normal">
                        Tem certeza que deseja {acaoTexto} o usuário{" "}
                        <br/>
                        <span className="break-words font-bold">{userName}?</span>
                    </h1>
                </div>

                <div className="flex w-full gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2 border border-[#000000] hover:border-gray-400 text-gray-700 font-medium rounded-xl transition-colors"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`flex-1 ${botaoClasse}`}
                    >
                        {textoBotao}
                    </button>
                </div>
            </div>
        </Modal>
    );
}