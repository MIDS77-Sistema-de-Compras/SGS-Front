import { useEffect, useMemo, useState } from "react";
import { filterCRs, getAllCRBranches } from "@/service/crService";

export function useCRSearch() {
    const [crs, setCrs] = useState([]);
    const [search, setSearch]
}