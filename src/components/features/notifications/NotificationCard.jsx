import Image from "next/image";
import { formatRelativeTime, getNotificationIcon } from "./notificationUtils";

export default function NotificationCard({ notification, onMarkAsViewed, isUpdating = false }) {
    const icon = getNotificationIcon(notification);
    const canMarkAsViewed = !notification.viewed && !isUpdating;

    function handleClick() {
        if (canMarkAsViewed) {
            onMarkAsViewed(notification.id);
        }
    }

    return (
        <li
            onClick={handleClick}
            className={`grid min-h-16 grid-cols-[46px_1fr_116px] items-center gap-3 border-b border-[#AAAAAA]/35 px-7 py-4 transition-colors last:border-b-0 ${canMarkAsViewed ? "cursor-pointer hover:bg-gray-50" : ""}`}
            title={canMarkAsViewed ? "Marcar como visualizada" : undefined}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={30}
                    height={30}
                />
            </div>

            <div className="min-w-0">
                <p className="truncate text-[15px] font-bold leading-tight text-black">
                    {notification.title || `Solicitacao #${notification.requestId || ""}`}
                </p>
                <p className="mt-0.5 truncate text-[12px] leading-tight text-black/70">
                    {notification.message || "Atualizacao de solicitacao"}
                </p>
            </div>

            <p className="text-right text-[12px] leading-tight text-black/70">
                {isUpdating ? "Atualizando..." : formatRelativeTime(notification.createdAt)}
            </p>
        </li>
    );
}
