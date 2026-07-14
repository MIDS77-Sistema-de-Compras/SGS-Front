export default function SolicitacoesTabs({ abaAtiva, setAbaAtiva, titulo, abas }) {
    return (
        <div className="flex justify-between items-end px-5 border-b border-[#103D85] dark:border-white/10">
            <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[22px] py-2">
                {titulo}
            </h2>

            <div className="flex gap-3">
                {abas.map((aba, index) => (
                    <button
                        key={aba.valor || index}
                        onClick={() => setAbaAtiva(aba.valor)}
                        className={`py-2 min-w-[150px] rounded-t-[18px] mb-[-1px] border text-sm
                            ${abaAtiva === aba.valor
                                ? 'border-[#103D85] border-b-white dark:border-b-[#303746] text-[#133D87] dark:text-[#E2E2EA] font-semibold bg-white dark:bg-[#303746]'
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