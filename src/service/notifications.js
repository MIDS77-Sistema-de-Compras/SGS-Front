import { api, getPageContent } from "./api";
import { getAuthHeaders } from "./authHeaders";

export const notificationsService = {
    findMine: () => api.get("/notifications/me?size=100&sort=createdAt,desc", {
        headers: getAuthHeaders(),
    }).then(getPageContent),

    markAsViewed: (id) => api.patch(`/notifications/${id}/viewed`, null, {
        headers: getAuthHeaders(),
    }),
};
