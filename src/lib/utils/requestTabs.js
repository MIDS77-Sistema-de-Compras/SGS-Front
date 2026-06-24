export default function SolicitacoesTabs({ abaAtiva, setAbaAtiva, titulo, abas }) {
    return (
        <div className="flex justify-between items-end px-5 border-b border-[#AAAAAA]">
            <h2 className="text-[#103D85] font-bold text-[22px] py-3">
                {titulo}
            </h2>

            <div className="flex gap-3">
                {abas.map((aba) => (
                    <button
                        key={aba.valor}
                        onClick={() => setAbaAtiva(aba.valor)}
                        className={`py-2 min-w-[150px] rounded-t-[18px] mb-[-1px] border border-[#AAAAAA]
                            ${abaAtiva === aba.valor
                                ? 'border-b-0 text-[#133D87] text-sm font-semibold bg-white'
                                : 'text-gray-500 bg-white text-sm'
                            }`}
                    >
                        {aba.label}
                    </button>
                ))}
            </div>
        </div>
    );
}