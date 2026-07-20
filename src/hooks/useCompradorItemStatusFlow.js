import { useState } from "react";
import {
    updateItemRequestProduct,
    updateItemRequestProvision,
    getStatusByName,
} from "@/service/requests";

function buildProductPayload(item, requestId, statusName) {
    return {
        requestId: Number(requestId),
        productName: item.nome,
        measurementUnit: item.unit,
        quantity: item.quantity,
        statusName,
        additionalInformations: item.additionalInfo,
    };
}

async function buildProvisionPayload(item, requestId, statusName) {
    const status = await getStatusByName(statusName);

    return {
        requestId: Number(requestId),
        provisionId: item.provisionId,
        statusId: status.id,
        additionalInformation: item.additionalInfo,
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
            await Promise.all(
                Object.entries(itemDecisions).map(async ([itemId, statusValue]) => {
                    const item = items.find((candidate) => String(candidate.id) === itemId);
                    if (!item) return;

                    if (isServiceRequest) {
                        const payload = await buildProvisionPayload(item, requestId, statusValue);
                        return updateItemRequestProvision(item.id, payload);
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
