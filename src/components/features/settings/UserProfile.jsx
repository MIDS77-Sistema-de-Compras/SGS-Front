"use client";

import { useState } from "react";
import Input from "@/components/ui/input/Input";
import CpfInput from "@/components/ui/input/CpfInput";
import PasswordInput from "@/components/ui/input/PasswordInput";

const readOnlyFieldClass =
    "bg-[#D1D5DB]/40 dark:bg-[#E2E2EA]/10 border-gray-200 dark:border-white/10 dark:text-[#E2E2EA] cursor-default select-none focus:border-gray-200 dark:focus:border-white/10 focus:ring-0";

const editableFieldClass =
    "bg-white dark:bg-[#E2E2EA]/25 dark:text-[#E2E2EA] border-[#103D85]/30 dark:border-white/15 focus:border-[#103D85] dark:focus:border-[#1A4A9E]";

export default function UserProfile() {
    const [open, setOpen] = useState(false);

    return (
        <section className="bg-white dark:bg-[#303746] rounded-2xl border border-gray-300 dark:border-white/10 shadow-sm overflow-hidden transition-all">
            <div
                onClick={() => setOpen(!open)}
                className="p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 dark:hover:bg-white/5"
            >
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400 dark:text-[#C3C6D3] border border-gray-100 dark:border-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-[#E2E2EA]">Perfil do usuário</h3>
                        <p className="text-gray-400 dark:text-[#C3C6D3] text-sm">Gerencie suas informações pessoais e de contato</p>
                    </div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    className={`text-gray-400 dark:text-[#C3C6D3] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                >
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </div>

            <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                    <div className="p-10 border-t border-gray-100 dark:border-white/10 bg-gray-50/20 dark:bg-white/[0.02]">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Nome completo</label>
                                <Input
                                    variant="form"
                                    defaultValue="Vinícius Trindade"
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">E-mail</label>
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
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Senha</label>
                                <PasswordInput
                                variant="form"
                                defaultValue="Senha@123"
                                className={editableFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Nível</label>
                                <Input
                                    variant="form"
                                    defaultValue="Supervisor"
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">CPF</label>
                                <CpfInput
                                    value="123.456.789-00"
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Ramal</label>
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