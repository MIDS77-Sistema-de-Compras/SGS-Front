import { useEffect, useState } from 'react';

import { useNotification } from '@/contexts/NotificationContext';

import {
    createCr,
    createCrBranch,
    getActiveSupervisors,
    getBranchesSimple,
    getSectorsSimple,
} from '@/service/createCr';

const DESCRIPTION_MAX_LENGTH = 255;

const VALIDATORS = {
    nome: (v) => v.trim().length === 0 ? 'O nome do CR é obrigatório.' : '',
    codigo: (v) => v.trim().length === 0 ? 'O código do CR é obrigatório.' : '',
    descricao: (v) => v.trim().length > DESCRIPTION_MAX_LENGTH
        ? `A descrição não pode ter mais de ${DESCRIPTION_MAX_LENGTH} caracteres.`
        : '',
    sectorName: (v) => v.trim().length === 0 ? 'Selecione um bloco responsável.' : '',
    branchId: (v) => v.trim().length === 0 ? 'Selecione a filial vinculada.' : '',
};

const INITIAL_FORM_STATE = {
    nome: '',
    codigo: '',
    descricao: '',
    master: true,
    sectorName: '',
    branchId: '',
    responsibleUserId1: '',
    responsibleUserId2: '',
};

export function useCreateCr() {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [sectors, setSectors] = useState([]);
    const [sectorsLoading, setSectorsLoading] = useState(true);
    const [branches, setBranches] = useState([]);
    const [branchesLoading, setBranchesLoading] = useState(true);
    const [supervisors, setSupervisors] = useState([]);
    const [supervisorsLoading, setSupervisorsLoading] = useState(true);
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

        async function loadBranches() {
            try {
                const data = await getBranchesSimple();
                if (!cancelled) setBranches(data || []);
            } catch {
                if (!cancelled) showNotification('Não foi possível carregar as filiais.', 'error');
            } finally {
                if (!cancelled) setBranchesLoading(false);
            }
        }

        async function loadSupervisors() {
            try {
                const data = await getActiveSupervisors();
                if (!cancelled) setSupervisors(data || []);
            } catch {
                if (!cancelled) showNotification('Não foi possível carregar os supervisores.', 'error');
            } finally {
                if (!cancelled) setSupervisorsLoading(false);
            }
        }

        loadSectors();
        loadBranches();
        loadSupervisors();

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

        if (
            formData.responsibleUserId1 &&
            formData.responsibleUserId2 &&
            formData.responsibleUserId1 === formData.responsibleUserId2
        ) {
            showNotification('Selecione dois supervisores responsáveis diferentes.', 'error');
            return;
        }

        const payload = {
            name: formData.nome.trim(),
            code: formData.codigo.trim(),
            description: formData.descricao.trim(),
            master: formData.master,
            sectorName: formData.sectorName,
        };

        const responsibleUsersId = [formData.responsibleUserId1, formData.responsibleUserId2]
            .filter(Boolean)
            .map(Number);

        let createdCr = null;

        try {
            setIsLoading(true);
            createdCr = await createCr.create(payload);

            await createCrBranch.create({
                branchId: Number(formData.branchId),
                crId: createdCr.id,
                responsibleUsersId: responsibleUsersId.length > 0 ? responsibleUsersId : null,
            });

            showNotification('CR cadastrado e vinculado à filial com sucesso!', 'success');
            setFormData(INITIAL_FORM_STATE);
            setErrors({});
        } catch (error) {
            const message = createdCr
                ? `CR "${createdCr.name}" (código ${createdCr.code}) foi criado, mas falhou ao vincular à filial: ${error.message || 'erro desconhecido'}. Vincule manualmente antes de tentar cadastrar de novo.`
                : (error.message || 'Erro ao cadastrar CR. Verifique os dados ou a conexão.');
            showNotification(message, 'error');
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
        branches,
        branchesLoading,
        supervisors,
        supervisorsLoading,
        handleChange,
        handleSubmit,
    };
}
