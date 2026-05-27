"use client"

import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function Home(){
    const router = useRouter()

    function handleLogout(){
        Cookies.remove("token")
        router.push("/login")
    }

    return(
        <div className="flex flex-1 flex-col">
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

            <section className="flex gap-10 mt-15">
                <div className="flex-1 border border-[#777777] rounded-xl p-5 shadow-lg">
                    <h2 className="text-[#103D85] font-bold text-[22px]">
                        Atividade Recente
                    </h2>
                    <div className="border-t border-[#777777] mt-2 mb-5 -mx-5" />
                    <div>
                        <ul className="flex flex-col gap-1">
                            <li className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-2 transition-all active:scale-[0.98]">
                                <div className="flex gap-5 items-center">
                                    <Image 
                                        src="/images/home/aprovada.png"
                                        alt="Icone Aprovação"
                                        width={35}
                                        height={35}
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            Solicitação #1234 aprovada
                                        </p>
                                        <p className="text-[12px]">
                                            Equipamentos de mecânica
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[12px]">
                                    Há 2 horas
                                </p>
                            </li>
                            <li className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-2 transition-all active:scale-[0.98]">
                                <div className="flex gap-5 items-center">
                                    <Image 
                                        src="/images/home/atualizacao.png"
                                        alt="Icone Atualização"
                                        width={35}
                                        height={35}
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            Novo comentário em #1234
                                        </p>
                                        <p className="text-[12px]">
                                            Aguardando fornecedor terceiro
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[12px]">
                                    Há 2 horas
                                </p>
                            </li>
                            <li className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-2 transition-all active:scale-[0.98]">
                                <div className="flex gap-5 items-center">
                                    <Image 
                                        src="/images/home/recusada.png"
                                        alt="Icone Recusado"
                                        width={35}
                                        height={35}
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            Solicitação #4321 recusada
                                        </p>
                                        <p className="text-[12px]">
                                            Equipamentos de mecânica
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[12px]">
                                    Há 2 horas
                                </p>
                            </li>
                            <li className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-2 transition-all active:scale-[0.98]">
                                <div className="flex gap-5 items-center">
                                    <Image 
                                        src="/images/home/atualizacao.png"
                                        alt="Icone Atualização"
                                        width={35}
                                        height={35}
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            Novo comentário em #1234
                                        </p>
                                        <p className="text-[12px]">
                                            Aguardando fornecedor terceiro
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[12px]">
                                    Há 2 horas
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border border-[#777777] rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between mb-7">
                        <h2 className="text-[#103D85] font-bold text-[22px]">
                            Resumo
                        </h2>
                        <p className="text-[#103D85] text-[12px]">
                            Minhas <br/> solicitações
                        </p>
                    </div>
                    <div>
                        <ul className="flex flex-col gap-4">
                            <li className="flex p-4 shadow-lg rounded-xl items-center gap-40 hover:scale-[1.03]">
                                <div className="flex gap-3 items-center">
                                    <Image 
                                        src="/images/home/solPendente.png"
                                        alt="Icone Solicitações Pendentes"
                                        width={25}
                                        height={25}
                                    />
                                    <p>
                                        Pendentes
                                    </p>
                                </div>
                                <p className="font-semibold text-[20px]">
                                    05
                                </p>
                            </li>
                            <li className="flex p-4 shadow-lg rounded-xl items-center gap-40 hover:scale-[1.03]">
                                <div className="flex gap-3 items-center">
                                    <Image 
                                        src="/images/home/solAprovada.png"
                                        alt="Icone Solicitações Aprovadas"
                                        width={25}
                                        height={25}
                                    />
                                    <p>
                                        Aprovadas
                                    </p>
                                </div>
                                <p className="font-semibold text-[20px]">
                                    05
                                </p>
                            </li>
                            <li className="flex p-4 shadow-lg rounded-xl items-center gap-40 hover:scale-[1.03]">
                                <div className="flex gap-3 items-center">
                                    <Image 
                                        src="/images/home/solRecusada.png"
                                        alt="Icone Solicitações Recusadas"
                                        width={25}
                                        height={25}
                                    />
                                    <p>
                                        Recusadas
                                    </p>
                                </div>
                                <p className="font-semibold text-[20px]">
                                    05
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <footer className="flex gap-15 mt-auto">
                <Link 
                    href="/solicitacoes/criar"
                    className="flex flex-1 rounded-xl bg-[#103D85] py-4 px-50 gap-3 items-center justify-center shadow-lg transition-all active:scale-[0.98] hover:bg-[#3366cc]"
                >
                    <Image 
                        src="/images/home/novaSolicitacao.png"
                        alt="Icone de Nova Solicitação"
                        width={25}
                        height={25}
                    />
                    <p className="text-white font-bold">
                        Nova Solicitação
                    </p>
                </Link>
                <Link 
                    href="/solicitacoes"
                    className="flex flex-1 rounded-xl border border-[#777777] py-4 px-50 gap-3 justify-center items-center shadow-lg transition-all active:scale-[0.98] hover:bg-gray-100"
                >
                    <Image 
                        src="/images/home/minhasSolicitacoes.png"
                        alt="Icone de Nova Solicitação"
                        width={30}
                        height={30}
                    />
                    <p className="font-bold">
                        Minhas Solicitações
                    </p>
                </Link>
            </footer>
        </div>
    )
}