import { api, getPageContent } from "./api";
import { getAuthHeaders } from "./authHeaders";

export const notificationsService = {
    findMine: () => api.get("/notifications/me", {
        headers: getAuthHeaders(),
    }).then(getPageContent),

    markAsViewed: (id) => api.patch(`/notifications/${id}/viewed`, null, {
        headers: getAuthHeaders(),
    }),
};
