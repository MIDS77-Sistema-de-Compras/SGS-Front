import { useQuery } from "@tanstack/react-query";

import { getAllRequests } from "@/service/requests";

export function useRequestsList({ queryKey, fetchRequests = getAllRequests, initialData = [] } = {}) {
    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn: fetchRequests,
        // initialData "vazio" (`[]`) faria o react-query considerar os dados já
        // carregados e pular o fetch — só passa quando já temos dados de verdade.
        initialData: initialData.length > 0 ? initialData : undefined,
    });

    return {
        requests: data ?? [],
        loading: isLoading,
        error: error ? error.message || "Erro ao carregar solicitações." : "",
    };
}
