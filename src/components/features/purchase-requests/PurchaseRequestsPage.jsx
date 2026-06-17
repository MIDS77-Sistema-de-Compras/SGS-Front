'use client';

import { useState } from 'react';
import PurchaseRequestsFilters from './PurchaseRequestsFilters';
import PurchaseRequestsTable from './PurchaseRequestsTable';

const mockRequests = [
  {
    id: 1,
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '7940 Aprendizagem - Tecnologia da Informação',
    additionalInfoStatus: 'ajustes',
  },
  {
    id: 2,
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '7940 Aprendizagem - Tecnologia da Informação',
    additionalInfoStatus: 'entregue',
  },
  {
    id: 3,
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '7940 Aprendizagem - Tecnologia da Informação',
    additionalInfoStatus: 'atrasada',
  },
  {
    id: 4,
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '7940 Aprendizagem - Tecnologia da Informação',
    additionalInfoStatus: 'cancelado',
  },
  {
    id: 5,
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '7940 Aprendizagem - Tecnologia da Informação',
    additionalInfoStatus: 'parcial',
  },
  {
    id: 6,
    product: 'Aço 1020',
    variation: 'MAT-ACO-1020-RED',
    quantity: '7940 Aprendizagem - Tecnologia da Informação',
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
