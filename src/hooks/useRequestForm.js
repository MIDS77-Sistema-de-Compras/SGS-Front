import { useEffect, useState } from "react";

import { api, getPageContent } from "@/service/api";
import { createFullRequest, getAllMeasurementUnits } from "@/service/createProductRequest";
import { createFullServiceRequest } from "@/service/createServiceRequest";
import { useNotification } from "@/contexts/NotificationContext";
import ServiceAutocomplete from "./ServiceAutocomplete";

const REQUEST_TABS = [
    { valor: "produto", label: "PRODUTO" },
    { valor: "servico", label: "SERVIÇO" }
];

export function useRequestForm() {
    const { showNotification } = useNotification();
    const [abaAtiva, setAbaAtiva] = useState("produto");
    const [attachments, setAttachments] = useState([]);
    const [branch, setBranch] = useState("");
    const [requester, setRequester] = useState("");
    const [phone, setPhone] = useState("");
    const [crBranchId, setCrBranchId] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [serviceValue, setServiceValue] = useState("");
    const [serviceAdditionalInfo, setServiceAdditionalInfo] = useState("");
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [crOptions, setCrOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            try {
                const [crs, units] = await Promise.all([
                    api.get("/cr-branches?size=1000"),
                    getAllMeasurementUnits(),
                ]);

                if (cancelled) return;

                setCrOptions(
                    getPageContent(crs).map((cr) => ({
                        value: String(cr.id),
                        label: `${cr.crCode} - ${cr.crName}`,
                        branchName: cr.branchName ?? "",
                    }))
                );

                setUnitOptions(
                    getPageContent(units).map((measurementUnit) => ({
                        value: measurementUnit.name,
                        label: measurementUnit.abbreviation
                            ? `${measurementUnit.name} (${measurementUnit.abbreviation})`
                            : measurementUnit.name,
                    }))
                );
            } catch (error) {
                if (!cancelled) {
                    setFormError(error.message || "Erro ao carregar dados do formulário.");
                }
            }
        }

        loadData();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function loadCurrentUser() {
            try {
                const me = await api.get("/users/me");

                if (cancelled) return;

                setRequester(me.name ?? "");
                setPhone(me.extensionNumber ?? "");
            } catch {
                if (!cancelled) {
                    setRequester("");
                    setPhone("");
                }
            }
        }

        loadCurrentUser();

        return () => {
            cancelled = true;
        };
    }, []);

    function handleCrBranchChange(event) {
        const selectedCrBranchId = event.target.value;
        const selectedCr = crOptions.find((cr) => cr.value === selectedCrBranchId);

        setCrBranchId(selectedCrBranchId);
        setBranch(selectedCr?.branchName ?? "");
    }

    function handleAddProduct() {
        setFormError("");
        setSuccess(false);

        if (!productName.trim() || !quantity || !unit) {
            setFormError("Preencha produto, quantidade e unidade de medida antes de adicionar.");
            return;
        }

        setProducts((currentProducts) => [
            ...currentProducts,
            {
                id: crypto.randomUUID(),
                name: productName.trim(),
                quantity: Number(quantity),
                measurementUnit: unit,
                additionalInformations: additionalInfo.trim(),
            },
        ]);
        setProductName("");
        setQuantity("");
        setUnit("");
        setAdditionalInfo("");
    }

    function handleRemoveProduct(productId) {
        setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId));
    }

    function handleAddService() {
        setFormError("");
        setSuccess(false);

        if (!serviceName.trim() || !serviceValue || !serviceAdditionalInfo.trim()) {
            setFormError("Preencha título, valor e informações adicionais do serviço antes de adicionar.");
            return;
        }

        setServices((currentServices) => [
            ...currentServices,
            {
                id: crypto.randomUUID(),
                name: serviceName.trim(),
                totalValue: Number(serviceValue),
                additionalInformation: serviceAdditionalInfo.trim(),
            },
        ]);
        setServiceName("");
        setServiceValue("");
        setServiceAdditionalInfo("");
    }

    function handleRemoveService(serviceId) {
        setServices((currentServices) => currentServices.filter((service) => service.id !== serviceId));
    }

    const ALLOWED_TYPES = [
        'image/png',
        'image/jpeg',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'pdf', 'docx'];
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    function isFileAllowed(file) {
        if (ALLOWED_TYPES.includes(file.type)) return true;
        const ext = file.name.split('.').pop().toLowerCase();
        return ALLOWED_EXTENSIONS.includes(ext);
    }

    function handleFilesSelected(files) {
        const fileArray = Array.from(files ?? []);

        const wrongType = fileArray.filter((f) => !isFileAllowed(f));
        const tooBig = fileArray.filter((f) => isFileAllowed(f) && f.size > MAX_FILE_SIZE);
        const valid = fileArray.filter((f) => isFileAllowed(f) && f.size <= MAX_FILE_SIZE);

        if (wrongType.length > 0) {
            setFormError(`Formato não permitido: ${wrongType.map((f) => f.name).join(', ')}. Use PNG, JPEG, PDF ou DOCX.`);
        } else if (tooBig.length > 0) {
            setFormError(`Arquivo muito grande: ${tooBig.map((f) => f.name).join(', ')}. Máximo 10MB por arquivo.`);
        }

        if (valid.length > 0) {
            setAttachments((prev) => [...prev, ...valid]);
        }
    }

    function handleRemoveAttachment(index) {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");
        setSuccess(false);

        if (!crBranchId) {
            setFormError("Selecione o CR e Projeto.");
            showNotification("Selecione o CR e Projeto antes de finalizar.", "error");
            return;
        }

        if (abaAtiva === "produto") {
            if (products.length === 0) {
                setFormError("Adicione pelo menos um produto antes de finalizar.");
                showNotification("Adicione pelo menos um produto antes de finalizar.", "error");
                return;
            }

            try {
                setSubmitting(true);
                await createFullRequest({
                    crBranchId,
                    products,
                    attachments,
                });

                setSuccess(true);
                showNotification("Solicitação criada com sucesso!", "success");
                setBranch("");
                setCrBranchId("");
                setProducts([]);
                setAttachments([]);
            } catch (error) {
                setFormError(error.message || "Erro ao criar a solicitação.");
                showNotification("Erro ao criar a solicitação. Verifique os dados ou a conexão.", "error");
            } finally {
                setSubmitting(false);
            }
            return;
        }

        if (services.length === 0) {
            setFormError("Adicione pelo menos um serviço antes de finalizar.");
            showNotification("Adicione pelo menos um serviço antes de finalizar.", "error");
            return;
        }

        try {
            setSubmitting(true);
            await createFullServiceRequest({
                crBranchId,
                services,
                attachments,
            });

            setSuccess(true);
            showNotification("Solicitação criada com sucesso!", "success");
            setBranch("");
            setCrBranchId("");
            setServices([]);
            setAttachments([]);
        } catch (error) {
            setFormError(error.message || "Erro ao criar a solicitação.");
            showNotification("Erro ao criar a solicitação. Verifique os dados ou a conexão.", "error");
        } finally {
            setSubmitting(false);
        }
    }

    return {
        abaAtiva,
        setAbaAtiva,
        abas: REQUEST_TABS,
        branch,
        requester,
        setRequester,
        phone,
        setPhone,
        crBranchId,
        productName,
        setProductName,
        quantity,
        setQuantity,
        unit,
        setUnit,
        additionalInfo,
        setAdditionalInfo,
        serviceName,
        setServiceName,
        serviceValue,
        setServiceValue,
        serviceAdditionalInfo,
        setServiceAdditionalInfo,
        products,
        services,
        crOptions,
        unitOptions,
        submitting,
        formError,
        success,
        handleCrBranchChange,
        handleAddProduct,
        handleRemoveProduct,
        handleAddService,
        handleRemoveService,
        handleFilesSelected,
        handleRemoveAttachment,
        handleSubmit,
        attachments,
    };
}