import { api } from "./api";
import { getAuthHeaders } from "./authHeaders";

export const requestsService = {
    findMine: () => api.get("/requests/me", {
        headers: getAuthHeaders(),
    }),
};
