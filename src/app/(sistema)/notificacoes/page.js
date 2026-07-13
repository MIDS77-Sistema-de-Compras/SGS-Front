"use client";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardList, FilePlus2 } from "lucide-react";
import NotificationsList from "@/components/features/notifications/NotificationsList";
import { sortNotificationsByDate } from "@/components/features/notifications/notificationUtils";
import { notificationsService } from "@/service/notifications";

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
                <div className="shrink-0 px-5 py-3">
                    <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[22px]">
                        Notificações
                    </h2>
                </div>

                <div className="border-t border-[#AAAAAA] dark:border-white/10 mt-2 mb-3 -mx-5 shrink-0" />
                <div className="min-h-0 flex-1 overflow-y-auto py-2 pr-1">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Link
                    href="/solicitacoes/criar"
                    className="flex h-16 items-center justify-center gap-3 rounded-xl bg-[#103D85] dark:bg-[#1A4A9E] text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0b2a5c] dark:hover:bg-[#2456b0] active:scale-[0.99]"
                >
                    <FilePlus2 size={22} strokeWidth={2.2} />
                    Nova Solicitação
                </Link>

                <Link
                    href="/solicitacoes"
                    className="flex h-16 items-center justify-center gap-3 rounded-xl border border-[#333333] dark:border-white/10 bg-white dark:bg-[#303746] text-sm font-bold text-black dark:text-[#E2E2EA] shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-white/5 active:scale-[0.99]"
                >
                    <ClipboardList size={22} strokeWidth={2.2} />
                    Minhas Solicitações
                </Link>
            </div>
        </div>
    );
}