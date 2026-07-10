'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import Button from '@/components/ui/button/Button';
import UserIdentificationSection from '@/components/features/admin/UserIdentification';
import AccessLevelSelector from '@/components/features/admin/AccessLevelSelector';
import { ModalUser } from '@/components/coord/ModalUser'; 

export default function EditarUsuarios({ params }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        nome: "Emanuelle Cristina Hostin",
        cpf: "000.000.000-00",
        telefone: "+55 (47) 99999-9999",
        ramal: "9999",
        email: "emanuelle.hostin@gmail.com",
        senha: "12345678",
        nivelAcesso: "COORDENADOR",
        ativo: true 
    });

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        action: 'desativar'
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleConfirmarAcao = () => {
        if (modalConfig.action === 'excluir') {
            console.log("Lógica para excluir o usuário", formData.nome);
        } else if (modalConfig.action === 'desativar') {
            console.log("Lógica para desativar o usuário", formData.nome);
            setFormData(prev => ({ ...prev, ativo: false })); 
        } else if (modalConfig.action === 'ativar') {
            console.log("Lógica para ativar o usuário", formData.nome);
            setFormData(prev => ({ ...prev, ativo: true })); 
        }
        
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    const abrirModal = (action) => {
        setModalConfig({ isOpen: true, action });
    };

    return (
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
    );
}