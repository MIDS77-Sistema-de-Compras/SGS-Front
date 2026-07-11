import Cookies from 'js-cookie';

export function getUserRole() {
    const token = Cookies.get('jwt');
    
    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64);
        const usuario = JSON.parse(decodedJson);
        
        return usuario?.role?.toUpperCase() || null; 
    } catch (error) {
        console.error("Erro ao decodificar token no frontend:", error);
        return null;
    }
}