import Image from "next/image"

export default function Header(){
    return (
        <header className="flex items-center">
            <div className="relative w-[230px] h-[100px] shrink-0">
                <Image
                    src="/images/logos/sgs-blue.png"
                    alt="Logo SGS"
                    fill
                    sizes="230px"
                    className="object-contain object-left dark:opacity-0"
                />
                <Image
                    src="/images/logos/sgc.svg"
                    alt="Logo SGS"
                    fill
                    sizes="230px"
                    className="object-contain object-left opacity-0 dark:opacity-100"
                />
            </div>
            <h1 className="text-[26px] font-semibold text-[#103D85] dark:text-[#E2E2EA] ml-10">
                Sistema de <br/> Gestão de <br/> Solicitações
            </h1>
            <p className="ml-50 text-gray-600 dark:text-[#C3C6D3]">
                Plataforma de controle de aquisições do SENAI. Registre e <br/> 
                acompanhe suas solicitações de compra e serviços de forma <br/>
                simples e transparente.
            </p>
        </header>
    )
}