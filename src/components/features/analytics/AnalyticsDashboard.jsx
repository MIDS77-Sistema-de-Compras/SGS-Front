'use client';

import { useAnalytics } from '@/hooks/useAnalytics';
import { AlertCircle } from 'lucide-react';
import AnalyticsHeader from './AnalyticsHeader';
import AnalyticsFilters from './AnalyticsFilters';
import AnalyticsSummaryCards from './AnalyticsSummaryCards';
import AnalyticsCharts from './AnalyticsCharts';
import AnalyticsRankings from './AnalyticsRankings';

export default function AnalyticsDashboard() {
  const {
    loading,
    error,
    currentTime,
    crs,
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
    supervisores,
    filiais,
    requesters,
    filteredRequests,
    advancedMetrics,
    requestsStatusChart,
    donutCirclesRequests,
    itemsStatusChart,
    donutCirclesItems,
    historyChartData,
    branchData,
    topCRs,
    topProducts,
    measurementUnitsData,
    topRequesters,
    largestRequests,
    clockAngles,
    handleClearFilters,
    handleExportCSV
  } = useAnalytics();

  return (
    <div className="flex flex-col gap-6 w-full max-h-[85vh] overflow-y-auto pr-2 pb-6">
      <AnalyticsHeader
        filteredRequestsCount={filteredRequests.length}
        currentTime={currentTime}
        clockAngles={clockAngles}
        handleExportCSV={handleExportCSV}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-[#BA1A1A] p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <AnalyticsFilters
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedFilial={selectedFilial}
        setSelectedFilial={setSelectedFilial}
        selectedCR={selectedCR}
        setSelectedCR={setSelectedCR}
        selectedSupervisor={selectedSupervisor}
        setSelectedSupervisor={setSelectedSupervisor}
        selectedRequester={selectedRequester}
        setSelectedRequester={setSelectedRequester}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        onlyAttachments={onlyAttachments}
        setOnlyAttachments={setOnlyAttachments}
        onlyDelayed={onlyDelayed}
        setOnlyDelayed={setOnlyDelayed}
        crs={crs}
        filiais={filiais}
        supervisores={supervisores}
        requesters={requesters}
        handleClearFilters={handleClearFilters}
      />

      <AnalyticsSummaryCards
        advancedMetrics={advancedMetrics}
        loading={loading}
      />

      <AnalyticsCharts
        loading={loading}
        filteredRequestsCount={filteredRequests.length}
        requestsStatusChart={requestsStatusChart}
        donutCirclesRequests={donutCirclesRequests}
        itemsStatusChart={itemsStatusChart}
        donutCirclesItems={donutCirclesItems}
        historyChartData={historyChartData}
        totalItemsCount={filteredRequests.flatMap(r => r.produtos || []).length}
      />

      <AnalyticsRankings
        loading={loading}
        branchData={branchData}
        topCRs={topCRs}
        topProducts={topProducts}
        measurementUnitsData={measurementUnitsData}
        largestRequests={largestRequests}
        topRequesters={topRequesters}
        advancedMetrics={advancedMetrics}
      />
    </div>
  );
}
