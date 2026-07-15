export default function SolicitacoesTabs({ abaAtiva, setAbaAtiva, titulo, abas }) {
    return (
        <div className="flex flex-col gap-3 border-b border-[#103D85] dark:border-white/10 px-4 pt-3 sm:px-5 md:flex-row md:items-end md:justify-between md:gap-2 md:pt-0">
            <h2 className="text-[18px] font-bold text-[#103D85] dark:text-[#E2E2EA] sm:text-[22px] md:py-2">
                {titulo}
            </h2>
            
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:flex md:gap-3">
                {abas.map((aba, index) => (
                    <button
                        key={aba.valor || index}
                        onClick={() => setAbaAtiva(aba.valor)}
                        className={`rounded-t-[14px] border px-2 py-2 text-[11px] font-medium whitespace-nowrap mb-[-1px] sm:text-xs md:min-w-[150px] md:rounded-t-[18px] md:px-4 md:text-sm
                            ${abaAtiva === aba.valor
                                ? 'border-[#103D85] border-b-white dark:border-b-[#303746] dark:border-white/10 bg-white font-semibold text-[#133D87] dark:bg-[#303746] dark:text-[#E2E2EA]'
                                : 'border-gray-100 border-b-[#103D85] dark:border-white/10 bg-white text-gray-500 dark:bg-[#1A2233] dark:text-[#C3C6D3]'
                            }`}
                    >
                        {aba.label}
                    </button>
                ))}
            </div>
        </div>
    );
}