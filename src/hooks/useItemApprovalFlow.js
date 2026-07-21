import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getStatusLabel } from "@/lib/utils/requestStatus";
import {
    updateItemRequestProduct,
    updateItemRequestProvision,
    resolveStatusIdsByName,
} from "@/service/requests";
import { api } from "@/service/api";

const APROVADO = "Aprovado";
const RECUSADO = "Recusado";
const PARCIALMENTE_APROVADA = "PARCIALMENTE_APROVADA";

function buildProductPayload(item, requestId, decision) {
    return {
        requestId: Number(requestId),
        productName: item.nome,
        variation: item.variation || "",
        measurementUnit: item.unit,
        quantity: item.quantity,
        statusName: decision,
        additionalInformations: item.additionalInfo,
    };
}

function buildProvisionPayload(item, requestId, decision, statusIdsByName) {
    return {
        requestId: Number(requestId),
        provisionId: item.provisionId,
        statusId: statusIdsByName.get(decision),
        additionalInformation: item.additionalInfo,
    };
}

function computeAggregateStatus(items, itemDecisions) {
    if (items.length === 0) return null;

    const effectiveStatuses = items.map(
        (item) => itemDecisions[item.id] ?? getStatusLabel(item.status)
    );

    const allDecided = effectiveStatuses.every(
        (status) => status === APROVADO || status === RECUSADO
    );
    if (!allDecided) return null;

    const hasApproved = effectiveStatuses.includes(APROVADO);
    const hasRejected = effectiveStatuses.includes(RECUSADO);

    if (hasApproved && hasRejected) return PARCIALMENTE_APROVADA;
    return hasApproved ? APROVADO : RECUSADO;
}

export function useItemApprovalFlow({ requestId, items, isServiceRequest, refetch, setNotification }) {
    const queryClient = useQueryClient();
    const [itemDecisions, setItemDecisions] = useState({});
    const [rejectItemTarget, setRejectItemTarget] = useState(null);
    const [saving, setSaving] = useState(false);

    const hasPendingChanges = Object.keys(itemDecisions).length > 0;

    const toggleDecision = (itemId, decision) => {
        setItemDecisions((prev) => {
            if (prev[itemId] === decision) {
                const next = { ...prev };
                delete next[itemId];
                return next;
            }
            return { ...prev, [itemId]: decision };
        });
    };

    const handleAcceptItem = (item) => toggleDecision(item.id, APROVADO);

    // justificativa não é persistida: ItemRequestProduct/ItemRequestProvision não têm
    // campo de motivo de recusa por item na API hoje.
    const handleRejectItem = () => {
        toggleDecision(rejectItemTarget.id, RECUSADO);
        setRejectItemTarget(null);
    };

    const openRejectModal = (item) => {
        if (itemDecisions[item.id] === RECUSADO) {
            toggleDecision(item.id, RECUSADO);
            return;
        }
        setRejectItemTarget(item);
    };

    const handleSaveChanges = async () => {
        setSaving(true);
        try {
            const decisions = Object.entries(itemDecisions);

            const statusIdsByName = isServiceRequest
                ? await resolveStatusIdsByName(decisions.map(([, decision]) => decision))
                : null;

            await Promise.all(
                decisions.map(([itemId, decision]) => {
                    const item = items.find((candidate) => String(candidate.id) === itemId);
                    if (!item) return;

                    if (isServiceRequest) {
                        return updateItemRequestProvision(
                            item.id,
                            buildProvisionPayload(item, requestId, decision, statusIdsByName)
                        );
                    }

                    return updateItemRequestProduct(
                        item.id,
                        buildProductPayload(item, requestId, decision)
                    );
                })
            );

            const aggregateStatus = computeAggregateStatus(items, itemDecisions);
            if (aggregateStatus) {
                await api.patch(`/requests/${requestId}/status`, { statusName: aggregateStatus });
            }

            setItemDecisions({});
            await refetch();
            queryClient.invalidateQueries({ queryKey: ["requests"] });
            setNotification({ type: "success", message: "Alterações salvas com sucesso!" });
        } catch (err) {
            setNotification({ type: "error", message: err.message || "Erro ao salvar alterações." });
        } finally {
            setSaving(false);
        }
    };

    return {
        itemDecisions,
        rejectItemTarget,
        setRejectItemTarget,
        saving,
        hasPendingChanges,
        handleAcceptItem,
        openRejectModal,
        handleRejectItem,
        handleSaveChanges,
    };
}
