'use client';

import PeriodFilterInput from '@/components/ui/filter-controls/PeriodFilterInput';
import StatusFilterSelect from '@/components/ui/filter-controls/StatusFilterSelect';
import { cn } from '@/lib/cn';

export default function PurchaseRequestsFilters({
  status,
  period,
  onStatusChange,
  onPeriodChange,
  className,
}) {
  return (
    <section
      className={cn(
        'flex min-h-14 w-full items-center justify-between rounded-2xl border border-[#A3A3A3] bg-white px-6 py-3',
        className
      )}
    >
      <p className="text-base font-medium text-[#111827]">Filtros</p>

      <div className="flex items-center gap-3">
        <StatusFilterSelect
          value={status}
          onChange={(event) => onStatusChange?.(event.target.value)}
        />

        <PeriodFilterInput
          value={period}
          onChange={(event) => onPeriodChange?.(event.target.value)}
        />
      </div>
    </section>
  );
}
