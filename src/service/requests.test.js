import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/service/api";
import { getMyRequests, getRequestById, resolveStatusIdsByName } from "@/service/requests";

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
        products: [],
        provisions: Array.from({ length: provisionCount }, (_, index) => ({
            id: 100 + index,
            provisionId: PROVISION_CATALOG[index % PROVISION_CATALOG.length].id,
            statusName: "Em análise",
        })),
    };
}

function mockApiFor(request) {
    api.get.mockImplementation((endpoint) => {
        if (endpoint.startsWith("/requests")) return Promise.resolve(request);
        if (endpoint.startsWith("/cr-branches")) return Promise.resolve(CR_BRANCH);
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

        expect(callsComDoisServicos).toBe(3);
        expect(callsComTrintaServicos).toBe(callsComDoisServicos);
    });

    it("usa os produtos embutidos na resposta, sem baixar o catálogo de itens", async () => {
        const request = buildServiceRequest(0);
        request.products = [
            {
                itemRequestProduct: 900,
                requestId: 1,
                productName: "Parafuso M8",
                measurementUnit: "UN",
                quantity: 4,
                statusName: "Em análise",
                additionalInformations: "Rosca fina",
            },
        ];
        mockApiFor(request);

        const result = await getRequestById(1);

        expect(api.get).not.toHaveBeenCalledWith(expect.stringContaining("/item-request-products"));
        expect(result.produtos).toEqual([
            expect.objectContaining({ id: 900, nome: "Parafuso M8", quantity: 4, unit: "UN" }),
        ]);
    });

    it("não busca o catálogo de serviços quando a solicitação só tem produtos", async () => {
        mockApiFor(buildServiceRequest(0));

        await getRequestById(1);

        expect(api.get).not.toHaveBeenCalledWith("/provisions");
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

describe("getMyRequests", () => {
    /** Página de N itens no formato enxuto de listagem (RequestListItemResponse). */
    function mockRequestsPage(requestCount) {
        const content = Array.from({ length: requestCount }, (_, index) => ({
            id: index + 1,
            crCode: "1234",
            statusName: "Em análise",
            statusCategory: "PENDENTE",
            requestDate: "2026-07-20",
            productNames: [`Produto ${index}`, `Extra ${index}`],
        }));

        api.get.mockImplementation((endpoint) => {
            if (endpoint.startsWith("/requests/me")) return Promise.resolve({ content });

            throw new Error(`Endpoint inesperado: ${endpoint}`);
        });
    }

    it("faz uma única requisição, sem buscar cr-branches nem provisions", async () => {
        mockRequestsPage(25);

        await getMyRequests();

        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith("/requests/me?size=1000");
        expect(api.get).not.toHaveBeenCalledWith(expect.stringContaining("/cr-branches"));
        expect(api.get).not.toHaveBeenCalledWith("/provisions");
        expect(api.get).not.toHaveBeenCalledWith(expect.stringContaining("/item-request-products"));
    });

    it("faz o mesmo número de requisições independente da quantidade de solicitações", async () => {
        mockRequestsPage(1);
        await getMyRequests();
        const callsComUma = api.get.mock.calls.length;

        vi.clearAllMocks();

        mockRequestsPage(200);
        await getMyRequests();
        const callsComDuzentas = api.get.mock.calls.length;

        expect(callsComUma).toBe(1);
        expect(callsComDuzentas).toBe(callsComUma);
    });

    it("formata o código do CR e transforma os nomes de produto em itens contáveis", async () => {
        mockRequestsPage(2);

        const requests = await getMyRequests();

        expect(requests).toHaveLength(2);
        expect(requests[0].codigo).toBe("CR-1234");
        expect(requests[0].status).toBe("Em análise");
        expect(requests[0].data).toBe("2026-07-20");
        expect(requests[0].produtos).toEqual([
            { nome: "Produto 0" },
            { nome: "Extra 0" },
        ]);
        expect(requests[1].produtos).toHaveLength(2);
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
