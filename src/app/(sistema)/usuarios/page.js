"use client";

import {
  Users,
  UserCheck,
  UserMinus,
  Shield,
  Search,
  ChevronDown,
  ChevronsUpDown,
  Pencil,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const users = [
  { id: 1, name: "Elis Jasper", email: "andrey.lombardo@edu.sc.senai.br", level: "Docente", status: "Ativo", lastAccess: "04/05/2026 16:55", initials: "EJ" },
  { id: 2, name: "Gabrielli Glowatski", email: "bruno.sebastiano@edu.sc.senai.br", level: "Docente", status: "Ativo", lastAccess: "27/04/2026 08:27", initials: "GG" },
  { id: 3, name: "André Miotto", email: "criciano.mendes@edu.sc.senai.br", level: "Docente", status: "Inativo", lastAccess: "10/02/2026 11:09", initials: "AM" },
  { id: 4, name: "Maria Zabel", email: "daves.wegge@edu.sc.senai.br", level: "Supervisor", status: "Ativo", lastAccess: "30/04/2026 10:45", initials: "MZ" },
  { id: 5, name: "Hugo Deleon", email: "enzo.tenure@edu.sc.senai.br", level: "Docente", status: "Ativo", lastAccess: "01/05/2026 10:45", initials: "HD" },
  { id: 6, name: "José Torres", email: "eduardo.webber@edu.sc.senai.br", level: "Supervisor", status: "Ativo", lastAccess: "06/05/2026 10:45", initials: "JT" },
];

export default function GerenciarUsuarios() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col w-full p-4 lg:p-6">

      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#103D85] mb-1">Gerenciar usuários</h1>
        <p className="text-gray-500 text-sm">Cadastre edite e gerencie os usuários que possuem acesso ao sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total de Usuários</p>
            <p className="text-2xl font-bold text-gray-800">20</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-xl text-green-600">
            <UserCheck size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Usuários Ativos</p>
            <p className="text-2xl font-bold text-gray-800">19</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="bg-orange-100 p-3 rounded-xl text-orange-500">
            <UserMinus size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Usuários Inativos</p>
            <p className="text-2xl font-bold text-gray-800">1</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
            <Shield size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Nível de Acesso</p>
            <p className="text-2xl font-bold text-gray-800">5</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex w-full sm:w-auto items-center gap-4">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar pelo Nome, E-mail..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85]">
                <option>Todos os status</option>
                <option>Ativos</option>
                <option>Inativos</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-3">
            <button className="px-6 py-2 bg-[#E6F0FF] text-[#103D85] font-medium rounded-lg text-sm hover:bg-[#D4E5FF] transition-colors">
              Exportar
            </button>
            <Link href="/usuarios/admin">
              <button className="px-6 py-2 bg-[#103D85] text-white font-medium rounded-lg text-sm hover:bg-[#0c2e63] transition-colors">
                Criar Usuário
              </button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-100 text-sm font-semibold text-gray-700">
                <th className="py-3 px-4 font-medium">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                    Nome <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-4 font-medium">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                    E-mail <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-4 font-medium">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                    Nível <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-4 font-medium">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                    Status <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-4 font-medium">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85]">
                    Ultimo Acesso <ChevronsUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
                <th className="py-3 px-4 font-medium text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#103D85] text-white flex items-center justify-center text-xs font-bold">
                        {user.initials}
                      </div>
                      <span className="font-medium text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-gray-500">{user.email}</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.level === "Docente" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-600"
                    }`}>
                      {user.level}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Ativo" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Ativo" ? "bg-green-500" : "bg-red-500"}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-gray-500">{user.lastAccess}</td>
                  <td className="py-2.5 px-4">
                    <div className="flex justify-center">
                      <button className="text-[#103D85] hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <div>
            Mostrando 1 a 6 de 20 usuários
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
              <ChevronsLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#103D85] text-white font-medium">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
              <ChevronRight size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
