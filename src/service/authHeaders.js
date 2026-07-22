import Cookies from "js-cookie";

export function getAuthHeaders() {
    const token = Cookies.get("jwt");

    if (!token) {
        return {};
    }

    return {
        Authorization: `Bearer ${token}`,
    };
}
