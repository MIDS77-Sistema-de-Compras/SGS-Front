export default function StatusDistribution({ status, statusFiltro, setStatusFiltro }) {
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">Distribuição por Status</h3>
                    <p className="text-[10px] text-slate-400">Distribuição percentual das solicitações</p>
                </div>
                {statusFiltro && (
                    <button 
                        onClick={() => setStatusFiltro(null)} 
                        className="text-[10px] text-slate-500 font-semibold hover:underline"
                    >
                        Limpar
                    </button>
                )}
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4">
                {status.map((item, idx) => {
                    const isSelected = statusFiltro === item.nome;
                    return (
                        <button
                            key={idx}
                            onClick={() => setStatusFiltro(isSelected ? null : item.nome)}
                            className="w-full flex flex-col gap-1 text-left outline-none cursor-pointer group"
                            style={{ opacity: !statusFiltro || isSelected ? 1 : 0.4 }}
                        >
                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                <span className="flex items-center gap-2">
                                    <span style={{ backgroundColor: item.cor }} className="w-2.5 h-2.5 rounded" />
                                    <span>{item.nome}</span>
                                </span>
                                <span className="font-bold text-slate-900">{item.total} ({item.pct}%)</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 rounded overflow-hidden">
                                <div
                                    style={{ width: `${item.pct}%`, backgroundColor: item.cor }}
                                    className="h-full rounded transition-all duration-300"
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
