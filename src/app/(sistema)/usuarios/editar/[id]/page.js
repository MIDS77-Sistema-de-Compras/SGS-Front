'use client';

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import Button from '@/components/ui/button/Button';
import UserIdentificationSection from '@/components/features/admin/UserIdentification';
import AccessLevelSelector from '@/components/features/admin/AccessLevelSelector';
import { getUserById, updateUser, deleteUser } from '@/service/users/usersSearch';
import Toast from '@/components/ui/notifications/Toast';
import { ModalUser } from '@/components/coord/ModalUser';

export default function EditarUsuarios({ params }) {
    useDocumentTitle("Editar Usuário");

    const router = useRouter();
    const params = useParams();
    const userId = params.id;

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
                message: 'Erro ao atualizar usuário.'
            });
        }
    }

    async function handleDelete() {
        try {
            await deleteUser(userId);
            router.push('/usuarios/gerenciar');
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            setToast({
                type: 'error',
                message: 'Erro ao excluir usuário.'
            });
        }
    }

    const handleConfirmarAcao = async () => {
        if (modalConfig.action === 'excluir') {
            await handleDelete(); 
        } else if (modalConfig.action === 'desativar') {
            setFormData(prev => ({ ...prev, ativo: false })); 
        } else if (modalConfig.action === 'ativar') {
            setFormData(prev => ({ ...prev, ativo: true }));
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
                <div className="bg-white dark:bg-[#1A2233] px-5 py-3 rounded-xl shadow-sm border border-[#AAAAAA] dark:border-white/10">
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

                    <div className="border-t border-[#AAAAAA] dark:border-white/10 mt-2 mb-5 -mx-5" />

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
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-4">
                        <Button
                            onClick={() => abrirModal('excluir')}
                            className="w-[295px] bg-[#E30613] hover:bg-[#B8010C] text-white border-[#E30613] dark:bg-[#C62834] dark:hover:bg-[#A01F29] dark:border-[#C62834]"
                            rightIcon={<Image src="/images/icons/lixeira.png" alt="" width={16} height={16} />}
                        >
                            Excluir usuário
                        </Button>

                        <Button
                            onClick={() => abrirModal(formData.ativo ? 'desativar' : 'ativar')}
                            className={
                                formData.ativo 
                                    ? "w-[295px] bg-[#7D7D7D] hover:bg-[#555555] text-white border-[#7D7D7D] dark:bg-[#303746] dark:hover:bg-[#3d4456] dark:border-white/15"
                                    : "w-[295px] bg-[#4CAF50] hover:bg-[#37823A] text-white border-[#10B981] dark:bg-[#37823A] dark:hover:bg-[#2b652e] dark:border-[#10B981]"
                            }
                            rightIcon={
                                <Image 
                                    src={formData.ativo ? "/images/icons/desativar.png" : "/images/icons/ativarUser.png"} 
                                    alt="" 
                                    width={16} 
                                    height={16} 
                                />
                            }
                        >
                            {formData.ativo ? "Desativar usuário" : "Ativar usuário"}
                        </Button>
                    </div>

                    <Button
                        onClick={handleSave}
                        className="w-[295px]"
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