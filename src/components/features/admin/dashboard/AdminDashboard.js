import Image from "next/image"
import AdminSummaryCard from "./AdminSummaryCard"
import AdminFooter from "./AdminFooter"

const TotalUsersIcon = () => (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#EBF0F9"/>
        <circle cx="9" cy="8" r="2.5" stroke="#103D85" strokeWidth="1.3"/>
        <path d="M5 18V16.5C5 14.84 6.34 13.5 8 13.5H10C11.66 13.5 13 14.84 13 16.5V18" stroke="#103D85" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="16" cy="9" r="2" stroke="#103D85" strokeWidth="1.3"/>
        <path d="M15 14C16.1 14 17.5 14.9 17.5 16V18" stroke="#103D85" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
)

const InactiveUsersIcon = ({ isLarge = false }) => {
    if (isLarge) {
        return (
            <div className="w-14 h-14 rounded-lg bg-[#FFF8E7] flex items-center justify-center">
                <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
                    <circle cx="20" cy="16" r="6.5" stroke="#F59E0B" strokeWidth="3" />
                    <path d="M8 38V33.5C8 29.5 11.2 26 15.5 26H24.5C28.8 26 32 29.5 32 33.5V38" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                    <path d="M35 30L43 38M43 30L35 38" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
            </div>
        )
    }
    return (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#FEF3C7"/>
            <circle cx="12" cy="8" r="3" stroke="#D97706" strokeWidth="1.3"/>
            <path d="M6 19V17C6 15.34 7.34 14 9 14H15C16.66 14 18 15.34 18 17V19" stroke="#D97706" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M16 4L20 8" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M20 4L16 8" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )
}

const ActiveUsersIcon = () => (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#DCFCE7"/>
        <circle cx="12" cy="8" r="3" stroke="#16A34A" strokeWidth="1.3"/>
        <path d="M6 19V17C6 15.34 7.34 14 9 14H15C16.66 14 18 15.34 18 17V19" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M15 5L17 7L21 3" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const ActionsIcon = () => (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#DCFCE7"/>
        <rect x="5" y="5" width="14" height="14" rx="2" stroke="#16A34A" strokeWidth="1.3"/>
        <path d="M16 3V7" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M8 3V7" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M5 10H19" stroke="#16A34A" strokeWidth="1.3"/>
        <rect x="8" y="13" width="3" height="3" rx="0.5" fill="#16A34A"/>
    </svg>
)

const LoginAttemptsIcon = () => (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#EBF0F9"/>
        <circle cx="12" cy="12" r="5" stroke="#103D85" strokeWidth="1.3"/>
        <path d="M12 9V12L14.5 14.5" stroke="#103D85" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 4V6" stroke="#103D85" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M12 18V20" stroke="#103D85" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M4 12H6" stroke="#103D85" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M18 12H20" stroke="#103D85" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
)

const userItems = [
    {
        icon: <TotalUsersIcon />,
        label: "Total de Usuarios",
        count: "20",
        barColor: "#103D85",
    },
    {
        icon: <InactiveUsersIcon isLarge={true} />,
        label: "Usuarios Inativos",
        count: "20",
        barColor: "#D97706",
        isLarge: true,
        className: "row-span-2",
    },
    {
        icon: <ActiveUsersIcon />,
        label: "Usuarios Ativos",
        count: "20",
        barColor: "#16A34A",
    },
]

const recordItems = [
    {
        icon: <ActionsIcon />,
        label: "Usuarios de Hoje",
        count: "20",
        barColor: "#16A34A",
    },
    {
        icon: <LoginAttemptsIcon />,
        label: "Tentativas de Login",
        count: "20",
        barColor: "#103D85",
    },
]

export default function AdminDashboard() {
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
                <h1 className="text-[26px] font-semibold text-[#103D85] ml-10 leading-tight">
                    Sistema de <br /> Gestão de <br /> Solicitações
                </h1>
                <p className="ml-auto text-[14px] text-gray-600 max-w-sm leading-relaxed">
                    Plataforma de controle de aquisições do SENAI. Registre e
                    acompanhe suas solicitações de compra de forma simples e
                    transparente.
                </p>
            </header>

            <section className="flex gap-10 mt-10">
                <AdminSummaryCard
                    title="Resumo usuarios"
                    items={userItems}
                    variant="users"
                />
                <AdminSummaryCard
                    title="Resumo registros"
                    items={recordItems}
                    alertCount={5}
                    variant="records"
                />
            </section>

            <AdminFooter />
        </div>
    )
}
