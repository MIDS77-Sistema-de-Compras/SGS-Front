import Skeleton, { SkeletonCircle } from '@/components/ui/skeleton/Skeleton';

const COLUNAS = [
    { label: 'Nome', width: 'w-[25%]' },
    { label: 'E-mail', width: 'w-[25%]' },
    { label: 'Nível', width: 'w-[15%]' },
    { label: 'Status', width: 'w-[12%]' },
    { label: 'Última Atualização', width: 'w-[15%]' },
    { label: 'Ações', width: 'w-[8%]' },
];

export default function UserTableSkeleton({ rows = 8 }) {
    return (
        <div className="flex-1 flex flex-col min-h-0 w-full bg-white dark:bg-[#1A2233]">
            <div className="w-full bg-[#F8FAFC] dark:bg-[#303746] shadow-[0_1px_0_0_rgba(243,244,246,1)] dark:shadow-[0_1px_0_0_#303746] z-10 pr-6">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="text-sm font-semibold text-gray-700 dark:text-[#E2E2EA]">
                            {COLUNAS.map((coluna) => (
                                <th
                                    key={coluna.label}
                                    className={`py-3 px-4 font-medium ${coluna.width}`}
                                >
                                    {coluna.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="flex-1 flex flex-col min-h-0 w-full pr-2 pb-2">
                <div className="flex-1 overflow-y-auto min-h-0 w-full">
                    <table className="w-full text-left border-collapse table-fixed">
                        <tbody className="text-sm bg-white dark:bg-[#1A2233]">
                            {Array.from({ length: rows }).map((_, index) => (
                                <tr key={index} className="border-b border-gray-50 dark:border-white/5">
                                    <td className="py-2.5 px-4 w-[25%]">
                                        <div className="flex items-center gap-3">
                                            <SkeletonCircle className="w-8 h-8 shrink-0" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </td>
                                    <td className="py-2.5 px-4 w-[25%]">
                                        <Skeleton className="h-4 w-40" />
                                    </td>
                                    <td className="py-2.5 px-4 w-[15%]">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </td>
                                    <td className="py-2.5 px-4 w-[12%]">
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                    </td>
                                    <td className="py-2.5 px-4 w-[15%]">
                                        <Skeleton className="h-4 w-28" />
                                    </td>
                                    <td className="py-2.5 px-4 w-[8%]">
                                        <div className="flex justify-center">
                                            <Skeleton className="h-7 w-7 rounded-lg" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}