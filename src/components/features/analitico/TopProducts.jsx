export default function TopProducts({ categorias }) {
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Produtos mais Solicitados</h3>
            <div className="flex-1 flex flex-col justify-center gap-4 mt-2">
                {categorias.map((cat, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                        <div className="flex justify-between text-xs text-slate-600 font-semibold">
                            <span>{cat.nome}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400 font-medium">{cat.pct}%</span>
                                <span className="text-slate-900 font-bold">{cat.valor}</span>
                            </div>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded overflow-hidden">
                            <div
                                style={{ width: `${cat.pct}%` }}
                                className="h-full bg-slate-500 rounded transition-all duration-300"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
