"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardList, FilePlus2 } from "lucide-react";
import NotificationsList from "@/components/features/notifications/NotificationsList";
import NotificationsListSkeleton from "@/components/features/notifications/NotificationsListSkeleton";
import { sortNotificationsByDate } from "@/components/features/notifications/notificationUtils";
import { notificationsService } from "@/service/notifications";

export default function Notificacoes() {
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
        <div className="flex flex-1 flex-col gap-8 min-h-0">
            <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-[#AAAAAA] bg-white shadow-lg">
                <div className="shrink-0 px-5 py-3">
                    <h2 className="text-[#103D85] font-bold text-[22px]">
                        Notificações
                    </h2>
                </div>
                <div className="border-t border-[#AAAAAA]" />

                <div className="min-h-0 flex-1 overflow-y-auto py-2 pr-1">
                    {isLoading && <NotificationsListSkeleton />}

                    {!isLoading && error && (
                        <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Link
                    href="/solicitacoes/criar"
                    className="flex h-16 items-center justify-center gap-3 rounded-xl bg-[#103D85] text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0b2a5c] active:scale-[0.99]"
                >
                    <FilePlus2 size={22} strokeWidth={2.2} />
                    Nova Solicitação
                </Link>

                <Link
                    href="/solicitacoes"
                    className="flex h-16 items-center justify-center gap-3 rounded-xl border border-[#333333] bg-white text-sm font-bold text-black shadow-sm transition-all hover:bg-gray-50 active:scale-[0.99]"
                >
                    <ClipboardList size={22} strokeWidth={2.2} />
                    Minhas Solicitações
                </Link>
            </div>
        </div>
    );
}
