import { beforeEach, describe, expect, it, vi } from 'vitest';

import { api } from '@/service/api';
import { getActiveCrResponsibles } from '@/service/createCr';

vi.mock('@/service/api', () => ({
    api: { get: vi.fn() },
    getPageContent: (response) => response?.content ?? response ?? [],
}));

describe('getActiveCrResponsibles', () => {
    beforeEach(() => vi.clearAllMocks());

    it('separa somente supervisores e coordenadores ativos', async () => {
        api.get.mockResolvedValue({
            content: [
                { id: 1, name: 'Emersson', active: true, roleName: 'SUPERVISOR' },
                { id: 2, name: 'Viviane', active: true, roleName: 'COORDENADOR' },
                { id: 3, name: 'Coordenador inativo', active: false, roleName: 'COORDENADOR' },
                { id: 4, name: 'Docente', active: true, roleName: 'DOCENTE' },
            ],
        });

        const responsibles = await getActiveCrResponsibles();

        expect(responsibles.supervisors).toEqual([
            expect.objectContaining({ id: 1, name: 'Emersson' }),
        ]);
        expect(responsibles.coordinators).toEqual([
            expect.objectContaining({ id: 2, name: 'Viviane' }),
        ]);
    });
});
