"use client"
import { useState } from "react"
import Image from "next/image"

// ───── Dados mock da tabela ─────
const mockLogs = [
    { id: 1234, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Docente", levelColor: "#3B6FCC", levelBg: "#EBF0F9", type: "Login", affected: "—", solicitation: "—", timestamp: "04/05/2026\n16:55" },
    { id: 1234, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Coordenador", levelColor: "#D97706", levelBg: "#FEF3C7", type: "Criou\nUsuário", affected: "andrey.lombardo\n@edu.sc.senai.br", solicitation: "—", timestamp: "04/05/2026\n16:55" },
    { id: 1234, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Docente", levelColor: "#3B6FCC", levelBg: "#EBF0F9", type: "Editou perfil", affected: "andrey.lombardo\n@edu.sc.senai.br", solicitation: "—", timestamp: "04/05/2026\n16:55" },
    { id: 1234, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Supervisor", levelColor: "#16A34A", levelBg: "#DCFCE7", type: "Login", affected: "—", solicitation: "—", timestamp: "04/05/2026\n16:55" },
    { id: 1234, user: "andrey.lombardo\n@edu.sc.senai.br", level: "Supervisor", levelColor: "#16A34A", levelBg: "#DCFCE7", type: "Login", affected: "—", solicitation: "—", timestamp: "04/05/2026\n16:55" },
    { id: 1234, user: "andrey.lombardo\n@edu.sc.senai.br", level: "ADM", levelColor: "#DC2626", levelBg: "#FEE2E2", type: "Deletou\nsolicitação", affected: "—", solicitation: "ABC-123", timestamp: "04/05/2026\n16:55" },
]

// ───── Ícones dos cards ─────
const IconTotalRegistros = () => (
    <div className="w-14 h-14 rounded-xl bg-[#EBF0F9] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15" stroke="#103D85" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="9" y="3" width="6" height="4" rx="1" stroke="#103D85" strokeWidth="1.5" />
            <path d="M9 12H15" stroke="#103D85" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 16H13" stroke="#103D85" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    </div>
)

const IconAcoesHoje = () => (
    <div className="w-14 h-14 rounded-xl bg-[#DCFCE7] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="17" rx="2" stroke="#16A34A" strokeWidth="1.5" />
            <path d="M16 2V6M8 2V6" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 10H21" stroke="#16A34A" strokeWidth="1.5" />
            <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#16A34A" />
        </svg>
    </div>
)

const IconTentativasLogin = () => (
    <div className="w-14 h-14 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7" r="3.5" stroke="#D97706" strokeWidth="1.5" />
            <path d="M2 20V17.5C2 15.57 3.57 14 5.5 14H12.5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="17" r="4" stroke="#D97706" strokeWidth="1.5" />
            <path d="M18 15V17.5L19.5 19" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
)

const IconAlertasCriticos = () => (
    <div className="w-14 h-14 rounded-xl bg-[#FEE2E2] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7V12C3 17.25 6.75 22.04 12 23C17.25 22.04 21 17.25 21 12V7L12 2Z"
                fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="12" y1="8" x2="12" y2="14" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1.2" fill="#DC2626" />
        </svg>
    </div>
)

// ───── Componente de Card de Resumo ─────
function SummaryStatCard({ icon, label, value, borderColor }) {
    return (
        <div className="relative flex items-center gap-4 flex-1 rounded-xl border border-gray-200 shadow-sm px-5 py-5 overflow-hidden bg-white">
            <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                style={{ backgroundColor: borderColor }}
            />
            {icon}
            <div>
                <p className="text-[13px] text-gray-400 leading-tight">{label}</p>
                <p className="text-[32px] font-bold text-gray-800 leading-tight">{value}</p>
            </div>
        </div>
    )
}

// ───── Badge de nível ─────
function LevelBadge({ level, color, bg }) {
    return (
        <span
            className="inline-block px-3 py-1 rounded-full text-[12px] font-bold whitespace-nowrap"
            style={{ color: color, backgroundColor: bg }}
        >
            {level}
        </span>
    )
}

// ───── Ícone de ordenação ─────
const SortIcon = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="inline ml-1 opacity-40">
        <path d="M5 1L8 4H2L5 1Z" fill="currentColor" />
        <path d="M5 9L2 6H8L5 9Z" fill="currentColor" />
    </svg>
)

export default function AuditoriaPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [tipoAcao, setTipoAcao] = useState("")
    const [periodo, setPeriodo] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const totalLogs = 20
    const logsPerPage = 6
    const totalPages = Math.ceil(totalLogs / logsPerPage)

    return (
        <div className="flex flex-1 flex-col pb-4 gap-6">

            {/* Header */}
            <div className="flex w-full mt-4 gap-6 items-center">
                <Image
                    src="/images/logos/sgs-blue.png"
                    alt="Logo SGS"
                    width={115}
                    height={50}
                />
                <h1 className="text-[24px] font-semibold text-[#103D85]">
                    Sistema de Gestão de Solicitações
                </h1>
            </div>

            {/* Título da seção */}
            <div>
                <h2 className="text-[28px] font-bold text-[#103D85]">Auditoria</h2>
                <p className="text-[14px] text-gray-500">
                    Monitore e acompanhe as ações realizadas no sistema
                </p>
            </div>

            {/* Cards de resumo */}
            <div className="flex gap-5">
                <SummaryStatCard
                    icon={<IconTotalRegistros />}
                    label="Total de Registros"
                    value="1.980"
                    borderColor="#103D85"
                />
                <SummaryStatCard
                    icon={<IconAcoesHoje />}
                    label="Ações de Hoje"
                    value="98"
                    borderColor="#16A34A"
                />
                <SummaryStatCard
                    icon={<IconTentativasLogin />}
                    label="Tentativas de Login"
                    value="23"
                    borderColor="#D97706"
                />
                <SummaryStatCard
                    icon={<IconAlertasCriticos />}
                    label="Alertas Críticos"
                    value="5"
                    borderColor="#DC2626"
                />
            </div>

            {/* Tabela com filtros */}
            <div className="flex-1 bg-white border border-gray-300 rounded-[14px] shadow-sm overflow-hidden flex flex-col">

                {/* Barra de filtros */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
                    {/* Busca */}
                    <div className="relative flex-1 max-w-[280px]">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#888" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar por usuário..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-[13px] text-gray-600 bg-white outline-none focus:border-[#103D85] transition-colors"
                        />
                    </div>

                    {/* Tipo de ação */}
                    <div className="relative">
                        <select
                            value={tipoAcao}
                            onChange={(e) => setTipoAcao(e.target.value)}
                            className="appearance-none border border-gray-300 rounded-lg pl-4 pr-9 py-2 text-[13px] text-gray-500 bg-white outline-none focus:border-[#103D85] min-w-[140px] transition-colors"
                        >
                            <option value="">Tipo de ação</option>
                            <option value="login">Login</option>
                            <option value="criou_usuario">Criou Usuário</option>
                            <option value="editou_perfil">Editou Perfil</option>
                            <option value="deletou_solicitacao">Deletou Solicitação</option>
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M7 10L12 15L17 10" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Período */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Período"
                            value={periodo}
                            onChange={(e) => setPeriodo(e.target.value)}
                            className="border border-gray-300 rounded-lg pl-4 pr-9 py-2 text-[13px] text-gray-500 bg-white outline-none focus:border-[#103D85] min-w-[130px] transition-colors"
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#888" strokeWidth="1.5" />
                            <path d="M16 2V6M8 2V6M3 10H21" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Exportar */}
                    <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-5 py-2 text-[13px] font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors active:scale-[0.98]">
                        Exportar
                    </button>
                </div>

                {/* Cabeçalho da tabela */}
                <div className="grid grid-cols-[60px_1fr_110px_100px_1fr_110px_110px] gap-2 px-6 py-3 border-b border-gray-200 bg-gray-50/50 text-[13px] font-semibold text-gray-500">
                    <span>ID <SortIcon /></span>
                    <span>Usuário <SortIcon /></span>
                    <span>Nível <SortIcon /></span>
                    <span>Tipo <SortIcon /></span>
                    <span>Usuário Afetado</span>
                    <span>Solicitação</span>
                    <span>Timestamp <SortIcon /></span>
                </div>

                {/* Linhas da tabela */}
                <div className="flex flex-col flex-1 overflow-y-auto">
                    {mockLogs.map((log, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-[60px_1fr_110px_100px_1fr_110px_110px] gap-2 px-6 py-3 items-center text-[13px] border-b border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                                }`}
                        >
                            <span className="text-gray-700 font-medium">{log.id}</span>
                            <span className="text-gray-600 whitespace-pre-line leading-tight">{log.user}</span>
                            <span>
                                <LevelBadge level={log.level} color={log.levelColor} bg={log.levelBg} />
                            </span>
                            <span className="text-gray-600 whitespace-pre-line leading-tight">{log.type}</span>
                            <span className="text-gray-500 whitespace-pre-line leading-tight">{log.affected}</span>
                            <span className="text-gray-500">{log.solicitation}</span>
                            <span className="text-gray-400 whitespace-pre-line leading-tight">{log.timestamp}</span>
                        </div>
                    ))}
                </div>

                {/* Paginação */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
                    <p className="text-[12px] text-gray-400 mr-auto">
                        Mostrando 1 a {mockLogs.length} de {totalLogs} logs
                    </p>
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 text-[12px] transition-colors"
                    >
                        «
                    </button>
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 text-[12px] transition-colors"
                    >
                        ‹
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-semibold transition-colors ${currentPage === page
                                    ? "bg-[#103D85] text-white"
                                    : "border border-gray-300 text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 text-[12px] transition-colors"
                    >
                        ›
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 text-[12px] transition-colors"
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    )
}
