'use client';

import Dropdown from '@/components/ui/select/Dropdown';
import DatePicker from '@/components/ui/select/DatePicker';

const STATUS_OPTIONS = [
  { value: '', label: 'Todos os Status' },
  { value: 'PENDENTE', label: 'Aguardando aprovação (Pendente)' },
  { value: 'ANDAMENTO', label: 'Em Andamento' },
  { value: 'APROVADO', label: 'Aprovada (Fila)' },
  { value: 'ENTREGUE', label: 'Entregue (Concluída)' },
  { value: 'RECUSADO', label: 'Recusada/Cancelada' },
];

const FILTER_BUTTON_CLASS =
  'rounded-xl bg-gray-50/50 dark:bg-[#1A2233] border-gray-200 dark:border-white/15 dark:text-[#E2E2EA] py-2 px-3';

export default function AnalyticsFilters({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedStatus,
  setSelectedStatus,
  selectedFilial,
  setSelectedFilial,
  selectedCR,
  setSelectedCR,
  selectedSupervisor,
  setSelectedSupervisor,
  selectedRequester,
  setSelectedRequester,
  searchProduct,
  setSearchProduct,
  onlyAttachments,
  setOnlyAttachments,
  onlyDelayed,
  setOnlyDelayed,
  crs,
  filiais,
  supervisores,
  requesters,
  handleClearFilters
}) {
  const hasActiveFilters = startDate || endDate || selectedStatus || selectedFilial || selectedCR || selectedSupervisor || selectedRequester || searchProduct || onlyAttachments || onlyDelayed;

  return (
    <div className="bg-white dark:bg-[#303746] p-5 border border-[#E2E8F0] dark:border-white/10 rounded-2xl shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/10 pb-3">
        <h2 className="text-sm font-bold text-gray-700 dark:text-[#E2E2EA] uppercase tracking-wider flex items-center gap-2">
          Filtros de Business Intelligence
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-xs font-semibold text-red-600 dark:text-[#F08B92] hover:text-red-700 dark:hover:text-[#f5a7ac] hover:underline transition duration-200"
          >
            Limpar Todos os Filtros
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Data Inicial</label>
          <DatePicker
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            buttonClassName="py-2 bg-gray-50/50 dark:bg-[#1A2233] border-gray-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Data Final</label>
          <DatePicker
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            buttonClassName="py-2 bg-gray-50/50 dark:bg-[#1A2233] border-gray-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Status da Solicitação</label>
          <Dropdown
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            placeholder="Todos os Status"
            options={STATUS_OPTIONS}
            buttonClassName={FILTER_BUTTON_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Filial (Branch)</label>
          <Dropdown
            value={selectedFilial}
            onChange={(e) => setSelectedFilial(e.target.value)}
            placeholder="Todas as Filiais"
            options={[{ value: '', label: 'Todas as Filiais' }, ...filiais.map((fil) => ({ value: fil, label: fil }))]}
            buttonClassName={FILTER_BUTTON_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Centro de Resultado (CR)</label>
          <Dropdown
            value={selectedCR}
            onChange={(e) => setSelectedCR(e.target.value)}
            placeholder="Todos os CRs"
            options={[{ value: '', label: 'Todos os CRs' }, ...crs.map((crb) => ({ value: crb.id, label: `${crb.crCode} - ${crb.crName}${crb.branchName ? ` (${crb.branchName})` : ''}` }))]}
            buttonClassName={FILTER_BUTTON_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Supervisor Responsável</label>
          <Dropdown
            value={selectedSupervisor}
            onChange={(e) => setSelectedSupervisor(e.target.value)}
            placeholder="Todos os Supervisores"
            options={[{ value: '', label: 'Todos os Supervisores' }, ...supervisores.map((sup) => ({ value: sup, label: sup }))]}
            buttonClassName={FILTER_BUTTON_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Nome do Solicitante</label>
          <Dropdown
            value={selectedRequester}
            onChange={(e) => setSelectedRequester(e.target.value)}
            placeholder="Todos os Solicitantes"
            options={[{ value: '', label: 'Todos os Solicitantes' }, ...requesters.map((reqName) => ({ value: reqName, label: reqName }))]}
            buttonClassName={FILTER_BUTTON_CLASS}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-[#C3C6D3]">Buscar por Produto</label>
          <input
            type="text"
            placeholder="Digite o nome do produto..."
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            className="w-full pl-3 pr-2 py-2 border border-gray-200 dark:border-white/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] dark:focus:ring-[#1A4A9E] transition-all bg-gray-50/50 dark:bg-[#1A2233] dark:text-[#E2E2EA] placeholder:text-gray-400 dark:placeholder:text-[#C3C6D3]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 mt-1 border-t border-gray-50 dark:border-white/10 pt-3">
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-gray-600 dark:text-[#C3C6D3] hover:text-gray-800 dark:hover:text-[#E2E2EA] transition">
          <input
            type="checkbox"
            checked={onlyAttachments}
            onChange={(e) => setOnlyAttachments(e.target.checked)}
            className="w-4 h-4 rounded text-[#103D85] focus:ring-[#103D85] border-gray-300 dark:border-white/20 accent-[#103D85] dark:accent-[#1A4A9E]"
          />
          <span>Apenas solicitações com anexos</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-gray-600 dark:text-[#C3C6D3] hover:text-gray-800 dark:hover:text-[#E2E2EA] transition">
          <input
            type="checkbox"
            checked={onlyDelayed}
            onChange={(e) => setOnlyDelayed(e.target.checked)}
            className="w-4 h-4 rounded text-[#103D85] focus:ring-[#103D85] border-gray-300 dark:border-white/20 accent-[#103D85] dark:accent-[#1A4A9E]"
          />
          <span>Apenas solicitações atrasadas (SLA quebrado)</span>
        </label>
      </div>
    </div>
  );
}