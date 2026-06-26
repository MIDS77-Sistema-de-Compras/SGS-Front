import { api } from "@/service/api";

const INITIAL_STATUS_CANDIDATES = ["Aguardando aprovação", "Pendente", "EM_ANDAMENTO"];

export async function getAllMeasurementUnits() {
    return api.get("/measurement-unit");
}

export function getInitialStatusName() {
    return INITIAL_STATUS_CANDIDATES[0];
}

async function createRequestWithAvailableStatus(crBranchId) {
    let lastError;

    for (const statusName of INITIAL_STATUS_CANDIDATES) {
        try {
            const request = await api.post("/requests", {
                crBranchId: Number(crBranchId),
                statusName,
                userIds: [],
            });

            return { request, statusName };
        } catch (error) {
            lastError = error;
            if (error.status !== 404) {
                throw error;
            }
        }
    }

    throw lastError;
}

export async function createFullRequest({ crBranchId, products, attachments = [] }) {
    const { request, statusName } = await createRequestWithAvailableStatus(crBranchId);

    const createdProducts = await Promise.all(
        products.map((product) =>
            api.post("/item-request-products", {
                requestId: request.id,
                productName: product.name,
                measurementUnit: product.measurementUnit,
                quantity: Number(product.quantity),
                statusName,
                additionalInformations: product.additionalInformations || "",
            })
        )
    );

    if (attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach((attachment) => formData.append("files", attachment));
        await api.postFormData(`/requests/${request.id}/attachments`, formData);
    }

    return {
        request,
        products: createdProducts,
    };
}