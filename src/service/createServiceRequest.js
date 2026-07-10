import { api } from "@/service/api";

const INITIAL_STATUS = "EM_ANDAMENTO";

async function getStatusIdByName(statusName) {
    const status = await api.get(`/status/statusName/${statusName}`);
    return status.id;
}

const MIME_BY_EXT = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

async function uploadAttachments(requestId, attachments) {
    if (attachments.length === 0) return;

    const formData = new FormData();
    attachments.forEach((attachment) => {
        const mime = attachment.type
            || MIME_BY_EXT[attachment.name.split('.').pop().toLowerCase()]
            || 'application/octet-stream';
        const blob = attachment.type
            ? attachment
            : new Blob([attachment], { type: mime });
        formData.append("files", blob, attachment.name);
    });

    await api.postFormData(`/requests/${requestId}/attachments`, formData);
}

export async function createFullServiceRequest({ crBranchId, services, attachments = [] }) {
    const request = await api.post("/requests", {
        crBranchId: Number(crBranchId),
        userIds: [],
        provisions: services.map((service) => ({
            name: service.name,
            totalValue: Number(service.totalValue),
            description: service.additionalInformation,
            additionalInformation: service.additionalInformation || "",
        })),
    });
    await uploadAttachments(request.id, attachments);
    return { request };
}