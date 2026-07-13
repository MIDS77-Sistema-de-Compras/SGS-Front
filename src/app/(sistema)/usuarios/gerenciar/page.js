"use client";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Users, UserCheck, UserMinus, Shield, Search, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/button/Button";
import StatCard from "@/components/features/gerenciar-users/StatCard";
import UserTable from "@/components/features/gerenciar-users/UserTable";
import Dropdown from "@/components/ui/select/Dropdown";
import UserTableSkeleton from "@/components/features/gerenciar-users/UserTableSkeleton";
import { getAllUsers } from "@/service/users/usersSearch";

export default function GerenciarUsuarios() {
    useDocumentTitle("Gerenciar Usuários");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
    try {
        setLoading(true);
        const response = await getAllUsers();
        setUsers(response.content);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    } finally {
        setLoading(false);
    }

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "Todos"
                    ? true
                    : statusFilter === "Ativos"
                    ? user.active
                    : !user.active;

            return matchesSearch && matchesStatus;
        });
    }, [users, searchTerm, statusFilter]);

    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.active).length;
    const inactiveUsers = users.filter((u) => !u.active).length;
    const totalProfiles = new Set(users.map((u) => u.roleName).filter(Boolean)).size;

    return (
        <div className="flex flex-1 flex-col w-full h-full">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-[#103D85] dark:text-[#E2E2EA] mb-1">
                    Gerenciar usuários
                </h1>
                <p className="text-gray-500 dark:text-[#C3C6D3] text-sm">
                    Cadastre, edite e gerencie os usuários que possuem acesso ao sistema.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <StatCard
                    title="Total de Usuários"
                    value={totalUsers}
                    icon={Users}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatCard
                    title="Usuários Ativos"
                    value={activeUsers}
                    icon={UserCheck}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />
                <StatCard
                    title="Usuários Inativos"
                    value={inactiveUsers}
                    icon={UserMinus}
                    iconBg="bg-orange-100"
                    iconColor="text-orange-500"
                />
                <StatCard
                    title="Níveis de Acesso"
                    value={totalProfiles}
                    icon={Shield}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                />
            </div>

            <div className="flex flex-1 flex-col min-h-0 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 mb-4 overflow-hidden bg-white dark:bg-[#1A2233]">
                
                <div className="p-4 border-b border-gray-100 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    
                    <div className="flex w-full sm:w-auto items-center gap-4">
                        <div className="relative w-full sm:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar pelo Nome, E-mail..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:placeholder:text-[#C3C6D3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85] dark:focus:border-[#1A4A9E]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <Dropdown
                            className="w-36"
                            value={statusFilter}
                            onChange={setStatusFilter}
                            options={["Todos", "Ativos", "Inativos"]}
                        />
                    </div>

                    <div className="flex w-full sm:w-auto items-center gap-3">
                        <Button
                            variant="outline"
                            className="bg-[#E6F0FF] dark:bg-[#303746] text-[#103D85] dark:text-[#E2E2EA] border-transparent hover:bg-[#D4E5FF] dark:hover:bg-white/5"
                        >
                            Exportar
                        </Button>
                        <Link href="/usuarios/criar">
                            <Button
                                variant="primary"
                                leftIcon={<Plus size={18} />}
                            >
                                Cadastrar Usuário
                            </Button>
                        </Link>
                    </div>
                </div>
                
                {loading ? (
                    <UserTableSkeleton />
                ) : (
                    <UserTable users={filteredUsers} />
                )}
            </div>
        </div>
    );
}