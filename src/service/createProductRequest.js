import { api, getPageContent } from "@/service/api";

const INITIAL_STATUS = "EM_ANDAMENTO";

export async function getAllMeasurementUnits() {
    return api.get("/measurement-unit?size=1000").then(getPageContent);
}

export function getInitialStatusName() {
    return INITIAL_STATUS;
}

async function uploadAttachments(requestId, attachments) {
    if (attachments.length === 0) return;

    const MIME_BY_EXT = {
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        pdf: "application/pdf",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };

    const formData = new FormData();

    attachments.forEach((attachment) => {
        const mime =
            attachment.type ||
            MIME_BY_EXT[attachment.name.split(".").pop().toLowerCase()] ||
            "application/octet-stream";

        const blob = attachment.type
            ? attachment
            : new Blob([attachment], { type: mime });

        formData.append("files", blob, attachment.name);
    });

    await api.postFormData(
        `/requests/${requestId}/attachments`,
        formData
    );
}

export async function createFullRequest({
    crBranchId,
    products,
    attachments = [],
}) {
    const request = await api.post("/requests", {
        crBranchId: Number(crBranchId),
        userIds: [],
        products: products.map((product) => ({
            productName: product.name,
            measurementUnit: product.measurementUnit,
            quantity: Number(product.quantity),
            additionalInformations:
                product.additionalInformations || "",
        })),
        provisions: [],
    });

    await uploadAttachments(request.id, attachments);

    return { request };
}