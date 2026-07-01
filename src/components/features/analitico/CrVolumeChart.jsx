export default function CrVolumeChart({ crs, maxCRValor, crFiltro, setCrFiltro }) {
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">Volume por Centro de Resultados (CR)</h3>
                    <p className="text-[10px] text-slate-400">Selecione para isolar um CR</p>
                </div>
                {crFiltro && (
                    <button 
                        onClick={() => setCrFiltro(null)} 
                        className="text-[10px] text-slate-500 font-semibold hover:underline"
                    >
                        Limpar
                    </button>
                )}
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4 mt-2">
                {crs.map((cr, idx) => {
                    const barWidth = (cr.valor / maxCRValor) * 100;
                    const isSelected = crFiltro === cr.nome;
                    return (
                        <button 
                            key={idx} 
                            onClick={() => setCrFiltro(isSelected ? null : cr.nome)}
                            className="flex flex-col gap-1 w-full text-left outline-none cursor-pointer group"
                            style={{ opacity: !crFiltro || isSelected ? 1 : 0.4 }}
                        >
                            <div className="flex justify-between text-xs font-semibold text-slate-650">
                                <span>{cr.nome}</span>
                                <span className="font-bold text-slate-900">{cr.valor}</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 rounded overflow-hidden">
                                <div
                                    style={{ width: `${barWidth}%` }}
                                    className={`h-full rounded transition-all duration-300 ${
                                        isSelected ? "bg-[#103D85]" : "bg-slate-400 group-hover:bg-[#103D85]"
                                    }`}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
