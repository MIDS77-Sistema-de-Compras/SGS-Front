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
            className={`flex items-start gap-3 sm:gap-4 border-b border-gray-100 dark:border-white/10 mb-2 py-4 transition-colors last:border-b-0 ${canMarkAsViewed ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5" : ""}`}
            title={canMarkAsViewed ? "Marcar como visualizada" : undefined}
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#303746] shrink-0 mt-0.5">
                <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={30}
                    height={30}
                />
            </div>

          
            <div className="flex-1 min-w-0 flex flex-row items-start justify-between gap-4">
                
                <div className="flex-1 min-w-0 flex flex-col">
                    <p className="text-[14px] sm:text-[15px] font-bold leading-tight text-black dark:text-[#E2E2EA]">
                        {notification.title || `Solicitação #${notification.requestId || ""}`}
                    </p>
                    <p 
                        className="mt-1 text-[11px] sm:text-[12px] leading-relaxed text-black/70 dark:text-[#C3C6D3] break-words"
                        dangerouslySetInnerHTML={{ __html: notification.message || "Atualização de solicitação" }}
                    />
                </div>

                <span className="shrink-0 whitespace-nowrap text-right text-[10px] sm:text-[12px] leading-tight text-black/50 dark:text-[#C3C6D3]/70 pt-0.5">
                    {isUpdating ? "Atualizando..." : formatRelativeTime(notification.createdAt)}
                </span>
            </div>
        </li>
    );
}