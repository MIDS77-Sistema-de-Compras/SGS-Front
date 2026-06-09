'use client';

import { useState } from 'react';
import PasswordField from '@/components/features/admin/PasswordField';
import { Input } from '@/components/ui/input/Input';
import PhoneInput from '@/components/ui/input/PhoneInput';
import SectionHeader from '@/components/ui/layout/SectionHeader';
import FormField from '@/components/ui/form/FormField';
import AccessLevelSelector from '@/components/features/admin/AccessLevelSelector';
import { useNotification } from '@/contexts/NotificationContext';
import FieldError from '@/components/ui/form/FieldError';
import Button from '@/components/ui/button/Button';

export default function CadastroUsuarios() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [ramal, setRamal] = useState('');
  const [senha, setSenha] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('DOCENTE');
  const [errors, setErrors] = useState({});
  const { showNotification } = useNotification();

  const validators = {
    nome: (v) => v.trim().length < 3 ? 'Nome deve ter ao menos 3 caracteres.' : '',
    email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'E-mail inválido.' : '',
    cpf: (v) => v.replace(/\D/g, '').length !== 11 ? 'CPF deve ter 11 dígitos.' : '',
    ramal: (v) => !/^\d{4}-\d{4}$/.test(v) ? 'Ramal inválido. Use o formato 3222-0000.' : '',
    senha: (v) => v.length < 6 ? 'Senha deve ter ao menos 6 caracteres.' : '',
  };

  const handleBlur = (field, value) => {
    const error = validators[field]?.(value) ?? '';
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      nome: validators.nome(nome),
      email: validators.email(email),
      cpf: validators.cpf(cpf),
      ramal: validators.ramal(ramal),
      senha: validators.senha(senha),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== '');
    if (hasErrors) {
      showNotification('Preencha corretamente os campos destacados antes de continuar.', 'error');
      return;
    }

    const payload = {
      name: nome,
      email: email,
      cpf: cpf.replace(/\D/g, ''),
      password: senha,
      extensionNumber: ramal.replace(/\D/g, ''),
      active: true,
      nameRole: nivelAcesso,
    };

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
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
                <Input
                  variant="form"
                  placeholder="Nome completo do usuário..."
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={() => handleBlur('nome', nome)}
                  error={errors.nome}
                />
                <FieldError message={errors.nome} />
              </FormField>
              <FormField label="CPF" required>
                <Input
                  variant="form"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  onBlur={() => handleBlur('cpf', cpf)}
                  error={errors.cpf}
                />
                <FieldError message={errors.cpf} />
              </FormField>

              <FormField label="Ramal" required className="ml-5">
                <PhoneInput
                  placeholder="3222-0000"
                  value={ramal}
                  onChange={(e) => setRamal(e.target.value)}
                  onBlur={() => handleBlur('ramal', ramal)}
                  error={errors.ramal}
                />
                <FieldError message={errors.ramal} />
              </FormField>

              <FormField label="E-mail institucional" required className="md:col-span-2">
                <Input
                  type="email"
                  variant="form"
                  placeholder="nome@senai.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email', email)}
                  error={errors.email}
                />
                <FieldError message={errors.email} />
              </FormField>

              <div className="md:col-span-2">
                <PasswordField
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  onBlur={() => handleBlur('senha', senha)}
                  error={errors.senha}
                />
                <FieldError message={errors.senha} />
              </div>

            </div>

            <div className="mt-10">

              <SectionHeader label="NÍVEL DE ACESSO" />
              <AccessLevelSelector value={nivelAcesso} onChange={setNivelAcesso} />

            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              <div className="col-start-2 md:col-start-4">
                <Button type="submit" variant="primary" className="w-full">
                  CRIAR USUÁRIO +
                </Button>
              </div>
            </div>

          </form>
        </div>

      </div>


    </div>
  );
}
