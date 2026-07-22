import { useState } from "react";
import {
    updateItemRequestProduct,
    updateItemRequestProvision,
    resolveStatusIdsByName,
} from "@/service/requests";

export function buildProductPayload(item, requestId, statusName) {
    return {
        requestId: Number(requestId),
        productName: item.nome,
        variation: item.variation || "",
        measurementUnit: item.unit,
        quantity: item.quantity,
        statusName,
        additionalInformations: item.additionalInformations ?? "",
    };
}

export function buildProvisionPayload(item, requestId, statusName, statusIdsByName) {
    return {
        requestId: Number(requestId),
        provisionId: item.provisionId,
        statusId: statusIdsByName.get(statusName),
        additionalInformation: item.additionalInformation ?? "",
    };
}

// O status geral da solicitação não é recalculado aqui: o backend já reage a cada
// mudança de item (MonitorItemStatusChanged) e atualiza a solicitação sozinho —
// mesmos itens iguais -> aquele status; misturados -> "Parcialmente atendida".
export function useCompradorItemStatusFlow({ requestId, items, isServiceRequest, refetch, setNotification }) {
    const [itemDecisions, setItemDecisions] = useState({});
    const [saving, setSaving] = useState(false);

    const hasPendingChanges = Object.keys(itemDecisions).length > 0;

    const handleItemStatusChange = (item, statusValue) => {
        setItemDecisions((prev) => {
            if (!statusValue) {
                const next = { ...prev };
                delete next[item.id];
                return next;
            }
            return { ...prev, [item.id]: statusValue };
        });
    };

    const handleSaveChanges = async () => {
        setSaving(true);
        try {
            const decisions = Object.entries(itemDecisions);

            const statusIdsByName = isServiceRequest
                ? await resolveStatusIdsByName(decisions.map(([, statusValue]) => statusValue))
                : null;

            await Promise.all(
                decisions.map(([itemId, statusValue]) => {
                    const item = items.find((candidate) => String(candidate.id) === itemId);
                    if (!item) return;

                    if (isServiceRequest) {
                        return updateItemRequestProvision(
                            item.id,
                            buildProvisionPayload(item, requestId, statusValue, statusIdsByName)
                        );
                    }

                    return updateItemRequestProduct(item.id, buildProductPayload(item, requestId, statusValue));
                })
            );

            setItemDecisions({});
            await refetch();
            setNotification({ type: "success", message: "Status atualizado com sucesso!" });
        } catch (err) {
            setNotification({ type: "error", message: err.message || "Erro ao atualizar status." });
        } finally {
            setSaving(false);
        }
    };

    return {
        itemDecisions,
        saving,
        hasPendingChanges,
        handleItemStatusChange,
        handleSaveChanges,
    };
}
