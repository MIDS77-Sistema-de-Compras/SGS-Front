import { useMemo, useState } from "react";
import { filterCRs } from "@/service/crSearch";

export function useCRSearch() {
    const [crs] = useState([
        { id: 1, crCode: "7571", crName: "CR Jaraguá", branchName: "SENAI Jaraguá do Sul", responsibleUserName: "Kelvin Heron", sector: "Aprendizagem Industrial" },
        { id: 2, crCode: "8071", crName: "CR Blumenauuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", branchName: "SENAI Blumenau", responsibleUserName: "Viviane Ciez", sector: "Ensino Médio" },
        { id: 3, crCode: "9001", crName: "CR Joinville", branchName: "SENAI Joinville", responsibleUserName: null, sector: "Aprendizagem Industrial" },
    ]);
    const [search, setSearch] = useState('');
    const [loading] = useState(false);
    const [error] = useState(null);

    const filteredCRs = useMemo(
        () => filterCRs(search, crs),
        [search, crs]
    );

    return { filteredCRs, search, setSearch, loading, error };
}