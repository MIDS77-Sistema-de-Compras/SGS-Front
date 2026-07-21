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
    const role = Cookies.get('role');
    return role ? role.toUpperCase() : null;
}
