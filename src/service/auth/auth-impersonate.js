import Cookies from "js-cookie";
import { api } from "../api";

/**
 * Aplica o token da sessão nos cookies (jwt, role e name),
 * seguindo o mesmo padrão do login.
 */
function applySessionToken(token) {
    const cookieOptions = {
        secure: window.location.protocol === "https:",
        sameSite: "lax",
        path: "/",
    };

    Cookies.set("jwt", token, cookieOptions);

    try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        const userRole = decodedPayload.role;
        const userName = decodedPayload.name || decodedPayload.nome || "Usuario";

        if (userRole) {
            Cookies.set("role", userRole, { path: "/" });
        }

        Cookies.set("name", userName, { path: "/" });
    } catch (decodeError) {
        console.warn("Nao foi possivel decodificar a role do token", decodeError);
    }
}

/**
 * Loga o administrador na conta de outro usuário (impersonação).
 * A sessão passa a ter as permissões do usuário-alvo.
 */
export async function impersonateUser(userId) {
    const res = await api.post(`/auth/impersonate/${userId}`);
    const token = res?.text || res?.token || res?.message;

    if (!token) {
        throw new Error("Token nao retornado pela API.");
    }

    applySessionToken(token);
    return token;
}

/**
 * Encerra a impersonação e devolve a sessão do administrador original.
 */
export async function stopImpersonation() {
    const res = await api.post("/auth/impersonate/stop");
    const token = res?.text || res?.token || res?.message;

    if (!token) {
        throw new Error("Token nao retornado pela API.");
    }

    applySessionToken(token);
    return token;
}

/**
 * Consulta o estado de impersonação da sessão atual.
 * Retorna { impersonating, adminName, userName }.
 */
export async function getImpersonationStatus() {
    try {
        return await api.get("/auth/impersonate/status");
    } catch (e) {
        console.error("Erro ao consultar estado de impersonacao: ", e);
        return { impersonating: false, adminName: null, userName: null };
    }
}
