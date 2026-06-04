import { Modal } from "../login/Modal";
import Image from "next/image";

export function ModalUserDelete({ isOpen, onClose, userName = "Carregando..." }) {
    return (
        <Modal 
        isOpen={isOpen}
        onClose={onClose}
        title="Excluir usuário"
        >
            <div className="flex flex-col justify-between items-center h-[300px] w-full">
                <h1 className="text-[22px] text-center text-gray-900 font-normal pt-4">
                    Tem certeza que deseja excluir o usuário{" "}
                    <span className="break-words font-bold">{userName}?</span>
                </h1>
                <span>Essa ação não poderá ser desfeita.</span>

                <div className="w-16 h-16 rounded-full bg-[#E30613]/25 border border-gray-200 flex items-center justify-center shadow-sm">
                    <Image 
                        src="/images/icons/excluirUsuario.png" 
                        alt="Ícone de excluir Usuário"
                        width={32} 
                        height={32}
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
                        Excluir
                    </button>
                </div>
            </div>
        </Modal>  
    );
} 