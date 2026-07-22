import { useMemo } from "react";
import { useRequestsList } from "@/hooks/useRequestsList";
import { isVisibleToComprador, keepOnlyApprovedItemsIfPartial, toCompradorRequestView } from "@/lib/utils/requestStatus";

export function useCompradorRequestsList() {
    const { requests, loading, error } = useRequestsList({ queryKey: ['requests', 'all'] });

    const compradorRequests = useMemo(() => {
        return requests
            .filter((request) => isVisibleToComprador(request.status))
            .map(keepOnlyApprovedItemsIfPartial)
            .map(toCompradorRequestView);
    }, [requests]);

    return { requests: compradorRequests, loading, error };
}
