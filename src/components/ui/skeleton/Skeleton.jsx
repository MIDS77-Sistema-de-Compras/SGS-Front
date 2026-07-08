'use client';

import { cn } from '@/lib/cn';

/**
 * Bloco base de skeleton. Reutilizável em qualquer tela.
 * Use as classes utilitárias para definir tamanho/formato:
 *   <Skeleton className="h-5 w-32" />
 *   <Skeleton className="h-8 w-[150px] rounded-full" />
 */
export default function Skeleton({ className, ...props }) {
    return (
        <div
            aria-hidden="true"
            className={cn('animate-pulse rounded-md bg-gray-200', className)}
            {...props}
        />
    );
}

/**
 * Círculo (avatar, indicador de status, ícone).
 */
export function SkeletonCircle({ className, ...props }) {
    return <Skeleton className={cn('rounded-full', className)} {...props} />;
}

/**
 * Bloco de várias linhas de texto. A última linha sai mais curta,
 * imitando o final de um parágrafo.
 */
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
