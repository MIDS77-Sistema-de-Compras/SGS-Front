'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function MonitoramentoSolicitacoes() {

    const [cr, setCr] = useState("");
    const [perfil, setPerfil] = useState("");
    const [busca, setBusca] = useState("");
    const [abaAtiva, setAbaAtiva] = useState('pendentes');

    
    const crs = [
        { id: 1, nome: 'CR Blumenau' },
        { id: 2, nome: 'CR Joinville' },
        { id: 3, nome: 'CR Florianópolis' },
    ];

    const solicitacoes = [
        {
            id: 1,
            titulo: "CR-1024 : Compra de materiais de escritório",
            sub: "Aguardando aprovação da gerência",
            dataCriacao: "2026-05-29T14:30:00Z",
            status: "Em análise",
            cr: 1,
            perfil: "DOCENTE"
        },
        {
            id: 2,
            titulo: "CR-2048 : Solicitação de notebook",
            sub: "Em validação pelo setor de TI",
            dataCriacao: "2026-05-29T13:15:00Z",
            status: "Em análise",
            cr: 2,
            perfil: "SUPERVISOR"
        },
        {
            id: 3,
            titulo: "CR-3105 : Aquisição de EPIs",
            sub: "Pedido encaminhado ao comprador",
            dataCriacao: "2026-05-28T10:15:00Z",
            status: "Em atendimento",
            cr: 3,
            perfil: "COORDENADOR"
        },
        {
            id: 4,
            titulo: "CR-4127 : Compra de componentes elétricos",
            sub: "Prazo excedido para atendimento",
            dataCriacao: "2026-05-25T16:00:00Z",
            status: "Atrasada",
            cr: 1,
            perfil: "SUPERVISOR"
        },
        {
            id: 5,
            titulo: "CR-5231 : Contratação de serviço de manutenção",
            sub: "Solicitação cancelada pelo requisitante",
            dataCriacao: "2026-05-24T09:00:00Z",
            status: "Pedido Cancelado",
            cr: 2,
            perfil: "DOCENTE"
        },
        {
            id: 6,
            titulo: "CR-6345 : Compra de mobiliário",
            sub: "Parte dos itens já foi recebida",
            dataCriacao: "2026-05-23T11:00:00Z",
            status: "Recebimento Parcial",
            cr: 3,
            perfil: "COORDENADOR"
        },
        {
            id: 7,
            titulo: "CR-7412 : Aquisição de equipamentos de rede",
            sub: "Aguardando retorno do comprador",
            dataCriacao: "2026-05-22T15:30:00Z",
            status: "Aguardando comprador",
            cr: 1,
            perfil: "DOCENTE"
        },
        {
            id: 8,
            titulo: "CR-8567 : Compra de materiais de limpeza",
            sub: "Coleta de cotações em andamento",
            dataCriacao: "2026-05-20T14:20:00Z",
            status: "Solicitando orçamento",
            cr: 2,
            perfil: "SUPERVISOR"
        },
        {
            id: 9,
            titulo: "CR-9183 : Reposição de ferramentas",
            sub: "Compra realizada via fundo rotativo",
            dataCriacao: "2026-05-19T08:10:00Z",
            status: "Fundo Rotativo",
            cr: 3,
            perfil: "DOCENTE"
        },
        {
            id: 10,
            titulo: "CR-1049 : Compra de peças de reposição",
            sub: "Atendimento pelo centro de distribuição",
            dataCriacao: "2026-05-15T17:45:00Z",
            status: "CD central",
            cr: 1,
            perfil: "COORDENADOR"
        },
        {
            id: 11,
            titulo: "CR-1176 : Solicitação de materiais para laboratório",
            sub: "Pedido realizado diretamente pelo portal",
            dataCriacao: "2026-05-10T12:00:00Z",
            status: "Solicitado pelo portal",
            cr: 2,
            perfil: "DOCENTE"
        }
    ];

    const STATUS_CORES = {
        "Em análise": "bg-[#E1AD01]",
        "Em atendimento": "bg-[#11B6D4]",
        "Atrasada": "bg-[#EF4444]",
        "Pedido Cancelado": "bg-[#71717A]",
        "Recebimento Parcial": "bg-[#F97316]",
        "Aguardando comprador": "bg-[#8B5CF6]",
        "Solicitando orçamento": "bg-[#A855F7]",
        "Fundo Rotativo": "bg-[#EC4899]",
        "CD central": "bg-[#3B82F6]",
        "Solicitado pelo portal": "bg-[#E1AD01]"
    };

    const calcularTempoDecorrido = (dataApi) => {
        if (!dataApi) return "";
        
        const agora = new Date();
        const dataSolicitacao = new Date(dataApi);
        
        const diferencaMs = agora - dataSolicitacao;
        
        if (diferencaMs < 0) return "Agora mesmo";

        const minutos = Math.floor(diferencaMs / (1000 * 60));
        const horas = Math.floor(diferencaMs / (1000 * 60 * 60));
        const dias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));

        if (minutos < 1) {
            return "Agora mesmo";
        } else if (minutos < 60) {
            return `Há ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
        } else if (horas < 24) {
            return `Há ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
        } else {
            return `Há ${dias} ${dias === 1 ? 'dia' : 'dias'}`;
        }
    };

    const itensFiltrados = solicitacoes.filter((item) => {

        const filtroCr =
            cr === "" || item.cr === Number(cr);

        const filtroPerfil =
            perfil === "" || item.perfil === perfil;

        const filtroBusca =
            busca === "" ||
            item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
            item.sub.toLowerCase().includes(busca.toLowerCase());

        return (
            filtroCr &&
            filtroPerfil &&
            filtroBusca
        );
    });

    return (
        <div>
            <div className="bg-white rounded-xl border border-[#797979] flex flex-row justify-between p-2">
                <div className='flex flex-row items-center px-4'>
                    <Image
                        src={'/images/icons/filtrar.png'}
                        alt="Ícone de filtros"
                        height={21}
                        width={21}
                        className="w-5 h-5"
                    />

                    <div className='text-xl text-[#133D87] pl-3 pr-64'>
                        <p>Filtrar</p>
                    </div>
                </div>

                <div className="relative">
                    <select
                        value={cr}
                        onChange={(e) => setCr(e.target.value)}
                        className="appearance-none pl-3 w-[200px] py-2 border border-[#797979] rounded-xl text-sm text-[#374151] bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#103D85]"
                    >

                        <option value="">CR</option>
                        {crs.map((cr) => (
                            <option key={cr.id} value={cr.id}>
                                {cr.nome}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="relative">
                    <select
                        value={perfil}
                        onChange={(e) => setPerfil(e.target.value)}
                        className="appearance-none pl-3 w-[200px] py-2 border border-[#797979] rounded-xl text-sm text-[#374151] bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#103D85]"
                    >

                        <option value="">Todos os perfis</option>
                        <option value="DOCENTE">Docente</option>
                        <option value="SUPERVISOR">Supervisor</option>
                        <option value="COORDENADOR">Coordenador</option>

                    </select>
                </div>


                <div className='flex flex-row items-center w-[400px] px-3 border border-[#797979] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#103D85]'>
                    <Image
                        src={'/images/icons/lupa.png'}
                        alt="Ícone de lupa"
                        height={21}
                        width={21}
                        className="w-5 h-5"
                    >
                    </Image>

                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className='pl-2 w-full py-2 text-sm focus:outline-none focus:ring-0 border-none bg-transparent'
                    />
                </div>
            </div>

            {/* Monitoramento */}
            <div className="bg-white border border-[#797979] rounded-2xl overflow-hidden">

                <div className="flex justify-between items-end px-6 pt-4 border-b border-[#797979]">
                    <h2 className="text-4xl font-bold text-[#133D87] pb-3">
                        Monitoramento
                    </h2>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setAbaAtiva('andamento')}
                            className={`px-6 py-2 border border-[#797979] border-b-0 rounded-t-[18px] mb-[-1px] ${abaAtiva === 'andamento'
                                    ? 'text-[#133D87] font-semibold bg-white'
                                    : 'text-gray-500 bg-white'
                                }`}
                        >
                            Em andamento
                        </button>
                        <button
                            onClick={() => setAbaAtiva('pendentes')}
                            className={`px-6 py-2 border border-[#797979] border-b-0 rounded-t-[18px] mb-[-1px] ${abaAtiva === 'pendentes'
                                    ? 'text-[#133D87] font-semibold bg-white'
                                    : 'text-gray-500 bg-white'
                                }`}
                        >
                            Pendentes
                        </button>
                    </div>
                </div>

                {/* Conteúdo das Listas*/}
                <div className="h-[500px] overflow-y-auto p-6 bg-white">
                    {(() => {
                        const itensFiltrados = solicitacoes.filter((item) => {

                        const filtroAba =
                            abaAtiva === 'pendentes'
                                ? item.status === 'Em análise'
                                : item.status !== 'Em análise';

                        const filtroCr =
                            cr === '' || item.cr === Number(cr);

                        const filtroPerfil =
                            perfil === '' || item.perfil === perfil;

                        const filtroBusca =
                            busca === '' ||
                            item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                            item.sub.toLowerCase().includes(busca.toLowerCase());

                        return (
                            filtroAba &&
                            filtroCr &&
                            filtroPerfil &&
                            filtroBusca
                        );
                    });

                        if (itensFiltrados.length === 0) {
                            return (
                                <div className="text-gray-400 text-center pt-10">
                                    {abaAtiva === 'pendentes' 
                                        ? 'Nenhuma solicitação pendente encontrada.' 
                                        : 'Nenhuma solicitação em andamento encontrada.'}
                                </div>
                            );
                        }

                        return (
                            <div className="flex flex-col gap-5">
                                {itensFiltrados.map((item) => {
                                    const corDefinida = STATUS_CORES[item.status] || "bg-gray-400";

                                    return (
                                        <div key={item.id} className="flex flex-row items-center justify-between pb-2">
                                            
                                            <div className="flex flex-row items-center gap-4">
                                                <div className={`w-7 h-7 rounded-full ${corDefinida}`} />
                                                
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-bold text-[#333333]">{item.titulo}</span>
                                                    {item.sub && <span className="text-sm text-gray-400">{item.sub}</span>}
                                                </div>
                                            </div>

                                            <div className="flex flex-row items-center gap-12">
                                                <span className="text-xs text-gray-400 min-w-[60px] text-right">
                                                    {calcularTempoDecorrido(item.dataCriacao)}
                                                </span>
                                                                                                
                                                <button className={`w-[240px] py-1 text-white text-center font-medium rounded-full transition-colors ${corDefinida}`}>
                                                    {item.status}
                                                </button>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })()}
                </div>

            </div>
        </div>
    );
}
