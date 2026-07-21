"use client"

import AdminSummaryCard from "./AdminSummaryCard"
import Header from "../../home/HomeHeader"
import AdminUserResume from "./AdminUserResume"
import AdmFooter from "./AdminFooter"
import { useEffect, useMemo, useState } from "react";
import { getAllUsers } from "@/service/users/usersSearch"
import { useAuditLogs } from "@/hooks/useAuditLogs"
import { TriangleAlert } from "lucide-react"

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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-green-600 dark:text-[#5FD68A] lucide lucide-calendar-icon lucide-calendar" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
    </svg>
)

const AttemptsLogIn = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-orange-500 dark:text-[#F0B95B] lucide lucide-log-in-icon lucide-log-in" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10 17 5-5-5-5"/>
        <path d="M15 12H3"/>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    </svg>
)

function returnStatsUsers(users, deletedUserIds){

    const visibleUsers = useMemo(() => {
        return users.filter((user) => !deletedUserIds.includes(String(user.id)));
    }, [users, deletedUserIds]);

    const totalUsers = visibleUsers.length;
    const activeUsers = visibleUsers.filter((u) => u.active).length;
    const inactiveUsers = visibleUsers.filter((u) => !u.active).length;

    const userItems = [
        {
            icon: <TotalUsersIcon />,
            label: "Total de Usuarios",
            count: totalUsers,
        },
        {
            icon: <InactiveUsersIcon />,
            label: "Usuarios Inativos",
            count: inactiveUsers,
        },
        {
            icon: <ActiveUsersIcon />,
            label: "Usuarios Ativos",
            count: activeUsers,
        },
    ]

    return userItems;
}

function returnStatsLogs(logs){

    const today = new Date().toLocaleDateString("pt-BR");

    const recordItems = [
        {
            icon: <TriangleAlert size={28} strokeWidth={2} className="text-[#c00202] dark:text-red-400" />,
            label: "Alertas",
            count: logs.filter((log) => /DESATI|EXCLU|REMOV|ATUALI/.test(log.actionId.toUpperCase())).length
        },
        {
            icon: <ActionsIcon />,
            label: "Ações de Hoje",
            count: logs.filter( (log) => log.date === today || log.timestamp?.startsWith(today)).length,
        },
        {
            icon: <AttemptsLogIn />,
            label: "Tentativas de Login",
            count: logs.filter( (log) => log.actionId?.toUpperCase().includes("LOGAR")).length
        }
    ]



    return recordItems;
}

export default function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [deletedUserIds, setDeletedUserIds] = useState([]);
    const [loading, setLoading] = useState(true);

    const { logs, error } = useAuditLogs();

    async function loadUsers() {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.content ?? []);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const deleted = JSON.parse(localStorage.getItem("deleted_users") || "[]");
            setDeletedUserIds(deleted.map(String));
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, []);

    const userItems = returnStatsUsers(users, deletedUserIds);
    const recordItems = returnStatsLogs(logs);

    return (
        <div className="flex flex-1 flex-col gap-8 lg:gap-0">
            <Header />
            <section className="flex flex-col lg:flex-row gap-6 min-[1350px]:gap-10 lg:my-auto">
                <AdminSummaryCard
                    title="Resumo registros"
                    items={recordItems}
                    variant="records"
                />
                <AdminUserResume
                    items={userItems}
                />
            </section>
            <AdmFooter />
        </div>
    )
}