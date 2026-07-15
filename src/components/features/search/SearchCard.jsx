export function SearchCard({ cr }) {
    return (
        <div className="bg-white dark:bg-[#303746] rounded-xl border border-gray-100 dark:border-white/10 shadow-sm p-4 flex flex-col gap-3.5 w-full">
            <div className="grid grid-cols-2 justify-between items-start gap-5">
                <span className="font-bold text-lg text-gray-800 dark:text-[#E2E2EA] tracking-wide">
                    {cr.crCode}
                </span>
                <span className="text-right font-bold text-[12px] text-black dark:text-[#E2E2EA] pt-1">
                    {cr.sector || cr.crName}
                </span>
            </div>

            <div className="h-px bg-gray-100 dark:bg-white/10" />

            <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div>
                    <p className="text-gray-400 dark:text-[#E2E2EA] font-semibold text-[10px] tracking-wider mb-0.5">FILIAL</p>
                    <p className="text-[#355C9C] dark:text-[#C3C6D3] font-medium">
                        {cr.branchName}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-gray-400 dark:text-[#E2E2EA] font-semibold text-[10px] tracking-wider mb-0.5">SUPERVISOR</p>
                    <p className="text-[#355C9C] dark:text-[#C3C6D3] font-medium">
                        {cr.responsibleUserName ?? 'Não atribuído'}
                    </p>
                </div>
            </div>
        </div>
    );
}