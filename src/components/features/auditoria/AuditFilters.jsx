import Image from "next/image";

export default function AuditFilters({ searchTerm, actionType, period, actionOptions, onSearchChange, onActionChange, onPeriodChange, onExport }) {
    return (
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
            <label className="relative flex-1 max-w-[280px]">
                <Image src="/images/icons/lupa.png" alt="" width={16} height={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
                <input type="search" placeholder="Buscar por usuário..." value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-[13px] text-gray-600 bg-white outline-none focus:border-[#103D85] transition-colors" />
            </label>

            <div className="relative">
                <select value={actionType} onChange={(event) => onActionChange(event.target.value)} className="appearance-none border border-gray-300 rounded-lg pl-4 pr-9 py-2 text-[13px] text-gray-500 bg-white outline-none focus:border-[#103D85] min-w-[140px] transition-colors">
                    <option value="">Tipo de ação</option>
                    {actionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10L12 15L17 10" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>

            <label className="relative">
                <input type="text" placeholder="Período" value={period} onChange={(event) => onPeriodChange(event.target.value)} className="border border-gray-300 rounded-lg pl-4 pr-9 py-2 text-[13px] text-gray-500 bg-white outline-none focus:border-[#103D85] min-w-[130px] transition-colors" />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#888" strokeWidth="1.5" /><path d="M16 2V6M8 2V6M3 10H21" stroke="#888" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </label>

            <div className="flex-1" />
            <button type="button" onClick={onExport} className="flex items-center gap-2 border border-gray-300 rounded-lg px-5 py-2 text-[13px] font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors active:scale-[0.98]">Exportar</button>
        </div>
    );
}
