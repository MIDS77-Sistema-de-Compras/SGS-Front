import { api } from './api';

export const createUser = {
    create: (payload) => api.post('/users', payload),
};