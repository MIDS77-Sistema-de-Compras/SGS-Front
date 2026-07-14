'use client';

import { cn } from '@/lib/cn';


export default function Skeleton({ className, ...props }) {
    return (
        <div
            aria-hidden="true"
            className={cn('animate-pulse rounded-md bg-gray-200 dark:bg-white/10', className)}
            {...props}
        />
    );
}

export function SkeletonCircle({ className, ...props }) {
    return <Skeleton className={cn('rounded-full', className)} {...props} />;
}

export function SkeletonText({ lines = 3, className, lineClassName }) {
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton
                    key={index}
                    className={cn(
                        'h-4',
                        index === lines - 1 ? 'w-2/3' : 'w-full',
                        lineClassName
                    )}
                />
            ))}
        </div>
    );
}