import { api } from "./api";
import { getAuthHeaders } from "./authHeaders";

export const notificationsService = {
    findMine: () => api.get("/notifications/me", {
        headers: getAuthHeaders(),
    }),

    markAsViewed: (id) => api.patch(`/notifications/${id}/viewed`, null, {
        headers: getAuthHeaders(),
    }),
};
