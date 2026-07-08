import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

export default function RequestManagementSkeleton({ rows = 5 }) {
    return (
        <div className="flex flex-col">
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between gap-6 py-4 border-b border-gray-100 last:border-b-0"
                >
                    <div className="flex items-center gap-4 min-w-0">
                        <SkeletonCircle className="w-7 h-7 shrink-0" />

                        <div className="flex flex-col gap-2 min-w-0">
                            <Skeleton className="h-5 w-56" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-8 w-[170px] rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}
