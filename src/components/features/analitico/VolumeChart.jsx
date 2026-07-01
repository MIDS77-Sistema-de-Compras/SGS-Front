export default function VolumeChart({ mensal, maxMensalValor, mesFiltro, setMesFiltro }) {
    return (
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">Evolução do Volume</h3>
                    <p className="text-[10px] text-slate-400">Clique nas colunas para filtrar por período</p>
                </div>
                {mesFiltro && (
                    <button 
                        onClick={() => setMesFiltro(null)} 
                        className="text-[10px] text-slate-500 font-semibold hover:underline"
                    >
                        Limpar
                    </button>
                )}
            </div>
            <div className="flex-1 min-h-[200px] flex items-end justify-between gap-4 px-2">
                {mensal.map((item, idx) => {
                    const heightPct = (item.valor / maxMensalValor) * 100;
                    const isSelected = mesFiltro === item.mes;
                    return (
                        <button 
                            key={idx} 
                            onClick={() => setMesFiltro(isSelected ? null : item.mes)}
                            className="flex-1 flex flex-col items-center group relative cursor-pointer outline-none"
                            style={{ opacity: !mesFiltro || isSelected ? 1 : 0.4 }}
                        >
                            <div className="absolute -top-8 bg-slate-900 text-white text-[10px] rounded py-0.5 px-2 opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none z-10">
                                {item.valor}
                            </div>
                            <div className="w-full bg-slate-50 rounded overflow-hidden flex items-end h-[160px] border border-slate-100">
                                <div
                                    style={{ height: `${heightPct}%` }}
                                    className={`w-full transition-all duration-300 ${
                                        isSelected ? "bg-[#103D85]" : "bg-slate-400 group-hover:bg-[#103D85]"
                                    }`}
                                />
                            </div>
                            <span className="text-[10px] font-semibold text-slate-500 mt-2 text-center truncate w-full">
                                {item.mes}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
