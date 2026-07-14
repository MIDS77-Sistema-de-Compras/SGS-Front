import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

export default function SummaryCardSkeleton({ rows = 3 }) {
    return (
        <ul className="flex flex-col gap-4">
            {Array.from({ length: rows }).map((_, index) => (
                <li
                    key={index}
                    className="flex w-full items-center justify-between rounded-xl p-4 shadow-lg"
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <SkeletonCircle className="h-[25px] w-[25px] shrink-0" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    <Skeleton className="h-6 w-8 shrink-0" />
                </li>
            ))}
        </ul>
    );
}
