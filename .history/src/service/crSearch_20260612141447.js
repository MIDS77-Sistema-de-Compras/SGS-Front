import { api } from "./api";

export async function getAllCRBranches() {
    cosnt [crBranches, crs] = await Promise.all([
        api.get('/cr-branches'),
        api.get('/get'),
    ]);

    const sectorMap = Object.fromEntries(
        crs.map((cr) => [cr.code, cr.sector ?? ''])
    );

    return crBranches.map((crb) => ({
        ...crb,
        sector: se
    }))
}

export function filterCRs(termo, crs = []) {
    const normalizado = termo.toLowerCase().trim();

    if (!normalizado) return crs;

    return crs.filter((cr) => {
        const codigo = (cr.crCode ?? '').toLowerCase();
        const supervisor = (cr.responsibleUserName ?? '').toLowerCase();
        const bloco = (cr.crName ?? '').toLowerCase();

        return (
            codigo.includes(normalizado) || supervisor.includes(normalizado) || bloco.includes(normalizado)
        );
    });
}