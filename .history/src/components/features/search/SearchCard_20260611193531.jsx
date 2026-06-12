export function SearchCard({ cr }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1 w-full">
            <div className="flex justify-between items-center mb-3">
                <div className="=bg-gray-100 rounded-2xl font-bold text-1xl text-gray-800">
                    {cr.}
                </div>

                <div className="text-right font-bold text-[12px] text-black">
                    {cr.tipo}
                </div>
            </div>

            <div className="grid grid-cols-2 text-[12px]">
                <div>
                    <p className="text-gray-400 font-semibold">WEG</p>

                    <p className="text-[#355C9C] font-medium">
                        {cr.weg}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-gray-400 font-semibold">SENAI</p>

                    <p className="text-[#355C9C] font-medium">
                        {cr.senai}
                    </p>
                </div>
            </div>
        </div>
    );
}