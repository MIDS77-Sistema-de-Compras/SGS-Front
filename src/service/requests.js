import { api, getPageContent } from "@/service/api";

function formatRequestCode(crBranch) {
    if (!crBranch?.crCode) return "SolicitaÃ§Ã£o";

    return String(crBranch.crCode).startsWith("CR-")
        ? crBranch.crCode
        : `CR-${crBranch.crCode}`;
}

function formatRequestDate(request) {
    return (request.requestDate || request.updatedAt || "").slice(0, 10);
}

function formatCrBranchLabel(crBranch) {
    if (!crBranch) return "Não informado";

    const cr = [crBranch.crCode, crBranch.crName].filter(Boolean).join(" - ");

    if (!crBranch.branchName) return cr || "Não informado";
    return cr ? `${cr} (${crBranch.branchName})` : crBranch.branchName;
}

function normalizeProduct(item) {
    return {
        id: item.itemRequestProduct,
        code: item.itemRequestProduct ? `PROD-${item.itemRequestProduct}` : "PROD",
        nome: item.productName,
        variation: item.variation,
        status: item.statusName,
        quantity: item.quantity,
        unit: item.measurementUnit,
        additionalInformations: item.additionalInformations || "",
        additionalInfo: item.additionalInformations || "Sem informaÃ§Ãµes adicionais.",
    };
}

function normalizeProvision(item) {
    return {
        id: item.id,
        provisionId: item.provisionId,
        nome: item.provisionName,
        description: item.provisionDescription,
        totalValue: item.totalValue,
        status: item.statusName,
        additionalInformation: item.additionalInformation || "",
        additionalInfo:
            item.additionalInformation || "Sem informações adicionais.",
    };
}

function normalizeRequest(request, products = [], crBranch = null, provisionsById = null) {
    const provisions = (request.provisions || []).map((item) =>
        enrichProvisionItem(item, provisionsById)
    );

    return {
        ...request,
        id: request.id,
        codigo: formatRequestCode(crBranch),
        data: formatRequestDate(request),
        status: request.statusName,
        produtos: products,
        servicos: provisions.map(normalizeProvision),
        crBranch,
        crBranchLabel: formatCrBranchLabel(crBranch),
    };
}

function enrichProvisionItem(item, provisionsById) {
    if (!provisionsById) return item;

    const provision = provisionsById.get(item.provisionId);
    if (!provision) return item;

    return {
        ...item,
        provisionName: provision.name,
        provisionDescription: provision.description,
        totalValue: provision.totalValue,
    };
}

// Normaliza o DTO enxuto de listagem (/requests/me). O código do CR já vem
// resolvido do backend e os produtos vêm só como nomes — o suficiente para a
// tabela (código, data, status e contagem/nomes de produto usados na busca).
function normalizeListItem(item) {
    return {
        id: item.id,
        codigo: formatRequestCode({ crCode: item.crCode }),
        data: formatRequestDate(item),
        status: item.statusName,
        statusCategory: item.statusCategory,
        produtos: (item.productNames || []).map((nome) => ({ nome })),
    };
}

export async function getAllRequests() {
    return getRequestsFromEndpoint("/requests?size=1000");
}

export async function getMyRequests() {
    const page = await api.get("/requests/me?size=1000");
    return getPageContent(page).map(normalizeListItem);
}

// Os itens de produto já vêm embutidos em cada solicitação (RequestResponse.products),
// então não há motivo para baixar /item-request-products do sistema inteiro aqui.
async function getRequestsFromEndpoint(endpoint) {
    const [requestsPage, crBranches, provisions] = await Promise.all([
        api.get(endpoint),
        api.get("/cr-branches?size=1000"),
        api.get("/provisions"),
    ]);

    const crBranchesById = new Map(
        getPageContent(crBranches).map((crBranch) => [crBranch.id, crBranch])
    );

    const provisionsById = new Map(
        getPageContent(provisions).map((provision) => [provision.id, provision])
    );

    return getPageContent(requestsPage).map((request) => {
        const crBranch = crBranchesById.get(request.crBranchId);
        const requestProducts = (request.products || []).map(normalizeProduct);

        return normalizeRequest(request, requestProducts, crBranch, provisionsById);
    });
}

export function updateItemRequestProduct(itemId, payload) {
    return api.put(`/item-request-products/${itemId}`, payload);
}

export function updateItemRequestProvision(itemId, payload) {
    return api.put(`/item-provision-requests/request/${itemId}`, payload);
}

export function getStatusByName(statusName) {
    return api.get(`/status/statusName/${encodeURIComponent(statusName)}`);
}

/**
 * Resolve os ids dos status a partir dos nomes, buscando cada nome distinto
 * uma única vez. Uma lista de N itens costuma repetir poucos status
 * (ex.: "Aprovado"/"Recusado"), então a busca é feita por nome, não por item.
 */
export async function resolveStatusIdsByName(statusNames) {
    const uniqueNames = [...new Set(statusNames)];
    const statuses = await Promise.all(uniqueNames.map(getStatusByName));

    return new Map(uniqueNames.map((name, index) => [name, statuses[index].id]));
}

export function updateRequestCrBranch(id, payload) {
    return api.put(`/requests/${id}`, payload);
}

export async function getRequestById(id, { ownRequest = false } = {}) {
    const endpoint = ownRequest ? `/requests/me/${id}` : `/requests/${id}`;
    const request = await api.get(endpoint);

    // O catálogo de serviços só é necessário para enriquecer itens de provisão.
    const hasProvisions = (request.provisions || []).length > 0;

    const [crBranch, provisions] = await Promise.all([
        request.crBranchId
            ? api.get(`/cr-branches/${request.crBranchId}`).catch(() => null)
            : null,
        hasProvisions ? api.get("/provisions") : null,
    ]);

    const requestProducts = (request.products || []).map(normalizeProduct);

    const provisionsById = provisions
        ? new Map(getPageContent(provisions).map((provision) => [provision.id, provision]))
        : null;

    return normalizeRequest(request, requestProducts, crBranch, provisionsById);
}

export const requestsService = {
    findAll: () => api.get("/requests?size=1000").then(
        getPageContent
    ),

    findMine: () => api.get("/requests/me?size=1000").then(
        getPageContent
    ),
};
