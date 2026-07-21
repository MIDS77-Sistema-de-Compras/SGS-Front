import { useEffect, useRef, useState } from "react";

import { api, getPageContent } from "@/service/api";
import { getAllCRBranches } from "@/service/crSearch";
import {
    createFullRequest,
    editFullRequest,
    getAllMeasurementUnits,
} from "@/service/createProductRequest";
import { createFullServiceRequest } from "@/service/createServiceRequest";
import { useNotification } from "@/contexts/NotificationContext";
import { csvConvertForProducts, csvParse } from "@/lib/utils/csvToJson";
import {
    checkAndPushElements,
    checkAndPushProducts,
    checkAndSubmitElements,
    handleProductRequest,
    handleProvisionRequest,
} from "@/lib/utils/csvHandlers";
import {
    CATALOG_SERVICE_MESSAGE,
    DUPLICATE_PRODUCT_MESSAGE,
    DUPLICATE_SERVICE_MESSAGE,
    getRequestErrorMessage,
    hasCatalogServiceWithName,
    hasEquivalentRequestItem,
} from "@/lib/utils/requestItemValidation";

const REQUEST_TABS = [
    { valor: "produto", label: "PRODUTO" },
    { valor: "servico", label: "SERVIÇO" },
    { valor: "importing", label: "IMPORTAR" },
];

export function useRequestForm({ initialRequest = null, onSaved } = {}) {
    const { showNotification } = useNotification();

    const initialIsService =
        (initialRequest?.servicos || []).length > 0 &&
        (initialRequest?.produtos || []).length === 0;

    const [abaAtiva, setAbaAtiva] = useState(
        initialIsService ? "servico" : "produto"
    );
    const [attachments, setAttachments] = useState([]);
    const [existingAttachments, setExistingAttachments] = useState(
        initialRequest?.attachments || []
    );
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [branchId, setBranchId] = useState("");
    const [requester, setRequester] = useState("");
    const [phone, setPhone] = useState("");
    const [crBranchId, setCrBranchId] = useState(
        String(initialRequest?.crBranchId || initialRequest?.crBranch?.id || "")
    );
    const [productName, setProductName] = useState("");
    const [variation, setVariation] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [serviceValue, setServiceValue] = useState("");
    const [serviceAdditionalInfo, setServiceAdditionalInfo] = useState("");

    const [products, setProducts] = useState(() =>
        (initialRequest?.produtos || []).map((product) => ({
            id: product.id,
            name: product.nome,
            variation: product.variation || "",
            quantity: Number(product.quantity),
            measurementUnit: product.unit,
            additionalInformations: product.additionalInformations || "",
        }))
    );

    const [services, setServices] = useState(() =>
        (initialRequest?.servicos || []).map((service) => ({
            id: service.id,
            provisionId: service.provisionId,
            name: service.nome,
            totalValue: Number(service.totalValue),
            description:
                service.description || service.additionalInformation || "",
            additionalInformation: service.additionalInformation || "",
        }))
    );

    const [crOptions, setCrOptions] = useState([]);
    const [branchOptions, setBranchOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [csvError, setCsvError] = useState("");
    const [csvType, setCsvType] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState(false);
    const [productError, setProductError] = useState("");
    const [serviceError, setServiceError] = useState("");
    const [serviceCatalog, setServiceCatalog] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const submittingRef = useRef(false);

    const isEditMode = Boolean(initialRequest?.id);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            try {
                const [crs, branches, units, provisions] = await Promise.all([
                    getAllCRBranches(),
                    api.get("/branches"),
                    getAllMeasurementUnits(),
                    api.get("/provisions").catch(() => []),
                ]);

                if (cancelled) return;

                const nextCrOptions = getPageContent(crs).map((cr) => ({
                    value: String(cr.id),
                    label: `${cr.crCode} - ${cr.crName}`,
                    branchName: cr.branchName ?? "",
                    master: cr.master === true,
                }));

                const nextBranchOptions = getPageContent(branches).map(
                    (branch) => ({
                        value: String(branch.id),
                        label: branch.name,
                    })
                );

                setCrOptions(nextCrOptions);
                setBranchOptions(nextBranchOptions);

                if (initialRequest) {
                    const branchName =
                        initialRequest.crBranch?.branchName || "";

                    setBranchId(
                        nextBranchOptions.find(
                            (option) => option.label === branchName
                        )?.value || ""
                    );
                }

                setUnitOptions(
                    getPageContent(units).map((measurementUnit) => ({
                        value: measurementUnit.name,
                        label: measurementUnit.abbreviation
                            ? `${measurementUnit.name} (${measurementUnit.abbreviation})`
                            : measurementUnit.name,
                    }))
                );

                setServiceCatalog(getPageContent(provisions));
            } catch (error) {
                if (!cancelled) {
                    setFormError(
                        error.message ||
                            "Erro ao carregar dados do formulário."
                    );
                }
            }
        }

        loadData();

        return () => {
            cancelled = true;
        };
    }, [initialRequest]);

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

    const selectedBranchName =
        branchOptions.find(
            (branchOption) => branchOption.value === branchId
        )?.label ?? "";

    const filteredCrOptions = branchId
        ? crOptions.filter((cr) => cr.branchName === selectedBranchName)
        : crOptions;

    function handleBranchChange(event) {
        const selectedBranchId = event.target.value;
        setBranchId(selectedBranchId);

        const newBranchName =
            branchOptions.find(
                (branchOption) => branchOption.value === selectedBranchId
            )?.label ?? "";

        const currentCr = crOptions.find(
            (cr) => cr.value === crBranchId
        );

        if (
            currentCr &&
            selectedBranchId &&
            currentCr.branchName !== newBranchName
        ) {
            setCrBranchId("");
        }
    }

    function handleCrBranchChange(event) {
        setCrBranchId(event.target.value);
    }

    function handleProductNameChange(name) {
        setProductName(name);
        setProductError("");
    }

    function handleProductSelection(product) {
        handleProductNameChange(product.name);
    }

    function handleServiceNameChange(name) {
        setServiceName(name);
        setSelectedServiceId(null);
        setServiceError("");
    }

    function handleServiceSelection(provision) {
        setServiceName(provision.name);
        setServiceValue(String(provision.totalValue ?? ""));
        setServiceAdditionalInfo(provision.description ?? "");
        setSelectedServiceId(provision.id);
        setServiceError("");
    }

    function handleAddProduct() {
        if (submittingRef.current) return;

        setFormError("");
        setSuccess(false);

        if (!productName.trim() || !quantity || !unit) {
            setFormError(
                "Preencha produto, quantidade e unidade de medida antes de adicionar."
            );
            return;
        }

        const otherProducts = editingProductId
            ? products.filter((p) => p.id !== editingProductId)
            : products;

        if (hasEquivalentRequestItem(otherProducts, productName)) {
            setProductError(DUPLICATE_PRODUCT_MESSAGE);
            showNotification(DUPLICATE_PRODUCT_MESSAGE, "error");
            return;
        }

        setProducts((currentProducts) => {
            const nextProduct = {
                id: editingProductId || crypto.randomUUID(),
                name: productName.trim(),
                variation: variation.trim(),
                quantity: Number(quantity),
                measurementUnit: unit,
                additionalInformations: additionalInfo.trim(),
            };

            return editingProductId
                ? currentProducts.map((product) =>
                      product.id === editingProductId
                          ? nextProduct
                          : product
                  )
                : [...currentProducts, nextProduct];
        });

        setProductError("");
        setEditingProductId(null);
        setProductName("");
        setVariation("");
        setQuantity("");
        setUnit("");
        setAdditionalInfo("");
    }

    function handleRemoveProduct(productId) {
        setProducts((currentProducts) =>
            currentProducts.filter((product) => product.id !== productId)
        );
        setProductError("");
    }

    function handleEditProduct(product) {
        setEditingProductId(product.id);
        setProductName(product.name || "");
        setVariation(product.variation || "");
        setQuantity(String(product.quantity ?? ""));
        setUnit(product.measurementUnit || "");
        setAdditionalInfo(product.additionalInformations || "");
    }

    function handleAddService() {
        if (submittingRef.current) return;

        setFormError("");
        setSuccess(false);

        if (
            !serviceName.trim() ||
            !serviceValue ||
            !serviceAdditionalInfo.trim()
        ) {
            setFormError(
                "Preencha título, valor e informações adicionais do serviço antes de adicionar."
            );
            return;
        }

        const otherServices = editingServiceId
            ? services.filter((s) => s.id !== editingServiceId)
            : services;

        if (hasEquivalentRequestItem(otherServices, serviceName)) {
            setServiceError(DUPLICATE_SERVICE_MESSAGE);
            showNotification(DUPLICATE_SERVICE_MESSAGE, "error");
            return;
        }

        if (
            selectedServiceId === null &&
            hasCatalogServiceWithName(serviceCatalog, serviceName)
        ) {
            setServiceError(CATALOG_SERVICE_MESSAGE);
            showNotification(CATALOG_SERVICE_MESSAGE, "error");
            return;
        }

        setServices((currentServices) => {
            const currentService = currentServices.find(
                (service) => service.id === editingServiceId
            );

            const nextService = {
                id: editingServiceId || crypto.randomUUID(),
                provisionId: currentService?.provisionId,
                name: serviceName.trim(),
                totalValue: Number(serviceValue),
                description:
                    currentService?.description ||
                    serviceAdditionalInfo.trim(),
                additionalInformation: serviceAdditionalInfo.trim(),
            };

            return editingServiceId
                ? currentServices.map((service) =>
                      service.id === editingServiceId
                          ? nextService
                          : service
                  )
                : [...currentServices, nextService];
        });

        setServiceError("");
        setEditingServiceId(null);
        setServiceName("");
        setServiceValue("");
        setServiceAdditionalInfo("");
        setSelectedServiceId(null);
    }

    function handleRemoveService(serviceId) {
        setServices((currentServices) =>
            currentServices.filter((service) => service.id !== serviceId)
        );
        setServiceError("");
    }

    function handleEditService(service) {
        setEditingServiceId(service.id);
        setServiceName(service.name || "");
        setServiceValue(String(service.totalValue ?? ""));
        setServiceAdditionalInfo(
            service.additionalInformation || service.description || ""
        );
    }

    const ALLOWED_TYPES = [
        "image/png",
        "image/jpeg",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/csv",
    ];

    const ALLOWED_EXTENSIONS = [
        "png",
        "jpg",
        "jpeg",
        "pdf",
        "docx",
        "csv",
    ];

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    function isFileAllowed(file) {
        if (ALLOWED_TYPES.includes(file.type)) return true;

        const extension = file.name
            .split(".")
            .pop()
            .toLowerCase();

        return ALLOWED_EXTENSIONS.includes(extension);
    }

    function handleFilesSelected(files) {
        const fileArray = Array.from(files ?? []);

        const wrongType = fileArray.filter(
            (file) => !isFileAllowed(file)
        );

        const tooBig = fileArray.filter(
            (file) =>
                isFileAllowed(file) &&
                file.size > MAX_FILE_SIZE
        );

        const valid = fileArray.filter(
            (file) =>
                isFileAllowed(file) &&
                file.size <= MAX_FILE_SIZE
        );

        if (wrongType.length > 0) {
            setFormError(
                `Formato não permitido: ${wrongType
                    .map((file) => file.name)
                    .join(
                        ", "
                    )}. Use PNG, JPEG, PDF, DOCX ou CSV.`
            );
        } else if (tooBig.length > 0) {
            setFormError(
                `Arquivo muito grande: ${tooBig
                    .map((file) => file.name)
                    .join(
                        ", "
                    )}. Máximo 10MB por arquivo. 50MB se CSV.`
            );
        }

        if (valid.length > 0) {
            setAttachments((current) => [
                ...current,
                ...valid,
            ]);
        }
    }

    function handleRemoveAttachment(index) {
        setAttachments((current) =>
            current.filter((_, currentIndex) => currentIndex !== index)
        );
    }

    function handleRemoveExistingAttachment(attachmentId) {
        setExistingAttachments((current) =>
            current.filter(
                (attachment) => attachment.id !== attachmentId
            )
        );
    }

    async function handleImportSubmit() {
        setCsvError("");
        setCsvData([]);

        try {
            const csvFile = attachments.find((file) =>
                file.name.toLowerCase().endsWith(".csv")
            );

            if (!csvFile) {
                throw new Error(
                    "Por favor, selecione um arquivo .csv"
                );
            }

            const csvContent = await new Promise(
                (resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = (event) =>
                        resolve(event.target.result);

                    reader.onerror = (event) =>
                        reject(event);

                    reader.readAsText(csvFile);
                }
            );

            const dataLines = csvParse(csvContent);

            if (dataLines.length === 0) {
                throw new Error(
                    "Nenhum dado encontrado no arquivo .csv"
                );
            }

            const validationErrors = [];
            const validRequests = [];

            if (dataLines[0].PRODUTO) {
                setCsvType("product");

                handleProductRequest(
                    validRequests,
                    dataLines,
                    validationErrors
                );
            } else {
                setCsvType("provision");

                handleProvisionRequest(
                    validRequests,
                    dataLines,
                    validationErrors
                );
            }

            if (validationErrors.length > 0) {
                throw new Error(
                    validationErrors.join("\n")
                );
            }

            setCsvData(validRequests);
        } catch (error) {
            setCsvError(
                error.message ||
                    "Erro ao processar o CSV."
            );
        } finally {
            setSubmitting(false);
        }
    }

    async function handleConfirmImport() {
        if (csvData.length === 0) {
            setCsvError(
                "Nenhum dado válido para importar."
            );
            return;
        }

        setIsProcessing(true);
        setCsvError("");

        try {
            const elementsByCrProject =
                checkAndPushElements(csvData, csvType);

            const validCrProjectIds = Object.keys(
                elementsByCrProject
            ).filter(
                (id) => id && id.trim() !== ""
            );

            if (validCrProjectIds.length === 0) {
                throw new Error(
                    "Nenhum CR/Project válido encontrado no CSV."
                );
            }

            const submissionResults = [];

            await checkAndSubmitElements(
                submissionResults,
                elementsByCrProject,
                csvType,
                attachments
            );

            const successfulSubmissions =
                submissionResults.filter(
                    (result) => result.success
                ).length;

            const failedSubmissions =
                submissionResults.filter(
                    (result) => !result.success
                ).length;

            if (failedSubmissions === 0) {
                showNotification(
                    `Sucesso na submissão de ${successfulSubmissions} solicitação(es)!`,
                    "success"
                );
            } else if (successfulSubmissions === 0) {
                showNotification(
                    "Falha na submissão de suas solicitações.",
                    "error"
                );
            } else {
                showNotification(
                    `Sucesso na submissão de ${successfulSubmissions} solicitação(es), ${failedSubmissions} submissão(es) falharam.`,
                    "warning"
                );
            }

            setAttachments([]);
            setCsvData([]);
            setCsvError("");
        } catch (error) {
            setCsvError(
                error.message ||
                    "Erro ao processar o CSV."
            );

            showNotification(
                error.message ||
                    "Erro ao processar o CSV.",
                "error"
            );
        } finally {
            setIsProcessing(false);
        }
    }

    async function saveProducts(payloadProducts) {
        if (!isEditMode) {
            return createFullRequest({
                crBranchId,
                products: payloadProducts,
                attachments,
            });
        }

        return editFullRequest({
            id: initialRequest.id,
            payload: {
                crBranchId: Number(crBranchId),
                products: payloadProducts.map(
                    (product) => ({
                        productName: product.name,
                        variation:
                            product.variation || "",
                        measurementUnit:
                            product.measurementUnit,
                        quantity: Number(
                            product.quantity
                        ),
                        additionalInformations:
                            product.additionalInformations ||
                            "",
                    })
                ),
                retainedAttachmentIds:
                    existingAttachments.map(
                        (attachment) => attachment.id
                    ),
            },
            attachments,
        });
    }

    async function saveServices(payloadServices) {
        if (!isEditMode) {
            return createFullServiceRequest({
                crBranchId,
                services: payloadServices,
                attachments,
            });
        }

        return editFullRequest({
            id: initialRequest.id,
            payload: {
                crBranchId: Number(crBranchId),
                provisions: payloadServices.map(
                    (service) => ({
                        provisionId:
                            service.provisionId || null,
                        name: service.name,
                        totalValue: Number(
                            service.totalValue
                        ),
                        description:
                            service.description ||
                            service.additionalInformation,
                        additionalInformation:
                            service.additionalInformation ||
                            "",
                    })
                ),
                retainedAttachmentIds:
                    existingAttachments.map(
                        (attachment) => attachment.id
                    ),
            },
            attachments,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (submittingRef.current) return;

        setFormError("");
        setSuccess(false);

        if (
            !branchId &&
            abaAtiva !== "importing"
        ) {
            setFormError(
                "Selecione a Filial Pagadora."
            );

            showNotification(
                "Selecione a Filial Pagadora antes de finalizar.",
                "error"
            );
            return;
        }

        if (
            !crBranchId &&
            abaAtiva !== "importing"
        ) {
            setFormError(
                "Selecione o CR e Projeto."
            );

            showNotification(
                "Selecione o CR e Projeto antes de finalizar.",
                "error"
            );
            return;
        }

        if (abaAtiva === "produto") {
            if (
                productName.trim() ||
                variation.trim() ||
                quantity ||
                unit
            ) {
                setFormError(
                    "Você preencheu os campos, mas esqueceu de clicar no botão '+' para adicionar o produto."
                );

                showNotification(
                    "Adicione o produto pendente à lista antes de finalizar.",
                    "warning"
                );
                return;
            }

            if (products.length === 0) {
                setFormError(
                    "Adicione pelo menos um produto antes de finalizar."
                );

                showNotification(
                    "Adicione pelo menos um produto antes de finalizar.",
                    "error"
                );
                return;
            }

            const payloadProducts = products.map(
                ({ id, ...rest }) => rest
            );

            try {
                submittingRef.current = true;
                setSubmitting(true);

                const saved = await saveProducts(
                    payloadProducts
                );

                setSuccess(true);

                showNotification(
                    isEditMode
                        ? "Solicitação atualizada com sucesso!"
                        : "Solicitação criada com sucesso!",
                    "success"
                );

                if (isEditMode) {
                    onSaved?.(saved);
                } else {
                    setBranchId("");
                    setCrBranchId("");
                    setProducts([]);
                    setAttachments([]);
                }
            } catch (error) {
                const fallback = isEditMode
                    ? "Erro ao atualizar a solicitação."
                    : "Erro ao criar a solicitação.";
                const message = getRequestErrorMessage(error) || error.message || fallback;

                if (error?.status === 409) {
                    setProductError(message);
                } else {
                    setFormError(message);
                }
                showNotification(message, "error");
            } finally {
                submittingRef.current = false;
                setSubmitting(false);
            }

            return;
        }

        if (abaAtiva === "servico") {
            if (
                serviceName.trim() ||
                serviceValue ||
                serviceAdditionalInfo.trim()
            ) {
                setFormError(
                    "Você preencheu os campos, mas esqueceu de clicar no botão '+' para adicionar o serviço."
                );

                showNotification(
                    "Adicione o serviço pendente à lista antes de finalizar.",
                    "warning"
                );
                return;
            }

            if (services.length === 0) {
                setFormError(
                    "Adicione pelo menos um serviço antes de finalizar."
                );

                showNotification(
                    "Adicione pelo menos um serviço antes de finalizar.",
                    "error"
                );
                return;
            }

            const payloadServices = services.map(
                ({ id, ...rest }) => rest
            );

            try {
                submittingRef.current = true;
                setSubmitting(true);

                const saved = await saveServices(
                    payloadServices
                );

                setSuccess(true);

                showNotification(
                    isEditMode
                        ? "Solicitação atualizada com sucesso!"
                        : "Solicitação criada com sucesso!",
                    "success"
                );

                if (isEditMode) {
                    onSaved?.(saved);
                } else {
                    setBranchId("");
                    setCrBranchId("");
                    setServices([]);
                    setAttachments([]);
                }
            } catch (error) {
                const fallback = isEditMode
                    ? "Erro ao atualizar a solicitação."
                    : "Erro ao criar a solicitação.";
                const message = getRequestErrorMessage(error) || error.message || fallback;

                if (error?.status === 409) {
                    setServiceError(message);
                } else {
                    setFormError(message);
                }
                showNotification(message, "error");
            } finally {
                submittingRef.current = false;
                setSubmitting(false);
            }
        }
    }

    return {
        abaAtiva,
        setAbaAtiva,
        abas: isEditMode
            ? REQUEST_TABS.filter(
                  (tab) => tab.valor !== "importing"
              )
            : REQUEST_TABS,
        isEditMode,
        branchId,
        branchOptions,
        requester,
        setRequester,
        phone,
        setPhone,
        crBranchId,
        setCrBranchId,
        productName,
        setProductName: handleProductNameChange,
        variation,
        setVariation,
        quantity,
        setQuantity,
        unit,
        setUnit,
        additionalInfo,
        setAdditionalInfo,
        serviceName,
        setServiceName: handleServiceNameChange,
        serviceValue,
        setServiceValue,
        serviceAdditionalInfo,
        setServiceAdditionalInfo,
        products,
        setProducts,
        crOptions: filteredCrOptions,
        services,
        setServices,
        unitOptions,
        setUnitOptions,
        submitting,
        setSubmitting,
        formError,
        setFormError,
        productError,
        serviceError,
        success,
        setSuccess,
        handleBranchChange,
        handleCrBranchChange,
        handleAddProduct,
        handleEditProduct,
        handleRemoveProduct,
        handleAddService,
        handleEditService,
        handleRemoveService,
        handleProductSelection,
        handleServiceSelection,
        handleFilesSelected,
        handleRemoveAttachment,
        handleRemoveExistingAttachment,
        handleSubmit,
        attachments,
        existingAttachments,
        setAttachments,
        csvData,
        setCsvData,
        csvError,
        setCsvError,
        csvType,
        isProcessing,
        setIsProcessing,
        handleImportSubmit,
        handleConfirmImport,
    };
}