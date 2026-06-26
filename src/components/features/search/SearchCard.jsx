export function SearchCard({ cr }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3.5 w-full">
            <div className="flex justify-between items-start">
                <span className="font-bold text-lg text-gray-800 tracking-wide">
                    {cr.crCode}
                </span>
                <span className="text-right font-bold text-[12px] text-black pt-1">
                    {cr.sector || cr.crName}
                </span>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div>
                    <p className="text-gray-400 font-semibold text-[10px] tracking-wider mb-0.5">FILIAL</p>
                    <p className="text-[#355C9C] font-medium">
                        {cr.branchName}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-gray-400 font-semibold text-[10px] tracking-wider mb-0.5">SUPERVISOR</p>
                    <p className="text-[#355C9C] font-medium">
                        {cr.responsibleUserName ?? 'Não atribuído'}
                    </p>
                </div>
            </div>
        </div>
    );
}