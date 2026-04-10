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

export const getReviewsByTour = async (tourId) => {
    const response = await fetch(`${apiBaseUrl}/reviews/${tourId}`);
    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to load reviews');
    }

    return data;
};

export const createReview = async ({ tourId, rating, comment, token }) => {
    const response = await fetch(`${apiBaseUrl}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tourId, rating: Number(rating), comment }),
    });

    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to submit review');
    }

    return data;
};