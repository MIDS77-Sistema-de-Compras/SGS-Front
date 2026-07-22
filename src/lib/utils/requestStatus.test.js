import { describe, expect, it } from "vitest";

import { COMPRADOR_STATUS_OPTIONS } from "./requestStatus";

describe("COMPRADOR_STATUS_OPTIONS", () => {
    it("envia os nomes exatamente como cadastrados no banco", () => {
        expect(COMPRADOR_STATUS_OPTIONS.map(({ value }) => value)).toEqual([
            "EM_ATENDIMENTO",
            "ENTREGUE",
            "PEDIDO CANCELADO",
            "RECEBIMENTO_PARCIAL",
            "FUNDO_ROTATIVO",
            "CD_CENTRAL",
            "SOLICITADO_PORTAL",
        ]);
    });
});
