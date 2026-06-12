import { useEffect, useMemo, useState } from "react";
import { filterCRs, getAllCRBranches } from "@/service/crService";

export function useCRSearch() {
    const [crs, setCrs] = useState([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false;

        async function fetchCRs() {
            try {
                setLoading(true);
                setError(null);
                const data = await getAllCRBranches();
                if (!cancelled) setCrs(data);
            } catch (err) {
                if (!cancelled) setError(err.message || 'Erro ao carregar CRs.');
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchCRs();
        return () => { cancelled = true; }; }
    })
}