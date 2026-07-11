export default function SolicitacoesTabs({ abaAtiva, setAbaAtiva, titulo, abas }) {
    return (
        <div className="flex justify-between items-end px-5 border-b border-[#AAAAAA] dark:border-white/10">
            <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[22px] py-2">
                {titulo}
            </h2>

            <div className="flex gap-3">
                {abas.map((aba, index) => (
                    <button
                        key={aba.valor || index}
                        onClick={() => setAbaAtiva(aba.valor)}
                        className={`py-2 min-w-[150px] rounded-t-[18px] mb-[-1px] border border-[#AAAAAA] dark:border-white/10
                            ${abaAtiva === aba.valor
                                ? 'border-b-0 text-[#133D87] dark:text-[#E2E2EA] text-sm font-semibold bg-white dark:bg-[#303746]'
                                : 'text-gray-500 dark:text-[#C3C6D3] bg-white dark:bg-[#1A2233] text-sm'
                            }`}
                    >
                        {aba.label}
                    </button>
                ))}
            </div>
        </div>
    );
}