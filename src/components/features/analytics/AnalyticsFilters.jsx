'use client';

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
    <div className="bg-white p-5 border border-[#E2E8F0] rounded-2xl shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          Filtros de Business Intelligence
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline transition duration-200"
          >
            Limpar Todos os Filtros
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">Data Inicial</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">Data Final</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">Status da Solicitação</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
          >
            <option value="">Todos os Status</option>
            <option value="PENDENTE">Aguardando aprovação (Pendente)</option>
            <option value="ANDAMENTO">Em Andamento</option>
            <option value="APROVADO">Aprovada (Fila)</option>
            <option value="ENTREGUE">Entregue (Concluída)</option>
            <option value="RECUSADO">Recusada/Cancelada</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">Filial (Branch)</label>
          <select
            value={selectedFilial}
            onChange={(e) => setSelectedFilial(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
          >
            <option value="">Todas as Filiais</option>
            {filiais.map((fil, index) => (
              <option key={index} value={fil}>
                {fil}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">Centro de Resultado (CR)</label>
          <select
            value={selectedCR}
            onChange={(e) => setSelectedCR(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
          >
            <option value="">Todos os CRs</option>
            {crs.map((crb) => (
              <option key={crb.id} value={crb.id}>
                {crb.crCode} - {crb.crName} {crb.branchName ? `(${crb.branchName})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">Supervisor Responsável</label>
          <select
            value={selectedSupervisor}
            onChange={(e) => setSelectedSupervisor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
          >
            <option value="">Todos os Supervisores</option>
            {supervisores.map((sup, index) => (
              <option key={index} value={sup}>
                {sup}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">Nome do Solicitante</label>
          <select
            value={selectedRequester}
            onChange={(e) => setSelectedRequester(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 cursor-pointer text-gray-700"
          >
            <option value="">Todos os Solicitantes</option>
            {requesters.map((reqName, index) => (
              <option key={index} value={reqName}>
                {reqName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">Buscar por Produto</label>
          <input
            type="text"
            placeholder="Digite o nome do produto..."
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            className="w-full pl-3 pr-2 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85] transition-all bg-gray-50/50 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 mt-1 border-t border-gray-50 pt-3">
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-gray-600 hover:text-gray-800 transition">
          <input
            type="checkbox"
            checked={onlyAttachments}
            onChange={(e) => setOnlyAttachments(e.target.checked)}
            className="w-4 h-4 rounded text-[#103D85] focus:ring-[#103D85] border-gray-300 accent-[#103D85]"
          />
          <span>Apenas solicitações com anexos</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-gray-600 hover:text-gray-800 transition">
          <input
            type="checkbox"
            checked={onlyDelayed}
            onChange={(e) => setOnlyDelayed(e.target.checked)}
            className="w-4 h-4 rounded text-[#103D85] focus:ring-[#103D85] border-gray-300 accent-[#103D85]"
          />
          <span>Apenas solicitações atrasadas (SLA quebrado)</span>
        </label>
      </div>
    </div>
  );
}
