import AdditionalInfoButton from './AdditionalInfoButton';

const meta = {
  title: 'UI/AdditionalInfoButton',
  component: AdditionalInfoButton,
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    status: 'ajustes',
  },
};

export const Entregue = {
  args: {
    status: 'entregue',
  },
};

export const Selectable = {
  args: {
    status: 'atendimento',
    onStatusChange: () => {},
  },
};
