import { api } from "@/service/api";

function formatRequestCode(crBranch) {
    if (!crBranch?.crCode) return "Solicitação";

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
        additionalInfo: item.additionalInformations || "Sem informações adicionais.",
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
    const [requests, products, crBranches] = await Promise.all([
        api.get("/requests"),
        api.get("/item-request-products"),
        api.get("/cr-branches"),
    ]);

    const crBranchesById = new Map(
        (crBranches || []).map((crBranch) => [crBranch.id, crBranch])
    );

    const productsByRequestId = (products || []).reduce((acc, item) => {
        const requestProducts = acc.get(item.requestId) || [];
        requestProducts.push(normalizeProduct(item));
        acc.set(item.requestId, requestProducts);
        return acc;
    }, new Map());

    return (requests || []).map((request) => {
        const crBranch = crBranchesById.get(request.crBranchId);
        const requestProducts = productsByRequestId.get(request.id) || [];

        return normalizeRequest(request, requestProducts, crBranch);
    });
}

export async function getRequestById(id) {
    const request = await api.get(`/requests/${id}`);

    const [products, crBranch] = await Promise.all([
        api.get("/item-request-products"),
        request.crBranchId
            ? api.get(`/cr-branches/${request.crBranchId}`).catch(() => null)
            : null,
    ]);

    const requestId = Number(id);
    const requestProducts = (products || [])
        .filter((item) => Number(item.requestId) === requestId)
        .map(normalizeProduct);

    return normalizeRequest(request, requestProducts, crBranch);
}
