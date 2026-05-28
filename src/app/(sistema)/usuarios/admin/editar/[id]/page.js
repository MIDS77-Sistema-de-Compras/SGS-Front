'use client';
import { useState } from 'react';
import TopBar from "@/components/topbar/Topbar"

export default function EditarUsuarios({ params }) {
    const id = params.id;
    
    const usuario = {
        nome: "Emanuelle Cristina Hostin",
        telefone: "+55 (47) 99999-9999",
        ramal: "9999",
        email: "emanuelle.hostin@gmail.com",
        senha: "12345678",
        nivelAcesso: "COORDENADOR"
    };
    const [nivelAcesso, setNivelAcesso] = useState(() => usuario.nivelAcesso);

    return (
        <div className="absolute inset-y-0 right-0 left-[260px] bg-[#FFFFFF] px-12 pb-12 overflow-y-auto font-sans flex flex-col gap-6">
            <TopBar />

            <div className="w-[1287px] h-[590px] bg-white p-8 rounded-xl shadow-sm border border-[#797979] flex flex-col justify-between">
                <div>
                    <div className="w-full pb-4">
                        <h1 className="text-4xl font-bold text-[#103D85]">
                            Editar Usuário
                        </h1>
                    </div>

                    <div className="border-b border-[#797979] mb-6"></div>
                    
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                            <div className="w-[4px] h-4 bg-[#103D85] rounded-xl transform translate-y-[8px]"></div>

                            <h2 className="text-sm font-bold text-[#103D85] uppercase pt-4 tracking-widest">
                                Identificação de Usuário
                            </h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="md:col-span-2">
                                <label className="block text-[11px] font-bold text-[#002B69]/70 mb-2 pt-4 pb-px">
                                    Nome Completo <span className="text-[#BA1A1A]">*</span>
                                </label>

                                <input 
                                type="text" 
                                defaultValue={usuario.nome}
                                placeholder="Nome completo do usuário..." 
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm placeholder-[#6B7280]"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#002B69]/70 mb-1">
                                    Telefone
                                </label>

                                <div className="flex rounded-xl border border-gray-300 overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
                                
                                <div className="bg-gray-50 px-3 flex items-center justify-center border-r border-gray-300 text-gray-400 text-sm">
                                    <img
                                    src="/images/telefone.png" 
                                    alt="Ícone de nível de acesso"  
                                    />
                                </div>

                                <input 
                                    type="text" 
                                    defaultValue={usuario.telefone}
                                    placeholder="+55 (47) 99876-5432" 
                                    className="w-full px-3 py-2.5 text-sm placeholder-[#6B7280]"
                                />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-[#002B69]/70 mb-2">
                                Ramal <span className="text-[#BA1A1A]">*</span>
                                </label>

                                <div className="flex rounded-xl border border-gray-300 overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
                                
                                <div className="bg-gray-50 px-3 flex items-center justify-center border-r border-gray-300 text-gray-400 text-sm">
                                    <img
                                    src="/images/telefone.png" 
                                    alt="Ícone de nível de acesso"  
                                    />
                                </div>

                                <input 
                                    type="text" 
                                    placeholder="3222-0000" 
                                    defaultValue={usuario.ramal}
                                    className="w-full px-3 py-2.5 text-sm placeholder-[#6B7280]"
                                />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[11px] font-bold text-[#002B69]/70 mb-2">
                                E-mail institucional <span className="text-[#BA1A1A]">*</span>
                                </label>

                                <input 
                                type="email" 
                                placeholder="gabri_glowglow@senai.edu"
                                defaultValue={usuario.email} 
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm placeholder-[#6B7280]"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[11px] font-bold text-[#002B69]/70 mb-2">
                                    Senha <span className="text-[#BA1A1A]">*</span>
                                </label>

                                <input 
                                type="password" 
                                placeholder="Mínimo 8 caracteres" 
                                defaultValue={usuario.senha}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm placeholder-[#6B7280]"
                                />

                                <div className="flex gap-1 pt-4">
                                <div className="h-2 w-1/4 bg-[#103D85] rounded"></div>
                                <div className="h-2 w-1/4 bg-[#103D85] rounded"></div>
                                <div className="h-2 w-1/4 bg-[#103D85] rounded"></div>
                                <div className="h-2 w-1/4 bg-gray-200 rounded"></div>
                                </div>

                                <span className="text-[10px] text-[#6B7280] block pt-2">
                                    Nível de força
                                </span>
                            </div>

                            </div>
                        </div>

                        <div className="pt-4">
                            
                            <div className="flex items-center gap-2 mb-4">
                            <div className="w-[4px] h-4 bg-[#103D85] rounded-xl"></div>

                            <h2 className="text-xs font-bold text-[#103D85] uppercase tracking-widest">
                                Nível de Acesso
                            </h2>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                                {['COORDENADOR', 'SUPERVISOR', 'DOCENTE', 'COMPRADOR REG.'].map((nivel) => (
                                    
                                    <button
                                    key={nivel}
                                    type="button"
                                    onClick={() => setNivelAcesso(nivel)}
                                    className={`py-3 px-4 rounded-xl border text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                                        nivelAcesso === nivel 
                                        ? 'bg-[#103D85] text-white border-[#103D85]' 
                                        : 'bg-white text-[#103D85] border-gray-200 hover:bg-gray-50' 
                                    }`}
                                    >
                                    
                                    <img
                                        src="/images/usuario.png" 
                                        alt="Ícone de nível de acesso" 
                                        className={`w-4 h-4 duration-200 ${
                                        nivelAcesso === nivel 
                                            ? 'brightness-0 invert' 
                                            : ''
                                        }`} 
                                    />

                                    {nivel}

                                    </button>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex justify-between items-end pt-11">

                    <div className="flex gap-4">

                        <button 
                            type="button" 
                            className="w-[295px] h-[40] bg-[#E30613] hover:bg-[#B8010C] font-bold text-white text-xs py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                            Excluir usuário

                            <img
                                src="/images/lixeira.png" 
                                alt="Ícone de excluir" 
                                className="w-4 h-4"
                            />
                        </button>

                        <button 
                            type="button" 
                            className="w-[295px] h-[40] bg-[#7D7D7D] hover:bg-[#555555] font-bold text-white text-xs py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                            Desativar usuário

                            <img
                                src="/images/desativar.png" 
                                alt="Ícone de desativar usuário" 
                                className="w-4 h-4"
                            />
                        </button>

                    </div>

                    <button 
                            type="submit" 
                            className="w-[295px] h-[40] bg-[#103D85] hover:bg-[#0b2a5c] font-bold text-white text-xs py-3 rounded-xl flex items-center justify-center gap-2"
                        >
                            Salvar mudanças

                            <img
                                src="/images/lapisEdicao.png" 
                                alt="Ícone de edição" 
                                className="w-4 h-4"
                            />
                    </button>
                </div>
            </div>
        </div>
    );

}