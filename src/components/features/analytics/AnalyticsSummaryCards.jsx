'use client';

import {
  FileText,
  ShoppingCart,
  Hourglass,
  Percent,
  Paperclip,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MetricValueSkeleton } from './AnalyticsSkeletons';

export default function AnalyticsSummaryCards({
  advancedMetrics,
  loading
}) {
  const getWidthPercentage = (value) => {
    if (!advancedMetrics.totalRequests) return '0%';
    return `${(value / advancedMetrics.totalRequests) * 100}%`;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-[#303746] p-4 border border-gray-100 dark:border-white/10 rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50/50 dark:bg-blue-500/10 rounded-full translate-x-4 -translate-y-4"></div>
          <div className="flex items-center gap-2 text-gray-400 dark:text-[#C3C6D3]">
            <FileText className="w-4 h-4 text-[#103D85] dark:text-[#5D8EF7]" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Solicitações</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-2">{loading ? <MetricValueSkeleton className='h-7 w-16' /> : advancedMetrics.totalRequests}</p>
          <p className="text-[10px] text-gray-400 dark:text-[#C3C6D3] mt-1">Registradas no total</p>
        </div>

        <div className="bg-white dark:bg-[#303746] p-4 border border-gray-100 dark:border-white/10 rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-full translate-x-4 -translate-y-4"></div>
          <div className="flex items-center gap-2 text-gray-400 dark:text-[#C3C6D3]">
            <ShoppingCart className="w-4 h-4 text-indigo-500 dark:text-indigo-300" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Itens Solicitados</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-2">{loading ? <MetricValueSkeleton className='h-7 w-16' /> : advancedMetrics.totalItemsQuantity}</p>
          <p className="text-[10px] text-indigo-500 dark:text-indigo-300 mt-1 font-semibold">{advancedMetrics.itemsPerRequest} itens/solicitação</p>
        </div>

        <div className="bg-white dark:bg-[#303746] p-4 border border-gray-100 dark:border-white/10 rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50/50 dark:bg-emerald-500/10 rounded-full translate-x-4 -translate-y-4"></div>
          <div className="flex items-center gap-2 text-gray-400 dark:text-[#C3C6D3]">
            <Hourglass className="w-4 h-4 text-emerald-500 dark:text-emerald-300" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Lead Time Médio</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-2">{loading ? <MetricValueSkeleton className='h-7 w-24' /> : `${advancedMetrics.averageLeadTime} dias`}</p>
          <p className="text-[10px] text-gray-400 dark:text-[#C3C6D3] mt-1">Tempo médio de entrega</p>
        </div>

        <div className="bg-white dark:bg-[#303746] p-4 border border-[#E2E8F0] dark:border-white/10 rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50/50 dark:bg-purple-500/10 rounded-full translate-x-4 -translate-y-4"></div>
          <div className="flex items-center gap-2 text-gray-400 dark:text-[#C3C6D3]">
            <Percent className="w-4 h-4 text-purple-500 dark:text-purple-300" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Taxa Aprovação</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-2">{loading ? <MetricValueSkeleton className='h-7 w-20' /> : `${advancedMetrics.taxaAprovacao}%`}</p>
          <p className="text-[10px] text-red-500 dark:text-[#F08B92] mt-1 font-semibold">{advancedMetrics.taxaRejeicao}% taxa de recusa</p>
        </div>

        <div className="bg-white dark:bg-[#303746] p-4 border border-[#E2E8F0] dark:border-white/10 rounded-xl shadow-sm hover:shadow transition relative overflow-hidden group col-span-2 md:col-span-1">
          <div className="absolute top-0 right-0 w-16 h-16 bg-pink-50/50 dark:bg-pink-500/10 rounded-full translate-x-4 -translate-y-4"></div>
          <div className="flex items-center gap-2 text-gray-400 dark:text-[#C3C6D3]">
            <Paperclip className="w-4 h-4 text-pink-500 dark:text-pink-300" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Com Anexos</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-2">{loading ? <MetricValueSkeleton className='h-7 w-12' /> : advancedMetrics.requestsWithAttachments}</p>
          <p className="text-[10px] text-gray-400 dark:text-[#C3C6D3] mt-1">{advancedMetrics.totalAttachments} arquivos anexados</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-[#303746] p-4 border-l-4 border-l-amber-500 border border-[#E2E8F0] dark:border-white/10 rounded-xl shadow-sm hover:shadow transition">
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-[#C3C6D3]">
            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-300" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Aguard. Aprovação</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-1">{loading ? <MetricValueSkeleton className='h-7 w-12' /> : advancedMetrics.pendentes}</p>
          <div className="w-full bg-gray-100 dark:bg-white/10 h-1.5 rounded-full mt-1.5">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: getWidthPercentage(advancedMetrics.pendentes) }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#303746] p-4 border-l-4 border-l-blue-500 border border-[#E2E8F0] dark:border-white/10 rounded-xl shadow-sm hover:shadow transition">
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-[#C3C6D3]">
            <TrendingUp className="w-4 h-4 text-blue-500 dark:text-blue-300" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Em Andamento</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-1">{loading ? <MetricValueSkeleton className='h-7 w-12' /> : advancedMetrics.andamento}</p>
          <div className="w-full bg-gray-100 dark:bg-white/10 h-1.5 rounded-full mt-1.5">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: getWidthPercentage(advancedMetrics.andamento) }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#303746] p-4 border-l-4 border-l-violet-500 border border-[#E2E8F0] dark:border-white/10 rounded-xl shadow-sm hover:shadow transition">
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-[#C3C6D3]">
            <CheckCircle2 className="w-4 h-4 text-violet-500 dark:text-violet-300" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Aprovadas (Fila)</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-1">{loading ? <MetricValueSkeleton className='h-7 w-12' /> : advancedMetrics.aprovadas}</p>
          <div className="w-full bg-gray-100 dark:bg-white/10 h-1.5 rounded-full mt-1.5">
            <div className="bg-violet-500 h-full rounded-full" style={{ width: getWidthPercentage(advancedMetrics.aprovadas) }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#303746] p-4 border-l-4 border-l-emerald-500 border border-[#E2E8F0] dark:border-white/10 rounded-xl shadow-sm hover:shadow transition">
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-[#C3C6D3]">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-300" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Entregues</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-1">{loading ? <MetricValueSkeleton className='h-7 w-12' /> : advancedMetrics.entregues}</p>
          <div className="w-full bg-gray-100 dark:bg-white/10 h-1.5 rounded-full mt-1.5">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: getWidthPercentage(advancedMetrics.entregues) }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#303746] p-4 border-l-4 border-l-red-500 border border-[#E2E8F0] dark:border-white/10 rounded-xl shadow-sm hover:shadow transition col-span-2 md:col-span-1">
          <div className="flex items-center gap-1.5 text-gray-400 dark:text-[#C3C6D3]">
            <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-300" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Recusadas/Cancel.</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-[#E2E2EA] mt-1">{loading ? <MetricValueSkeleton className='h-7 w-12' /> : advancedMetrics.recusadas}</p>
          <div className="w-full bg-gray-100 dark:bg-white/10 h-1.5 rounded-full mt-1.5">
            <div className="bg-red-500 h-full rounded-full" style={{ width: getWidthPercentage(advancedMetrics.recusadas) }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}