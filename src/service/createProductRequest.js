import { api, getPageContent } from "@/service/api";

export async function getAllMeasurementUnits() {
    return api.get("/measurement-unit?size=1000").then(getPageContent);
}

export async function createFullRequest({ crBranchId, products, attachments = [] }) {
    const payload = {
        crBranchId: Number(crBranchId),
        userIds: [],
        products: products.map((product) => ({
            productName: product.name,
            variation: product.variation || "",
            measurementUnit: product.measurementUnit,
            quantity: Number(product.quantity),
            additionalInformations: product.additionalInformations || "",
        })),
    };

    const formData = buildRequestFormData(payload, attachments);
    const request = await api.postFormData("/requests/with-attachments", formData);

    return { request };
}

export function buildRequestFormData(payload, attachments = []) {
    const formData = new FormData();
    formData.append("request", new Blob([JSON.stringify(payload)], { type: "application/json" }));

    attachments.forEach((attachment) => {
        const mimeByExtension = {
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            pdf: "application/pdf",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            csv: "text/csv",
        };
        const extension = attachment.name?.split(".").pop()?.toLowerCase();
        const mime = attachment.type || mimeByExtension[extension] || "application/octet-stream";
        const content = attachment.type ? attachment : new Blob([attachment], { type: mime });
        formData.append("files", content, attachment.name);
    });
    return formData;
}

export function editFullRequest({ id, payload, attachments = [] }) {
    const formData = buildRequestFormData(payload, attachments);
    return api.putFormData(`/requests/${id}/content-with-attachments`, formData);
}
