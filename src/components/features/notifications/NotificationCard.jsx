"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import {
    formatRelativeTime,
    getNotificationIcon,
    getNotificationTitle,
    isAdministrativeAlert,
} from "./notificationUtils";
import { getUserRole } from "@/lib/utils/getUserRole";

export default function NotificationCard({
    notification,
    onMarkAsViewed,
    isUpdating = false,
}) {
    const router = useRouter();
    const icon = getNotificationIcon(notification);
    const administrativeAlert = isAdministrativeAlert(notification);
    const canMarkAsViewed = !notification.viewed && !isUpdating;

    function handleClick() {
        if (canMarkAsViewed) {
            onMarkAsViewed(notification.id);
        }

        if (administrativeAlert) {
            router.push("/auditoria");
            return;
        }

        if (!notification.requestId) return;

        if (notification.notificationType === "SOLICITACAO_VINCULADA_CR") {
            router.push(`/solicitacoes/gestao/${notification.requestId}`);
        } else if (getUserRole() === "COMPRADOR") {
            router.push(`/solicitacoes-compra/${notification.requestId}`);
        } else {
            router.push(`/solicitacoes/${notification.requestId}`);
        }
    }

    return (
        <li
            onClick={handleClick}
            className={`flex items-start gap-3 sm:gap-4 border-b mb-2 py-4 transition-colors last:border-b-0 ${
                administrativeAlert
                    ? "border-purple-200/70 dark:border-purple-400/20 cursor-pointer hover:bg-purple-50/60 dark:hover:bg-purple-500/5"
                    : "border-gray-100 dark:border-white/10"
            } ${
                !administrativeAlert && notification.requestId
                    ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"
                    : ""
            }`}
            title={
                administrativeAlert
                    ? "Ver registro na auditoria"
                    : notification.requestId
                      ? "Ver solicitação"
                      : undefined
            }
        >
            <div
                className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 mt-0.5 ${
                    administrativeAlert
                        ? "bg-purple-100 text-purple-600 dark:bg-[#7C3AED]/20 dark:text-[#B48CF7]"
                        : "bg-white dark:bg-[#303746]"
                }`}
            >
                {administrativeAlert ? (
                    <TriangleAlert
                        size={19}
                        strokeWidth={2.2}
                        aria-label="Alerta administrativo"
                    />
                ) : (
                    <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={30}
                        height={30}
                    />
                )}
            </div>

            <div className="flex-1 min-w-0 flex flex-row items-start justify-between gap-15">
                <div className="flex-1 min-w-0 flex flex-col">
                    <p className="text-[14px] sm:text-[15px] font-bold leading-tight text-black dark:text-[#E2E2EA]">
                        {getNotificationTitle(notification)}
                    </p>

                    <p
                        className="mt-1 text-[11px] sm:text-[12px] leading-relaxed text-black/70 dark:text-[#C3C6D3] break-words"
                        dangerouslySetInnerHTML={{
                            __html:
                                notification.message ||
                                "Atualização de solicitação",
                        }}
                    />
                </div>

                <span className="shrink-0 whitespace-nowrap text-right text-[10px] sm:text-[12px] leading-tight text-black/50 dark:text-[#C3C6D3]/70 pt-0.5">
                    {isUpdating
                        ? "Atualizando..."
                        : formatRelativeTime(notification.createdAt)}
                </span>
            </div>
        </li>
    );
}