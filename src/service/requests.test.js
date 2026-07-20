import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/service/api";
import { getRequestById, resolveStatusIdsByName } from "@/service/requests";

vi.mock("@/service/api", async (importOriginal) => {
    const original = await importOriginal();

    return {
        ...original,
        api: { get: vi.fn() },
    };
});

const CR_BRANCH = { id: 7, crCode: "1234" };

const PROVISION_CATALOG = [
    { id: 5, name: "Manutenção elétrica", description: "Troca de disjuntor", totalValue: 100 },
    { id: 6, name: "Instalação de rede", description: "Cabeamento", totalValue: 250 },
    { id: 8, name: "Conserto hidráulico", description: "Reparo de vazamento", totalValue: 75 },
];

/** Monta uma solicitação de serviço com N itens, ciclando pelo catálogo acima. */
function buildServiceRequest(provisionCount) {
    return {
        id: 1,
        crBranchId: CR_BRANCH.id,
        statusName: "Em análise",
        requestDate: "2026-07-20",
        provisions: Array.from({ length: provisionCount }, (_, index) => ({
            id: 100 + index,
            provisionId: PROVISION_CATALOG[index % PROVISION_CATALOG.length].id,
            statusName: "Em análise",
        })),
    };
}

function mockApiFor(request) {
    api.get.mockImplementation((endpoint) => {
        if (endpoint.startsWith("/requests/")) return Promise.resolve(request);
        if (endpoint.startsWith("/item-request-products")) return Promise.resolve({ content: [] });
        if (endpoint.startsWith("/cr-branches/")) return Promise.resolve(CR_BRANCH);
        if (endpoint === "/provisions") return Promise.resolve(PROVISION_CATALOG);

        throw new Error(`Endpoint inesperado: ${endpoint}`);
    });
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe("getRequestById", () => {
    it("não busca cada provisão individualmente", async () => {
        mockApiFor(buildServiceRequest(3));

        await getRequestById(1);

        const perProvisionCalls = api.get.mock.calls.filter(([endpoint]) =>
            /^\/provisions\/\d+$/.test(endpoint)
        );

        expect(perProvisionCalls).toHaveLength(0);
        expect(api.get).toHaveBeenCalledWith("/provisions");
    });

    it("faz o mesmo número de requisições independente da quantidade de serviços", async () => {
        mockApiFor(buildServiceRequest(2));
        await getRequestById(1);
        const callsComDoisServicos = api.get.mock.calls.length;

        vi.clearAllMocks();

        mockApiFor(buildServiceRequest(30));
        await getRequestById(1);
        const callsComTrintaServicos = api.get.mock.calls.length;

        expect(callsComDoisServicos).toBe(4);
        expect(callsComTrintaServicos).toBe(callsComDoisServicos);
    });

    it("preenche nome, descrição e valor de cada serviço a partir do catálogo", async () => {
        mockApiFor(buildServiceRequest(2));

        const request = await getRequestById(1);

        expect(request.servicos).toEqual([
            expect.objectContaining({
                id: 100,
                provisionId: 5,
                nome: "Manutenção elétrica",
                description: "Troca de disjuntor",
                totalValue: 100,
            }),
            expect.objectContaining({
                id: 101,
                provisionId: 6,
                nome: "Instalação de rede",
                description: "Cabeamento",
                totalValue: 250,
            }),
        ]);
    });

    it("usa o endpoint da própria solicitação quando ownRequest é true", async () => {
        mockApiFor(buildServiceRequest(1));

        await getRequestById(42, { ownRequest: true });

        expect(api.get).toHaveBeenCalledWith("/requests/me/42");
    });

    it("não quebra quando a solicitação não tem serviços", async () => {
        mockApiFor({ ...buildServiceRequest(0), provisions: undefined });

        const request = await getRequestById(1);

        expect(request.servicos).toEqual([]);
        expect(request.codigo).toBe("CR-1234");
    });
});

describe("resolveStatusIdsByName", () => {
    beforeEach(() => {
        api.get.mockImplementation((endpoint) => {
            const name = decodeURIComponent(endpoint.replace("/status/statusName/", ""));
            const ids = { Aprovado: 2, Recusado: 3, "Em atendimento": 4 };

            return Promise.resolve({ id: ids[name], name });
        });
    });

    it("busca cada status distinto uma única vez", async () => {
        const decisoesDeDezItens = [
            "Aprovado", "Aprovado", "Recusado", "Aprovado", "Recusado",
            "Aprovado", "Aprovado", "Recusado", "Aprovado", "Aprovado",
        ];

        const statusIds = await resolveStatusIdsByName(decisoesDeDezItens);

        expect(api.get).toHaveBeenCalledTimes(2);
        expect(statusIds.get("Aprovado")).toBe(2);
        expect(statusIds.get("Recusado")).toBe(3);
    });

    it("devolve um mapa vazio sem chamar a API quando não há decisões", async () => {
        const statusIds = await resolveStatusIdsByName([]);

        expect(api.get).not.toHaveBeenCalled();
        expect(statusIds.size).toBe(0);
    });

    it("codifica nomes de status com espaço", async () => {
        await resolveStatusIdsByName(["Em atendimento"]);

        expect(api.get).toHaveBeenCalledWith("/status/statusName/Em%20atendimento");
    });
});
