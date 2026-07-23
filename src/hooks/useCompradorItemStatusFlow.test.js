import { describe, expect, it } from "vitest";

import {
    buildProductPayload,
    buildProvisionPayload,
} from "@/hooks/useCompradorItemStatusFlow";

describe("payload de atualizacao de status do comprador", () => {
    it("nao transforma a mensagem visual de produto em edicao de conteudo", () => {
        const payload = buildProductPayload(
            {
                nome: "Parafuso M8",
                variation: "",
                unit: "Unidade",
                quantity: 10,
                additionalInformations: "",
                additionalInfo: "Sem informacoes adicionais.",
            },
            15,
            "Entregue"
        );

        expect(payload.additionalInformations).toBe("");
    });

    it("nao transforma a mensagem visual de servico em edicao de conteudo", () => {
        const payload = buildProvisionPayload(
            {
                provisionId: 8,
                additionalInformation: "",
                additionalInfo: "Sem informacoes adicionais.",
            },
            15,
            "Em atendimento",
            new Map([["Em atendimento", 4]])
        );

        expect(payload.additionalInformation).toBe("");
    });
});
