import { useCallback, useEffect, useState } from "react";
import { getAllStatuses, createStatus } from "@/service/status";

// Só status criados por esse fluxo têm cor definida — usamos isso pra distinguir
// os status "customizados" (mostrados no dropdown do comprador) dos status globais
// do sistema (Aguardando aprovação, Aprovado, Recusado etc.), que não têm cor.
export function useStatusCatalog() {
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        let cancelled = false;

        getAllStatuses()
            .then((data) => {
                if (!cancelled) setStatuses(Array.isArray(data) ? data : []);
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, []);

    const addCustomStatus = useCallback(async ({ name, color }) => {
        const created = await createStatus({
            name,
            description: `Status personalizado: ${name}`,
            color,
        });

        setStatuses((current) => [...current, created]);
        return created;
    }, []);

    const customStatuses = statuses.filter((status) => Boolean(status.color));

    return { customStatuses, addCustomStatus };
}
