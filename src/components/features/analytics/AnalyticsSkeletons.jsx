'use client';

import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

export function MetricValueSkeleton({ className = 'h-7 w-20' }) {
    return (
        <span
            aria-hidden="true"
            className={`inline-block animate-pulse rounded-md bg-gray-200 dark:bg-white/10 align-middle ${className}`}
        />
    );
}

export function DonutChartSkeleton({ legends = 4 }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-2">
            <SkeletonCircle className="w-32 h-32" />

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full text-xs mt-2 border-t border-gray-50 dark:border-white/10 pt-3">
                {Array.from({ length: legends }).map((_, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                        <SkeletonCircle className="w-2.5 h-2.5 shrink-0" />
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-5 ml-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function LineChartSkeleton() {
    return (
        <div className="w-full flex-grow flex flex-col justify-end gap-2 mt-4">
            <Skeleton className="h-36 w-full rounded-lg" />

            <div className="flex justify-between px-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-2 w-8" />
                ))}
            </div>
        </div>
    );
}

export function BarListSkeleton({ rows = 5 }) {
    return (
        <div className="flex flex-col gap-3.5 mt-4">
            {Array.from({ length: rows }).map((_, index) => (
                <div key={index} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-3.5 w-40" />
                        <Skeleton className="h-3.5 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                </div>
            ))}
        </div>
    );
}

export function CompactListSkeleton({ rows = 5 }) {
    return (
        <div className="flex flex-col gap-3 mt-4">
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-1.5 pb-1.5 border-b border-gray-50 dark:border-white/5 last:border-0 last:pb-0"
                >
                    <div className="flex justify-between">
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                    <Skeleton className="h-1 w-full rounded-full" />
                </div>
            ))}
        </div>
    );
}

export function RankedListSkeleton({ rows = 5 }) {
    return (
        <div className="flex flex-col gap-3 mt-4">
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between pb-2 border-b border-gray-50 dark:border-white/5 last:border-0 last:pb-0"
                >
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-3.5 w-20" />
                        <Skeleton className="h-2.5 w-28" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
            ))}
        </div>
    );
}

export function RequestersGridSkeleton({ cards = 4 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {Array.from({ length: cards }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl"
                >
                    <SkeletonCircle className="w-8 h-8 shrink-0" />

                    <div className="flex flex-col gap-1.5 min-w-0">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2.5 w-16" />
                    </div>
                </div>
            ))}
        </div>
    );
}