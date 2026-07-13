"use client";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useEffect, useMemo, useState } from "react";
import NotificationsList from "@/components/features/notifications/NotificationsList";
import { sortNotificationsByDate } from "@/components/features/notifications/notificationUtils";
import { notificationsService } from "@/service/notifications";
import HomeFooter from "@/components/features/home/HomeFooter";

export default function Notificacoes() {
    useDocumentTitle("Notificações");

    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

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
                    setError("Nao foi possivel carregar as notificacoes.");
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

    async function handleMarkAsViewed(id) {
        setUpdatingId(id);

        try {
            const updatedNotification = await notificationsService.markAsViewed(id);
            setNotifications((currentNotifications) => (
                currentNotifications.map((notification) => (
                    notification.id === id
                        ? { ...notification, ...updatedNotification, viewed: true }
                        : notification
                ))
            ));
        } catch {
            setError("Nao foi possivel atualizar a notificacao.");
        } finally {
            setUpdatingId(null);
        }
    }

    const orderedNotifications = useMemo(() => (
        sortNotificationsByDate(notifications)
    ), [notifications]);

    return (
        <div className="flex flex-1 flex-col gap-10 min-h-0">

            <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-[#AAAAAA] dark:border-white/10 dark:bg-[#1A2233] rounded-xl px-5 py-3 shadow-lg min-h-0">
                <div className="shrink-0">
                    <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[22px]">
                        Notificações
                    </h2>
                </div>

                <div className="border-t border-[#AAAAAA] dark:border-white/10 mt-2 mb-3 -mx-5 shrink-0" />
                <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                    {isLoading && (
                        <div className="flex h-full items-center justify-center px-5 py-8 text-center text-sm text-[#666666] dark:text-[#C3C6D3]">
                            Carregando notificacoes...
                        </div>
                    )}

                    {!isLoading && error && (
                        <div className="mx-5 mt-4 rounded-lg border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {!isLoading && !error && (
                        <NotificationsList
                            notifications={orderedNotifications}
                            onMarkAsViewed={handleMarkAsViewed}
                            updatingId={updatingId}
                        />
                    )}
                </div>
            </section>

            <HomeFooter />
        </div>
    );
}