'use client';

import { useState } from 'react';
import PasswordField from '@/components/adm/PasswordField';
import { Input } from '@/components/login/Input';
import PhoneInput from '@/components/adm/PhoneInput';
import SectionHeader from '@/components/adm/SectionHeader';
import FormField from '@/components/adm/FormField';
import AccessLevelSelector from '@/components/adm/AccessLevelSelector';

export default function CadastroUsuarios() {
  const [nivelAcesso, setNivelAcesso] = useState('DOCENTE');

  const inputClass = "!h-auto py-2.5 !text-sm !border-gray-200 !rounded-xl !shadow-sm !bg-white focus:!border-[#103D85] focus:!ring-0.5 focus:!ring-[#103D85]"

  return (
    <div className="w-full flex flex-col">

      <div className="bg-white p-5 rounded-xl shadow-sm border border-[#AAAAAA] flex flex-col justify-between">

        <div>
          <h1 className="text-[22px] font-bold text-[#103D85]">
            Cadastrar Usuário
          </h1>

          <div className="border-t border-[#AAAAAA] mt-2 mb-5 -mx-5" />

          <form onSubmit={(e) => e.preventDefault()}>

            <SectionHeader label="IDENTIFICAÇÃO DE USUÁRIO" />

            <div className="grid grid-cols-1 md:grid-cols-2">

              <FormField label="Nome Completo" required className="md:col-span-2">
                <Input placeholder="Nome completo do usuário..." className={inputClass} />
              </FormField>

              <FormField label="Telefone">
                <PhoneInput placeholder="+55 (47) 99876-5432" className={inputClass} />
              </FormField>

              <FormField label="Ramal" required className="ml-5">
                <PhoneInput placeholder="3222-0000" className={inputClass} />
              </FormField>

              <FormField label="E-mail institucional" required className="md:col-span-2">
                <Input type='email' placeholder="gabi_glowglow@senai.edu" className={inputClass} />
              </FormField>

              <PasswordField />

            </div>

            <div className="mt-10">

              <SectionHeader label="NÍVEL DE ACESSO" />
              <AccessLevelSelector value={nivelAcesso} onChange={setNivelAcesso} />

            </div>

          </form>
        </div>

      </div>

      <div className="flex justify-end mt-5">
        <button
          type="submit"
          className="bg-[#103D85] hover:bg-[#0b2a5c] text-white shadow-sm font-bold text-[14px] py-3 px-27 rounded-xl transform"
        >
          Criar Usuário +
        </button>
      </div>
    </div>
  );
}