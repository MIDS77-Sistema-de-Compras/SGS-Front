"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Input from "@/components/ui/input/Input";
import CpfInput from "@/components/ui/input/CpfInput";
import PasswordInput from "@/components/ui/input/PasswordInput";
import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/overlay/Modal";
import { changeUserPassword } from "@/service/config/change-password";
import { useLoggedUser } from "@/hooks/useLoggedUser";
import { useNotification } from "@/contexts/NotificationContext";
import { updateLoggedUserProfilePicture } from "@/service/users/me";

const PROFILE_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_PROFILE_IMAGE_SIZE = 10 * 1024 * 1024;

const readOnlyFieldClass =
    "bg-[#D1D5DB]/40 dark:bg-[#E2E2EA]/10 border-gray-200 dark:border-white/10 dark:text-[#E2E2EA] cursor-default select-none focus:border-gray-200 dark:focus:border-white/10 focus:ring-0";

const modalFieldClass =
    "bg-white dark:bg-[#303746] dark:text-[#E2E2EA] border-gray-200 dark:border-white/15 focus:border-[#103D85] dark:focus:border-[#1A4A9E]";

const formatRole = (role) =>
    role ? role.charAt(0) + role.slice(1).toLowerCase() : "";

export default function UserProfile() {
    const { showNotification } = useNotification();
    const { user, loading, updateUser } = useLoggedUser();
    const fileInputRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [modal, openModal] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const [selectedPicture, setSelectedPicture] = useState(null);
    const [uploadingPicture, setUploadingPicture] = useState(false);

    const picturePreview = useMemo(
        () => selectedPicture ? URL.createObjectURL(selectedPicture) : "",
        [selectedPicture]
    );

    useEffect(() => {
        return () => {
            if (picturePreview) URL.revokeObjectURL(picturePreview);
        };
    }, [picturePreview]);

    const modalError = modal && confirmPwd !== "" && newPassword !== confirmPwd
        ? "As senhas não coincidem."
        : "";

    const handleSubmit = (e) => {
        e.preventDefault();
        openModal(true);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (modalError) return;

        try {
            const res = await changeUserPassword(oldPassword, newPassword);

            if (!res || res.status) {
                showNotification(res?.message || "Não foi possível alterar a sua senha.", "error");
                openModal(false);
                return;
            }

            showNotification("Senha atualizada com sucesso!", "success");

            openModal(false);
            setOldPassword("");
            setNewPassword("");
            setConfirmPwd("");

        } catch (error) {
            showNotification(error.message || "Erro inesperado ao alterar a senha.", "error");
            openModal(false);
        }
    }

    const handlePictureSelection = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!PROFILE_IMAGE_TYPES.includes(file.type)) {
            showNotification("Escolha uma imagem PNG, JPG, JPEG ou WEBP.", "error");
            event.target.value = "";
            return;
        }

        if (file.size > MAX_PROFILE_IMAGE_SIZE) {
            showNotification("A foto deve possuir no máximo 10 MB.", "error");
            event.target.value = "";
            return;
        }

        setSelectedPicture(file);
    };

    const handlePictureUpload = async () => {
        if (!selectedPicture) return;

        setUploadingPicture(true);
        try {
            const updatedUser = await updateLoggedUserProfilePicture(selectedPicture);
            updateUser(updatedUser);
            setSelectedPicture(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            showNotification("Foto de perfil atualizada com sucesso!", "success");
        } catch (error) {
            showNotification(error.message || "Não foi possível atualizar a foto de perfil.", "error");
        } finally {
            setUploadingPicture(false);
        }
    };

    const currentPicture = picturePreview || user?.userProfile;

    return (
        <section className="bg-white dark:bg-[#303746] rounded-xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden transition-all">
            <div
                onClick={() => setOpen(!open)}
                className="p-5 sm:p-8 flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-gray-50/50 dark:hover:bg-white/5 active:bg-gray-100/50 dark:active:bg-white/10"
            >
                <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400 dark:text-[#C3C6D3] border border-gray-100 dark:border-white/10 shrink-0 overflow-hidden">
                        {user?.userProfile ? (
                            <img src={user.userProfile} alt="Sua foto de perfil" className="h-full w-full object-cover" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        )}
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
                        <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-5 rounded-xl border border-gray-100 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-5">
                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white dark:border-[#303746] bg-[#EEF2F6] dark:bg-[#1A2233] shadow-sm flex items-center justify-center text-2xl font-bold text-[#103D85] dark:text-[#E2E2EA]">
                                {currentPicture ? (
                                    <img src={currentPicture} alt="Pré-visualização da foto de perfil" className="h-full w-full object-cover" />
                                ) : (
                                    <span aria-hidden="true">{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
                                )}
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800 dark:text-[#E2E2EA]">Foto de perfil</p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-[#C3C6D3]">
                                    Formatos aceitos: PNG, JPG, JPEG e WEBP. Tamanho máximo de 10 MB.
                                </p>
                                {selectedPicture && (
                                    <p className="mt-2 max-w-full truncate text-xs font-medium text-[#103D85] dark:text-[#5D8EF7]">
                                        {selectedPicture.name}
                                    </p>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
                                    onChange={handlePictureSelection}
                                    className="sr-only"
                                />

                                <div className="mt-4 flex flex-wrap gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={loading || uploadingPicture}
                                    >
                                        Escolher foto
                                    </Button>
                                    {selectedPicture && (
                                        <Button
                                            onClick={handlePictureUpload}
                                            isLoading={uploadingPicture}
                                        >
                                            Salvar foto
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

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
                                    <Button onClick={handleSubmit} fullWidth>
                                        Alterar minha senha
                                    </Button>
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
                                            {modalError && <p className="text-sm font-medium text-[#BA1A1A] dark:text-[#F87171]">{modalError}</p>}
                                        </div>

                                        <div className="flex flex-col items-center gap-4 mt-6 pt-5 border-t border-gray-100 dark:border-white/10">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-[#E2E2EA]">Deseja mesmo atualizar sua senha?</p>
                                            <div className="flex gap-3">
                                                <Button onClick={handleUpdate} className="px-8" disabled={!!modalError}>Sim</Button>
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
