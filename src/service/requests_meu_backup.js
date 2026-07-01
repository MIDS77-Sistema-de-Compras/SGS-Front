import { api, getPageContent } from "./api";
import { getAuthHeaders } from "./authHeaders";

export const requestsService = {
    findMine: () => api.get("/requests/me?size=1000", {
        headers: getAuthHeaders(),
    }).then(getPageContent),
};
