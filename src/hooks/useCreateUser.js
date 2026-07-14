import { useState } from 'react';

import { useNotification } from '@/contexts/NotificationContext';

import { createUser } from '@/service/users/usersSearch';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;

const VALIDATORS = {
    nome: (v) => v.trim().length < 3 ? 'Nome deve ter ao menos 3 caracteres.' : '',
    email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'E-mail inválido.' : '',
    cpf: (v) => v.replace(/\D/g, '').length !== 11 ? 'CPF deve ter 11 dígitos.' : '',
    ramal: (v) => {
        const apenasNumeros = v.replace(/\D/g, '');
        return apenasNumeros.length < 4 || apenasNumeros.length > 6
            ? 'O ramal deve ter entre 4 e 6 números.'
            : '';
    },
    senha: (v) => {
        return PASSWORD_REGEX.test(v || '')
            ? ''
            : 'A senha deve ter 8-30 caracteres, com maiúscula, minúscula, número e um dos símbolos @$!%*#?&.';
    },
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
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            await createUser(payload);

            showNotification("Usuário cadastrado com sucesso!", "success");
            setFormData(INITIAL_FORM_STATE);
            setErrors({});

        } catch (error) {
            console.error("Erro ao cadastrar:", error.details || error.message);
            showNotification(error.message || "Erro ao cadastrar usuário. Verifique os dados ou a conexão.", "error");

        } finally {
            setIsLoading(false)
        }
    };

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleBlur,
        handleSubmit,
    };
}