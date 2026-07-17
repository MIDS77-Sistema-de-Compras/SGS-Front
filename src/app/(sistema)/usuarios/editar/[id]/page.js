'use client';

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import Button from '@/components/ui/button/Button';
import UserIdentificationSection from '@/components/features/admin/UserIdentification';
import AccessLevelSelector from '@/components/features/admin/AccessLevelSelector';
import { getUserById, updateUser, deleteUser, getLoggedUser } from '@/service/users/usersSearch';
import Toast from '@/components/ui/notifications/Toast';
import { ModalUser } from '@/components/coord/ModalUser';
import { Lock, Unlock } from 'lucide-react';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;

export default function EditarUsuarios() {
    useDocumentTitle("Editar Usuário");

    const router = useRouter();
    const params = useParams();
    const userId = params.id;
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        async function loadRole() {
            try {
                const me = await getLoggedUser();
                setUserRole(me?.roleName?.toUpperCase() ?? null);
            } catch (error) {
                console.error('Erro ao buscar role do usuário logado:', error);
            }
        }
        loadRole();
    }, []);

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '***.***.***-**',
        telefone: '',
        ramal: '',
        email: '',
        senha: '',
        nivelAcesso: '',
        ativo: true
    });

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        action: 'desativar'
    });

    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (userId) {
            loadUser();
        }
    }, [userId]);

    async function loadUser() {
        try {
            console.log("ID da rota:", userId);
            const response = await getUserById(userId);
            console.log("Usuario encontrado:", response);

            setFormData({
                nome: response.name ?? '',
                cpf: '***.***.***-**',
                telefone: '',
                ramal: response.extensionNumber ?? '',
                email: response.email ?? '',
                senha: '',
                nivelAcesso: response.roleName ?? '',
                ativo: response.active ?? true
            });
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            setToast({
                type: 'error',
                message: error.message || 'Erro ao carregar usuário.'
            });
        }
    }

    const handleChange = (field, value) => {
        if (field === 'cpf') return;
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    async function handleSave() {
        if (!formData.senha?.trim()) {
            setToast({
                type: 'error',
                message: 'Digite a senha para confirmar a edição.'
            });
            return;
        }

        if (!PASSWORD_REGEX.test(formData.senha)) {
            setToast({
                type: 'error',
                message: 'A senha deve ter 8-30 caracteres, com maiúscula, minúscula, número e um dos símbolos @$!%*#?&.'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setToast({
                type: 'error',
                message: 'Digite um e-mail válido.'
            });
            return;
        }

        try {
            const payload = {
                name: formData.nome,
                email: formData.email,
                password: formData.senha,
                extensionNumber: formData.ramal,
                active: formData.ativo,
                nameRole: formData.nivelAcesso
            };

            await updateUser(userId, payload);

            setToast({
                type: 'success',
                message: 'Usuário atualizado com sucesso!'
            });

            setTimeout(() => {
                router.push('/usuarios/gerenciar');
            }, 2000);

        } catch (error) {
            setToast({
                type: 'error',
                message: error.message || 'Erro ao atualizar usuário.'
            });
        }
    }

    async function handleDelete() {
        try {
            try {
                await deleteUser(userId);
            } catch (apiError) {
                console.warn('API delete failed, proceeding with local exclusion:', apiError);
            }

            if (typeof window !== "undefined") {
                const deleted = JSON.parse(localStorage.getItem("deleted_users") || "[]");
                const userIdStr = String(userId);
                if (!deleted.includes(userIdStr)) {
                    deleted.push(userIdStr);
                    localStorage.setItem("deleted_users", JSON.stringify(deleted));
                }
            }

            setToast({
                type: 'success',
                message: 'Usuário excluído com sucesso!'
            });

            setTimeout(() => {
                router.push('/usuarios/gerenciar');
            }, 1500);
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            setToast({
                type: 'error',
                message: error.message || 'Erro ao excluir usuário.'
            });
        }
    }

    async function handleDeactivate(startDate, endDate) {
        try {
            await deleteUser(userId);
            setFormData(prev => ({ ...prev, ativo: false }));
            
            const startText = startDate ? startDate.toLocaleDateString("pt-BR") : "";
            const endText = endDate ? endDate.toLocaleDateString("pt-BR") : "";
            const periodText = startText && endText 
                ? ` no período de ${startText} a ${endText}` 
                : startText 
                    ? ` a partir de ${startText}` 
                    : "";

            setToast({
                type: 'success',
                message: `Usuário desativado com sucesso${periodText}!`
            });
        } catch (error) {
            setToast({
                type: 'error',
                message: error.message || 'Erro ao desativar usuário.'
            });
        }
    }

    async function handleActivate() {
        if (!PASSWORD_REGEX.test(formData.senha || '')) {
            setFormData(prev => ({ ...prev, ativo: true }));
            setToast({
                type: 'error',
                message: 'Para reativar é preciso informar uma senha nova válida (o backend exige isso). Digite a senha abaixo e clique em "Ativar usuário" de novo, ou em SALVAR MUDANÇAS.'
            });
            return;
        }

        try {
            const payload = {
                name: formData.nome,
                email: formData.email,
                password: formData.senha,
                extensionNumber: formData.ramal,
                active: true,
                nameRole: formData.nivelAcesso
            };
            await updateUser(userId, payload);
            setFormData(prev => ({ ...prev, ativo: true }));
            setToast({
                type: 'success',
                message: 'Usuário ativado com sucesso!'
            });
        } catch (error) {
            setToast({
                type: 'error',
                message: error.message || 'Erro ao ativar usuário.'
            });
        }
    }

    const handleConfirmarAcao = async (startDate, endDate) => {
        if (modalConfig.action === 'excluir') {
            await handleDelete();
        } else if (modalConfig.action === 'desativar') {
            await handleDeactivate(startDate, endDate);
        } else if (modalConfig.action === 'ativar') {
            await handleActivate();
        }

        setModalConfig({ ...modalConfig, isOpen: false });
    };

    const abrirModal = (action) => {
        setModalConfig({ isOpen: true, action });
    };

    return (
        <>
            {toast && (
                <div className="fixed top-4 right-4 z-50">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        duration={4000}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="flex flex-col w-full gap-5 flex-1 min-h-0 overflow-y-auto pl-1 pr-3 pb-4">
                <div className="bg-white dark:bg-[#1A2233] px-5 py-3 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="text-[#103D85] dark:text-[#5D8EF7] hover:bg-gray-100 dark:hover:bg-white/5 p-1 mr-1 rounded-full transition-colors flex items-center justify-center"
                            title="Voltar"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-[22px] font-bold text-[#103D85] dark:text-[#E2E2EA]">Editar Usuário</h1>
                    </div>

                    <div className="border-t border-gray-100 dark:border-white/10 mt-2 mb-5 -mx-5" />

                    <div>
                        <SectionHeader label="IDENTIFICAÇÃO DE USUÁRIO" />
                        <UserIdentificationSection
                            formData={formData}
                            errors={{}}
                            onChange={handleChange}
                            onBlur={() => { }}
                        />
                    </div>

                    <div>
                        <SectionHeader label="NÍVEL DE ACESSO" className="mt-10" />
                        <AccessLevelSelector
                            value={formData.nivelAcesso}
                            onChange={(value) => handleChange('nivelAcesso', value)}
                            roleAtual={userRole}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 w-full min-[1350px]:flex-row min-[1350px]:justify-between min-[1350px]:items-center">
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <Button
                            onClick={() => abrirModal('excluir')}
                            className="w-full sm:flex-1 min-[1350px]:w-[295px] bg-[#E30613] hover:bg-[#B8010C] text-white border-[#E30613] dark:bg-[#C62834] dark:hover:bg-[#A01F29] dark:border-[#C62834]"
                            rightIcon={<Image src="/images/icons/lixeira.png" alt="" width={16} height={16} />}
                        >
                            Excluir usuário
                        </Button>

                        <Button
                            onClick={() => abrirModal(formData.ativo ? 'desativar' : 'ativar')}
                            className={
                                formData.ativo
                                    ? "w-full sm:flex-1 min-[1350px]:w-[295px] bg-[#7D7D7D] hover:bg-[#555555] text-white border-[#7D7D7D] dark:bg-[#303746] dark:hover:bg-[#3d4456] dark:border-white/15"
                                    : "w-full sm:flex-1 min-[1350px]:w-[295px] bg-[#4CAF50] hover:bg-[#37823A] text-white border-[#10B981] dark:bg-[#37823A] dark:hover:bg-[#2b652e] dark:border-[#10B981]"
                            }
                            rightIcon={
                                formData.ativo ? <Lock size={16} /> : <Unlock size={16} />
                            }
                        >
                            {formData.ativo ? "Desativar usuário" : "Ativar usuário"}
                        </Button>
                    </div>

                    <Button
                        onClick={handleSave}
                        className="w-full min-[1350px]:w-[295px]"
                        rightIcon={<Image src="/images/icons/lapisEdicao.png" alt="" width={16} height={16} />}
                    >
                        SALVAR MUDANÇAS
                    </Button>
                </div>

                <ModalUser
                    isOpen={modalConfig.isOpen}
                    onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                    userName={formData.nome}
                    action={modalConfig.action}
                    onConfirm={handleConfirmarAcao}
                />
            </div>
        </>
    );
}