import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

export default function AuditTableSkeleton({ rows = 8 }) {
    return (
        <div className="flex-1 flex flex-col min-h-0 w-full bg-white dark:bg-[#1A2233] overflow-hidden">
            <div className="lg:hidden p-3 space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="p-3 sm:p-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#1A2233]"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-col gap-2 min-w-0">
                                <Skeleton className="h-3 w-28" />
                                <div className="flex items-center gap-2">
                                    <SkeletonCircle className="h-4 w-4 shrink-0" />
                                    <Skeleton className="h-4 w-36" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-4 shrink-0" />
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                            <Skeleton className="h-6 w-[96px] rounded-full" />
                            <Skeleton className="h-6 w-[120px] rounded-full" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden lg:block flex-1 min-h-0 w-full overflow-auto pr-2 pb-2">
                <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
                    <thead>
                        <tr className="text-[12px] min-[1350px]:text-sm font-semibold text-gray-700 dark:text-[#E2E2EA] bg-[#F8FAFC] dark:bg-[#303746]">
                            <th className="py-3 px-2 min-[1350px]:px-4 w-[6%] font-medium">ID</th>
                            <th className="py-3 px-2 min-[1350px]:px-4 w-[20%] font-medium">Usuário</th>
                            <th className="py-3 px-2 min-[1350px]:px-4 w-[128px] min-[1350px]:w-[150px] font-medium">Nível</th>
                            <th className="py-3 px-2 min-[1350px]:px-4 w-[17%] font-medium">Tipo</th>
                            <th className="py-3 px-2 min-[1350px]:px-4 w-[18%] font-medium whitespace-nowrap">Usuário Afetado</th>
                            <th className="py-3 px-2 min-[1350px]:px-4 w-[11%] font-medium">Solicitação</th>
                            <th className="py-3 px-2 min-[1350px]:px-4 w-[16%] font-medium">Timestamp</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white dark:bg-[#1A2233]">
                        {Array.from({ length: rows }).map((_, index) => (
                            <tr key={index} className="border-b border-gray-50 dark:border-white/5">
                                <td className="py-2.5 px-2 min-[1350px]:px-4">
                                    <Skeleton className="h-4 w-8" />
                                </td>
                                <td className="py-2.5 px-2 min-[1350px]:px-4">
                                    <Skeleton className="h-4 w-32" />
                                </td>
                                <td className="py-2.5 px-2 min-[1350px]:px-4">
                                    <Skeleton className="h-6 w-[96px] min-[1350px]:w-[110px] rounded-full" />
                                </td>
                                <td className="py-2.5 px-2 min-[1350px]:px-4">
                                    <Skeleton className="h-6 w-[120px] min-[1350px]:w-[150px] rounded-full" />
                                </td>
                                <td className="py-2.5 px-2 min-[1350px]:px-4">
                                    <Skeleton className="h-4 w-24" />
                                </td>
                                <td className="py-2.5 px-2 min-[1350px]:px-4">
                                    <Skeleton className="h-4 w-12" />
                                </td>
                                <td className="py-2.5 px-2 min-[1350px]:px-4">
                                    <div className="flex flex-col gap-1.5">
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-3 w-12" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}