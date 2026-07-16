import Image from "next/image"

export default function Header(){
    return (
        <header className="hidden lg:flex lg:flex-row lg:items-center">
            <div className="flex items-center gap-8 min-[1350px]:gap-10">
                <div className="relative w-[170px] h-[75px] min-[1350px]:w-[230px] min-[1350px]:h-[100px] shrink-0">
                    <Image
                        src="/images/logos/sgs-blue.png"
                        alt="Logo SGS"
                        fill
                        sizes="(max-width: 1350px) 170px, 230px"
                        className="object-contain object-left dark:opacity-0"
                    />
                    <Image
                        src="/images/logos/sgc.svg"
                        alt="Logo SGS"
                        fill
                        sizes="(max-width: 1350px) 170px, 230px"
                        className="object-contain object-left opacity-0 dark:opacity-100"
                    />
                </div>

                <h1 className="text-[22px] min-[1350px]:text-[26px] font-semibold leading-snug text-[#103D85] dark:text-[#E2E2EA]">
                    Sistema de <br/> Gestão de <br/> Solicitações
                </h1>
            </div>

            <p className="text-base leading-relaxed text-gray-600 dark:text-[#C3C6D3] ml-16 min-[1350px]:ml-40 max-w-[520px]">
                Plataforma de controle de aquisições do SENAI. Registre e
                acompanhe suas solicitações de compra e serviços de forma
                simples e transparente.
            </p>
        </header>
    )
}