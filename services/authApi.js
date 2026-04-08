const normalizeBaseUrl = (value = '') => value.trim().replace(/\/+$/, '');

const normalizePath = (path) => (path.startsWith('/') ? path : `/${path}`);

const authBaseUrl = normalizeBaseUrl(import.meta.env.VITE_AUTH_API_URL ?? '');

const buildAuthUrl = (path) => `${authBaseUrl}${normalizePath(path)}`;

const readJson = async (response) => {
    try {
        return await response.json();
    } catch {
        return {};
    }
};

const requestAuth = async (path, payload) => {
    const response = await fetch(buildAuthUrl(path), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || data.error || 'Request failed');
    }

    return data;
};

export const loginUser = (payload) => requestAuth('/auth/login', payload);

export const registerUser = (payload) => requestAuth('/auth/register', payload);

export const extractSession = (data = {}) => ({
    user: data.user ?? data.data?.user ?? null,
    token:
        data.token ??
        data.accessToken ??
        data.jwt ??
        data.data?.token ??
        data.data?.accessToken ??
        null,
});

export const getAuthBaseUrl = () => authBaseUrl;