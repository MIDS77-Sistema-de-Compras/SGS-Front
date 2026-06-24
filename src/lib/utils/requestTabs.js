export default function SolicitacoesTabs({ abaAtiva, setAbaAtiva, titulo, abas }) {
    return (
        <div className="flex justify-between items-end px-6 pt-4 border-b border-[#797979]">
            <h2 className="text-3xl font-bold text-[#133D87] pb-3">
                {titulo}
            </h2>

            <div className="flex gap-3">
                {abas.map((aba) => (
                    <button
                        key={aba.valor}
                        onClick={() => setAbaAtiva(aba.valor)}
                        className={`py-2 min-w-[150px] rounded-t-[18px] mb-[-1px] border border-[#797979]
                            ${abaAtiva === aba.valor
                                ? 'border-b-white text-[#133D87] font-semibold bg-white'
                                : 'text-gray-500 bg-white'
                            }`}
                    >
                        {aba.label}
                    </button>
                ))}
            </div>
        </div>
    );
}