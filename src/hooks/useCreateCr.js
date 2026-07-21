import { useEffect, useState } from 'react';

import { useNotification } from '@/contexts/NotificationContext';

import {
    createCr,
    createCrBranch,
    getActiveCrResponsibles,
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
    const [coordinators, setCoordinators] = useState([]);
    const [responsiblesLoading, setResponsiblesLoading] = useState(true);
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

        async function loadResponsibles() {
            try {
                const data = await getActiveCrResponsibles();
                if (!cancelled) {
                    setSupervisors(data.supervisors || []);
                    setCoordinators(data.coordinators || []);
                }
            } catch {
                if (!cancelled) showNotification('Não foi possível carregar os responsáveis.', 'error');
            } finally {
                if (!cancelled) setResponsiblesLoading(false);
            }
        }

        loadSectors();
        loadBranches();
        loadResponsibles();

        return () => {
            cancelled = true;
        };
    }, [showNotification]);

    const handleChange = (field, value) => {
        setFormData((prev) => field === 'master'
            ? {
                ...prev,
                master: value,
                responsibleUserId1: '',
                responsibleUserId2: '',
            }
            : { ...prev, [field]: value }
        );
        setErrors((current) => ({
            ...current,
            [field]: '',
            ...(field === 'master' && { responsibleUserId1: '', responsibleUserId2: '' }),
        }));
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

        if (formData.master && !formData.responsibleUserId1) {
            setErrors((current) => ({
                ...current,
                responsibleUserId1: 'Selecione o coordenador responsável pelo CR Master.',
            }));
            showNotification('Selecione o coordenador responsável pelo CR Master.', 'error');
            return;
        }

        if (
            !formData.master &&
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

        const selectedResponsibleIds = formData.master
            ? [formData.responsibleUserId1]
            : [formData.responsibleUserId1, formData.responsibleUserId2];

        const responsibleUsersId = selectedResponsibleIds
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
        coordinators,
        responsiblesLoading,
        handleChange,
        handleSubmit,
    };
}
