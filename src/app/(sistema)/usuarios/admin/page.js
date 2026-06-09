'use client';

import { useState } from 'react';
import PasswordField from '@/components/adm/PasswordField';
import { Input } from '@/components/login/Input';
import PhoneInput from '@/components/adm/PhoneInput';
import SectionHeader from '@/components/adm/SectionHeader';
import FormField from '@/components/adm/FormField';
import AccessLevelSelector from '@/components/adm/AccessLevelSelector';
import { useNotification } from '@/contexts/NotificationContext';


export default function CadastroUsuarios() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [ramal, setRamal] = useState('');
  const [senha, setSenha] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('DOCENTE');
  const { showNotification } = useNotification();

  const inputClass = "!h-auto py-2.5 !text-sm !border-gray-200 !rounded-xl !shadow-sm !bg-white focus:!border-[#103D85] focus:!ring-0.5 focus:!ring-[#103D85]"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: nome,
      email: email,
      cpf: cpf.replace(/\D/g, ''),
      password: senha,
      extensionNumber: ramal.replace(/\D/g, ''),
      active: true,
      nameRole: nivelAcesso
    };
    console.log("DADOS SENDO ENVIADOS PARA A API:", payload);

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showNotification("Usuário cadastrado com sucesso!", "success");
      } else {

        const errorData = await response.json();
        console.error('Erros de validação:', errorData);
        showNotification("Erro ao cadastrar usuário. Verifique os dados.", "error");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      showNotification("Não foi possível conectar ao servidor.", "error");
    }
  };


  return (
    <div className="w-full flex flex-col">

      <div className="bg-white p-5 rounded-xl shadow-sm border border-[#AAAAAA] flex flex-col justify-between">

        <div>
          <h1 className="text-[22px] font-bold text-[#103D85]">
            Cadastrar Usuário
          </h1>

          <div className="border-t border-[#AAAAAA] mt-2 mb-5 -mx-5" />

          <form onSubmit={handleSubmit}>

            <SectionHeader label="IDENTIFICAÇÃO DE USUÁRIO" />

            <div className="grid grid-cols-1 md:grid-cols-2">

              <FormField label="Nome Completo" required className="md:col-span-2">
                <Input placeholder="Nome completo do usuário..." className={inputClass} value={nome} onChange={(e) => setNome(e.target.value)} />
              </FormField>
              <FormField label="CPF" required>
                <Input
                  placeholder="000.000.000-00"
                  className={inputClass}
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormField>
              <FormField label="Ramal" required className="ml-5">
                <PhoneInput
                  placeholder="3222-0000"
                  className={inputClass}
                  value={ramal}
                  onChange={(e) => setRamal(e.target.value)}
                />
              </FormField>

              <FormField label="E-mail institucional" required className="md:col-span-2">
                <Input type='email' placeholder="nome@senai.edu" className={inputClass} value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </FormField>

              <PasswordField
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

            </div>

            <div className="mt-10">

              <SectionHeader label="NÍVEL DE ACESSO" />
              <AccessLevelSelector value={nivelAcesso} onChange={setNivelAcesso} />

            </div>
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="bg-[#103D85] hover:bg-[#0b2a5c] text-white shadow-sm font-bold text-[14px] py-3 px-27 rounded-xl transform"
              >
                Criar Usuário +
              </button>
            </div>
          </form>
        </div>

      </div>


    </div>
  );
}