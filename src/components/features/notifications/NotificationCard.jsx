"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatRelativeTime, getNotificationIcon } from "./notificationUtils";
import { getUserRole } from "@/lib/utils/getUserRole";

export default function NotificationCard({ notification, onMarkAsViewed, isUpdating = false }) {
    const router = useRouter();
    const icon = getNotificationIcon(notification);
    const canMarkAsViewed = !notification.viewed && !isUpdating;

    function handleClick() {
        if (canMarkAsViewed) {
            onMarkAsViewed(notification.id);
        }

        if (!notification.requestId) return;

        const role = getUserRole();

        if (role === "ADMIN") {
            router.push(`/solicitacoes-gestao?requestId=${notification.requestId}`);
        } else {
            router.push(`/solicitacoes/${notification.requestId}`);
        }
    }

    return (
        <li
            onClick={handleClick}
            className="grid min-h-16 cursor-pointer grid-cols-[46px_1fr_116px] items-center gap-3 border-b border-gray-100 dark:border-white/10 mb-2 py-4 transition-colors last:border-b-0 hover:bg-gray-50 dark:hover:bg-white/5"
            title={canMarkAsViewed ? "Marcar como visualizada e abrir solicitação" : "Abrir solicitação"}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#303746]">
                <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={30}
                    height={30}
                />
            </div>

            <div className="min-w-0">
                <p className="truncate text-[15px] font-bold leading-tight text-black dark:text-[#E2E2EA]">
                    {notification.title || `Solicitação #${notification.requestId || ""}`}
                </p>
                <p className="mt-0.5 truncate text-[12px] leading-tight text-black/70 dark:text-[#C3C6D3]">
                    {notification.message || "Atualização de solicitação"}
                </p>
            </div>

            <p className="text-right text-[12px] leading-tight text-black/70 dark:text-[#C3C6D3]">
                {isUpdating ? "Atualizando..." : formatRelativeTime(notification.createdAt)}
            </p>
        </li>
    );
}