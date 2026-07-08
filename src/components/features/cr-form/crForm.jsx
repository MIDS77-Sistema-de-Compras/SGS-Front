"use client";

import { useState } from "react";
import Image from "next/image";
import Select from "@/components/ui/select/Select";
import send from "../../../../public/images/icons/send.svg";
import FormField from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/input/Input";
import SectionHeader from "@/components/ui/layout/SectionHeader";
import Button from "@/components/ui/button/Button";

export default function RequestFormCR() {
    const [isMaster, setIsMaster] = useState(true);

const BLOCOS_RESPONSAVEIS = [
    "Diretoria de Operações",
    "Gerência de Tecnologia da Informação",
    "Núcleo de Educação Profissional",
    "Setor de Compras e Logística"
];
    return (
         <div className="border border-[#AAAAAA] dark:border-white/10 dark:bg-[#1A2233] rounded-xl flex flex-col overflow-hidden">

            <div className="px-5 py-3 border border-transparent border-b-[#AAAAAA] dark:border-b-white/10">
                <h1 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[22px]">Cadastrar CR</h1>
            </div>

            <form
                action={"won't do now since the API isn't done yet"}
                className="flex-1 overflow-y-auto p-5"
            >
                <SectionHeader label="IDENTIFICAÇÃO DE CR" />

                <FormField label="Nome do CR" required className="col-span-2">
                    <Input variant="form" placeholder="Nome do CR" />
                </FormField>

                <div className="grid grid-cols-2 items-center gap-x-5">

                    <FormField label="Código" required className="col-span-1">
                        <Input variant="form" placeholder="3333-7777" />
                    </FormField>

                    <FormField label="CR Master" required>
                        <div className="flex items-center gap-3 py-2 select-none">
                            <button
                                type="button"
                                onClick={() => setIsMaster(!isMaster)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    isMaster ? 'bg-[#103D85] dark:bg-[#1A4A9E]' : 'bg-gray-200 dark:bg-white/20'
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        isMaster ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                            <div className="flex flex-col text-left min-w-[100px]">
                                <span className={`text-[13px] font-bold leading-none ${isMaster ? 'text-[#103D85] dark:text-[#E2E2EA]' : 'text-gray-500 dark:text-[#C3C6D3]'}`}>
                                    {isMaster ? 'Ativado' : 'Desativado'}
                                </span>
                                <span className="text-[10px] text-gray-400 dark:text-[#C3C6D3] font-normal">
                                    {isMaster ? 'Clique para desativar' : 'Clique para ativar'}
                                </span>
                            </div>
                        </div>
                        <input type="hidden" name="master" value={isMaster ? "true" : "false"} />
                    </FormField>

                    <FormField label="Bloco responsável" required>
                        <Select 
                            name="sector" 
                            placeholder="Associar a um bloco responsável" 
                            defaultValue="" 
                            options={BLOCOS_RESPONSAVEIS} 
                            isRequired 
                        />
                    </FormField>

                </div>

                <div className="flex flex-col items-end mt-5">
                    <Button
                        type="submit"
                        variant="primary"
                        className="py-3 px-7 text-[14px] font-semibold"
                    >
                        <span className="flex gap-5">ATUALIZAR SOLICITAÇÃO
                            <Image
                                src={send}
                                alt="Paper Plane Send Icon"
                                width={15}
                                height={21}
                            />
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    )
}