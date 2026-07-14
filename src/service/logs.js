import { api, API_BASE_URL, getPageContent } from "./api";
import { getAuthHeaders } from "./authHeaders";

function pad(value) {
    return String(value).padStart(2, "0");
}

function formatTimestamp(isoString) {
    if (!isoString) return { date: "", label: "—" };

    const parsed = new Date(isoString);
    if (Number.isNaN(parsed.getTime())) return { date: "", label: String(isoString) };

    const date = `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`;
    const label = `${pad(parsed.getDate())}/${pad(parsed.getMonth() + 1)}/${parsed.getFullYear()} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;

    return { date, label };
}

function humanizeAction(typeAction) {
    if (!typeAction) return "—";

    return typeAction
        .toLowerCase()
        .split(/[_\s]+/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function normalizeAuditLog(dto) {
    const { date, label } = formatTimestamp(dto.timestamp);

    return {
        id: dto.id,
        user: dto.userAgentName ?? "—",
        level: dto.userAgentRole ?? "—",
        action: humanizeAction(dto.typeAction),
        actionId: dto.typeAction ?? "",
        affectedUser: dto.userTargetName ?? "—",
        request: dto.request != null ? `#${dto.request}` : "—",
        timestamp: label,
        date,
    };
}

export function getAllLogs() {
    return api
        .get("/logs", { headers: getAuthHeaders() })
        .then(getPageContent)
        .then((logs) => logs.map(normalizeAuditLog));
}
