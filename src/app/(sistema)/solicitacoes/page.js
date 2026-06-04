"use client";

import { useState } from "react";
import Image from "next/image";

export default function MinhasSolicitacoes() {
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    
    // Estados para controle dos filtros
    const [pesquisa, setPesquisa] = useState("");
    const [filtroNome, setFiltroNome] = useState("");
    const [crSelecionado, setCrSelecionado] = useState("Todos");

    // Opções de CR vindas do banco/API
    const opcoesCR = [
        { id: "todos", label: "CR", value: "Todos" },
        { id: "blu", label: "CR-Blumenau", value: "CR-Blumenau" },
        { id: "flo", label: "CR-Florianópolis", value: "CR-Florianópolis" },
        { id: "joi", label: "CR-Joinville", value: "CR-Joinville" }
    ];

    const produtos = [
        {
            codigo: "IMP-002",
            nome: "Impressora",
            variacao: "Epson Eco Tank",
            quantidade: "2 unid",
            status: "Reprovado",
            cr: "CR-Blumenau"
        },
        {
            codigo: "MOU-003",
            nome: "Mouse",
            variacao: "Mouse Ergonômico",
            quantidade: "1 unid",
            status: "Aprovado",
            cr: "CR-Florianópolis"
        },
        {
            codigo: "LEI-022",
            nome: "Leite",
            variacao: "Leite Italac Desnatado",
            quantidade: "3 caixas",
            status: "Aprovado",
            cr: "CR-Blumenau"
        }
    ];

    // Lógica de Filtro
    const produtosFiltrados = produtos.filter((item) => {
        const correspondeCR = crSelecionado === "Todos" || item.cr === crSelecionado;
        const correspondeFiltroNome = item.nome.toLowerCase().includes(filtroNome.toLowerCase());

        const termoBusca = pesquisa.toLowerCase();
        const correspondeBuscaGeral = 
            item.nome.toLowerCase().includes(termoBusca) || 
            item.codigo.toLowerCase().includes(termoBusca) ||
            item.variacao.toLowerCase().includes(termoBusca);
        
        return correspondeCR && correspondeFiltroNome && correspondeBuscaGeral;
    });

    const abrirModal = (item) => {
        setProdutoSelecionado(item);
        setTimeout(() => setModalAberto(true), 10); 
    };

    const fecharModal = () => {
        setModalAberto(false);
        setTimeout(() => setProdutoSelecionado(null), 300);
    };

    return (
        /* Ocupa organicamente todo o espaço ao lado da sidebar sem quebrá-la */
        <div className="flex-1 bg-[#F4F6F9] p-8 overflow-y-auto font-sans h-screen">
            <div className="w-full">
                
                {/* REMOVIDO: O bloco duplicado de títulos foi retirado daqui */}

                {/* Barra de Filtros */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 text-[#103D85] font-semibold text-sm border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors">
                            <Image 
                                src="/images/icons/sliders.png" 
                                alt="Ícone Filtrar" 
                                width={18} 
                                height={18} 
                                className="object-contain"
                            />
                            Filtrar
                        </button>

                        <div className="relative">
                            <select 
                                value={crSelecionado}
                                onChange={(e) => setCrSelecionado(e.target.value)}
                                className="appearance-none border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm text-gray-600 font-medium bg-white focus:outline-none min-w-[140px] cursor-pointer"
                            >
                                {opcoesCR.map((opcao) => (
                                    <option key={opcao.id} value={opcao.value}>
                                        {opcao.label}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>

                        <input 
                            type="text" 
                            placeholder="Nome" 
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}
                            className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 focus:outline-none w-40 focus:border-[#103D85] transition-colors"
                        />
                    </div>

                    <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </span>
                        <input 
                            type="text" 
                            placeholder="Buscar..." 
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-[#103D85] transition-colors"
                        />
                    </div>
                </div>

                {/* Conteúdo Principal (Card Branco) */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-6">
                    
                    {/* Botão de Voltar + Título do Container */}
                    <div className="flex items-center gap-3 mb-6">
                        <button className="text-[#103D85] hover:opacity-80 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <h3 className="text-2xl font-bold text-[#103D85] tracking-tight">Minhas solicitações</h3>
                    </div>

                    <hr className="border-gray-100 mb-6" />

                    {/* Identificador da Solicitação */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-baseline gap-4">
                            <h4 className="text-xl font-bold text-gray-900">CR-0013 : Lista de 9 produtos</h4>
                            <span className="text-gray-400 text-xs font-medium">Realizada em: 12/03/2024</span>
                        </div>
                        <span className="bg-[#007BFF] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-sm">
                            Parcial Aprovado
                        </span>
                    </div>

                    {/* Tabela de Produtos */}
                    <div className="w-full overflow-hidden">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#EEF2F6]">
                                    <th className="py-3 px-6 text-left text-sm font-bold text-[#103D85] rounded-l-xl w-1/3">Produto</th>
                                    <th className="py-3 px-4 text-left text-sm font-bold text-[#103D85] w-1/4">Variação</th>
                                    <th className="py-3 px-4 text-center text-sm font-bold text-[#103D85] w-24">Quantidade</th>
                                    <th className="py-3 px-4 text-center text-sm font-bold text-[#103D85] w-32">Informações adicionais</th>
                                    <th className="py-3 px-6 text-center text-sm font-bold text-[#103D85] rounded-r-xl w-32">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {produtosFiltrados.length > 0 ? (
                                    produtosFiltrados.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="py-5 px-6 text-left text-sm text-gray-700 font-medium">
                                                {item.codigo} {item.nome}
                                            </td>
                                            <td className="py-5 px-4 text-left text-sm text-gray-500">
                                                {item.variacao}
                                            </td>
                                            <td className="py-5 px-4 text-center text-sm text-gray-600 font-medium">
                                                {item.quantidade}
                                            </td>
                                            <td className="py-5 px-4 text-center text-sm">
                                                <button 
                                                    onClick={() => abrirModal(item)}
                                                    className="text-gray-400 underline underline-offset-2 hover:text-gray-600 text-xs transition-colors"
                                                >
                                                    Ver mais
                                                </button>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <span className={`inline-block text-center text-xs font-bold text-white px-5 py-1.5 rounded-full w-28 shadow-sm tracking-wide ${
                                                    item.status === 'Aprovado' ? 'bg-[#4CAF50]' : 'bg-[#E50012]'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-sm text-gray-400">
                                            Nenhum produto encontrado para os filtros selecionados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Botão Inferior Direto */}
                <div className="flex justify-end">
                    <button className="bg-[#103D85] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#0c2f66] transition-colors shadow-sm">
                        Fechar produtos
                    </button>
                </div>
            </div>

            {/* Modal de Detalhes */}
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
                            <svg xmlns="http://www.w3.org/2000/xl" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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