import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

/**
 * Skeleton da lista de atividade recente. Espelha o layout de {@link ActivityItem}.
 */
export default function RecentActivitySkeleton({ rows = 4 }) {
    return (
        <ul className="flex flex-col gap-1">
            {Array.from({ length: rows }).map((_, index) => (
                <li
                    key={index}
                    className="-mx-5 flex items-center justify-between px-4 py-3"
                >
                    <div className="flex min-w-0 items-center gap-5">
                        <SkeletonCircle className="h-[35px] w-[35px] shrink-0" />

                        <div className="flex min-w-0 flex-col gap-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-56" />
                        </div>
                    </div>

                    <Skeleton className="h-3 w-12 shrink-0" />
                </li>
            ))}
        </ul>
    );
}
