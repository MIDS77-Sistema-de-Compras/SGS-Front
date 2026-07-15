import { ChevronsUpDown, Pencil, LogIn } from "lucide-react";
import Link from "next/link";

export default function UserTable({ users, onImpersonate }) {
    const canImpersonate = (user) =>
        Boolean(onImpersonate) && user.active && user.roleName !== "ADMIN";

    const formatProfile = (profile) => {
        if (!profile) return "-";

        return profile
            .toLowerCase()
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const getInitials = (name) => {
        if (!name) return "";

        return name
            .split(" ")
            .filter(Boolean)
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("pt-BR");
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 w-full bg-white dark:bg-[#1A2233]">
            <div className="w-full bg-[#F8FAFC] dark:bg-[#303746] shadow-[0_1px_0_0_rgba(243,244,246,1)] dark:shadow-[0_1px_0_0_#303746] z-10 pr-6">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="text-sm font-semibold text-gray-700 dark:text-[#E2E2EA]">
                            <th className="py-3 px-4 font-medium w-[25%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85] dark:hover:text-[#5D8EF7]">
                                    Nome <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>

                            <th className="py-3 px-4 font-medium w-[25%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85] dark:hover:text-[#5D8EF7]">
                                    E-mail <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>

                            <th className="py-3 px-4 font-medium w-[15%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85] dark:hover:text-[#5D8EF7]">
                                    Nível <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>

                            <th className="py-3 px-4 font-medium w-[12%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85] dark:hover:text-[#5D8EF7]">
                                    Status <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>

                            <th className="py-3 px-4 font-medium w-[15%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85] dark:hover:text-[#5D8EF7]">
                                    Último Acesso <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-medium w-[8%] text-center dark:text-[#E2E2EA]">Ações</th>
                        </tr>
                    </thead>
                </table>
            </div>
            
            <div className="flex-1 flex flex-col min-h-0 w-full pr-2 pb-2">
                <div className="flex-1 overflow-y-auto min-h-0 w-full">
                    <table className="w-full text-left border-collapse table-fixed">
                        <tbody className="text-sm bg-white dark:bg-[#1A2233]">
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                    <td className="py-2.5 px-4 w-[25%]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 shrink-0 rounded-full bg-[#103D85] text-white flex items-center justify-center text-xs font-bold">
                                                {getInitials(user.name)}
                                            </div>
                                            <span className="font-medium text-gray-800 dark:text-[#E2E2EA] truncate">{user.name}</span>
                                        </div>
                                    </td>
                                    
                                    <td className="py-2.5 px-4 w-[25%] text-gray-500 dark:text-[#C3C6D3] truncate">{user.email}</td>
                                    
                                    <td className="py-2.5 px-4 w-[15%]">
                                        <span 
                                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap 
                                                ${user.level === "DOCENTE" 
                                                    ? "bg-green-50 dark:bg-green-500/15 text-green-700 dark:text-green-300" 
                                                    : "bg-orange-50 dark:bg-orange-500/15 text-orange-600 dark:text-orange-300"
                                                }`}
                                        >
                                            {formatProfile(user.roleName)}
                                        </span>
                                    </td>

                                    <td className="py-2.5 px-4 w-[12%]">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
                                                ${user.active
                                                    ? "bg-green-50 dark:bg-green-500/15 text-green-700 dark:text-green-300"
                                                    : "bg-red-50 dark:bg-red-500/15 text-red-700 dark:text-red-300"
                                                }`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full
                                                    ${user.active
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                    }`}
                                            />
                                            {user.active ? "Ativo" : "Inativo"}
                                        </span>
                                    </td>

                                    <td className="py-2.5 px-4 w-[15%] text-gray-500 dark:text-[#C3C6D3] truncate">
                                        {formatDate(user.updatedAt)}
                                    </td>

                                    <td className="py-2.5 px-4 w-[8%]">
                                        <div className="flex justify-center">
                                            <div className={`grid items-center gap-1 ${onImpersonate ? "grid-cols-[30px_30px]" : "grid-cols-[30px]"}`}>
                                                <Link href={`/usuarios/editar/${user.id}`}>
                                                    <button
                                                        title="Editar usuário"
                                                        className="text-[#103D85] dark:text-[#5D8EF7] hover:text-blue-800 dark:hover:text-[#7BA5F9] p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                </Link>

                                                {canImpersonate(user) && (
                                                    <button
                                                        title="Entrar como este usuário"
                                                        onClick={() => onImpersonate(user)}
                                                        className="text-[#103D85] dark:text-[#5D8EF7] hover:text-blue-800 dark:hover:text-[#7BA5F9] p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors"
                                                    >
                                                        <LogIn size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}