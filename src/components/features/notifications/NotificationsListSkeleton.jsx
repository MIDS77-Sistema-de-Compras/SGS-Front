import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

/**
 * Skeleton da lista de notificações. Espelha o grid de {@link NotificationCard}:
 * ícone | título/mensagem | tempo.
 */
export default function NotificationsListSkeleton({ rows = 6 }) {
    return (
        <ul className="flex flex-col py-3">
            {Array.from({ length: rows }).map((_, index) => (
                <li
                    key={index}
                    className="grid min-h-16 grid-cols-[46px_1fr_116px] items-center gap-3 border-b border-[#AAAAAA]/35 px-7 py-4 last:border-b-0"
                >
                    <SkeletonCircle className="h-8 w-8" />

                    <div className="flex min-w-0 flex-col gap-2">
                        <Skeleton className="h-4 w-3/5" />
                        <Skeleton className="h-3 w-4/5" />
                    </div>

                    <Skeleton className="h-3 w-16 justify-self-end" />
                </li>
            ))}
        </ul>
    );
}
