import { api } from "../api";
import { getAuthHeaders } from "../authHeaders";

export function updateEmailNotificationPreference(enabled) {
    return api.patch(
        "/users/me/email-notifications",
        { enabled },
        { headers: getAuthHeaders() }
    );
}