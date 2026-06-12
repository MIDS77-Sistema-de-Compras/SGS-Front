import { api } from "./api";

export async function getAllCRs() {
    return api.get('/cr-branches')
}

export function filterCRs(termo, crs = []) {
    const normalizado = termo.toLowerCase().trim();

    if (!normalizado) return crs;

    return crs.filter((cr) => {
        const codigo = (cr.crCode ?? '')
    })
}