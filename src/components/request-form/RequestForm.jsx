import Image from "next/image";
import SelectFormInput from "../form/SelectFormInput";
import SubmitButton from "../form/SubmitButton";
import UploadFileInput from "../form/UploadFileInput";
import ListProducts from "./ListProducts";
import send from "../../../public/images/icons/send.svg";
import FormField from "../adm/FormField";
import { Input } from "../login/Input";
import PhoneInput from "../adm/PhoneInput";

export default function RequestForm(){
    
    const inputClass = "!h-auto py-2.5 !text-sm !border-gray-200 !rounded-xl !shadow-sm !bg-white focus:!border-[#103D85] focus:!ring-0.5 focus:!ring-[#103D85]"

    return (
        <div className="border border-[#00000050] rounded-xl flex flex-1 flex-col overflow-hidden">
            <div className="px-3 py-4 border border-transparent border-b-[#00000050]">
                <h1 className="text-[#103D85] font-bold text-2xl">Nova Solicitação</h1>
            </div>
            <form action={"won't do now since the API isn't done yet"} className="flex-1 overflow-y-auto">
                {/* general infos */}
                <div className="my-5 mx-4">
                    <p className="flex items-center font-semibold tracking-wider text-[#103D85] before:block before:bg-[#103D85] before:py-4 before:px-[3px] before:mr-2 before:rounded">INFORMAÇÕES GERAIS</p>
                    <div className="mt-2 grid grid-cols-2 items-center gap-6">
                        <FormField label="Filial Pagadora">
                            <SelectFormInput name={"branch"} options={["Senai", "SESI"]} isRequired={true} />
                        </FormField>
                        <FormField label="Data de Solicitação">
                            <Input type="date" className={inputClass}/>
                        </FormField>
                    </div>
                </div>
                {/* ident & costs */}
                <div className="mt-12 mb-5 mx-4">
                    <p className="flex items-center font-semibold tracking-wider text-[#103D85] before:block before:bg-[#103D85] before:py-4 before:px-[3px] before:mr-2 before:rounded">IDENTIFICAÇÃO E CENTRO DE CUSTO</p>
                    <div className="mt-2 grid grid-cols-3 items-center gap-6">
                        <FormField label="Solicitante/Destinatário" required className="col-span-2">
                            <Input placeholder="Nome completo do docente..." className={inputClass}/>
                        </FormField>
                        <FormField label="Ramal" required>
                            <PhoneInput placeholder={"3222-0000"} className={inputClass}/>
                        </FormField>
                    </div>
                    <FormField label="CR e Projeto">
                        <SelectFormInput name={"cr_project"} label={"Selecione o Centro de Resultado..."} options={["Senai", "SESI"]} isRequired={true} />
                    </FormField>
                </div>
                {/* products */}
                <div className="mt-12 mb-5 mx-4">
                    <p className="flex items-center font-semibold tracking-wider text-[#103D85] before:block before:bg-[#103D85] before:py-4 before:px-[3px] before:mr-2 before:rounded">PRODUTOS</p>
                    <div className="mt-7 mb-5">
                        <ListProducts products={[{id: "PROD-001", name: "Produto Placeholder"}, {id: "PROD-002", name: "Produto Placeholder"}] /* you might aswell unadd those placeholders to see the empty state of the component */} />
                    </div>
                    <div className="flex w-full gap-2">
                        <FormField label="Produto" required className="flex-2">
                            <Input placeholder="Não há produtos cadastrados..." className={inputClass}/>
                        </FormField>
                        <FormField label="Quantidade" required className="flex-1">
                            <Input type="number" placeholder="Ex: 2" className={inputClass}/>
                        </FormField>
                        <FormField label="Unidade de Medida" required className="col-span-2">
                            <SelectFormInput name={"unit"} label={"Selecione..."} options={["L", "g"]} />
                        </FormField>
                        <SubmitButton className={"text-[2rem] px-8"}>+</SubmitButton>
                    </div>
                </div>
                {/* pins */}
                <div className="mt-12 mb-5 mx-4">
                    <p className="flex items-center font-semibold tracking-wider text-[#103D85] before:block before:bg-[#103D85] before:py-4 before:px-[3px] before:mr-2 before:rounded">ANEXOS</p>
                    <div className="mt-7 mb-5">
                        <UploadFileInput />
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <SubmitButton className={"py-6 px-7 mx-4 mb-5 font-semibold"}><span className="flex gap-5">Finalizar Solicitação <Image src={send} alt="Paper Plane Send Icon" /></span></SubmitButton>
                </div>
            </form>
        </div>
    )
}