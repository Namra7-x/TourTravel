const normalizeBaseUrl = (value = '') => value.trim().replace(/\/+$/, '');

const apiBaseUrl = normalizeBaseUrl(
    import.meta.env.VITE_API_URL ?? import.meta.env.VITE_AUTH_API_URL ?? 'http://localhost:5000/api',
);

const readJson = async (response) => {
    try {
        return await response.json();
    } catch {
        return {};
    }
};

export const addToWishlist = async ({ tourId, token }) => {
    const response = await fetch(`${apiBaseUrl}/wishlist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tourId }),
    });

    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to add tour to wishlist');
    }

    return data;
};

export const getWishlist = async (token) => {
    const response = await fetch(`${apiBaseUrl}/wishlist`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to load wishlist');
    }

    return data;
};

export const removeFromWishlist = async ({ wishlistId, token }) => {
    const response = await fetch(`${apiBaseUrl}/wishlist/${wishlistId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to remove wishlist item');
    }

    return data;
};