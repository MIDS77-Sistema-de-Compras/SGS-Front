import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

export default function RequestManagementSkeleton({ rows = 5 }) {
    return (
        <div className="flex flex-col">
            {Array.from({ length: rows }).map((_, index) => (
                <div key={index} className="last:[&>.sep]:hidden">
                    <div className="flex flex-col gap-3 py-4 px-2 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
                        <div className="flex items-center gap-4 min-w-0">
                            <SkeletonCircle className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />

                            <div className="flex flex-col gap-2 min-w-0">
                                <Skeleton className="h-5 w-48 sm:w-56" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </div>

                        <div className="grid grid-cols-[70px_1fr] items-center gap-x-3 gap-y-2 pl-9 sm:flex sm:items-center sm:gap-4 sm:pl-11 xl:gap-6 xl:pl-0 xl:shrink-0">
                            <Skeleton className="h-4 w-14" />
                            <Skeleton className="h-8 w-[150px] rounded-full justify-self-end sm:ml-auto xl:ml-0 xl:w-[170px]" />
                            <div className="col-start-2 justify-self-end flex gap-2 sm:col-auto xl:gap-3">
                                <Skeleton className="h-7 w-[90px] rounded-full" />
                                <Skeleton className="h-7 w-[90px] rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div className="sep mx-auto h-px w-[92%] bg-gray-100/80 dark:bg-white/5" />
                </div>
            ))}
        </div>
    );
}