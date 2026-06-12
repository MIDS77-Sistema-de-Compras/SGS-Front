import { useEffect, useMemo, useState } from "react";
import { filterCRs, getAllCRBranches } from "@/service/crSearch";

export function useCRSearch() {
    const [crs, setCrs] = useState([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
    setCrs([
        { id: 1, crCode: "7571", crName: "CR Jaraguá", branchName: "SENAI Jaraguá do Sul", responsibleUserName: "Kelvin Heron", sector: "Aprendizagem Industrial" },
        { id: 2, crCode: "8071", crName: "CR Blumenau", branchName: "SENAI Blumenau", responsibleUserName: "Viviane Ciez", sector: "Ensino Médio" },
        { id: 3, crCode: "9001", crName: "CR Joinville", branchName: "SENAI Joinville", responsibleUserName: null, sector: "Aprendizagem Industrial" },
    ]);
    setLoading(false);
    }, []);

    const filteredCRs = useMemo (
        () => filterCRs(search, crs),
        [search, crs]
    );
    
    return { filteredCRs, search, setSearch, loading, error}

}