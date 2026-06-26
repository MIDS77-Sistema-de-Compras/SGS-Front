export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

function getToken() {
    if (typeof document === 'undefined') return null;
    const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?? document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
}

async function handleRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getToken();

    const isFormData = options.body instanceof FormData;

    const headers = {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || 'Erro na requisição');
        error.status = response.status;
        error.details = errorData;
        throw error;
    }

    return response.json().catch(() => ({}));
}

export const api = {
    get: (endpoint, options) => handleRequest(endpoint, { ...options, method: 'GET' }),

    post: (endpoint, body, options) => handleRequest(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body)
    }),

    put: (endpoint, body, options) => handleRequest(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(body)
    }),

    delete: (endpoint, options) => handleRequest(endpoint, { ...options, method: 'DELETE' }),

    postFormData: (endpoint, formData, options) => handleRequest(endpoint, {
        ...options,
        method: 'POST',
        body: formData,
    }),
};