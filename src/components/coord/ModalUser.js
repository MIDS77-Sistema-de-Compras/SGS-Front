import { Modal } from "../login/Modal";
import Image from "next/image";

export function ModalUser({ isOpen, onClose, userName = "Carregando...", isActive = true, onConfirm }) {

    const acaoTexto = isActive ? "desativar" : "ativar";
    const tituloModal = isActive ? "Desativar usuário" : "Ativar usuário";
    
    const botaoClasse = isActive
        ? "px-18 py-2 border border-[#E30613] bg-[#E30613] hover:bg-[#9F0009] hover:border-[#9F0009] text-white font-medium rounded-xl transition-colors min-w-[110px]"
        : "px-18 py-2 border border-[#10B981] bg-[#4CAF50] hover:bg-[#37823A] hover:border-[#047857] text-white font-medium rounded-xl transition-colors min-w-[110px]";

    const iconeSrc = isActive 
        ? "/images/icons/desativarUser.png" 
        : "/images/icons/ativarUser.png"; 

    const fundoBolinhaClasse = isActive 
        ? "bg-[#FFCBCB] border-[#FFA3A3]" 
        : "bg-[#C9FFCB] border-[#A3FFA6]"; 

    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            title={tituloModal}
        >
            <div className="flex flex-col justify-between items-center h-[300px] w-full">
                <h1 className="text-[22px] text-center text-gray-900 font-normal pt-12">
                    Tem certeza que deseja {acaoTexto} o usuário{" "}
                    <span className="break-words font-bold">{userName}?</span>
                </h1>

                <div className={`w-18 h-18 rounded-full ${fundoBolinhaClasse} border flex items-center justify-center shadow-sm`}>
                    <Image 
                        src={iconeSrc} 
                        alt={`Ícone ${tituloModal}`}
                        width={40} 
                        height={40}
                        className="object-contain"
                    />
                </div>
                
                <div className="flex justify-evenly w-full">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-18 py-2 border border-[#000000] hover:border-gray-400 text-gray-700 font-medium rounded-xl transition-colors min-w-[110px]"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className={botaoClasse}
                    >
                        {isActive ? "Desativar" : "Ativar"}
                    </button>
                </div>
            </div>
        </Modal>  
    );
}