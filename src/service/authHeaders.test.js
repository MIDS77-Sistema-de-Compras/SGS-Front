import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("js-cookie", () => ({
    default: {
        get: vi.fn(),
    },
}));

import Cookies from "js-cookie";
import { getAuthHeaders } from "./authHeaders";

describe("getAuthHeaders", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("uses the jwt cookie written by the login flow", () => {
        Cookies.get.mockReturnValue("access-token");

        expect(getAuthHeaders()).toEqual({
            Authorization: "Bearer access-token",
        });
        expect(Cookies.get).toHaveBeenCalledWith("jwt");
    });

    it("does not add the header when the user is not authenticated", () => {
        Cookies.get.mockReturnValue(undefined);

        expect(getAuthHeaders()).toEqual({});
    });
});
