import Cookies from 'js-cookie';

function normalizeRole(role) {
    return typeof role === 'string'
        ? role.trim().toUpperCase().replace(/^ROLE_/, '')
        : null;
}

function decodeJwtPayload(token) {
    const payload = token.split('.')[1];
    if (!payload) return null;

    const base64 = payload
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(Math.ceil(payload.length / 4) * 4, '=');

    return JSON.parse(atob(base64));
}

export function getUserRole() {
    const token = Cookies.get('jwt');
    const roleFromCookie = normalizeRole(Cookies.get('role'));

    if (!token) return roleFromCookie;

    try {
        const user = decodeJwtPayload(token);
        return normalizeRole(user?.role) || roleFromCookie;
    } catch (error) {
        console.error("Erro ao decodificar token no frontend:", error);
        return roleFromCookie;
    }
}
