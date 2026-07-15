import { api, getPageContent } from "@/service/api";
import { getUserRole } from "@/lib/utils/getUserRole";

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

function normalizeProvision(item) {
    return {
        id: item.id,
        provisionId: item.provisionId,
        nome: item.provisionName,
        description: item.provisionDescription,
        totalValue: item.totalValue,
        status: item.statusName,
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

export async function getAllRequests() {
    return getRequestsFromEndpoint("/requests?size=1000");
}

export async function getMyRequests() {
    return getRequestsFromEndpoint("/requests/me?size=1000");
}

async function getRequestsFromEndpoint(endpoint) {
    const [requestsPage, products, crBranches, provisions] = await Promise.all([
        api.get(endpoint),
        api.get("/item-request-products?size=1000"),
        api.get("/cr-branches?size=1000"),
        api.get("/provisions"),
    ]);

    const requests = getPageContent(requestsPage);

    const crBranchesById = new Map(
        getPageContent(crBranches).map((crBranch) => [crBranch.id, crBranch])
    );

    const provisionsById = new Map(
        getPageContent(provisions).map((provision) => [provision.id, provision])
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

        return normalizeRequest(request, requestProducts, crBranch, provisionsById);
    });
}

export function updateItemRequestProduct(itemId, payload) {
    return api.put(`/item-request-products/${itemId}`, payload);
}

export function updateRequestCrBranch(id, payload) {
    return api.put(`/requests/${id}`, payload);
}

export async function getRequestById(id) {
    const endpoint = getUserRole() === "DOCENTE" ? `/requests/me/${id}` : `/requests/${id}`;
    const request = await api.get(endpoint);

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

    const provisions = await Promise.all(
        (request.provisions || []).map(async (item) => {
            const provision = await api.get(`/provisions/${item.provisionId}`);

            return {
                ...item,
                provisionName: provision.name,
                provisionDescription: provision.description,
                totalValue: provision.totalValue,
            };
        })
    );

    return normalizeRequest(
        {
            ...request,
            provisions,
        },
        requestProducts,
        crBranch
    );
}

export const requestsService = {
    findMine: () => api.get("/requests/me?size=1000").then(
        getPageContent
    ),
};