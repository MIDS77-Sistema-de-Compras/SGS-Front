'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import Button from '@/components/ui/button/Button';
import UserIdentificationSection from '@/components/features/admin/UserIdentification';
import AccessLevelSelector from '@/components/features/admin/AccessLevelSelector';
import { getUserById, updateUser, deleteUser } from '@/service/users/usersSearch';
import { useParams } from 'next/navigation';

export default function EditarUsuarios() {
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
        nivelAcesso: ''
    });

    useEffect(() => {
        loadUser();
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
                nivelAcesso: response.roleName ?? ''
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
        if (!formData.senha) {
            alert('Digite a senha para confirmar a edição do usuário.');
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
                // CPF não é enviado: imutável após a criação do usuário
            };

            console.log("Payload update:", payload);

            await updateUser(userId, payload);

            router.push('/usuarios/admin/gerenciar');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    }

    async function handleDelete() {
        try {
            await deleteUser(userId);
            router.push('/usuarios/admin/gerenciar');
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
        }
    }

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-[#AAAAAA]">
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-[#103D85] hover:bg-gray-100 p-1 mr-1 rounded-full transition-colors flex items-center justify-center"
                        title="Voltar"
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <h1 className="text-[22px] font-bold text-[#103D85]">
                        Editar Usuário
                    </h1>
                </div>

                <div className="border-t border-[#AAAAAA] mt-2 mb-5 -mx-5" />

                <div>
                    <SectionHeader label="IDENTIFICAÇÃO DE USUÁRIO" />
                    <UserIdentificationSection
                        formData={formData}
                        errors={{}}
                        onChange={handleChange}
                        onBlur={() => {}}
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
                        onClick={handleDelete}
                        className="w-[295px] bg-[#E30613] hover:bg-[#B8010C] text-white border-[#E30613]"
                        rightIcon={<Image src="/images/lixeira.png" alt="" width={16} height={16} />}
                    >
                        Excluir usuário
                    </Button>

                    <Button
                        className="w-[295px] bg-[#7D7D7D] hover:bg-[#555555] text-white border-[#7D7D7D]"
                        rightIcon={<Image src="/images/desativar.png" alt="" width={16} height={16} />}
                    >
                        Desativar usuário
                    </Button>
                </div>

                <Button
                    onClick={handleSave}
                    className="w-[295px]"
                    rightIcon={<Image src="/images/lapisEdicao.png" alt="" width={16} height={16} />}
                >
                    SALVAR MUDANÇAS
                </Button>
            </div>
        </div>
    );
}