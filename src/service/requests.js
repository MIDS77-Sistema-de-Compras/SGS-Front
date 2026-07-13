import { api, getPageContent } from "@/service/api";

export async function updateRequestStatus(id, statusName, justification = null) {
    return api.patch(`/requests/${id}/status`, {
        statusName,
        justification,
    });
}

function formatRequestCode(crBranch) {
    if (!crBranch?.crCode) return "SolicitaÃ§Ã£o";

    return String(crBranch.crCode).startsWith("CR-")
        ? crBranch.crCode
        : `CR-${crBranch.crCode}`;
}

function formatRequestDate(request) {
    return (request.requestDate || request.updatedAt || "").slice(0, 10);
}

function normalizeProduct(item) {
    return {
        id: item.itemRequestProduct,
        code: item.itemRequestProduct ? `PROD-${item.itemRequestProduct}` : "PROD",
        nome: item.productName,
        variation: item.measurementUnit,
        status: item.statusName,
        quantity: item.quantity,
        unit: item.measurementUnit,
        additionalInfo: item.additionalInformations || "Sem informaÃ§Ãµes adicionais.",
    };
}

function normalizeRequest(request, products = [], crBranch = null) {
    return {
        ...request,
        id: request.id,
        codigo: formatRequestCode(crBranch),
        data: formatRequestDate(request),
        status: request.statusName,
        produtos: products,
        crBranch,
    };
}

export async function getAllRequests() {
    return getRequestsFromEndpoint("/requests?size=1000");
}

export async function getMyRequests() {
    return getRequestsFromEndpoint("/requests/me?size=1000");
}

async function getRequestsFromEndpoint(endpoint) {
    const [requestsPage, products, crBranches] = await Promise.all([
        api.get(endpoint),
        api.get("/item-request-products?size=1000"),
        api.get("/cr-branches?size=1000"),
    ]);

    const requests = getPageContent(requestsPage);

    const crBranchesById = new Map(
        getPageContent(crBranches).map((crBranch) => [crBranch.id, crBranch])
    );

    const productsByRequestId = getPageContent(products).reduce((acc, item) => {
        const requestProducts = acc.get(item.requestId) || [];
        requestProducts.push(normalizeProduct(item));
        acc.set(item.requestId, requestProducts);
        return acc;
    }, new Map());

    return getPageContent(requests).map((request) => {
        const crBranch = crBranchesById.get(request.crBranchId);
        const requestProducts = productsByRequestId.get(request.id) || [];

        return normalizeRequest(request, requestProducts, crBranch);
    });
}

export async function getRequestById(id) {
    const request = await api.get(`/requests/${id}`);

    const [products, crBranch] = await Promise.all([
        api.get("/item-request-products?size=1000"),
        request.crBranchId
            ? api.get(`/cr-branches/${request.crBranchId}`).catch(() => null)
            : null,
    ]);

    const requestId = Number(id);
    const requestProducts = getPageContent(products)
        .filter((item) => Number(item.requestId) === requestId)
        .map(normalizeProduct);

    return normalizeRequest(request, requestProducts, crBranch);
}

export const requestsService = {
    findMine: () => api.get("/requests/me?size=1000").then(
        getPageContent
    ),
};