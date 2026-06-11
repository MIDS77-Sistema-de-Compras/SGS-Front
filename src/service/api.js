const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

async function handleRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(url, {
        ...options,
        headers,
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
};