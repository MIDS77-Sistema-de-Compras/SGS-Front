import Skeleton from '@/components/ui/skeleton/Skeleton';

export default function RequestsTableSkeleton({ rows = 6 }) {
    return (
        <div className="flex flex-col">
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="border-b border-gray-100 dark:border-white/10"
                >
                    <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_120px_170px] lg:items-center lg:gap-6 lg:py-5">
                        <Skeleton className="h-5 w-48 sm:w-64" />

                        <div className="flex items-center justify-between gap-4 lg:contents">
                            <Skeleton className="h-5 w-20 lg:ml-auto" />
                            <Skeleton className="h-8 w-[130px] rounded-full lg:w-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}