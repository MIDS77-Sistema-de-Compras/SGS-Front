import { api, getPageContent } from "./api";

export function normalizeCRSearchText(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ');
}

export function normalizeCRCode(value) {
    return normalizeCRSearchText(value)
        .replace(/^cr\s*-\s*/, '')
        .replace(/\s+/g, '');
}

export function formatResponsibleUserNames(responsibleUsersName) {
    const names = Array.isArray(responsibleUsersName)
        ? responsibleUsersName
        : [responsibleUsersName];

    return names
        .filter((name) => name !== null && name !== undefined && String(name).trim())
        .map((name) => String(name).trim())
        .join(', ');
}

export function buildCRBranchViewModels(crBranches, crs) {
    const crById = new Map(
        crs
            .filter((cr) => cr?.id !== null && cr?.id !== undefined)
            .map((cr) => [String(cr.id), cr])
    );
    const crByCode = new Map(
        crs
            .filter((cr) => normalizeCRCode(cr?.code))
            .map((cr) => [normalizeCRCode(cr.code), cr])
    );

    return crBranches.map((crBranch) => {
        const crId = crBranch.crId ?? crBranch.cr?.id ?? null;
        const cr = (crId === null ? null : crById.get(String(crId)))
            ?? crByCode.get(normalizeCRCode(crBranch.crCode))
            ?? null;
        const responsibleUsersName = crBranch.responsibleUsersName ?? crBranch.responsibleUserName ?? null;

        return {
            id: crBranch.id,
            crId,
            crCode: cr?.code ?? crBranch.crCode ?? '',
            crName: cr?.name ?? crBranch.crName ?? '',
            sector: cr?.sector ?? '',
            master: crBranch.master ?? crBranch.cr?.master ?? cr?.master ?? false,
            branchName: crBranch.branchName ?? '',
            responsibleUsersName,
            responsibleUserName: formatResponsibleUserNames(responsibleUsersName),
        };
    });
}

export async function getAllCRBranches() {
    const [crBranches, crs] = await Promise.all([
        api.get('/cr-branches?size=1000'),
        api.get('/cr?size=1000'),
    ]);

    return buildCRBranchViewModels(
        getPageContent(crBranches),
        getPageContent(crs)
    );
}

export function filterCRs(termo, crs = []) {
    const normalizado = normalizeCRSearchText(termo);
    const codigoNormalizado = normalizeCRCode(termo);

    if (!normalizado) return crs;

    return crs.filter((cr) => {
        const responsibleUserName = cr.responsibleUserName || formatResponsibleUserNames(cr.responsibleUsersName);
        const searchableFields = [
            cr.crCode,
            cr.crName,
            cr.sector,
            cr.branchName,
            responsibleUserName,
        ];

        return searchableFields.some((field) => normalizeCRSearchText(field).includes(normalizado)) ||
            (codigoNormalizado && normalizeCRCode(cr.crCode).includes(codigoNormalizado));
    });
}
