import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

export default function RecentActivitySkeleton({ rows = 4 }) {
    return (
        <ul className="flex flex-col">
            {Array.from({ length: rows }).map((_, index) => (
                <li
                    key={index}
                    className="flex items-center justify-between gap-3 rounded-lg px-1 py-3"
                >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                        <SkeletonCircle className="h-[28px] w-[28px] shrink-0 sm:h-[35px] sm:w-[35px]" />

                        <div className="flex min-w-0 flex-col gap-2">
                            <Skeleton className="h-4 w-32 sm:w-40" />
                            <Skeleton className="h-3 w-40 sm:w-56" />
                        </div>
                    </div>

                    <Skeleton className="h-3 w-12 shrink-0" />
                </li>
            ))}
        </ul>
    );
}