import { getUserRole } from "@/lib/utils/getUserRole";

export const ADMINISTRATIVE_ALERT_TYPE = "ALERTA_ADMINISTRATIVO";

const STATUS_UPDATED_TITLE_NORMALIZED =
    "status da solicitacao atualizado";

export function normalizeText(value = "") {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

export function isAdministrativeAlert(notification) {
    return notification?.notificationType === ADMINISTRATIVE_ALERT_TYPE;
}

export function filterNotificationsForRole(notifications = [], role) {
    if (role !== "ADMIN") {
        return notifications;
    }

    return notifications.filter(isAdministrativeAlert);
}

export function getNotificationTitle(notification) {
    const title =
        notification.title ||
        `Solicitação #${notification.requestId || ""}`;

    if (
        getUserRole() === "COMPRADOR" &&
        normalizeText(title).trim() === STATUS_UPDATED_TITLE_NORMALIZED
    ) {
        return "Nova solicitação para atendimento";
    }

    return title;
}

export function getNotificationIcon(notification) {
    const content = normalizeText(
        `${notification.title || ""} ${notification.message || ""}`
    );

    if (
        getUserRole() === "COMPRADOR" &&
        content.includes("atualizado")
    ) {
        return {
            src: "/images/home/atualizacao.png",
            alt: "Icone de atualizacao",
        };
    }

    if (content.includes("aprov")) {
        return {
            src: "/images/home/aprovada.png",
            alt: "Icone de aprovacao",
        };
    }

    if (content.includes("recus")) {
        return {
            src: "/images/home/recusada.png",
            alt: "Icone de recusa",
        };
    }

    return {
        src: "/images/home/atualizacao.png",
        alt: "Icone de atualizacao",
    };
}

export function formatDateTime(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export function formatRelativeTime(value) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const diffInSeconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
        return "Agora";
    }

    const minutes = Math.floor(diffInSeconds / 60);

    if (minutes < 60) {
        return `Há ${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `Há ${hours} h`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
        return `Há ${days} d`;
    }

    return formatDateTime(value);
}

export function sortNotificationsByDate(notifications = []) {
    return [...notifications].sort((current, next) => {
        const currentDate = new Date(
            current.createdAt || 0
        ).getTime();

        const nextDate = new Date(
            next.createdAt || 0
        ).getTime();

        return nextDate - currentDate;
    });
}