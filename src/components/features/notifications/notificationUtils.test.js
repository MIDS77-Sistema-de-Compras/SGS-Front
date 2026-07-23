import { describe, expect, it } from "vitest";

import {
    filterNotificationsForRole,
    isAdministrativeAlert,
} from "./notificationUtils";

const administrativeAlert = {
    id: 1,
    notificationType: "ALERTA_ADMINISTRATIVO",
};

const ordinaryNotification = {
    id: 2,
    notificationType: "STATUS_ALTERADO",
};

describe("notificacoes administrativas", () => {
    it("reconhece o tipo de alerta administrativo", () => {
        expect(isAdministrativeAlert(administrativeAlert)).toBe(true);
        expect(isAdministrativeAlert(ordinaryNotification)).toBe(false);
    });

    it("mostra ao administrador somente alertas administrativos", () => {
        expect(filterNotificationsForRole(
            [ordinaryNotification, administrativeAlert],
            "ADMIN",
        )).toEqual([administrativeAlert]);
    });

    it("preserva as notificacoes dos demais perfis", () => {
        const notifications = [ordinaryNotification, administrativeAlert];

        expect(filterNotificationsForRole(notifications, "DOCENTE")).toBe(notifications);
    });
});
