"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { sidebarRoutes } from "@/app/config/navigation"

export default function Sidebar(){
    const pathname = usePathname()
    const router = useRouter()

    function handleLogout(){
        Cookies.remove("token")
        router.push("/login")
    }
    
    return(
        <aside className="w-72 bg-[#103D85] h-screen flex flex-col justify-between text-white py-8 px-4 shadow">
            <div className="flex items-center gap-3 mx-5 mt-5">
                <div className="rounded-full w-10 h-10 bg-white" />
                <div>
                    <p className="text-sm">Docente</p>
                    <p className="font-semibold">Elis Jasper</p>
                </div>
            </div>
            <div>
                <ul className="flex flex-col gap-7">
                    <li className="flex gap-5 font-semibold">
                        <Image 
                            src="/images/home.png" 
                            alt="Icon inicio"
                            width={25}
                            height={25}
                        />
                        <p>Início</p> 
                    </li>
                    <li className="flex gap-5 font-bold">
                        <Image
                            src="/images/minhasSolicitacoes.png"
                            alt="Icon minhas solicitações"
                            width={25}
                            height={25}
                        />
                        <p>Minhas Solicitações</p> 
                    </li>
                    <li className="flex gap-5 font-bold">
                        <Image
                            src="/images/novaSolicitacao.png"
                            alt="Icon nova solicitação"
                            width={25}
                            height={25}
                        />
                        <p>Nova Solicitação</p> 
                    </li>
                    <li className="flex gap-5 font-bold">
                        <Image
                            src="/images/notificacoes.png"
                            alt="Icon notificações"
                            width={25}
                            height={25}
                        />
                        <p>Notificações</p> 
                    </li>
                    <li className="flex gap-5 font-bold">
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