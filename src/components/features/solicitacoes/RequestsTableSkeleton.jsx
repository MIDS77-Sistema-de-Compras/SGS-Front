import Skeleton from '@/components/ui/skeleton/Skeleton';

/**
 * Skeleton da listagem de solicitações. Espelha o layout de {@link SolicitacaoRow}:
 * (código + data) à esquerda e badge de status à direita.
 */
export default function RequestsTableSkeleton({ rows = 6 }) {
    return (
        <div className="flex flex-col">
            {Array.from({ length: rows }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between py-5 border-b border-gray-200"
                >
                    <div className="flex items-center gap-20 px-6">
                        <Skeleton className="h-5 w-64" />
                        <Skeleton className="h-5 w-24" />
                    </div>

                    <div className="px-6">
                        <Skeleton className="h-8 w-[150px] rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}
