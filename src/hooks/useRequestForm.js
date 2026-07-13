import { useEffect, useState } from "react";

import { api, getPageContent } from "@/service/api";
import { createFullRequest, getAllMeasurementUnits } from "@/service/createProductRequest";
import { createFullServiceRequest } from "@/service/createServiceRequest";
import { useNotification } from "@/contexts/NotificationContext";

const REQUEST_TABS = [
    { valor: "produto", label: "PRODUTO" },
    { valor: "servico", label: "SERVIÇO" }
];

export function useRequestForm() {
    const { showNotification } = useNotification();
    const [abaAtiva, setAbaAtiva] = useState("produto");
    const [attachments, setAttachments] = useState([]);
    const [branchId, setBranchId] = useState("");
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
    const [branchOptions, setBranchOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            try {
                const [crs, branches, units] = await Promise.all([
                    api.get("/cr-branches?size=1000"),
                    api.get("/branches"),
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

                setBranchOptions(
                    getPageContent(branches).map((branch) => ({
                        value: String(branch.id),
                        label: branch.name,
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

    const selectedBranchName = branchOptions.find(
        (branchOption) => branchOption.value === branchId
    )?.label ?? "";

    const filteredCrOptions = branchId
        ? crOptions.filter((cr) => cr.branchName === selectedBranchName)
        : crOptions;

    function handleBranchChange(event) {
        const selectedBranchId = event.target.value;
        setBranchId(selectedBranchId);

        const newBranchName = branchOptions.find(
            (branchOption) => branchOption.value === selectedBranchId
        )?.label ?? "";

        const currentCr = crOptions.find((cr) => cr.value === crBranchId);
        if (currentCr && selectedBranchId && currentCr.branchName !== newBranchName) {
            setCrBranchId("");
        }
    }

    function handleCrBranchChange(event) {
        setCrBranchId(event.target.value);
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

        if (!branchId) {
            setFormError("Selecione a Filial Pagadora.");
            showNotification("Selecione a Filial Pagadora antes de finalizar.", "error");
            return;
        }

        if (!crBranchId) {
            setFormError("Selecione o CR e Projeto.");
            showNotification("Selecione o CR e Projeto antes de finalizar.", "error");
            return;
        }

        if (abaAtiva === "produto") {
            if (productName.trim() || quantity || unit) {
                setFormError("Você preencheu os campos, mas esqueceu de clicar no botão '+' para adicionar o produto.");
                showNotification("Adicione o produto pendente à lista antes de finalizar.", "warning");
                return;
            }

            if (products.length === 0) {
                setFormError("Adicione pelo menos um produto antes de finalizar.");
                showNotification("Adicione pelo menos um produto antes de finalizar.", "error");
                return;
            }

            const payloadProducts = products.map(({ id, ...rest }) => rest);

            try {
                setSubmitting(true);
                await createFullRequest({
                    crBranchId,
                    products: payloadProducts, 
                    attachments,
                });

                setSuccess(true);
                showNotification("Solicitação criada com sucesso!", "success");
                setBranchId("");
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

        if (abaAtiva === "servico") { 

            if (serviceName.trim() || serviceValue || serviceAdditionalInfo.trim()) {
                setFormError("Você preencheu os campos, mas esqueceu de clicar no botão '+' para adicionar o serviço.");
                showNotification("Adicione o serviço pendente à lista antes de finalizar.", "warning");
                return;
            }

            if (services.length === 0) {
                setFormError("Adicione pelo menos um serviço antes de finalizar.");
                showNotification("Adicione pelo menos um serviço antes de finalizar.", "error");
                return;
            }

            const payloadServices = services.map(({ id, ...rest }) => rest);

            try {
                setSubmitting(true);
                await createFullServiceRequest({
                    crBranchId,
                    services: payloadServices, 
                    attachments,
                });

                setSuccess(true);
                showNotification("Solicitação criada com sucesso!", "success");
                setBranchId("");
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
    }

    return {
        abaAtiva,
        setAbaAtiva,
        abas: REQUEST_TABS,
        branchId,
        branchOptions,
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
        crOptions: filteredCrOptions,
        services,
        unitOptions,
        submitting,
        formError,
        success,
        handleBranchChange,
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