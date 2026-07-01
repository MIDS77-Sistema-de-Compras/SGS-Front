'use client'

import { useRouter } from 'next/navigation'; 
import { ArrowLeft } from 'lucide-react'; 
import SectionHeader from '@/components/ui/layout/SectionHeader';
import AccessLevelSelector from './AccessLevelSelector';
import UserIdentificationSection from './UserIdentification';
import Button from '@/components/ui/button/Button';
import { useCreateUser } from '@/hooks/useCreateUser';

export default function FormCreateUser() {
    const { formData, errors, isLoading, handleChange, handleBlur, handleSubmit } = useCreateUser();
    
    const router = useRouter();

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-[#AAAAAA] flex flex-col justify-between">
                <div>
                    <div className="flex items-center">
                        <button 
                            type="button" 
                            onClick={() => router.back()} 
                            className="text-[#103D85] hover:bg-gray-100 p-1 mr-1 rounded-full transition-colors flex items-center justify-center"
                            title="Voltar"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-[22px] font-bold text-[#103D85]">Cadastrar Usuário</h1>
                    </div>
                    
                    <div className="border-t border-[#AAAAAA] mt-2 mb-5 -mx-5" />

                    <SectionHeader label="IDENTIFICAÇÃO DE USUÁRIO" />
                    <UserIdentificationSection
                        formData={formData}
                        errors={errors}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <div className="mt-10">
                        <SectionHeader label="NÍVEL DE ACESSO" />
                        <AccessLevelSelector
                            value={formData.nivelAcesso}
                            onChange={(value) => handleChange('nivelAcesso', value)}
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