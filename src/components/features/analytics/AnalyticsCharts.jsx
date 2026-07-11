'use client';

export default function AnalyticsCharts({
  loading,
  filteredRequestsCount,
  requestsStatusChart,
  donutCirclesRequests,
  itemsStatusChart,
  donutCirclesItems,
  historyChartData,
  totalItemsCount
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Status de Solicitações</h3>
          <p className="text-[11px] text-gray-400">Distribuição com base nas requisições gerais.</p>
        </div>

        {loading ? (
          <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
        ) : requestsStatusChart.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 mt-2">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F1F5F9" strokeWidth="10" />
                {donutCirclesRequests.map((circle, i) => (
                  <circle
                    key={i}
                    cx={circle.cx}
                    cy={circle.cy}
                    r={circle.radius}
                    fill="transparent"
                    stroke={circle.color}
                    strokeWidth="10"
                    strokeDasharray={circle.strokeDasharray}
                    strokeDashoffset={circle.strokeDashoffset}
                    className="transition-all duration-300"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-gray-800">{filteredRequestsCount}</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase">Solicit.</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full text-xs mt-2 border-t border-gray-50 pt-3">
              {requestsStatusChart.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-500 font-medium truncate">{item.name}</span>
                  <span className="font-bold text-gray-700 ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Status de Itens Pedidos</h3>
          <p className="text-[11px] text-gray-400">Mapeamento granular dos produtos dentro de cada pedido.</p>
        </div>

        {loading ? (
          <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
        ) : itemsStatusChart.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 mt-2">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="35" fill="transparent" stroke="#F1F5F9" strokeWidth="10" />
                {donutCirclesItems.map((circle, i) => (
                  <circle
                    key={i}
                    cx={circle.cx}
                    cy={circle.cy}
                    r={circle.radius}
                    fill="transparent"
                    stroke={circle.color}
                    strokeWidth="10"
                    strokeDasharray={circle.strokeDasharray}
                    strokeDashoffset={circle.strokeDashoffset}
                    className="transition-all duration-300"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-gray-800">
                  {totalItemsCount}
                </span>
                <span className="text-[8px] font-bold text-gray-400 uppercase">Itens</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full text-xs mt-2 border-t border-gray-50 pt-3">
              {itemsStatusChart.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-500 font-medium truncate">{item.name}</span>
                  <span className="font-bold text-gray-700 ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Tendência Histórica</h3>
          <p className="text-[11px] text-gray-400">Evolução do volume de solicitações abertas por período.</p>
        </div>

        {loading ? (
          <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
        ) : !historyChartData || !historyChartData.points || historyChartData.points.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
        ) : (
          <div className="w-full flex-grow flex flex-col justify-end mt-4">
            <svg viewBox={`0 0 ${historyChartData.width} ${historyChartData.height}`} className="w-full h-36 overflow-visible">
              <defs>
                <linearGradient id="biChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#103D85" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#103D85" stopOpacity="0.00" />
                </linearGradient>
              </defs>
              {[0, 0.5, 1].map((ratio, index) => {
                const y = historyChartData.height - historyChartData.paddingBottom - ratio * (historyChartData.height - historyChartData.paddingBottom - 15);
                return (
                  <g key={index}>
                    <line x1={historyChartData.paddingLeft} y1={y} x2={historyChartData.width - 10} y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={historyChartData.paddingLeft - 6} y={y + 3} textAnchor="end" className="text-[8px] fill-gray-400 font-bold">{Math.round(ratio * historyChartData.maxCount)}</text>
                  </g>
                );
              })}
              <path d={historyChartData.areaPath} fill="url(#biChartGradient)" />
              <path d={historyChartData.linePath} fill="none" stroke="#103D85" strokeWidth="2" strokeLinecap="round" />
              {historyChartData.points.map((p, i) => (
                <g key={i} className="group/dot cursor-pointer">
                  <circle cx={p.x} cy={p.y} r="3.5" fill="#103D85" stroke="#FFFFFF" strokeWidth="1" />
                  <g className="opacity-0 pointer-events-none group-hover/dot:opacity-100 transition-opacity duration-150">
                    <rect x={p.x - 20} y={p.y - 25} width="40" height="16" rx="3" fill="#1E293B" />
                    <text x={p.x} y={p.y - 14} textAnchor="middle" fill="#FFFFFF" className="text-[8px] font-bold">{p.count} req.</text>
                  </g>
                </g>
              ))}
              {historyChartData.points.map((p, i) => {
                if (historyChartData.points.length > 5 && i % 2 !== 0) return null;
                const rawDate = p.date;
                const displayDate = rawDate.includes('-') 
                  ? rawDate.split('-').slice(2).join('/') + '/' + rawDate.split('-')[1]
                  : rawDate;
                return (
                  <text key={i} x={p.x} y={historyChartData.height - 4} textAnchor="middle" className="text-[8px] fill-gray-400 font-semibold">{displayDate}</text>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
