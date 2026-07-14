'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { ArrowLeft } from 'lucide-react'; 
import SectionHeader from '@/components/ui/layout/SectionHeader';
import AccessLevelSelector from './AccessLevelSelector';
import UserIdentificationSection from './UserIdentification';
import Button from '@/components/ui/button/Button';
import { useCreateUser } from '@/hooks/useCreateUser';
import { getUserRole } from '@/lib/utils/getUserRole';

export default function FormCreateUser() {
    const { formData, errors, isLoading, handleChange, handleBlur, handleSubmit } = useCreateUser();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        setUserRole(getUserRole());
    }, []);

    if (!isMounted) {
        return null; 
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white dark:bg-[#1A2233] px-5 py-3 rounded-xl shadow-sm border border-[#AAAAAA] dark:border-white/10 flex flex-col justify-between">
                <div>
                    <div className="flex items-center">
                        <button 
                            type="button" 
                            onClick={() => router.back()} 
                            className="text-[#103D85] dark:text-[#5D8EF7] hover:bg-gray-100 dark:hover:bg-white/5 p-1 mr-1 rounded-full transition-colors flex items-center justify-center"
                            title="Voltar"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-[22px] font-bold text-[#103D85] dark:text-[#E2E2EA]">Cadastrar Usuário</h1>
                    </div>
                    
                    <div className="border-t border-[#AAAAAA] dark:border-white/10 mt-2 mb-5 -mx-5" />

                    <SectionHeader label="IDENTIFICAÇÃO DE USUÁRIO" />
                    <UserIdentificationSection
                        formData={formData}
                        errors={errors}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <div className="mt-5">
                        <SectionHeader label="NÍVEL DE ACESSO" />
                        <AccessLevelSelector
                            value={formData.nivelAcesso}
                            onChange={(value) => handleChange('nivelAcesso', value)}
                            roleAtual={userRole}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                <div className="col-start-2 md:col-start-4">
                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="w-full"
                        disabled={isLoading}
                    >
                        CRIAR USUÁRIO +
                    </Button>
                </div>
            </div>
        </form>
    )
}