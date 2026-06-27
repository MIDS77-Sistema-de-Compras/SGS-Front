"use client";

import { useState } from "react";
import Input from "@/components/ui/input/Input";
import CpfInput from "@/components/ui/input/CpfInput";
import PasswordInput from "@/components/ui/input/PasswordInput";
import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/overlay/Modal";

const readOnlyFieldClass =
    "bg-[#D1D5DB]/40 border-gray-200 cursor-default select-none focus:border-gray-200 focus:ring-0";

const editableFieldClass =
    "bg-white border-[#103D85]/30 focus:border-[#103D85]";

export default function UserProfile() {

    const [open, setOpen] = useState(false);
    const [modal, openModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        openModal(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        // TODO endpoint for changing pwd that isn't the recovery one
        try{
            
        }catch(error){
            console.error(error);
        }
        openModal(false);
    }

    return (
        <section className="bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden transition-all">
            <div
                onClick={() => setOpen(!open)}
                className="p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
            >
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">Perfil do usuário</h3>
                        <p className="text-gray-400 text-sm">Gerencie suas informações pessoais e de contato</p>
                    </div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                >
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </div>

            <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                    <div className="p-10 border-t border-gray-100 bg-gray-50/20">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500">Nome completo</label>
                                <Input
                                    variant="form"
                                    defaultValue="Vinícius Trindade"
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500">E-mail</label>
                                <Input
                                    variant="form"
                                    type="email"
                                    defaultValue="vinicius.trindade@senai.br"
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500">Senha</label>
                                <form onSubmit={handleSubmit}>
                                    <PasswordInput
                                    variant="form"
                                    placeholder="Altere sua senha aqui..."
                                    className={editableFieldClass}
                                    />
                                    <Modal isOpen={modal} onClose={() => openModal(false)} title={"Confirmação"}>
                                        <p>Deseja atualizar sua senha?</p>
                                        <div className="flex gap-3">
                                            <Button onClick={handleUpdate}>Sim</Button>
                                            <Button onClick={() => openModal(false)} className="bg-transparent text-black hover:bg-neutral-200">Não</Button>
                                        </div>
                                    </Modal>
                                </form>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500">Nível</label>
                                <Input
                                    variant="form"
                                    defaultValue="Supervisor"
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500">CPF</label>
                                <CpfInput
                                    value="123.456.789-00"
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500">Ramal</label>
                                <Input
                                    variant="form"
                                    defaultValue="1432"
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
