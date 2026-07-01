export default function MonitoramentoTabs({
    abaAtiva,
    setAbaAtiva,
}) {
    return (
        <div className="flex justify-between items-end px-6 pt-4 border-b border-[#797979] dark:border-white/10">
            <h2 className="text-4xl font-bold text-[#133D87] dark:text-[#E2E2EA] pb-3">
                Monitoramento
            </h2>

            <div className="flex gap-3">
                <button
                    onClick={() => setAbaAtiva('andamento')}
                    className={`w-[180px] py-2 border border-[#797979] dark:border-white/10 rounded-t-[18px] mb-[-1px]
                        ${abaAtiva === 'andamento'
                            ? 'text-[#133D87] dark:text-[#E2E2EA] font-semibold border-b-white dark:border-b-[#1A2233] bg-white dark:bg-[#1A2233]'
                            : 'text-gray-500 dark:text-[#C3C6D3] border-b-0 dark:bg-[#303746]'
                        }`}
                >
                    Em andamento
                </button>

                <button
                    onClick={() => setAbaAtiva('pendentes')}
                    className={`w-[180px] py-2 border border-[#797979] dark:border-white/10 rounded-t-[18px] mb-[-1px]
                        ${abaAtiva === 'pendentes'
                            ? 'text-[#133D87] dark:text-[#E2E2EA] font-semibold border-b-white dark:border-b-[#1A2233] bg-white dark:bg-[#1A2233]'
                            : 'text-gray-500 dark:text-[#C3C6D3] border-b-0 dark:bg-[#303746]'
                        }`}
                >
                    Pendentes
                </button>
            </div>
        </div>
    );
}