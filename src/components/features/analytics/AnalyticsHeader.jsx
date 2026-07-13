'use client';

import { Layers, Download } from 'lucide-react';

export default function AnalyticsHeader({
  filteredRequestsCount,
  currentTime,
  clockAngles,
  handleExportCSV
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 border border-[#E2E8F0] rounded-2xl shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-[#103D85] flex items-center gap-2">
          <Layers className="w-7 h-7 text-[#103D85]" />
          Visão Geral de Solicitações
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Análise consolidada detalhada de solicitações, filiais, centros de custo, volumes, anexos e performance operacional.
        </p>
      </div>
      
      <div className="flex items-center gap-4 self-stretch md:self-auto justify-end">
        <button
          onClick={handleExportCSV}
          disabled={filteredRequestsCount === 0}
          className="flex items-center gap-2 px-4 py-2 bg-[#103D85] hover:bg-[#0E3572] disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-sm transition duration-200"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Relatório</span>
        </button>

        {currentTime && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 text-sm font-semibold rounded-xl shadow-sm">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#103D85" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="flex-shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="12" x2="12" y2="7" transform={`rotate(${clockAngles.hourAngle} 12 12)`} />
              <line x1="12" y1="12" x2="12" y2="5" transform={`rotate(${clockAngles.minuteAngle} 12 12)`} />
            </svg>
            <span className="font-mono text-[#103D85]">{currentTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
