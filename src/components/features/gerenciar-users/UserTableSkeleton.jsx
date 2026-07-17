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
            <div className="w-full overflow-x-auto flex-1 min-h-0 pr-2 pb-2">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="text-sm font-semibold text-gray-700 dark:text-[#E2E2EA] bg-[#F8FAFC] dark:bg-[#303746] border-b border-gray-100 dark:border-white/10">
                            {COLUNAS.map((coluna) => (
                                <th
                                    key={coluna.label}
                                    className={`py-3 px-4 font-medium whitespace-nowrap ${coluna.width}`}
                                >
                                    {coluna.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

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
    );
}