import { Filter, X } from "lucide-react";

export default function ActiveFilters({ statusFiltro, setStatusFiltro, crFiltro, setCrFiltro, mesFiltro, setMesFiltro }) {
    return (
        <div className="px-8 py-3 flex flex-wrap gap-2 items-center bg-slate-50 border-b border-slate-200">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Filter size={11} /> Filtros ativos:
            </span>
            {statusFiltro && (
                <span className="bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium py-0.5 pl-2.5 pr-1 rounded flex items-center gap-1">
                    Status: {statusFiltro}
                    <button onClick={() => setStatusFiltro(null)} className="hover:bg-slate-200 rounded p-0.5"><X size={10} /></button>
                </span>
            )}
            {crFiltro && (
                <span className="bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium py-0.5 pl-2.5 pr-1 rounded flex items-center gap-1">
                    CR: {crFiltro}
                    <button onClick={() => setCrFiltro(null)} className="hover:bg-slate-200 rounded p-0.5"><X size={10} /></button>
                </span>
            )}
            {mesFiltro && (
                <span className="bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium py-0.5 pl-2.5 pr-1 rounded flex items-center gap-1">
                    Período: {mesFiltro}
                    <button onClick={() => setMesFiltro(null)} className="hover:bg-slate-200 rounded p-0.5"><X size={10} /></button>
                </span>
            )}
        </div>
    );
}
