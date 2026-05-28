"use client";

import { useState } from "react";

export default function Configuracoes() {
    const [perfilAberto, setPerfilAberto] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
   
    const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

    return (
        <div className="absolute inset-y-0 right-0 left-[260px] bg-white p-12 overflow-y-auto">
            <div className="w-full max-w-6xl mx-auto">
                
             
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-[#1E3A8A] tracking-tight font-sans">Configurações</h1>
                    <p className="text-black-400 text-base mt-1">Gerencie suas preferências e configurações do sistema</p>
                </header>

                <div className="flex flex-col gap-8 w-full">
                    
                    
                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all">
                        <div 
                            onClick={() => setPerfilAberto(!perfilAberto)}
                            className="p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Perfil do usuário</h3>
                                    <p className="text-black-400 text-sm">Gerencie suas informações pessoais e de contato</p>
                                </div>
                            </div>
                            <div>
                                {perfilAberto ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m18 15-6-6-6 6"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
                                )}
                            </div>
                        </div>

                        {perfilAberto && (
                            <div className="p-10 border-t border-gray-100 bg-gray-50/20">
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome completo</label>
                                        <input type="text" defaultValue="Vinícius Trindade" className="p-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">E-mail</label>
                                        <input type="email" defaultValue="vinicius.trindade@senai.br" className="p-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-6">
                                    <div className="flex flex-col gap-2 col-span-4">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Senha</label>
                                        <input type="password" defaultValue="eununcasoltoasaspas" className="p-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-3">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nível</label>
                                        <input type="text" defaultValue="Supervisor" className="p-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-3">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Telefone</label>
                                        <input type="text" defaultValue="55+ (47) 99422-1432" className="p-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2 col-span-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ramal</label>
                                        <input type="text" defaultValue="1432" className="p-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>


                    <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Preferências do sistema</h3>
                                <p className="text-black-400 text-sm">Personalize sua experiência no sistema</p>
                            </div>
                        </div>
                        
                        <div className="flex bg-[#103D85] p-1 rounded-full">
                            <button 
                                onClick={() => setDarkMode(false)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${!darkMode ? 'bg-white shadow-sm text-[#103D85]' : 'text-white/70 hover:text-white'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                                Claro
                            </button>
                            <button 
                                onClick={() => setDarkMode(true)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${darkMode ? 'bg-white shadow-sm text-[#103D85]' : 'text-white/70 hover:text-white'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                                Escuro
                            </button>
                        </div>
                    </section>

                   
                    <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Notificações</h3>
                                <p className="text-black-400 text-sm">Receber suas notificações por e-mail</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                           
                            <span className={`text-xs font-bold transition-colors ${notificacoesAtivas ? 'text-[#103D85]' : 'text-gray-400'}`}>
                                {notificacoesAtivas ? 'Ativado' : 'Desativado'}
                            </span>
                            
                           
                            <div 
                                onClick={() => setNotificacoesAtivas(!notificacoesAtivas)}
                                className={`w-11 h-6 rounded-full relative cursor-pointer flex items-center transition-all duration-200 ${notificacoesAtivas ? 'bg-[#103D85]' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-5 h-5 rounded-full shadow-sm absolute transition-all duration-200 ${notificacoesAtivas ? 'right-0.5' : 'left-0.5'}`}></div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}