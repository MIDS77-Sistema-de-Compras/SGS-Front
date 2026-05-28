import Image from "next/image";
import FormInput from "../form/FormInput";
import SelectFormInput from "../form/SelectFormInput";
import SubmitButton from "../form/SubmitButton";
import UploadFileInput from "../form/UploadFileInput";
import ListProducts from "./ListProducts";
import send from "../../../public/images/icons/send.svg";

export default function RequestForm(){
    return (
        <div className="border border-[#00000050] rounded-xl flex flex-1 flex-col">
            <div className="p-2 border border-transparent border-b-[#00000050]">
                <h1 className="text-[#103D85] font-bold text-2xl">Nova Solicitação</h1>
            </div>
            <form action={"won't do now since the API isn't done yet"}>
                {/* general infos */}
                <div className="my-5 mx-4">
                    <p className="flex items-center font-semibold tracking-wider text-[#103D85] before:block before:bg-[#103D85] before:py-4 before:px-[3px] before:mr-2 before:rounded">INFORMAÇÕES GERAIS</p>
                    <div className="mt-6 grid grid-cols-2 items-center gap-6">
                        <div>
                            <SelectFormInput name={"branch"} title={"Filial Pagadora"} label={"Selecione a unidade..."} options={["Senai", "Centroweg" /* <- placeholders */]} isRequired={true} />
                        </div>
                        <div>
                            <FormInput label={"Data de Solicitação"} type={"date"} isRequired={true} />
                        </div>
                    </div>
                </div>
                {/* ident & costs */}
                <div className="mt-12 mb-5 mx-4">
                    <p className="flex items-center font-semibold tracking-wider text-[#103D85] before:block before:bg-[#103D85] before:py-4 before:px-[3px] before:mr-2 before:rounded">IDENTIFICAÇÃO E CENTRO DE CUSTO</p>
                    <div className="mt-6 grid grid-cols-3 items-center gap-6">
                        <div className="col-span-2">
                            <FormInput label={"Solicitante/Destinatário"} placeholder={"Nome completo do docente..."} type={"text"} isRequired={true} />
                        </div>
                        <div>
                            <FormInput label={"Ramal"} placeholder={"3222-0000"} type={"text"} isRequired={false} />
                        </div>
                    </div>
                    <div className="mt-7">
                        <SelectFormInput name={"cr_project"} title={"CR e Projeto"} label={"Selecione o Centro de Resultado..."} options={["Senai", "SESI"]} isRequired={true} />
                    </div>
                </div>
                {/* products */}
                <div className="mt-12 mb-5 mx-4">
                    <p className="flex items-center font-semibold tracking-wider text-[#103D85] before:block before:bg-[#103D85] before:py-4 before:px-[3px] before:mr-2 before:rounded">PRODUTOS</p>
                    <div className="mt-7 mb-5">
                        <ListProducts products={[{id: "PROD-001", name: "Produto Placeholder"}, {id: "PROD-002", name: "Produto Placeholder"}] /* you might aswell unadd those placeholders to see the empty state of the component */} />
                    </div>
                    <div action={"Add product to the list"} className="grid grid-cols-6 gap-4">
                        <div className="col-span-3">
                            <FormInput label={"Produto"} placeholder={"Não há produtos cadastrados...?"} type={"text"} isRequired={true} />
                        </div>
                        <div>
                            <FormInput label={"Quantidade"} placeholder={"Ex: 2"} type={"number"} isRequired={true} />
                        </div>
                        <div>
                            <SelectFormInput name={"unit"} title={"Quantidade"} label={"Selecione..."} options={["Litros", "Gramas"]} isRequired={true} />
                        </div>
                        <SubmitButton className={"text-[3rem]"}>+</SubmitButton>
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
                    <SubmitButton className={"py-6 px-7 mx-4 mb-5 font-semibold"}><span className="flex gap-5">Finalizar Solicitação <Image src={send} /></span></SubmitButton>
                </div>
            </form>
        </div>
    )
}