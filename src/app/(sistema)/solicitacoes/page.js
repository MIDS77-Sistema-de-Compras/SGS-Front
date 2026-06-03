"use client";

import { useState } from "react";

export default function MinhasSolicitacoes() {
   
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    
    const [modalAberto, setModalAberto] = useState(false);

    const produtos = [
        {
            codigo: "IMP-002",
            nome: "Impressora",
            variacao: "Epson Eco Tank",
            quantidade: "2 unid",
            status: "Reprovado"
        },
        {
            codigo: "MOU-003",
            nome: "Mouse",
            variacao: "Mouse Ergonômico",
            quantidade: "1 unid",
            status: "Aprovado"
        },
        {
            codigo: "LEI-022",
            nome: "Leite",
            variacao: "Leite Italac Desnatado",
            quantidade: "3 caixas",
            status: "Aprovado"
        }
    ];

   
    const abrirModal = (item) => {
        setProdutoSelecionado(item);
        setTimeout(() => setModalAberto(true), 10); 
    };

    const fecharModal = () => {
        setModalAberto(false);
        setTimeout(() => setProdutoSelecionado(null), 300);
    };

    return (
        <div className="absolute inset-y-0 right-0 left-[260px] bg-white p-12 overflow-y-auto font-sans">
            <div className="w-full max-w-6xl mx-auto">
                
              
                <div className="flex items-center gap-4 mb-10">
                    <span className="text-4xl font-black text-[#103D85] tracking-tight">SGS</span>
                    <h1 className="text-3xl font-bold text-[#1E3A8A]">Sistema de Gestão de Solicitações</h1>
                </div>

                
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
                    
                   
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-6 mb-6">
                        <button className="text-[#103D85] hover:opacity-80 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <h2 className="text-2xl font-bold text-[#103D85]">Minhas solicitações</h2>
                    </div>

                  
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-baseline gap-4">
                            <h3 className="text-2xl font-bold text-gray-900">CR-0013 : Lista de 9 produtos</h3>
                            <span className="text-gray-400 text-sm font-medium">Realizada em: 12/03/2024</span>
                        </div>
                       
                        <span className="bg-[#007BFF] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                            Parcial Aprovado
                        </span>
                    </div>

                    
                    <div className="w-full overflow-hidden">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#EEF2F6] rounded-xl">
                                    <th className="py-4 px-6 text-center text-sm font-bold text-[#1E3A8A] rounded-l-xl w-1/4">Produto</th>
                                    <th className="py-4 px-6 text-center text-sm font-bold text-[#1E3A8A] w-1/4">Variação</th>
                                    <th className="py-4 px-6 text-center text-sm font-bold text-[#1E3A8A] w-1/6">Quantidade</th>
                                    <th className="py-4 px-6 text-center text-sm font-bold text-[#1E3A8A] w-1/6">Informações adicionais</th>
                                    <th className="py-4 px-6 text-center text-sm font-bold text-[#1E3A8A] rounded-r-xl w-1/6">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {produtos.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-5 px-6 text-center text-sm text-gray-700 font-medium">
                                            {item.codigo} {item.nome}
                                        </td>
                                        <td className="py-5 px-6 text-center text-sm text-gray-500">
                                            {item.variacao}
                                        </td>
                                        <td className="py-5 px-6 text-center text-sm text-gray-600 font-medium">
                                            {item.quantidade}
                                        </td>
                                        <td className="py-5 px-6 text-center text-sm">
                                            
                                            <button 
                                                onClick={() => abrirModal(item)}
                                                className="text-gray-400 underline underline-offset-2 hover:text-gray-600 transition-colors"
                                            >
                                                Ver mais
                                            </button>
                                        </td>
                                        <td className="py-5 px-6 text-center">
                                            <span className={`inline-block text-center text-xs font-bold text-white px-5 py-1.5 rounded-lg w-28 shadow-sm tracking-wide ${
                                                item.status === 'Aprovado' ? 'bg-[#4CAF50]' : 'bg-[#E50012]'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            
            {produtoSelecionado && (
                <div 
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
                        modalAberto ? "opacity-100" : "opacity-0"
                    }`}
                >
                
                    <div 
                        className={`bg-white p-8 rounded-2xl max-w-md w-full shadow-xl border border-gray-100 relative transition-all duration-300 transform ${
                            modalAberto ? "scale-100 opacity-100" : "scale-95 opacity-0"
                        }`}
                    >
                        
                        <button 
                            onClick={fecharModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>

                       
                        <h3 className="text-xl font-bold text-[#103D85] mb-2">Informações Adicionais</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Item: <span className="font-semibold text-gray-700">{produtoSelecionado.codigo} - {produtoSelecionado.nome}</span>
                        </p>
                        
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Motivo / Parecer do Supervisor:</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {produtoSelecionado.status === "Aprovado" 
                                    ? "A solicitação cumpre com os requisitos técnicos da unidade e o orçamento está dentro do limite estipulado para o trimestre corrente." 
                                    : "A compra foi recusada temporariamente pois identificamos itens similares disponíveis no estoque central da instituição para remanejamento."
                                }
                            </p>
                        </div>

                        
                        <div className="flex justify-end">
                            <button 
                                onClick={fecharModal}
                                className="bg-[#103D85] text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}