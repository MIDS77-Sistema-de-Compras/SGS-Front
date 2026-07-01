import { ChevronsUpDown, Pencil } from "lucide-react";
import Link from "next/link";

export default function UserTable({ users }) {
    return (
        <div className="flex-1 flex flex-col min-h-0 w-full bg-white">

            <div className="w-full bg-[#F8FAFC] shadow-[0_1px_0_0_rgba(243,244,246,1)] z-10 pr-6">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="text-sm font-semibold text-gray-700">
                            <th className="py-3 px-4 font-medium w-[25%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                                    Nome <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-medium w-[25%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                                    E-mail <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-medium w-[15%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                                    Nível <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-medium w-[12%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                                    Status <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-medium w-[15%]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                                    Último Acesso <ChevronsUpDown size={14} className="text-gray-400" />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-medium w-[8%] text-center">Ações</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="flex-1 flex flex-col min-h-0 w-full pr-2 pb-2">
                <div className="flex-1 overflow-y-auto min-h-0 w-full">
                    <table className="w-full text-left border-collapse table-fixed">
                        <tbody className="text-sm bg-white">
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-2.5 px-4 w-[25%]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 shrink-0 rounded-full bg-[#103D85] text-white flex items-center justify-center text-xs font-bold">
                                                {user.initials}
                                            </div>
                                            <span className="font-medium text-gray-800 truncate">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-4 w-[25%] text-gray-500 truncate">{user.email}</td>
                                    <td className="py-2.5 px-4 w-[15%]">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${user.level === "Docente" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-600"}`}>
                                            {user.level}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-4 w-[12%]">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${user.status === "Ativo" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                                            <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${user.status === "Ativo" ? "bg-green-500" : "bg-red-500"}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-4 w-[15%] text-gray-500 truncate">{user.lastAccess}</td>
                                    <td className="py-2.5 px-4 w-[8%]">
                                        <div className="flex justify-center">
                                            <Link href={`/usuarios/editar/${user.id}`}>
                                                <button className="text-[#103D85] hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors">
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

        </div>
    );
}