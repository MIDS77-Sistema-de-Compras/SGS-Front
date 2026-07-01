export default function KpiCards({ data }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <span className="text-slate-400 text-xs font-semibold">Valor Estimado</span>
                <h2 className="text-2xl font-bold text-slate-800 mt-1">{data.valor}</h2>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <span className="text-slate-400 text-xs font-semibold">Total de Solicitações</span>
                <h2 className="text-2xl font-bold text-slate-800 mt-1">{data.total}</h2>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <span className="text-slate-400 text-xs font-semibold">Tempo de Aprovação</span>
                <h2 className="text-2xl font-bold text-slate-800 mt-1">{data.tempoMedio}</h2>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <span className="text-slate-400 text-xs font-semibold">Taxa de Aprovação</span>
                <h2 className="text-2xl font-bold text-slate-800 mt-1">{data.taxaAprovacao}</h2>
            </div>
        </div>
    );
}
