'use client';

import { useState } from 'react';
import PurchaseRequestsFilters from './PurchaseRequestsFilters';
import PurchaseRequestsTable from './PurchaseRequestsTable';

const mockRequests = [
  {
    id: 1,
    data: '12/12/2001',
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '20 unid.',
    additionalInfoStatus: 'ajustes',
  },
  {
    id: 2,
    data: '12/12/2001',
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '30 m²',
    additionalInfoStatus: 'entregue',
  },
  {
    id: 3,
    data: '12/12/2001',
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '10 caixas',
    additionalInfoStatus: 'atrasada',
  },
  {
    id: 4,
    data: '12/12/2001',
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '30 m²',
    additionalInfoStatus: 'cancelado',
  },
  {
    id: 5,
    data: '12/12/2001',
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '20 unid.',
    additionalInfoStatus: 'parcial',
  },
  {
    id: 6,
    data: '12/12/2001',
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '30 m²',
    additionalInfoStatus: 'atendimento',
  },
];

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
