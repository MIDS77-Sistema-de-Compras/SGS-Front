import { Modal } from "../login/Modal";
import Image from "next/image";

export function ModalUserDisable({ isOpen, onClose, userName = "Carregando..." }) {
    return (
        <Modal 
        isOpen={isOpen}
        onClose={onClose}
        title="Desativar usuário"
        >
            <div className="flex flex-col justify-between items-center h-[300px] w-full">
                <h1 className="text-[22px] text-center text-gray-900 font-normal pt-12">
                    Tem certeza que deseja desativar o usuário{" "}
                    <span className="break-words font-bold">{userName}?</span>
                </h1>

                <div className="w-16 h-16 rounded-full bg-[#D4D4D4] border border-gray-200 flex items-center justify-center shadow-sm">
                    <Image 
                        src="/images/icons/desativarUsuario.png" 
                        alt="Ícone Desativar Usuário"
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
                        onClick={onClose}
                        className="px-18 py-2 border border-[#E30613] bg-[#E30613] hover:bg-[#9F0009] hover:border-[#9F0009] text-white font-medium rounded-xl transition-colors min-w-[110px]"
                    >
                        Desativar
                    </button>
                </div>
            </div>
        </Modal>  
    );
} 