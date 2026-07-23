import { api, API_BASE_URL, getPageContent } from "./api";
import { getAuthHeaders } from "./authHeaders";
import { parseApiDate } from "@/lib/utils/calculateTime";

function pad(value) {
    return String(value).padStart(2, "0");
}

function formatTimestamp(isoString) {
    if (!isoString) return { date: "", label: "—" };

    const parsed = parseApiDate(isoString);
    if (!parsed) return { date: "", label: String(isoString) };

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

export function isAuditAlertAction(action) {
    if (!action) return false;

    return /DESATI|EXCLU|REMOV|ATUALI|STATUS_ATIVACAO/.test(action.toUpperCase());
}

export function getAllLogs() {
    return api
        .get("/logs?size=100&sort=timestamp,desc", { headers: getAuthHeaders() })
        .then(getPageContent)
        .then((logs) => logs.map(normalizeAuditLog));
}
