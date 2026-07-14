import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

export default function SummaryCardSkeleton({ rows = 3 }) {
    return (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-4">
            {Array.from({ length: rows }).map((_, index) => (
                <li
                    key={index}
                    className="flex w-full flex-col items-center gap-2 rounded-xl p-3 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-4"
                >
                    <div className="flex min-w-0 flex-col items-center gap-2 sm:flex-row sm:gap-3">
                        <SkeletonCircle className="h-[25px] w-[25px] shrink-0" />
                        <Skeleton className="h-4 w-14 sm:w-24" />
                    </div>

                    <Skeleton className="h-6 w-8 shrink-0" />
                </li>
            ))}
        </ul>
    );
}