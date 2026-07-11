'use client';

import { 
  MapPin, 
  Layers, 
  ShoppingCart, 
  Tag, 
  ListCollapse, 
  Users, 
  AlertCircle 
} from 'lucide-react';

export default function AnalyticsRankings({
  loading,
  branchData,
  topCRs,
  topProducts,
  measurementUnitsData,
  largestRequests,
  topRequesters,
  advancedMetrics
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#103D85]" />
              Solicitações por Filial (Branch)
            </h3>
            <p className="text-[11px] text-gray-400">Distribuição geográfica dos pedidos emitidos.</p>
          </div>

          {loading ? (
            <div className="h-44 flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
          ) : branchData.length === 0 ? (
            <div className="h-44 flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3.5 mt-4">
              {branchData.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700 truncate max-w-[80%]">{item.name}</span>
                    <span className="font-bold text-[#103D85]">{item.count} <span className="text-[9px] text-gray-400 font-normal">req.</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" />
              Volume por Centro de Resultado (CR)
            </h3>
            <p className="text-[11px] text-gray-400">Centros com maior emissão e requisições acumuladas.</p>
          </div>

          {loading ? (
            <div className="h-44 flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
          ) : topCRs.length === 0 ? (
            <div className="h-44 flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3.5 mt-4">
              {topCRs.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700 truncate max-w-[80%]">{item.name}</span>
                    <span className="font-bold text-[#103D85]">{item.count} <span className="text-[9px] text-gray-400 font-normal">req.</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4 text-blue-500" />
              Top Produtos Solicitados
            </h3>
            <p className="text-[10px] text-gray-400">Quantidade física total solicitada por produto.</p>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Carregando...</div>
          ) : topProducts.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {topProducts.map((p, i) => (
                <div key={i} className="flex flex-col gap-1 text-xs pb-1.5 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700 truncate max-w-[75%]">{p.name}</span>
                    <span className="font-bold text-gray-800">{p.qty} un.</span>
                  </div>
                  <div className="w-full bg-gray-50 h-1 rounded-full">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${p.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-pink-500" />
              Unidades de Medida
            </h3>
            <p className="text-[10px] text-gray-400">Mapeamento de embalagem/embalagens mais requisitadas.</p>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Carregando...</div>
          ) : measurementUnitsData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {measurementUnitsData.map((u, i) => (
                <div key={i} className="flex flex-col gap-1 text-xs pb-1.5 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700 uppercase">{u.name}</span>
                    <span className="font-bold text-gray-800">{u.count} itens</span>
                  </div>
                  <div className="w-full bg-gray-50 h-1 rounded-full">
                    <div className="bg-pink-500 h-full rounded-full" style={{ width: `${u.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <ListCollapse className="w-4 h-4 text-emerald-500" />
              Pedidos em Maior Escala
            </h3>
            <p className="text-[10px] text-gray-400">Solicitações com maior quantidade de volumes pedidas.</p>
          </div>

          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Carregando...</div>
          ) : largestRequests.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-400 text-xs">Nenhum dado.</div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {largestRequests.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-xs pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-gray-800">{r.codigo}</span>
                    <span className="text-[10px] text-gray-400 truncate max-w-[120px]">Por: {r.requester}</span>
                  </div>
                  <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                    {r.qty} unidades
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#103D85]" />
              Ranking de Usuários Solicitantes
            </h3>
            <p className="text-[11px] text-gray-400">Colaboradores com maior número de requisições enviadas ao fluxo.</p>
          </div>

          {loading ? (
            <div className="h-32 flex items-center justify-center text-gray-400 text-sm">Carregando...</div>
          ) : topRequesters.length === 0 ? (
            <div className="h-32 flex items-center justify-center text-gray-400 text-sm">Nenhum dado.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {topRequesters.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-xl transition">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#103D85] font-black flex items-center justify-center text-xs">
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-gray-800 text-xs truncate">{r.name}</span>
                    <span className="text-[10px] text-gray-400 font-bold">{r.count} Solicitações</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-indigo-500" />
              Saúde da Operação e SLA de Compras
            </h3>
            <p className="text-[11px] text-gray-400">Informações de auditoria e tempos operacionais agregados.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-blue-50/30 border border-blue-50/60 rounded-xl">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Taxa de SLA Cumprido</span>
              <span className="text-lg font-black text-blue-800 mt-1 block">
                {loading ? '...' : `${100 - (advancedMetrics.totalRequests > 0 ? Math.round((advancedMetrics.atrasadas / advancedMetrics.totalRequests) * 100) : 0)}%`}
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5 block">{advancedMetrics.atrasadas} solicitações atrasadas atualmente</span>
            </div>

            <div className="p-3 bg-emerald-50/30 border border-emerald-50/60 rounded-xl">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Sincronismo de Arquivos</span>
              <span className="text-lg font-black text-emerald-800 mt-1 block">
                {loading ? '...' : `${advancedMetrics.totalRequests > 0 ? Math.round((advancedMetrics.requestsWithAttachments / advancedMetrics.totalRequests) * 100) : 0}%`}
              </span>
              <span className="text-[9px] text-gray-400 mt-0.5 block">Pedidos que contêm anexos de mídia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
