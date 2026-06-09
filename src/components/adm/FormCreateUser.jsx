'use client'

import SectionHeader from '@/components/adm/SectionHeader';
import AccessLevelSelector from '@/components/adm/AccessLevelSelector';
import UserIdentificationSection from '@/components/adm/UserIdentification';
import Button from '@/components/form/Button';
import { useCreateUser } from '@/hooks/useCreateUser';

export default function FormCreateUser() {

    const { formData, errors, handleChange, handleBlur, handleSubmit } = useCreateUser();

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-[#AAAAAA] flex flex-col justify-between">
                <div>
                    <h1 className="text-[22px] font-bold text-[#103D85]">Cadastrar Usuário</h1>
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
                    <Button type="submit" variant="primary" className="w-full">
                        CRIAR USUÁRIO +
                    </Button>
                </div>
            </div>
        </form>
    )
}