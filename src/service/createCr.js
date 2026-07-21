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

export async function getActiveCrResponsibles() {
    const users = await api.get('/users?size=1000').then(getPageContent);
    const activeUsers = users.filter((user) => user.active);

    return {
        supervisors: activeUsers.filter(
            (user) => user.roleName?.toUpperCase() === 'SUPERVISOR'
        ),
        coordinators: activeUsers.filter(
            (user) => user.roleName?.toUpperCase() === 'COORDENADOR'
        ),
    };
}
