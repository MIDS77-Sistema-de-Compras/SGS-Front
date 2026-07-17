export default function SolicitacoesTabs({ abaAtiva, setAbaAtiva, titulo, abas }) {
    const colunasMobile = abas.length >= 4 ? 'grid-cols-2' : 'grid-cols-3';

    return (
        <div className="flex flex-col gap-2 border-b border-[#103D85] dark:border-white/10 px-4 pt-3 sm:px-5 xl:flex-row xl:items-end xl:justify-between xl:gap-2 xl:pt-0">
            <h2 className="whitespace-nowrap text-[18px] font-bold text-[#103D85] dark:text-[#E2E2EA] sm:text-[22px] xl:py-2">
                {titulo}
            </h2>

            <div className={`grid ${colunasMobile} gap-1.5 sm:flex sm:gap-2 xl:gap-3`}>
                {abas.map((aba, index) => (
                    <button
                        key={aba.valor || index}
                        onClick={() => setAbaAtiva(aba.valor)}
                        className={`min-w-0 truncate rounded-t-[14px] border px-2 py-2 text-[11px] font-medium mb-[-1px] sm:flex-1 sm:text-xs xl:flex-none xl:min-w-[140px] xl:rounded-t-[18px] xl:px-4 xl:text-sm
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