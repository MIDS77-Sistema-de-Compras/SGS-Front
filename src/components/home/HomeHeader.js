import Image from "next/image"

export default function Header(){
    return (
        <header className="flex items-center">
            <Image 
                src="/images/sgsLogoBlue.png"
                alt="Logo SGS"
                width={230}
                height={100}
            />
            <h1 className="text-[26px] font-semibold text-[#103D85] ml-10">
                Sistema de <br/> Gestão de <br/> Solicitações
            </h1>
            <p className="ml-50">
                Plataforma de controle de aquisições do SENAI. Registre e <br/> 
                acompanhe suas solicitações de compra e serviços de forma <br/>
                simples e transparente.
            </p>
        </header>
    )
}