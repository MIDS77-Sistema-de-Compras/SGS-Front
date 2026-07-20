import Cookies from 'js-cookie';

export function getUserRole() {
    const role = Cookies.get('role');
    return role ? role.toUpperCase() : null;
}