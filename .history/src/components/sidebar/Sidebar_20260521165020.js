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
                    <li>
                        <Image 
                            src="/images/home.png" 
                            alt="Icon inicio"
                        />
                        <p>Início</p> 
                    </li>
                    <li>
                        <Image/>
                        <p>Minhas Solicitações</p> 
                    </li>
                    <li>
                        <Image/>
                        <p>Nova Solicitação</p> 
                    </li>
                    <li>
                        <Image/>
                        <p>Notificações</p> 
                    </li>
                    <li>
                        <Image/>
                        <p>Configurações</p> 
                    </li>
                </ul>
            </div>
        </aside>
    )
}