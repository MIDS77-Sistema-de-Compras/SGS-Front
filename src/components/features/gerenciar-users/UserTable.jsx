import { ChevronsUpDown, Pencil } from "lucide-react";
import Link from "next/link";

export default function UserTable({ users }) {
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
            <div className="w-full overflow-x-auto flex-1 min-h-0 pr-2 pb-2">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="text-sm font-semibold text-gray-700 dark:text-[#E2E2EA] bg-[#F8FAFC] dark:bg-[#303746] border-b border-gray-100 dark:border-white/10">
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
                    <tbody className="text-sm bg-white dark:bg-[#1A2233]">
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                <td className="py-2.5 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 shrink-0 rounded-full bg-[#103D85] text-white flex items-center justify-center text-xs font-bold">
                                            {getInitials(user.name)}
                                        </div>
                                        <span className="font-medium text-gray-800 dark:text-[#E2E2EA] truncate max-w-[180px]">{user.name}</span>
                                    </div>
                                </td>
                                
                                <td className="py-2.5 px-4 text-gray-500 dark:text-[#C3C6D3] truncate max-w-[180px]">{user.email}</td>
                                
                                <td className="py-2.5 px-4">
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

                                <td className="py-2.5 px-4">
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

                                <td className="py-2.5 px-4 text-gray-500 dark:text-[#C3C6D3] truncate">
                                    {formatDate(user.updatedAt)}
                                </td>

                                <td className="py-2.5 px-4">
                                    <div className="flex justify-center">
                                        <Link href={`/usuarios/editar/${user.id}`}>
                                            <button className="text-[#103D85] dark:text-[#5D8EF7] hover:text-blue-800 dark:hover:text-[#7BA5F9] p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-white/5 transition-colors">
                                                <Pencil size={18} />
                                            </button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}