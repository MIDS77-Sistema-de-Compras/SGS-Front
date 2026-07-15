import { api, getPageContent } from './api';

export const createCr = {
    create: (payload) => api.post('/cr', payload),
};

export const createCrBranch = {
    create: (payload) => api.post('/cr-branches', payload),
};

export function getSectorsSimple() {
    return api.get('/sector/simple');
}

export function getBranchesSimple() {
    return api.get('/branches');
}

export async function getActiveSupervisors() {
    const users = await api.get('/users?size=1000').then(getPageContent);
    return users.filter(
        (user) => user.active && user.roleName?.toUpperCase() === 'SUPERVISOR'
    );
}
