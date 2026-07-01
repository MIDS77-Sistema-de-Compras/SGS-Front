import NotificationCard from "./NotificationCard";

export default function NotificationsList({ notifications, onMarkAsViewed, updatingId }) {
    if (!notifications.length) {
        return (
            <div className="flex flex-1 items-center justify-center px-7 py-10 text-center text-base text-[#666666]">
                Nenhuma notificacao encontrada.
            </div>
        );
    }

    return (
        <ul className="flex flex-col py-3">
            {notifications.map((notification) => (
                <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsViewed={onMarkAsViewed}
                    isUpdating={updatingId === notification.id}
                />
            ))}
        </ul>
    );
}
