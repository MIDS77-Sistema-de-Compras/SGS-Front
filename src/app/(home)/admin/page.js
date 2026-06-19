import Image from "next/image"
import Link from "next/link"

function ItemCard({ icon, label, count, lineColor, className = "", isLarge = false }) {
    if (isLarge) {
        return (
            <div className={`relative flex flex-col items-center justify-center rounded-2xl border border-gray-200 shadow-md px-6 py-6 overflow-hidden bg-white ${className}`}>
                <div
                    className="absolute top-0 left-0 right-0 h-[5px]"
                    style={{ backgroundColor: lineColor }}
                />
                <p
                    className="text-[20px] font-bold tracking-wider text-center leading-tight uppercase mb-4"
                    style={{ color: lineColor }}
                >
                    {label}
                </p>
                <div className="flex items-center gap-7">
                    <div className="flex-shrink-0">
                        {icon}
                    </div>
                    <p className="text-[64px] font-extrabold text-black leading-none">{count}</p>
                </div>
            </div>
        )
    }
    return (
        <div className={`relative flex items-center gap-5 rounded-xl border border-gray-200 shadow-sm px-5 py-6 overflow-hidden bg-white ${className}`}>
            <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                style={{ backgroundColor: lineColor }}
            />
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div className="mt-1">
                <p className="text-[14px] text-gray-400 leading-tight">{label}</p>
                <p className="text-[34px] font-bold text-gray-800 leading-tight">{count}</p>
            </div>
        </div>
    )
}

function AlertCard({ count }) {
    return (
        <div className="relative flex flex-col items-center justify-center rounded-2xl border border-red-200 shadow-md px-6 py-6 overflow-hidden bg-white row-span-2">
            <div className="absolute top-0 left-0 right-0 h-[5px] bg-red-500" />
            <p className="text-[20px] font-bold text-red-600 tracking-wider text-center leading-tight uppercase mb-4">
                Alertas Críticos
            </p>
            <div className="flex items-center gap-7">
                <div className="w-[110px] h-[110px] rounded-2xl bg-[#FFF5F5] border border-[#FEE2E2] flex items-center justify-center">
                    <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
                        <path d="M24 4L6 14V24C6 34.5 13.5 44.08 24 46C34.5 44.08 42 34.5 42 24V14L24 4Z"
                            fill="#FEE2E2" stroke="#DC2626" strokeWidth="3" strokeLinejoin="round" />
                        <line x1="24" y1="16" x2="24" y2="28" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
                        <circle cx="24" cy="35" r="2.5" fill="#DC2626" />
                    </svg>
                </div>
                <p className="text-[64px] font-extrabold text-black leading-none">{count}</p>
            </div>
        </div>
    )
}

const IconTotalUsers = () => (
    <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7" r="3.5" stroke="#3B6FCC" strokeWidth="1.5" />
            <path d="M2 20V17.5C2 15.57 3.57 14 5.5 14H12.5C14.43 14 16 15.57 16 17.5V20"
                stroke="#3B6FCC" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="8" r="2.5" stroke="#3B6FCC" strokeWidth="1.5" />
            <path d="M18 13.5C19.93 13.5 21.5 15.07 21.5 17V20"
                stroke="#3B6FCC" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    </div>
)

const IconInactiveUsers = ({ isLarge = false }) => {
    if (isLarge) {
        return (
            <div className="w-[110px] h-[110px] rounded-2xl bg-[#FFF8E7] flex items-center justify-center">
                <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
                    <circle cx="20" cy="16" r="6.5" stroke="#F59E0B" strokeWidth="3" />
                    <path d="M8 38V33.5C8 29.5 11.2 26 15.5 26H24.5C28.8 26 32 29.5 32 33.5V38" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                    <path d="M35 30L43 38M43 30L35 38" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
            </div>
        )
    }
    return (
        <div className="w-16 h-16 rounded-lg bg-yellow-100 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="7" r="3.5" stroke="#D97706" strokeWidth="1.5" />
                <path d="M5 20V17.5C5 15.57 6.57 14 8.5 14H15.5C17.43 14 19 15.57 19 17.5V20"
                    stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M17.5 2.5L21.5 6.5M21.5 2.5L17.5 6.5"
                    stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
    )
}

const IconActiveUsers = () => (
    <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="7" r="3.5" stroke="#16A34A" strokeWidth="1.5" />
            <path d="M5 20V17.5C5 15.57 6.57 14 8.5 14H15.5C17.43 14 19 15.57 19 17.5V20"
                stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 3L19 5.5L23 1"
                stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
)

const IconActions = () => (
    <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="17" rx="2" stroke="#16A34A" strokeWidth="1.5" />
            <path d="M16 2V6M8 2V6" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 10H21" stroke="#16A34A" strokeWidth="1.5" />
            <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#16A34A" />
        </svg>
    </div>
)

const IconLogin = () => (
    <div className="w-16 h-16 rounded-lg bg-yellow-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7" r="3.5" stroke="#D97706" strokeWidth="1.5" />
            <path d="M2 20V17.5C2 15.57 3.57 14 5.5 14H12.5"
                stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="17" r="4" stroke="#D97706" strokeWidth="1.5" />
            <path d="M18 15V17.5L19.5 19" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
)

export default function AdminPage() {
    return (
        <div className="flex flex-1 flex-col">

            <header className="flex items-center">
                <Image
                    src="/images/logos/sgs-blue.png"
                    alt="Logo SGS"
                    width={230}
                    height={100}
                    priority
                />
                <h1 className="text-[26px] font-semibold text-[#103D85] ml-10 leading-snug">
                    Sistema de <br /> Gestão de <br /> Solicitações
                </h1>
                <p className="ml-20 text-[13px] text-gray-600 leading-relaxed max-w-xs">
                    Plataforma de controle de aquisições do SENAI. Registre e
                    acompanhe suas solicitações de compra de forma simples e
                    transparente.
                </p>
            </header>

            <section className="flex gap-10 mt-10">

                <div className="flex-1 border border-[#AAAAAA] rounded-xl p-5 shadow-lg bg-white">
                    <h2 className="text-[#103D85] font-bold text-[20px] mb-4">
                        Resumo usuários
                    </h2>

                    <div className="grid grid-cols-2 grid-rows-2 gap-3 min-h-[220px]">
                        <ItemCard
                            icon={<IconTotalUsers />}
                            label="Total de Usuários"
                            count="20"
                            lineColor="#3B6FCC"
                        />
                        <ItemCard
                            icon={<IconInactiveUsers isLarge={true} />}
                            label="Usuários Inativos"
                            count="20"
                            lineColor="#D97706"
                            className="row-span-2"
                            isLarge={true}
                        />
                        <ItemCard
                            icon={<IconActiveUsers />}
                            label="Usuários Ativos"
                            count="20"
                            lineColor="#16A34A"
                        />
                    </div>
                </div>

                <div className="flex-1 border border-[#AAAAAA] rounded-xl p-5 shadow-lg bg-white">
                    <h2 className="text-[#103D85] font-bold text-[20px] mb-4">
                        Resumo registros
                    </h2>

                    <div className="grid grid-cols-2 grid-rows-2 gap-3 min-h-[220px]">
                        <ItemCard
                            icon={<IconActions />}
                            label="Ações de Hoje"
                            count="20"
                            lineColor="#16A34A"
                        />
                        <AlertCard count={5} />
                        <ItemCard
                            icon={<IconLogin />}
                            label="Tentativas de Login"
                            count="20"
                            lineColor="#D97706"
                        />
                    </div>
                </div>

            </section>

            <footer className="flex gap-10 mt-auto">
                <Link
                    href="/usuarios"
                    className="flex flex-1 rounded-xl bg-[#103D85] py-4 gap-3 items-center justify-center shadow-lg transition-all active:scale-[0.98] hover:bg-[#3366cc]"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="7" r="3.5" stroke="white" strokeWidth="1.5" />
                        <path d="M2 20V17.5C2 15.57 3.57 14 5.5 14H12.5C14.43 14 16 15.57 16 17.5V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="18" cy="8" r="2.5" stroke="white" strokeWidth="1.5" />
                        <path d="M18 13.5C19.93 13.5 21.5 15.07 21.5 17V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="text-white font-bold">Gerenciar Usuários</p>
                </Link>

                <Link
                    href="/usuarios/cadastro"
                    className="flex flex-1 rounded-xl border border-[#AAAAAA] py-4 gap-3 justify-center items-center shadow-lg transition-all active:scale-[0.98] hover:bg-gray-100 bg-white"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                        <rect x="9" y="3" width="6" height="4" rx="1" stroke="#333" strokeWidth="1.5" />
                        <path d="M9 12H15" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M9 16H13" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="font-bold text-gray-800">Análise de Registros</p>
                </Link>
            </footer>

        </div>
    )
}
