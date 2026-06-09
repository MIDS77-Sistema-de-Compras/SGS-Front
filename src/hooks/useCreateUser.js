import { useState } from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { createUser } from '@/service/createUser';

const VALIDATORS = {
  nome: (v) => v.trim().length < 3 ? 'Nome deve ter ao menos 3 caracteres.' : '',
  email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'E-mail inválido.' : '',
  cpf: (v) => v.replace(/\D/g, '').length !== 11 ? 'CPF deve ter 11 dígitos.' : '',
  ramal: (v) => {
    const apenasNumeros = v.replace(/\D/g, '');
    return apenasNumeros.length < 3 || apenasNumeros.length > 4
      ? 'O ramal deve ter entre 3 e 4 números.' 
      : '';
  },
  senha: (v) => v.length < 6 ? 'Senha deve ter o nível máximo de força.' : '',
};

const INITIAL_FORM_STATE = {
    nome: '',
    email: '',
    cpf: '',
    ramal: '',
    senha: '',
    nivelAcesso: 'DOCENTE',
};

export function useCreateUser() {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});
    const { showNotification } = useNotification();

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleBlur = (field, value) => {
        const error = VALIDATORS[field]?.(value) ?? '';
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(VALIDATORS).forEach((key) => {
            newErrors[key] = VALIDATORS[key](formData[key]);
        });
        setErrors(newErrors);

        if (Object.values(newErrors).some((err) => err !== '')) {
            showNotification('Preencha corretamente os campos destacados antes de continuar.', 'error');
            return;
        }

        const payload = {
            name: formData.nome,
            email: formData.email,
            cpf: formData.cpf.replace(/\D/g, ''),
            password: formData.senha,
            extensionNumber: formData.ramal.replace(/\D/g, ''),
            active: true,
            nameRole: formData.nivelAcesso,
        };

        try {
            await createUser.create(payload);
            showNotification("Usuário cadastrado com sucesso!", "success");
            setFormData(INITIAL_FORM_STATE);
            setErrors({});
        } catch (error) {
            console.error("Erro ao cadastrar:", error.details || error.message);
            showNotification("Erro ao cadastrar usuário. Verifique os dados ou a conexão.", "error");
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    };
}