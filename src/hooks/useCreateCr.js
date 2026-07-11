import { useEffect, useState } from 'react';

import { useNotification } from '@/contexts/NotificationContext';

import { createCr, getSectorsSimple } from '@/service/createCr';

const VALIDATORS = {
    nome: (v) => v.trim().length === 0 ? 'O nome do CR é obrigatório.' : '',
    codigo: (v) => v.trim().length === 0 ? 'O código do CR é obrigatório.' : '',
    sectorName: (v) => v.trim().length === 0 ? 'Selecione um bloco responsável.' : '',
};

const INITIAL_FORM_STATE = {
    nome: '',
    codigo: '',
    master: true,
    sectorName: '',
};

export function useCreateCr() {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [sectors, setSectors] = useState([]);
    const [sectorsLoading, setSectorsLoading] = useState(true);
    const { showNotification } = useNotification();

    useEffect(() => {
        let cancelled = false;

        async function loadSectors() {
            try {
                const data = await getSectorsSimple();
                if (!cancelled) setSectors(data || []);
            } catch {
                if (!cancelled) showNotification('Não foi possível carregar os blocos responsáveis.', 'error');
            } finally {
                if (!cancelled) setSectorsLoading(false);
            }
        }

        loadSectors();

        return () => {
            cancelled = true;
        };
    }, [showNotification]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
            name: formData.nome.trim(),
            code: formData.codigo.trim(),
            master: formData.master,
            sectorName: formData.sectorName,
        };

        try {
            setIsLoading(true);
            await createCr.create(payload);

            showNotification('CR cadastrado com sucesso!', 'success');
            setFormData(INITIAL_FORM_STATE);
            setErrors({});
        } catch (error) {
            showNotification(error.message || 'Erro ao cadastrar CR. Verifique os dados ou a conexão.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        sectors,
        sectorsLoading,
        handleChange,
        handleSubmit,
    };
}
