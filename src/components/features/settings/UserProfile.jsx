"use client";

import { useState } from "react";
import Input from "@/components/ui/input/Input";
import CpfInput from "@/components/ui/input/CpfInput";
import PasswordInput from "@/components/ui/input/PasswordInput";

export default function UserProfile() {
    const [open, setOpen] = useState(false);

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
                {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="m18 15-6-6-6 6"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                )}
            </div>

            {open && (
                <div className="p-10 border-t border-gray-100 bg-gray-50/20">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500">Nome completo</label>
                            <Input
                                variant="form"
                                defaultValue="Vinícius Trindade"
                                readOnly
                                className="bg-[#E0E3E6]/50 border-gray-100 cursor-default select-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500">E-mail</label>
                            <Input
                                variant="form"
                                type="email"
                                defaultValue="vinicius.trindade@senai.br"
                                readOnly
                                className="bg-[#E0E3E6]/50 border-gray-100 cursor-default select-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500">Senha</label>
                            <PasswordInput
                                variant="form"
                                defaultValue="eununcasoltoasaspas"
                                className="bg-[#E0E3E6]/50 border-gray-100"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500">Nível</label>
                            <Input
                                variant="form"
                                defaultValue="Supervisor"
                                readOnly
                                className="bg-[#E0E3E6]/50 border-gray-100 cursor-default select-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500">CPF</label>
                            <CpfInput
                            value="123.456.789-00"
                            readOnly
                            className="bg-[#E0E3E6]/50 border-gray-100 cursor-default select-none focus:border-[#103D85]"
                        />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500">Ramal</label>
                            <Input
                                variant="form"
                                defaultValue="1432"
                                readOnly
                                className="bg-[#E0E3E6]/50 border-gray-100 cursor-default select-none"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}