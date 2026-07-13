import Skeleton from '@/components/ui/skeleton/Skeleton';


export default function RequestDetailsSkeleton({ rows = 6 }) {
    return (
        <div className="flex-1 p-0 font-sans">
            <div className="w-full">
                <div className="border border-[#AAAAAA] dark:border-white/10 rounded-xl flex flex-1 flex-col overflow-hidden min-h-0 bg-white dark:bg-[#1A2233]">
                    <div className="flex items-center gap-3 px-5 py-3">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-6 w-48" />
                    </div>

                    <hr className="border-gray-400 dark:border-white/10 mb-6" />

                    <div className="flex items-center justify-between mb-6 px-6">
                        <div className="flex items-baseline gap-4">
                            <Skeleton className="h-6 w-64" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                        <Skeleton className="h-6 w-[150px] rounded-full mr-8" />
                    </div>

                    <div className="w-full flex-1 overflow-y-auto px-5 pb-5">
                        <div className="rounded-xl bg-[#EEF2F6] dark:bg-[#303746] px-6 py-3">
                            <Skeleton className="h-4 w-32" />
                        </div>

                        <div className="divide-y divide-gray-200 dark:divide-white/10">
                            {Array.from({ length: rows }).map((_, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[1fr_1fr_6rem_8rem_8rem] items-center gap-4 py-4"
                                >
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-10 justify-self-center" />
                                    <Skeleton className="h-4 w-16 justify-self-center" />
                                    <Skeleton className="h-6 w-24 rounded-full justify-self-center" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}