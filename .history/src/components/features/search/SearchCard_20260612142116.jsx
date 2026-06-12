export function SearchCard({ cr }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center mb-3">
                <div className="bg-gray-100 rounded-2xl font-bold text-xl text-gray-800 pr-2">
                    {cr.crCode}
                </div>

                <div className="text-right font-bold text-[12px] text-black">
                    {cr.sector || cr.crName}
                </div>
            </div>

            <div className="grid grid-cols-2 text-[12px]">
                <div>
                    <p className="text-gray-400 font-semibold">FILIAL</p>
                    <p className="text-[#355C9C] font-medium">
                        {cr.branchName}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-gray-400 font-semibold">SUPERVISOR</p>
                    <p className="text-[#355C9C] font-medium">
                        {cr.responsibleUserName ?? 'Não atribuído'}
                    </p>
                </div>
            </div>
        </div>
    );
}