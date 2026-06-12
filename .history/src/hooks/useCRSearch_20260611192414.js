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
                setLoading
            }
        }
    })
}