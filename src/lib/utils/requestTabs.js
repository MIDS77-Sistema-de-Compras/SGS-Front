export default function SolicitacoesTabs({ abaAtiva, setAbaAtiva, titulo, abas }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end px-5 border-b border-[#103D85] dark:border-white/10 gap-3 sm:gap-0 pt-2 sm:pt-0">
            <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-lg sm:text-[22px] py-1 sm:py-2">
                {titulo}
            </h2>

            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                {abas.map((aba, index) => (
                    <button
                        key={aba.valor || index}
                        onClick={() => setAbaAtiva(aba.valor)}
                        className={`py-2 px-3 flex-1 sm:flex-initial min-w-[100px] sm:min-w-[150px] rounded-t-[18px] mb-[-1px] border text-xs sm:text-sm transition-all
                            ${abaAtiva === aba.valor
                                ? 'border-[#103D85] border-b-white dark:border-b-[#303746] text-[#133D87] dark:text-[#E2E2EA] dark:border-white/10 font-semibold bg-white dark:bg-[#303746]'
                                : 'border-gray-100 border-b-[#103D85] dark:border-white/10 text-gray-500 dark:text-[#C3C6D3] bg-white dark:bg-[#1A2233]'
                            }`}
                    >
                        {aba.label}
                    </button>
                ))}
            </div>
        </div>
    );
}