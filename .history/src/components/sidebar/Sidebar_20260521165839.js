import Image from "next/image"

export default function Sidebar(){
    return(
        <aside className="w-70 bg-[#103D85] flex flex-col text-white">
            <div className="flex items-center gap-3 mx-5 mt-5">
                <div className="rounded-full w-10 h-10 bg-white" />
                <div>
                    <p className="text-sm">Docente</p>
                    <p className="font-semibold">Elis Jasper</p>
                </div>
            </div>
            <div>
                <ul className="flex flex-col gap-7">
                    <li className="flex gap-5">
                        <Image 
                            src="/images/home.png" 
                            alt="Icon inicio"
                            width={25}
                            height={25}
                        />
                        <p>Início</p> 
                    </li>
                    <li className="flex gap-2">
                        <Image
                            src="/images/minhasSolicitacoes.png"
                            alt="Icon minhas solicitações"
                            width={25}
                            height={25}
                        />
                        <p>Minhas Solicitações</p> 
                    </li>
                    <li className="flex gap-2">
                        <Image
                            src="/images/novaSolicitacao.png"
                            alt="Icon nova solicitação"
                            width={25}
                            height={25}
                        />
                        <p>Nova Solicitação</p> 
                    </li>
                    <li className="flex gap-2">
                        <Image
                            src="/images/notificacoes.png"
                            alt="Icon notificações"
                            width={25}
                            height={25}
                        />
                        <p>Notificações</p> 
                    </li>
                    <li className="flex gap-2">
                        <Image
                            src="/images/config.png"
                            alt="Icon configurações"
                            width={25}
                            height={25}
                        />
                        <p>Configurações</p> 
                    </li>
                </ul>
            </div>
        </aside>
    )
}