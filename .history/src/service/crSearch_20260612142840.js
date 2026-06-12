import { api } from "./api";

export async function getAllCRBranches() {
    const [crBranches, crs] = await Promise.all([
        api.get('/cr-branches'),
        api.get('/cr'),
    ]);

    const sectorMap = Object.fromEntries(
        crs.map((cr) => [cr.code, cr.sector ?? ''])
    );

    return crBranches.map((crb) => ({
        ...crb,
        sector: sectorMap[crb.crCode] ?? '',
    }));
}

export function filterCRs(termo, crs = []) {
    const normalizado = termo.toLowerCase().trim();

    if (!normalizado) return crs;

    return crs.filter((cr) => {
        const codigo = (cr.crCode ?? '').toLowerCase();
        const supervisor = (cr.responsibleUserName ?? '').toLowerCase();
        const bloco = (cr.sector ?? '').toLowerCase();
        const filial = (cr.branchName ?? '').toLowerCase();

        return (
            codigo.includes(normalizado) || supervisor.includes(normalizado) || bloco.includes(normalizado) || filial.in
        );
    });
}