"use client";

import { useState, useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { getAllRequests } from "@/service/requests";
import KpiCards from "@/components/features/analitico/KpiCards";
import VolumeChart from "@/components/features/analitico/VolumeChart";
import StatusDistribution from "@/components/features/analitico/StatusDistribution";
import CrVolumeChart from "@/components/features/analitico/CrVolumeChart";
import TopProducts from "@/components/features/analitico/TopProducts";
import ActiveFilters from "@/components/features/analitico/ActiveFilters";

export default function AnaliticoCoordenador() {
    const [periodo, setPeriodo] = useState("365");
    const [crSelecionado, setCrSelecionado] = useState("todos");
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [statusFiltro, setStatusFiltro] = useState(null);
    const [crFiltro, setCrFiltro] = useState(null);
    const [mesFiltro, setMesFiltro] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function loadData() {
            try {
                setLoading(true);
                setError(null);
                const data = await getAllRequests();
                if (!cancelled) setRequests(data);
            } catch (err) {
                if (!cancelled) setError(err.message || "Não foi possível conectar ao backend ou carregar as solicitações.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        loadData();
        return () => {
            cancelled = true;
        };
    }, []);

    const limpaFiltrosCruzados = () => {
        setStatusFiltro(null);
        setCrFiltro(null);
        setMesFiltro(null);
    };

    const normalizeStatusText = (status) => {
        const s = (status || "").toLowerCase().trim();
        if (s.includes("aprovado")) return "Aprovadas";
        if (s.includes("reprovado") || s.includes("cancelado") || s.includes("atrasada")) return "Recusadas";
        return "Em Análise";
    };

    const getRequestMonthName = (dateStr) => {
        if (!dateStr) return null;
        const mesesNomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const d = new Date(dateStr);
        return mesesNomes[d.getMonth()];
    };

    const getRequestWeekName = (dateStr) => {
        if (!dateStr) return null;
        const day = new Date(dateStr).getDate();
        const weekIdx = Math.min(Math.floor((day - 1) / 7.5), 3);
        return `Semana ${weekIdx + 1}`;
    };

    const requestsFiltradasBase = useMemo(() => {
        const agora = new Date();

        return requests.filter(r => {
            if (r.data) {
                const dataSolicitacao = new Date(r.data);
                const diffTempo = Math.abs(agora - dataSolicitacao);
                const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
                if (diffDias > Number(periodo)) return false;
            }
            if (crSelecionado !== "todos") {
                if (crSelecionado === "ti" && !r.codigo?.toLowerCase().includes("ti")) return false;
                if (crSelecionado === "rh" && !r.codigo?.toLowerCase().includes("rh")) return false;
            }
            return true;
        });
    }, [requests, periodo, crSelecionado]);

    const requestsFiltradasFinais = useMemo(() => {
        return requestsFiltradasBase.filter(r => {
            if (statusFiltro && normalizeStatusText(r.status) !== statusFiltro) {
                return false;
            }
            if (crFiltro && r.codigo !== crFiltro) {
                return false;
            }
            if (mesFiltro) {
                if (periodo === "30") {
                    if (getRequestWeekName(r.data) !== mesFiltro) return false;
                } else {
                    if (getRequestMonthName(r.data) !== mesFiltro) return false;
                }
            }
            return true;
        });
    }, [requestsFiltradasBase, statusFiltro, crFiltro, mesFiltro, periodo]);

    const computedData = useMemo(() => {
        const total = requestsFiltradasFinais.length;

        let aprovadas = 0;
        let emAnalise = 0;
        let recusadas = 0;

        requestsFiltradasFinais.forEach(r => {
            const normalized = normalizeStatusText(r.status);
            if (normalized === "Aprovadas") aprovadas++;
            else if (normalized === "Recusadas") recusadas++;
            else emAnalise++;
        });

        const statusData = [
            { nome: "Aprovadas", total: aprovadas, cor: "#16A34A", pct: total > 0 ? Math.round((aprovadas / total) * 100) : 0 },
            { nome: "Em Análise", total: emAnalise, cor: "#D97706", pct: total > 0 ? Math.round((emAnalise / total) * 100) : 0 },
            { nome: "Recusadas", total: recusadas, cor: "#DC2626", pct: total > 0 ? Math.round((recusadas / total) * 100) : 0 }
        ];

        let totalValor = 0;
        requestsFiltradasFinais.forEach(r => {
            const prodCount = r.produtos?.reduce((sum, p) => sum + (p.quantity || 1), 0) || 0;
            totalValor += prodCount * 125;
        });

        const valorFormatado = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(totalValor);

        const crCounts = requestsFiltradasFinais.reduce((acc, r) => {
            const code = r.codigo || "Sem CR";
            acc[code] = (acc[code] || 0) + 1;
            return acc;
        }, {});

        const crsData = Object.entries(crCounts).map(([nome, valor]) => ({
            nome,
            valor
        })).sort((a, b) => b.valor - a.valor).slice(0, 4);

        let mensalData = [];
        if (periodo === "30") {
            const weeks = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
            const counts = [0, 0, 0, 0];
            requestsFiltradasFinais.forEach(r => {
                const weekName = getRequestWeekName(r.data);
                const idx = weeks.indexOf(weekName);
                if (idx !== -1) counts[idx]++;
            });
            mensalData = weeks.map((w, idx) => ({ mes: w, valor: counts[idx] }));
        } else if (periodo === "180") {
            const mesesNomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            const hoje = new Date();
            const counts = {};
            for (let i = 5; i >= 0; i--) {
                const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
                counts[mesesNomes[d.getMonth()]] = 0;
            }
            requestsFiltradasFinais.forEach(r => {
                const nomeMes = getRequestMonthName(r.data);
                if (counts[nomeMes] !== undefined) {
                    counts[nomeMes]++;
                }
            });
            mensalData = Object.entries(counts).map(([mes, valor]) => ({ mes, valor }));
        } else {
            const mesesNomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            const counts = {};
            mesesNomes.forEach(m => { counts[m] = 0; });
            requestsFiltradasFinais.forEach(r => {
                const nomeMes = getRequestMonthName(r.data);
                if (counts[nomeMes] !== undefined) {
                    counts[nomeMes]++;
                }
            });
            mensalData = mesesNomes.map(m => ({ mes: m, valor: counts[m] }));
        }

        const catCounts = {};
        requestsFiltradasFinais.forEach(r => {
            r.produtos?.forEach(p => {
                const cat = p.nome || "Geral";
                catCounts[cat] = (catCounts[cat] || 0) + (p.quantity || 1);
            });
        });

        let totalProdQty = Object.values(catCounts).reduce((sum, val) => sum + val, 0) || 1;
        const categoriasData = Object.entries(catCounts).map(([nome, qty]) => ({
            nome,
            pct: Math.round((qty / totalProdQty) * 100),
            valor: `Qtd: ${qty}`
        })).sort((a, b) => b.pct - a.pct).slice(0, 4);

        return {
            total,
            valor: valorFormatado,
            tempoMedio: total > 0 ? "3.2 dias" : "0 dias",
            taxaAprovacao: total > 0 ? `${Math.round((aprovadas / total) * 100)}%` : "0%",
            mensal: mensalData,
            status: statusData,
            crs: crsData.length > 0 ? crsData : [{ nome: "Nenhum CR", valor: 0 }],
            categorias: categoriasData.length > 0 ? categoriasData : [{ nome: "Nenhum produto", pct: 0, valor: "Qtd: 0" }]
        };
    }, [requestsFiltradasFinais, periodo]);

    const maxCRValor = useMemo(() => {
        return Math.max(...computedData.crs.map((c) => c.valor), 1);
    }, [computedData]);

    const maxMensalValor = useMemo(() => {
        return Math.max(...computedData.mensal.map((m) => m.valor), 1);
    }, [computedData]);

    if (loading) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center bg-white border border-[#E2E8F0] rounded-xl p-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#103D85]"></div>
                <span className="text-sm font-medium text-slate-500 mt-4">Carregando painel analítico...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center bg-white border border-[#E2E8F0] rounded-xl p-20 text-center">
                <span className="text-red-500 font-bold text-lg">{error}</span>
                <span className="text-xs text-slate-400 mt-2">Certifique-se de que a API do backend está ativa.</span>
            </div>
        );
    }

    const temFiltroAtivo = statusFiltro || crFiltro || mesFiltro;

    return (
        <div className="flex flex-col flex-1 min-h-0 bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl overflow-y-auto font-sans">
            <div className="bg-white px-8 py-5 border-b border-[#E4E4E7] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-[#103D85] font-extrabold text-[22px]">Painel Analítico de Compras</h1>
                    <p className="text-slate-400 text-xs mt-0.5">Visão analítica e consolidada de dados operacionais e financeiros</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {temFiltroAtivo && (
                        <button
                            onClick={limpaFiltrosCruzados}
                            className="flex items-center gap-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer"
                        >
                            <X size={13} /> Limpar filtros aplicados
                        </button>
                    )}

                    <select
                        value={crSelecionado}
                        onChange={(e) => {
                            setCrSelecionado(e.target.value);
                            setCrFiltro(null);
                        }}
                        className="bg-white border border-slate-200 rounded-lg text-xs py-2 px-3 text-slate-700 font-medium focus:outline-none transition cursor-pointer"
                    >
                        <option value="todos">Todos os CRs</option>
                        <option value="ti">CRs de TI</option>
                        <option value="rh">CRs de RH</option>
                    </select>

                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                        <button
                            onClick={() => {
                                setPeriodo("30");
                                setMesFiltro(null);
                            }}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${periodo === "30" ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-950"}`}
                        >
                            30 Dias
                        </button>
                        <button
                            onClick={() => {
                                setPeriodo("180");
                                setMesFiltro(null);
                            }}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${periodo === "180" ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-950"}`}
                        >
                            6 Meses
                        </button>
                        <button
                            onClick={() => {
                                setPeriodo("365");
                                setMesFiltro(null);
                            }}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${periodo === "365" ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-950"}`}
                        >
                            Este Ano
                        </button>
                    </div>
                </div>
            </div>

            {temFiltroAtivo && (
                <ActiveFilters
                    statusFiltro={statusFiltro}
                    setStatusFiltro={setStatusFiltro}
                    crFiltro={crFiltro}
                    setCrFiltro={setCrFiltro}
                    mesFiltro={mesFiltro}
                    setMesFiltro={setMesFiltro}
                />
            )}

            <div className="p-8 flex flex-col gap-6">
                <KpiCards data={computedData} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <VolumeChart
                        mensal={computedData.mensal}
                        maxMensalValor={maxMensalValor}
                        mesFiltro={mesFiltro}
                        setMesFiltro={setMesFiltro}
                    />

                    <StatusDistribution
                        status={computedData.status}
                        statusFiltro={statusFiltro}
                        setStatusFiltro={setStatusFiltro}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CrVolumeChart
                        crs={computedData.crs}
                        maxCRValor={maxCRValor}
                        crFiltro={crFiltro}
                        setCrFiltro={setCrFiltro}
                    />

                    <TopProducts
                        categorias={computedData.categorias}
                    />
                </div>
            </div>
        </div>
    );
}
