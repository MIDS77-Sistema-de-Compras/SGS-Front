"use client";

import { useState, useMemo } from "react";

const initialUsers = [
  { id: 1, nome: "Elis Jasper", email: "andrey.lombardo@edu.sc.senai.br", nivel: "Docente", status: "Ativo", ultimoAcesso: "04/05/2026 16:55", telefone: "(47) 99876-5432", ramal: "3222-0001" },
  { id: 2, nome: "Gabrielli Glowatski", email: "bruno.sebastiano@edu.sc.senai.br", nivel: "Docente", status: "Ativo", ultimoAcesso: "27/04/2026 08:27", telefone: "(47) 99876-5433", ramal: "3222-0002" },
  { id: 3, nome: "André Miotto", email: "criciano.mendes@edu.sc.senai.br", nivel: "Docente", status: "Inativo", ultimoAcesso: "10/02/2026 11:09", telefone: "(47) 99876-5434", ramal: "3222-0003" },
  { id: 4, nome: "Maria Zabel", email: "daves.wegge@edu.sc.senai.br", nivel: "Supervisor", status: "Ativo", ultimoAcesso: "30/04/2026 10:45", telefone: "(47) 99876-5435", ramal: "3222-0004" },
  { id: 5, nome: "Hugo Deleon", email: "enzo.tenure@edu.sc.senai.br", nivel: "Docente", status: "Ativo", ultimoAcesso: "01/05/2026 10:45", telefone: "(47) 99876-5436", ramal: "3222-0005" },
  { id: 6, nome: "José Torres", email: "eduardo.webber@edu.sc.senai.br", nivel: "Supervisor", status: "Ativo", ultimoAcesso: "06/05/2026 10:45", telefone: "(47) 99876-5437", ramal: "3222-0006" },
  { id: 7, nome: "Ana Souza", email: "ana.souza@edu.sc.senai.br", nivel: "Coordenador", status: "Ativo", ultimoAcesso: "02/05/2026 14:20", telefone: "(47) 99876-5438", ramal: "3222-0007" },
  { id: 8, nome: "Carlos Santos", email: "carlos.santos@edu.sc.senai.br", nivel: "Comprador Reg.", status: "Ativo", ultimoAcesso: "05/05/2026 09:12", telefone: "(47) 99876-5439", ramal: "3222-0008" },
  { id: 9, nome: "Felipe Melo", email: "felipe.melo@edu.sc.senai.br", nivel: "Administrador", status: "Ativo", ultimoAcesso: "06/05/2026 15:30", telefone: "(47) 99876-5440", ramal: "3222-0009" },
  { id: 10, nome: "Luciana Costa", email: "luciana.costa@edu.sc.senai.br", nivel: "Docente", status: "Ativo", ultimoAcesso: "29/04/2026 11:40", telefone: "(47) 99876-5441", ramal: "3222-0010" },
  { id: 11, nome: "Marcos Lima", email: "marcos.lima@edu.sc.senai.br", nivel: "Supervisor", status: "Ativo", ultimoAcesso: "03/05/2026 16:00", telefone: "(47) 99876-5442", ramal: "3222-0011" },
  { id: 12, nome: "Juliana Silva", email: "juliana.silva@edu.sc.senai.br", nivel: "Docente", status: "Ativo", ultimoAcesso: "04/05/2026 08:15", telefone: "(47) 99876-5443", ramal: "3222-0012" },
  { id: 13, nome: "Patricia Ramos", email: "patricia.ramos@edu.sc.senai.br", nivel: "Comprador Reg.", status: "Ativo", ultimoAcesso: "05/05/2026 13:45", telefone: "(47) 99876-5444", ramal: "3222-0013" },
  { id: 14, nome: "Ricardo Alencar", email: "ricardo.alencar@edu.sc.senai.br", nivel: "Coordenador", status: "Ativo", ultimoAcesso: "06/05/2026 11:22", telefone: "(47) 99876-5445", ramal: "3222-0014" },
  { id: 15, nome: "Sandra Vieira", email: "sandra.vieira@edu.sc.senai.br", nivel: "Supervisor", status: "Ativo", ultimoAcesso: "04/05/2026 10:10", telefone: "(47) 99876-5446", ramal: "3222-0015" },
  { id: 16, nome: "Thiago Ferreira", email: "thiago.ferreira@edu.sc.senai.br", nivel: "Docente", status: "Ativo", ultimoAcesso: "02/05/2026 17:05", telefone: "(47) 99876-5447", ramal: "3222-0016" },
  { id: 17, nome: "Vanessa Martins", email: "vanessa.martins@edu.sc.senai.br", nivel: "Docente", status: "Ativo", ultimoAcesso: "01/05/2026 09:50", telefone: "(47) 99876-5448", ramal: "3222-0017" },
  { id: 18, nome: "Wagner Borges", email: "wagner.borges@edu.sc.senai.br", nivel: "Comprador Reg.", status: "Ativo", ultimoAcesso: "05/05/2026 14:15", telefone: "(47) 99876-5449", ramal: "3222-0018" },
  { id: 19, nome: "Yara Mendes", email: "yara.mendes@edu.sc.senai.br", nivel: "Supervisor", status: "Ativo", ultimoAcesso: "06/05/2026 16:30", telefone: "(47) 99876-5450", ramal: "3222-0019" },
  { id: 20, nome: "Zilda Oliveira", email: "zilda.oliveira@edu.sc.senai.br", nivel: "Docente", status: "Ativo", ultimoAcesso: "03/05/2026 13:00", telefone: "(47) 99876-5451", ramal: "3222-0020" },
];

export default function UserManagementDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("nome");
  const [sortDirection, setSortDirection] = useState("asc");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formNome, setFormNome] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTelefone, setFormTelefone] = useState("");
  const [formRamal, setFormRamal] = useState("");
  const [formNivel, setFormNivel] = useState("Docente");
  const [formStatus, setFormStatus] = useState("Ativo");
  const [formSenha, setFormSenha] = useState("");

  const itemsPerPage = 6;

  const handleOpenCreate = () => {
    setEditingUser(null);
    setFormNome("");
    setFormEmail("");
    setFormTelefone("");
    setFormRamal("");
    setFormNivel("Docente");
    setFormStatus("Ativo");
    setFormSenha("");
    setModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormNome(user.nome);
    setFormEmail(user.email);
    setFormTelefone(user.telefone || "");
    setFormRamal(user.ramal || "");
    setFormNivel(user.nivel);
    setFormStatus(user.status);
    setFormSenha("");
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formNome || !formEmail) {
      alert("Por favor, preencha os campos obrigatórios (Nome e E-mail).");
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
              ...u,
              nome: formNome,
              email: formEmail,
              telefone: formTelefone,
              ramal: formRamal,
              nivel: formNivel,
              status: formStatus,
            }
            : u
        )
      );
    } else {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
        now.getMonth() + 1
      ).padStart(2, "0")}/${now.getFullYear()} ${String(
        now.getHours()
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      const newUser = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        nome: formNome,
        email: formEmail,
        telefone: formTelefone,
        ramal: formRamal,
        nivel: formNivel,
        status: formStatus,
        ultimoAcesso: formattedDate,
      };
      setUsers([newUser, ...users]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(users.filter((u) => u.id !== id));
      setModalOpen(false);
    }
  };

  const totalCount = users.length;
  const activeCount = users.filter((u) => u.status === "Ativo").length;
  const inactiveCount = users.filter((u) => u.status === "Inativo").length;
  const accessLevelCount = 5;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return (
        <span className="text-gray-300 ml-1 inline-block select-none text-[10px]">
          ▲▼
        </span>
      );
    }
    return (
      <span className="text-[#103D85] ml-1 inline-block select-none text-[10px]">
        {sortDirection === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const matchesQuery =
          user.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || user.status === statusFilter;
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortField] || "";
        let valB = b[sortField] || "";

        if (typeof valA === "string") {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [users, searchQuery, statusFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const currentUsers = useMemo(() => {
    const adjustedPage = currentPage > totalPages ? 1 : currentPage;
    const startIndex = (adjustedPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, totalPages]);

  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  const handleExport = () => {
    const headers = ["ID", "Nome", "E-mail", "Nível", "Status", "Último Acesso", "Telefone", "Ramal"];
    const rows = filteredUsers.map((u) => [
      u.id,
      u.nome,
      u.email,
      u.nivel,
      u.status,
      u.ultimoAcesso,
      u.telefone || "",
      u.ramal || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(";"), ...rows.map((e) => e.join(";"))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `usuarios_sgs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getNivelStyle = (nivel) => {
    switch (nivel) {
      case "Docente":
        return "bg-[#ECFDF5] text-[#059669] border-[#D1FAE5]";
      case "Supervisor":
        return "bg-[#FFFBEB] text-[#D97706] border-[#FEF3C7]";
      case "Coordenador":
        return "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]";
      case "Administrador":
      case "Administrador/Coordenador":
        return "bg-[#F5F3FF] text-[#7C3AED] border-[#EDE9FE]";
      case "Comprador Reg.":
        return "bg-[#F9FAFB] text-[#4B5563] border-[#F3F4F6]";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none pb-12">

      <div>
        <h1 className="text-[26px] font-bold text-[#103D85] tracking-tight">
          Gerenciar usuários
        </h1>
        <p className="text-gray-500 text-sm mt-0.5 font-normal">
          Cadastre edite e gerencie os usuários que possuem acesso ao sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm relative overflow-hidden flex items-center p-6 min-h-[105px]">
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#3B6FCC]" />
          <div className="flex items-center gap-4 w-full">
            <div className="w-[50px] h-[50px] rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#3B6FCC] shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M9 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <circle cx="9" cy="7" r="4" fill="currentColor" fillOpacity="0.1" />
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="13" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-medium text-gray-400 leading-tight">Total de Usuários</p>
              <p className="text-[28px] font-bold text-gray-800 leading-tight mt-1">{totalCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm relative overflow-hidden flex items-center p-6 min-h-[105px]">
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#16A34A]" />
          <div className="flex items-center gap-4 w-full">
            <div className="w-[50px] h-[50px] rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#16A34A] shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" fill="currentColor" fillOpacity="0.1" />
                <polyline points="16 11 18 13 22 9" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-medium text-gray-400 leading-tight">Usuários Ativos</p>
              <p className="text-[28px] font-bold text-gray-800 leading-tight mt-1">{activeCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm relative overflow-hidden flex items-center p-6 min-h-[105px]">
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#D97706]" />
          <div className="flex items-center gap-4 w-full">
            <div className="w-[50px] h-[50px] rounded-xl bg-[#FFFBEB] flex items-center justify-center text-[#D97706] shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="17" y1="9" x2="22" y2="14" />
                <circle cx="19.5" cy="11.5" r="3" fill="currentColor" fillOpacity="0.1" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-medium text-gray-400 leading-tight">Usuários Inativos</p>
              <p className="text-[28px] font-bold text-gray-800 leading-tight mt-1">{inactiveCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm relative overflow-hidden flex items-center p-6 min-h-[105px]">
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#8B5CF6]" />
          <div className="flex items-center gap-4 w-full">
            <div className="w-[50px] h-[50px] rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.1" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-medium text-gray-400 leading-tight">Nível de Acesso</p>
              <p className="text-[28px] font-bold text-gray-800 leading-tight mt-1">{accessLevelCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[22px] shadow-sm overflow-hidden flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative min-w-[280px] w-full md:w-auto">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar pelo Nome, E-mail..."
                className="w-full border border-gray-200 rounded-xl pl-11 pr-5 py-2.5 text-gray-600 bg-white outline-none focus:border-[#103D85] focus:ring-1 focus:ring-[#103D85] text-[14px]"
              />
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full border border-gray-200 rounded-xl pl-5 pr-10 py-2.5 text-gray-500 bg-white outline-none focus:border-[#103D85] focus:ring-1 focus:ring-[#103D85] min-w-[150px] text-[14px]"
              >
                <option value="all">Todos os status</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-[#DCE4F2] hover:bg-[#CAD6EA] text-[#103D85] font-bold text-[14px] px-6 py-2.5 rounded-xl transition-all active:scale-[0.98]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Exportar
            </button>

            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-2 bg-[#103D85] hover:bg-[#0c2e64] text-white font-bold text-[14px] px-6 py-2.5 rounded-xl transition-all active:scale-[0.98]"
            >
              Criar Usuário
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th
                  onClick={() => handleSort("nome")}
                  className="px-6 py-4 text-[13px] font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    Nome <SortIcon field="nome" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("email")}
                  className="px-6 py-4 text-[13px] font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    E-mail <SortIcon field="email" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("nivel")}
                  className="px-6 py-4 text-[13px] font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    Nível <SortIcon field="nivel" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-4 text-[13px] font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    Status <SortIcon field="status" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("ultimoAcesso")}
                  className="px-6 py-4 text-[13px] font-bold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    Último Acesso <SortIcon field="ultimoAcesso" />
                  </div>
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-gray-600 uppercase tracking-wider text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Nome (Avatar + Name) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-[34px] h-[34px] rounded-full bg-[#103D85] text-white flex items-center justify-center text-[12px] font-bold shrink-0">
                          {getInitials(user.nome)}
                        </div>
                        <p className="text-[14px] font-semibold text-gray-700">{user.nome}</p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <p className="text-[14px] text-gray-500 font-normal">{user.email}</p>
                    </td>

                    {/* Nivel Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-semibold border ${getNivelStyle(user.nivel)}`}>
                        {user.nivel}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      {user.status === "Ativo" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                          Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                          Inativo
                        </span>
                      )}
                    </td>

                    {/* Ultimo Acesso */}
                    <td className="px-6 py-4">
                      <p className="text-[14px] text-gray-500">{user.ultimoAcesso || "Nunca"}</p>
                    </td>

                    {/* Acoes */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="inline-flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-lg transition-colors group"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#103D85"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:scale-105 duration-100"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-400 text-sm">
                    Nenhum usuário correspondente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100 bg-white">
          <p className="text-[13px] text-gray-500">
            Mostrando {filteredUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a{" "}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuários
          </p>

          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white select-none">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-[13px] text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-all border-r border-gray-200"
            >
              &lt;&lt;
            </button>

            {/* Prev Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-[13px] text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-all border-r border-gray-200"
            >
              &lt;
            </button>

            {/* Page number buttons */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3.5 py-1.5 text-[13px] transition-all font-medium border-r border-gray-200 ${isActive
                      ? "bg-[#103D85] text-white border-r-[#103D85] font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-[13px] text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-all border-r border-gray-200"
            >
              &gt;
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-[13px] text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over / Fade Modal Dialog (Create and Edit User) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-[650px] border border-gray-100 overflow-hidden m-4 transform scale-100 transition-transform duration-300"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-[20px] font-bold text-[#103D85]">
                {editingUser ? "Editar Usuário" : "Cadastrar Usuário"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[80vh]">
              {/* Identification Subheader */}
              <div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">
                  IDENTIFICAÇÃO DE USUÁRIO
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nome Completo */}
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-[#103D85] mb-1.5 uppercase">
                      Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome completo do usuário..."
                      value={formNome}
                      onChange={(e) => setFormNome(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 bg-white outline-none focus:border-[#103D85] focus:ring-1 focus:ring-[#103D85] text-[14px]"
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-[13px] font-bold text-[#103D85] mb-1.5 uppercase">
                      Telefone
                    </label>
                    <input
                      type="text"
                      placeholder="+55 (47) 99876-5432"
                      value={formTelefone}
                      onChange={(e) => setFormTelefone(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 bg-white outline-none focus:border-[#103D85] focus:ring-1 focus:ring-[#103D85] text-[14px]"
                    />
                  </div>

                  {/* Ramal */}
                  <div>
                    <label className="block text-[13px] font-bold text-[#103D85] mb-1.5 uppercase">
                      Ramal
                    </label>
                    <input
                      type="text"
                      placeholder="3222-0000"
                      value={formRamal}
                      onChange={(e) => setFormRamal(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 bg-white outline-none focus:border-[#103D85] focus:ring-1 focus:ring-[#103D85] text-[14px]"
                    />
                  </div>

                  {/* E-mail */}
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-[#103D85] mb-1.5 uppercase">
                      E-mail institucional <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="gabi_glowglow@senai.edu"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 bg-white outline-none focus:border-[#103D85] focus:ring-1 focus:ring-[#103D85] text-[14px]"
                    />
                  </div>

                  {/* Senha (optional on edit) */}
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-[#103D85] mb-1.5 uppercase">
                      Senha {editingUser ? "(deixe em branco para manter)" : <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="password"
                      required={!editingUser}
                      placeholder="••••••••"
                      value={formSenha}
                      onChange={(e) => setFormSenha(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 bg-white outline-none focus:border-[#103D85] focus:ring-1 focus:ring-[#103D85] text-[14px]"
                    />
                  </div>
                </div>
              </div>

              {/* Nivel / Status Subheader */}
              <div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">
                  CONFIGURAÇÕES DE ACESSO
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nível de Acesso Selector */}
                  <div>
                    <label className="block text-[13px] font-bold text-[#103D85] mb-2 uppercase">
                      Nível de Acesso
                    </label>
                    <div className="flex flex-col gap-2">
                      {["Administrador", "Coordenador", "Supervisor", "Docente", "Comprador Reg."].map((nivel) => (
                        <button
                          key={nivel}
                          type="button"
                          onClick={() => setFormNivel(nivel)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-[14px] font-medium transition-all active:scale-[0.98] ${formNivel === nivel
                              ? "bg-[#103D85] border-[#103D85] text-white"
                              : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                            }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${formNivel === nivel ? "bg-white" : "bg-gray-400"}`} />
                          {nivel}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <label className="block text-[13px] font-bold text-[#103D85] mb-2 uppercase">
                      Status do Usuário
                    </label>
                    <div className="relative">
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="appearance-none w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-gray-600 bg-white outline-none focus:border-[#103D85] focus:ring-1 focus:ring-[#103D85] text-[14px]"
                      >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                      </select>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions Footer */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-100 mt-4">
                {/* Delete button (only during edit mode) */}
                {editingUser ? (
                  <button
                    type="button"
                    onClick={() => handleDelete(editingUser.id)}
                    className="w-full md:w-auto px-6 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-[14px] transition-all active:scale-[0.98] mr-auto"
                  >
                    Excluir Usuário
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  {/* Cancel */}
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="w-full md:w-auto px-6 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 font-semibold text-[14px] transition-all active:scale-[0.98]"
                  >
                    Cancelar
                  </button>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-2.5 rounded-xl bg-[#103D85] hover:bg-[#0c2e64] text-white font-bold text-[14px] transition-all active:scale-[0.98]"
                  >
                    {editingUser ? "Salvar Alterações" : "Criar Usuário +"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
