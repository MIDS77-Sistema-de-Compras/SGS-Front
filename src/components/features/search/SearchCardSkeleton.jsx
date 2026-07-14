import Skeleton from '@/components/ui/skeleton/Skeleton';

export default function SearchCardSkeleton({ cards = 4 }) {
    return (
        <>
            {Array.from({ length: cards }).map((_, index) => (
                <div
                    key={index}
                    className="flex w-full flex-col gap-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#303746] p-4 shadow-sm"
                >
                    <div className="flex items-start justify-between">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-20" />
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-white/10" />

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-2.5 w-10" />
                            <Skeleton className="h-3.5 w-20" />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <Skeleton className="h-2.5 w-16" />
                            <Skeleton className="h-3.5 w-24" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}