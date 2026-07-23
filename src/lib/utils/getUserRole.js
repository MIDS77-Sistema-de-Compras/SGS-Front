import Cookies from 'js-cookie';

function normalizeRole(role) {
    return typeof role === 'string'
        ? role.trim().toUpperCase().replace(/^ROLE_/, '')
        : null;
}

export function decodeJwtPayload(token) {
    if (!token) return null;
    try {
        const payload = token.split('.')[1];
        if (!payload) return null;

        const base64 = payload
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            .padEnd(Math.ceil(payload.length / 4) * 4, '=');

        return JSON.parse(atob(base64));
    } catch (error) {
        console.error("Erro ao decodificar o token JWT:", error);
        return null;
    }
}

export function getUserRole() {
    const role = Cookies.get('role');
    return role ? role.toUpperCase() : null;
}