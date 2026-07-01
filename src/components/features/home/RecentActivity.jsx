"use client";

import { useEffect, useMemo, useState } from "react";
import ActivityItem from "./ActivityItem";
import { notificationsService } from "@/service/notifications";
import { formatRelativeTime, getNotificationIcon, sortNotificationsByDate } from "@/components/features/notifications/notificationUtils";

export default function RecentActivity() {
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

    return (
        <div className="flex-1 border border-[#AAAAAA] rounded-xl px-5 py-3 shadow-lg">
            <h2 className="text-[#103D85] font-bold text-[22px]">
                Atividade Recente
            </h2>
            <div className="border-t border-[#AAAAAA] mt-2 -mx-5" />

            {isLoading && (
                <p className="text-sm text-[#666666]">Carregando atividades...</p>
            )}

            {!isLoading && error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {!isLoading && !error && !recentActivities.length && (
                <p className="text-sm text-[#666666]">Nenhuma atividade recente.</p>
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
                                title={notification.title || `Solicitacao #${notification.requestId}`}
                                subtitle={notification.message || "Atualizacao de solicitacao"}
                                time={formatRelativeTime(notification.createdAt)}
                            />
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
