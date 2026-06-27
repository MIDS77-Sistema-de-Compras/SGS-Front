import { api } from "@/service/api";

const PREFERRED_INITIAL_STATUS = "Aguardando aprovação";

export async function getAllMeasurementUnits() {
    return api.get("/measurement-unit");
}

async function resolveInitialStatusName() {
    const statuses = await api.get("/status");

    if (!Array.isArray(statuses) || statuses.length === 0) {
        throw new Error("Nenhum status cadastrado no sistema.");
    }

    const preferred = statuses.find(
        (s) => s.name?.toLowerCase() === PREFERRED_INITIAL_STATUS.toLowerCase()
    );

    return (preferred ?? statuses[0]).name;
}

export async function createFullRequest({ crBranchId, products, attachments = [] }) {
    const statusName = await resolveInitialStatusName();

    const request = await api.post("/requests", {
        crBranchId: Number(crBranchId),
        statusName,
        userIds: [],
    });

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