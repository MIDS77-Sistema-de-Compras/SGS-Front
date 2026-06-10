import { Input } from './Input';

export default {
    title: 'UI/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email'],
        },
        variant: {
            control: 'select',
            options: ['auth', 'form'],
        },
    },
};

export const AuthEmailOuCPF = {
    args: {
        variant: 'auth',
        type: 'text',
        placeholder: 'Email ou CPF',
        value: '',
    },
};

export const FormTexto = {
    args: {
        variant: 'form',
        type: 'text',
        placeholder: 'Nome completo...',
        value: '',
    },
};
