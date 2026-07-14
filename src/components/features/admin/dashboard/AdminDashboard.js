import AdminSummaryCard from "./AdminSummaryCard"
import Header from "../../home/HomeHeader"
import AdminUserResume from "./AdminUserResume"
import HomeFooter from "../../home/HomeFooter"

const TotalUsersIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#103D85] dark:text-[#5D8EF7]">
        <rect width="20" height="20" rx="6" />
        <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 18V16.5C5 14.84 6.34 13.5 8 13.5H10C11.66 13.5 13 14.84 13 16.5V18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M15 14C16.1 14 17.5 14.9 17.5 16V18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
)

const InactiveUsersIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#D97706] dark:text-orange-300">
        <rect width="20" height="20" rx="6" />
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 19V17C6 15.34 7.34 14 9 14H15C16.66 14 18 15.34 18 17V19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M16 4L20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 4L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

const ActiveUsersIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#16A34A] dark:text-green-300">
        <rect width="20" height="20" rx="6" />
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 19V17C6 15.34 7.34 14 9 14H15C16.66 14 18 15.34 18 17V19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M15 5L17 7L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const ActionsIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#16A34A] dark:text-green-300">
        <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M16 3V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M8 3V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M5 10H19" stroke="currentColor" strokeWidth="1.3" />
        <rect x="8" y="13" width="3" height="3" rx="0.5" fill="currentColor" />
    </svg>
)

const LoginAttemptsIcon = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#103D85] dark:text-[#5D8EF7]">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M12 9V12L14.5 14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M12 18V20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M4 12H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M18 12H20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
)

const userItems = [
    {
        icon: <TotalUsersIcon />,
        label: "Total de Usuarios",
        count: "20",
    },
    {
        icon: <InactiveUsersIcon />,
        label: "Usuarios Inativos",
        count: "20",
    },
    {
        icon: <ActiveUsersIcon />,
        label: "Usuarios Ativos",
        count: "20",
    },
]

const recordItems = [
    {
        icon: <ActionsIcon />,
        label: "Usuarios de Hoje",
        count: "20",
    },
    {
        icon: <LoginAttemptsIcon />,
        label: "Tentativas de Login",
        count: "20",
    },
]

export default function AdminDashboard() {
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <section className="flex gap-10 my-auto">
                <AdminSummaryCard
                    title="Resumo registros"
                    items={recordItems}
                    alertCount={5}
                    variant="records"
                />
                <AdminUserResume
                    items={userItems}
                />
            </section>
            <HomeFooter />
        </div>
    )
}