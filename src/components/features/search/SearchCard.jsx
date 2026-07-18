export function SearchCard({ cr }) {
    const responsibleUserName = String(cr.responsibleUserName ?? '').trim() || 'Não atribuído';

    return (
        <div className="h-full bg-white dark:bg-[#303746] rounded-xl border border-gray-100 dark:border-white/10 shadow-sm p-4 flex flex-col gap-3.5 w-full">
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-800 dark:text-[#E2E2EA] tracking-wide">
                        {cr.crCode}
                    </span>
                    {cr.master === true && (
                        <span className="rounded-full border border-[#103D85]/25 bg-[#103D85]/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#103D85] dark:border-[#9AB8F0]/40 dark:bg-[#9AB8F0]/15 dark:text-[#E2E2EA]">
                            MASTER
                        </span>
                    )}
                </div>
                <p className="font-bold text-[12px] leading-tight text-black dark:text-[#E2E2EA]">
                    {cr.crName}
                </p>
                {cr.sector && (
                    <p className="text-[11px] leading-tight text-gray-400 dark:text-[#C3C6D3]">
                        {cr.sector}
                    </p>
                )}
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
                    <p className="text-gray-400 dark:text-[#E2E2EA] font-semibold text-[10px] tracking-wider mb-0.5">SUPERVISOR</p>
                    <p className="text-[#355C9C] dark:text-[#C3C6D3] font-medium">
                        {responsibleUserName}
                    </p>
                </div>
            </div>
        </div>
    );
}
