"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/input/Input";
import CpfInput from "@/components/ui/input/CpfInput";
import PasswordInput from "@/components/ui/input/PasswordInput";
import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/overlay/Modal";
import { changeUserPassword } from "@/service/config/change-password";
import { useLoggedUser } from "@/hooks/useLoggedUser";

const readOnlyFieldClass =
    "bg-[#D1D5DB]/40 dark:bg-[#E2E2EA]/10 border-gray-200 dark:border-white/10 dark:text-[#E2E2EA] cursor-default select-none focus:border-gray-200 dark:focus:border-white/10 focus:ring-0";

const editableFieldClass =
    "bg-white dark:bg-[#E2E2EA]/25 dark:text-[#E2E2EA] border-[#103D85]/30 dark:border-white/15 focus:border-[#103D85] dark:focus:border-[#1A4A9E]";

const modalFieldClass =
    "bg-white dark:bg-[#303746] dark:text-[#E2E2EA] border-gray-200 dark:border-white/15 focus:border-[#103D85] dark:focus:border-[#1A4A9E]";

const formatRole = (role) =>
    role ? role.charAt(0) + role.slice(1).toLowerCase() : "";

export default function UserProfile() {

    const [open, setOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const [modal, openModal] = useState(false);
    const [error, setError] = useState("");
    const { user, loading } = useLoggedUser();

    useEffect(() => {
        if (newPassword != confirmPwd && modal == true) {
            setError("As senhas não coincidem.");
        } else {
            setError("");
        }
    }, [newPassword, confirmPwd, modal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        openModal(true);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        // TODO endpoint for changing pwd that isn't the recovery one
        try {
            const res = await changeUserPassword(oldPassword, newPassword);

            if (!res || res.status) {
                setError(res?.message || "Não foi possível alterar a sua senha.");
                return;
            }

            openModal(false);

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="bg-white dark:bg-[#303746] rounded-xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden transition-all">
            <div
                onClick={() => setOpen(!open)}
                className="p-5 sm:p-8 flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-gray-50/50 dark:hover:bg-white/5 active:bg-gray-100/50 dark:active:bg-white/10"
            >
                <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400 dark:text-[#C3C6D3] border border-gray-100 dark:border-white/10 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-[#E2E2EA]">Perfil do usuário</h3>
                        <p className="text-gray-400 dark:text-[#C3C6D3] text-xs sm:text-sm">Gerencie suas informações pessoais e de contato</p>
                    </div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    className={`text-gray-400 dark:text-[#C3C6D3] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${open ? "rotate-180" : "rotate-0"}`}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>

            <div
                className="grid"
                style={{
                    gridTemplateRows: open ? "1fr" : "0fr",
                    opacity: open ? 1 : 0,
                    transition: "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
                }}
            >
                <div className="overflow-hidden">
                    <div className="p-5 sm:p-10 border-t border-gray-100 dark:border-white/10 bg-gray-50/20 dark:bg-white/[0.02]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Nome completo</label>
                                <Input
                                    variant="form"
                                    key={user?.name || "nome"}
                                    defaultValue={user?.name || ""}
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">E-mail</label>
                                <Input
                                    variant="form"
                                    type="email"
                                    key={user?.email || "email"}
                                    defaultValue={user?.email || ""}
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Senha</label>
                                <form onSubmit={handleSubmit}>
                                    <Button onClick={() => openModal(true)} fullWidth>
                                        Alterar minha senha
                                    </Button>
                                    <p className="text-sm text-red-500 dark:text-[#F87171]">{error}</p>
                                    <Modal isOpen={modal} onClose={() => openModal(false)} title={"Confirmação"} height="h-auto" maxWidth="max-w-[460px]">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[13px] font-semibold text-gray-600 dark:text-[#C3C6D3]">Digite a sua senha antiga</label>
                                                <PasswordInput
                                                    variant="form"
                                                    placeholder="Sua senha antiga..."
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                    className={modalFieldClass}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[13px] font-semibold text-gray-600 dark:text-[#C3C6D3]">Digite a sua nova senha</label>
                                                <PasswordInput
                                                    variant="form"
                                                    placeholder="Sua nova senha..."
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className={modalFieldClass}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-[13px] font-semibold text-gray-600 dark:text-[#C3C6D3]">Confirme sua senha</label>
                                                <PasswordInput
                                                    variant="form"
                                                    placeholder="Confirme sua senha..."
                                                    value={confirmPwd}
                                                    onChange={(e) => setConfirmPwd(e.target.value)}
                                                    className={modalFieldClass}
                                                />
                                            </div>
                                            {error && <p className="text-sm font-medium text-red-500 dark:text-[#F87171]">{error}</p>}
                                        </div>

                                        <div className="flex flex-col items-center gap-4 mt-6 pt-5 border-t border-gray-100 dark:border-white/10">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-[#E2E2EA]">Deseja mesmo atualizar sua senha?</p>
                                            <div className="flex gap-3">
                                                <Button onClick={handleUpdate} className="px-8">Sim</Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => openModal(false)}
                                                    className="px-8"
                                                >
                                                    Não
                                                </Button>
                                            </div>
                                        </div>
                                    </Modal>
                                </form>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Nível</label>
                                <Input
                                    variant="form"
                                    key={user?.roleName || "nivel"}
                                    defaultValue={formatRole(user?.roleName)}
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">CPF</label>
                                <CpfInput
                                    key={user?.cpf || "cpf"}
                                    value={user?.cpf || ""}
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Ramal</label>
                                <Input
                                    variant="form"
                                    key={user?.extensionNumber || "ramal"}
                                    defaultValue={user?.extensionNumber || ""}
                                    readOnly
                                    className={readOnlyFieldClass}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}