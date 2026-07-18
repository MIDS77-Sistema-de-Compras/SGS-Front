import { api, getPageContent } from "./api";

function getCRId(cr) {
    return cr?.id ?? cr?.crId;
}

export function formatResponsibleUsers(responsibleUsersName) {
    if (Array.isArray(responsibleUsersName)) {
        return responsibleUsersName
            .map((name) => String(name ?? '').trim())
            .filter(Boolean)
            .join(', ');
    }

    return String(responsibleUsersName ?? '').trim();
}

export function buildCRSearchViewModels(crBranches = [], crs = []) {
    const crsById = new Map(
        crs
            .filter((cr) => getCRId(cr) !== null && getCRId(cr) !== undefined)
            .map((cr) => [String(getCRId(cr)), cr])
    );

    return crBranches.map((crBranch) => {
        const crId = crBranch.crId ?? getCRId(crBranch.cr);
        const cr = crId === null || crId === undefined
            ? null
            : crsById.get(String(crId));
        const responsibleUsersName = crBranch.responsibleUsersName ?? crBranch.responsibleUserName;
        const master = cr?.master ?? crBranch.master;

        return {
            ...crBranch,
            crId,
            crCode: cr?.code ?? crBranch.crCode ?? '',
            crName: cr?.name ?? crBranch.crName ?? '',
            sector: cr?.sector ?? cr?.sectorName ?? crBranch.sector ?? '',
            master: master === true,
            branchName: crBranch.branchName ?? '',
            responsibleUsersName,
            responsibleUserName: formatResponsibleUsers(responsibleUsersName),
        };
    });
}

export async function getAllCRBranches() {
    const [crBranches, crs] = await Promise.all([
        api.get('/cr-branches?size=1000'),
        api.get('/cr?size=1000'),
    ]);

    return buildCRSearchViewModels(
        getPageContent(crBranches),
        getPageContent(crs)
    );
}

export function normalizeSearchText(value) {
    return String(value ?? '')
        .trim()
        .toLocaleLowerCase('pt-BR')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\p{L}\p{N}]+/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizeCRCode(value) {
    return normalizeSearchText(value)
        .replace(/^cr\s*/, '')
        .replace(/\s+/g, '');
}

function includesNormalizedText(value, normalizedSearch) {
    return normalizeSearchText(value).includes(normalizedSearch);
}

export function filterCRs(termo, crs = []) {
    const normalizado = normalizeSearchText(termo);

    if (!normalizado) return crs;

    return crs.filter((cr) => {
        const codigo = normalizeCRCode(cr.crCode);
        const codigoPesquisado = normalizeCRCode(termo);

        return (
            codigo.includes(codigoPesquisado) ||
            includesNormalizedText(cr.crName, normalizado) ||
            includesNormalizedText(cr.sector, normalizado) ||
            includesNormalizedText(cr.branchName, normalizado) ||
            includesNormalizedText(cr.responsibleUserName ?? cr.responsibleUsersName, normalizado)
        );
    });
}
