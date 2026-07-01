import Image from "next/image";
import Select from "@/components/ui/select/Select";
import send from "../../../../public/images/icons/send.svg";
import FormField from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/input/Input";
import SectionHeader from "@/components/ui/layout/SectionHeader";
import Button from "@/components/ui/button/Button";

export default function RequestFormCR() {
    
const BLOCOS_RESPONSAVEIS = [
    "Diretoria de Operações",
    "Gerência de Tecnologia da Informação",
    "Núcleo de Educação Profissional",
    "Setor de Compras e Logística"
];
    return (
        <div className="border border-[#AAAAAA] rounded-xl flex flex-1 flex-col overflow-hidden min-h-0">

            <div className="px-5 py-3 border border-transparent border-b-[#AAAAAA]">
                <h1 className="text-[#103D85] font-bold text-[22px]">Cadastrar CR</h1>
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
                        <Select 
                            name="master" 
                            placeholder="Cadastrar como CR Master?" 
                            defaultValue="" 
                            options={["Sim, cadastrar como CR Master", "Não cadastrar como CR Master"]} 
                            isRequired 
                        />
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