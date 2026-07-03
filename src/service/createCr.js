import { api } from './api';

export const createCr = {
    create: (payload) => api.post('/cr', payload),
};

export function getSectorsSimple() {
    return api.get('/sector/simple');
}
