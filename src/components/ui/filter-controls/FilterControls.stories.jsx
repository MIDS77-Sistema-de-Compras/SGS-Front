import { useState } from 'react';
import StatusFilterSelect from './StatusFilterSelect';
import PeriodFilterInput from './PeriodFilterInput';

const meta = {
  title: 'UI/FilterControls',
  tags: ['autodocs'],
};

export default meta;

export function Default() {
  const [status, setStatus] = useState('');
  const [period, setPeriod] = useState('');

  return (
    <div className="flex gap-3">
      <StatusFilterSelect
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      />
      <PeriodFilterInput
        value={period}
        onChange={(event) => setPeriod(event.target.value)}
      />
    </div>
  );
}
