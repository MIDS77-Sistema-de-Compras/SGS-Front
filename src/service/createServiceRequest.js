import { api } from "@/service/api";
import { buildRequestFormData } from "@/service/createProductRequest";

export async function createFullServiceRequest({ crBranchId, services, attachments = [] }) {
    const payload = {
        crBranchId: Number(crBranchId),
        userIds: [],
        provisions: services.map((service) => ({
            name: service.name,
            totalValue: Number(service.totalValue),
            description: service.additionalInformation,
            additionalInformation: service.additionalInformation || "",
        })),
    };
    const request = await api.postFormData(
        "/requests/with-attachments",
        buildRequestFormData(payload, attachments)
    );
    return { request };
}
