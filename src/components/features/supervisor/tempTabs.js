// components/features/supervisor/tempTabs.jsx
export default function MonitoramentoTabs({
    abaAtiva,
    setAbaAtiva,
}) {
    return (
        <div className="flex justify-between items-end px-6 pt-4 border-b border-[#797979]">
            <h2 className="text-4xl font-bold text-[#133D87] pb-3">
                Monitoramento
            </h2>

            <div className="flex gap-3">
                <button
                    onClick={() => setAbaAtiva('andamento')}
                    className={`w-[180px] py-2 border border-[#797979] rounded-t-[18px] mb-[-1px]
                        ${abaAtiva === 'andamento'
                            ? 'text-[#133D87] font-semibold border-b-white bg-white'
                            : 'text-gray-500 border-b-0'
                        }`}
                >
                    Em andamento
                </button>

                <button
                    onClick={() => setAbaAtiva('pendentes')}
                    className={`w-[180px] py-2 border border-[#797979] rounded-t-[18px] mb-[-1px]
                        ${abaAtiva === 'pendentes'
                            ? 'text-[#133D87] font-semibold border-b-white bg-white'
                            : 'text-gray-500 border-b-0'
                        }`}
                >
                    Pendentes
                </button>
            </div>
        </div>
    );
}