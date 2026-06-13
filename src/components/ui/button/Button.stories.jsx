import Button from './Button';

export default {
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
};

export const Primary = {
    args: {
        children: 'CRIAR USUÁRIO',
        variant: 'primary',
    },
};

export const Auth = {
    args: {
        children: 'Entrar',
        variant: 'auth',
        size: 'lg',
        fullWidth: true,
        type: 'submit',
    },
};

export const Carregando = {
    args: {
        children: 'Carregando...',
        isLoading: true,
    },
};
