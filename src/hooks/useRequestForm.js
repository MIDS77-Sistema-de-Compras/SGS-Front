import { useEffect, useState } from "react";

import { api } from "@/service/api";
import { createFullRequest, getAllMeasurementUnits } from "@/service/createProductRequest";

const REQUEST_TABS = [
    { valor: "produto", label: "PRODUTO" },
    { valor: "servico", label: "SERVIÇO" }
];

export function useRequestForm() {
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
    const [products, setProducts] = useState([]);
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
                    api.get("/cr-branches"),
                    getAllMeasurementUnits(),
                ]);

                if (cancelled) return;

                setCrOptions(
                    crs.map((cr) => ({
                        value: String(cr.id),
                        label: `${cr.crCode} - ${cr.crName}`,
                        branchName: cr.branchName ?? "",
                    }))
                );

                setUnitOptions(
                    units.map((measurementUnit) => ({
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

    function handleFilesSelected(files) {
        setAttachments(Array.from(files ?? []));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");
        setSuccess(false);

        if (abaAtiva !== "produto") {
            setFormError("A criação de serviços ainda não está conectada à API.");
            return;
        }

        if (!crBranchId) {
            setFormError("Selecione o CR e Projeto.");
            return;
        }

        if (products.length === 0) {
            setFormError("Adicione pelo menos um produto antes de finalizar.");
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
            setBranch("");
            setCrBranchId("");
            setProducts([]);
            setAttachments([]);
        } catch (error) {
            setFormError(error.message || "Erro ao criar a solicitação.");
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
        products,
        crOptions,
        unitOptions,
        submitting,
        formError,
        success,
        handleCrBranchChange,
        handleAddProduct,
        handleRemoveProduct,
        handleFilesSelected,
        handleSubmit,
    };
}