import { describe, expect, it } from "vitest";

import {
    CATALOG_SERVICE_MESSAGE,
    DEFAULT_REQUEST_ERROR_MESSAGE,
    DUPLICATE_PRODUCT_MESSAGE,
    DUPLICATE_SERVICE_MESSAGE,
    getRequestErrorMessage,
    hasCatalogServiceWithName,
    hasEquivalentRequestItem,
    normalizeRequestItemName,
} from "@/lib/utils/requestItemValidation";

describe("normalizeRequestItemName", () => {
    it("remove espaços externos, reduz espaços internos e ignora caixa", () => {
        expect(normalizeRequestItemName("  Cabo   de  Rede  ")).toBe("cabo de rede");
    });

    it("mantém os acentos na comparação", () => {
        expect(normalizeRequestItemName("Café")).not.toBe(normalizeRequestItemName("Cafe"));
    });
});

describe("hasEquivalentRequestItem", () => {
    const products = [{ name: "Cabo de Rede" }];
    const services = [{ name: "Manutenção elétrica" }];

    it("bloqueia produto repetido sem alterar a lista", () => {
        const originalProducts = [...products];

        expect(hasEquivalentRequestItem(products, "  cabo   DE rede ")).toBe(true);
        expect(products).toEqual(originalProducts);
        expect(DUPLICATE_PRODUCT_MESSAGE).toBe("Este produto já foi adicionado à solicitação.");
    });

    it("bloqueia serviço repetido", () => {
        expect(hasEquivalentRequestItem(services, "MANUTENÇÃO   elétrica")).toBe(true);
        expect(DUPLICATE_SERVICE_MESSAGE).toBe("Este serviço já foi adicionado à solicitação.");
    });
});

describe("hasCatalogServiceWithName", () => {
    it("identifica serviço do catálogo digitado como novo", () => {
        expect(hasCatalogServiceWithName(
            [{ name: "Instalação de rede" }],
            " instalação   DE rede "
        )).toBe(true);
        expect(CATALOG_SERVICE_MESSAGE).toBe("Este serviço já está cadastrado. Selecione-o na lista.");
    });
});

describe("getRequestErrorMessage", () => {
    it("preserva a mensagem específica de um HTTP 409", () => {
        expect(getRequestErrorMessage({
            status: 409,
            details: { message: "Já existe um serviço cadastrado com esse nome." },
        })).toBe("Já existe um serviço cadastrado com esse nome.");
    });

    it("prioriza a mensagem em response.data quando details não existe", () => {
        expect(getRequestErrorMessage({
            response: { data: { message: "Já existe um produto cadastrado com esse nome." } },
        })).toBe("Já existe um produto cadastrado com esse nome.");
    });

    it("usa a mensagem genérica para erros sem detalhe", () => {
        expect(getRequestErrorMessage({})).toBe(DEFAULT_REQUEST_ERROR_MESSAGE);
    });
});
