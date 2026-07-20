import { formatResponsibleUserNames } from "@/service/crSearch";

export function SearchCard({ cr }) {
    const responsibleUserName = formatResponsibleUserNames(
        cr.responsibleUserName || cr.responsibleUsersName
    ) || 'Não atribuído';

    return (
        <div className={`relative h-full overflow-hidden rounded-xl border p-4 shadow-sm flex flex-col gap-3.5 w-full ${
            cr.master === true
                ? 'border-[#E5A900] bg-white ring-1 ring-[#E5A900]/25 dark:border-[#F2C94C] dark:bg-[#303746] dark:ring-[#F2C94C]/20'
                : 'border-gray-100 bg-white dark:border-white/10 dark:bg-[#303746]'
        }`}>
            {cr.master === true && (
                <span className="absolute inset-y-0 left-0 w-1 bg-[#E5A900] dark:bg-[#F2C94C]" aria-hidden="true" />
            )}
            <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-lg text-gray-800 dark:text-[#E2E2EA] tracking-wide">
                        {cr.crCode}
                    </span>
                    {cr.master === true && (
                        <span className="rounded-full border border-[#D39A00] bg-[#FFE39A] px-2 py-1 text-[10px] font-extrabold leading-none tracking-wide text-[#694B00] shadow-sm dark:border-[#F2C94C] dark:bg-[#F2C94C]/20 dark:text-[#FFE9A8]">
                            MASTER
                        </span>
                    )}
                </div>

                <div className="min-w-0 text-right">
                    <p className="font-bold text-[12px] text-black dark:text-[#E2E2EA] pt-1 leading-tight break-words">
                        {cr.crName}
                    </p>
                    {cr.sector && (
                        <p className="mt-1 text-[10px] font-medium leading-tight text-gray-400 dark:text-[#C3C6D3] break-words">
                            {cr.sector}
                        </p>
                    )}
                </div>
            </div>

            <div className="h-px bg-gray-100 dark:bg-white/10" />

            <div className="grid grid-cols-2 gap-2 text-[12px] mt-auto">
                <div>
                    <p className="text-gray-400 dark:text-[#E2E2EA] font-semibold text-[10px] tracking-wider mb-0.5">FILIAL</p>
                    <p className="text-[#355C9C] dark:text-[#C3C6D3] font-medium">
                        {cr.branchName}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-gray-400 dark:text-[#E2E2EA] font-semibold text-[10px] tracking-wider mb-0.5">RESPONSÁVEIS</p>
                    <p className="text-[#355C9C] dark:text-[#C3C6D3] font-medium">
                        {responsibleUserName}
                    </p>
                </div>
            </div>
        </div>
    );
}
