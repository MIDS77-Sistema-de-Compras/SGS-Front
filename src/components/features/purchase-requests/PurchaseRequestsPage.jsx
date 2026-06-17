'use client';

import { useState } from 'react';
import PurchaseRequestsFilters from './PurchaseRequestsFilters';
import PurchaseRequestsTable from './PurchaseRequestsTable';
import { mockRequests } from './purchaseRequestsMock';

export default function PurchaseRequestsPage() {
  const [status, setStatus] = useState('');
  const [period, setPeriod] = useState('');

  return (
    <div className="flex w-full flex-col gap-5">
      <PurchaseRequestsFilters
        status={status}
        period={period}
        onStatusChange={setStatus}
        onPeriodChange={setPeriod}
      />

      <PurchaseRequestsTable requests={mockRequests} />
    </div>
  );
}
