"use client";

export function SearchCard({ cr }) {
    return (
        <div
            className="
                bg-white rounded-3xl shadow-md
                p-3 flex flex-col gap-1
                w-full
            "
        >
            <div className="flex justify-between items-start">
                <div
                    className="
                        bg-gray-100 rounded-2xl
                        px-3 py-2
                        font-bold text-1xl text-gray-800
                    "
                >
                    {cr.id}
                </div>

                <div className="text-right font-bold text-sm text-black">
                    {cr.tipo}
                </div>
            </div>

            <div className="flex justify-between text-sm">
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