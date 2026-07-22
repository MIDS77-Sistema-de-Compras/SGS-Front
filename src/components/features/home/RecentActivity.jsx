"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ActivityItem from "./ActivityItem";
import RecentActivitySkeleton from "./RecentActivitySkeleton";
import { notificationsService } from "@/service/notifications";
import { formatRelativeTime, getNotificationIcon, getNotificationTitle, sortNotificationsByDate } from "@/components/features/notifications/notificationUtils";
import { getUserRole } from "@/lib/utils/getUserRole";

export default function RecentActivity() {
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadNotifications() {
            try {
                const data = await notificationsService.findMine();

                if (isMounted) {
                    setNotifications(Array.isArray(data) ? data : []);
                    setError("");
                }
            } catch {
                if (isMounted) {
                    setError("Nao foi possivel carregar as atividades recentes.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadNotifications();

        return () => {
            isMounted = false;
        };
    }, []);

    const recentActivities = useMemo(() => (
        sortNotificationsByDate(notifications).slice(0, 4)
    ), [notifications]);

    function openRequest(notification) {
        if (notification.notificationType === "SOLICITACAO_VINCULADA_CR") {
            router.push(`/solicitacoes/gestao/${notification.requestId}`);
            return;
        }

        const basePath = getUserRole() === "COMPRADOR"
            ? "/solicitacoes-compra"
            : "/solicitacoes";
        router.push(basePath);
    }

    return (
        <div className="min-w-0 flex-1 flex flex-col border border-gray-100 dark:border-white/10 rounded-xl px-4 sm:px-5 py-4 sm:py-3 shadow-sm dark:bg-[#1A2233]">
            <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[18px] sm:text-[22px]">
                Atividade Recente
            </h2>
            <div className="border-t border-gray-100 dark:border-white/10 -mx-4 sm:-mx-5 my-2 sm:my-3" />

            {isLoading && <RecentActivitySkeleton />}

            {!isLoading && error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {!isLoading && !error && !recentActivities.length && (
                <div className="flex flex-1 items-center justify-center">
                    <p className="text-sm text-[#666666] dark:text-[#C3C6D3]">
                        Nenhuma atividade recente.
                    </p>
                </div>
            )}

            {!isLoading && !error && Boolean(recentActivities.length) && (
                <ul className="flex flex-col gap-1">
                    {recentActivities.map((notification) => {
                        const icon = getNotificationIcon(notification);

                        return (
                            <ActivityItem
                                key={notification.id}
                                iconSrc={icon.src}
                                iconAlt={icon.alt}
                                title={getNotificationTitle(notification)}
                                subtitle={notification.message || "Atualizacao de solicitacao"}
                                time={formatRelativeTime(notification.createdAt)}
                                onClick={notification.requestId ? () => openRequest(notification) : undefined}
                            />
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
