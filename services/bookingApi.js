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

export const createBooking = async ({ tourId, date, peopleCount, token }) => {
    const response = await fetch(`${apiBaseUrl}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tourId, date, peopleCount: Number(peopleCount) }),
    });

    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking');
    }

    return data;
};

export const getBookings = async (token) => {
    const response = await fetch(`${apiBaseUrl}/bookings`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to load bookings');
    }

    return data;
};

export const payBooking = async ({ bookingId, token }) => {
    const response = await fetch(`${apiBaseUrl}/bookings/${bookingId}/pay`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await readJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to confirm booking payment');
    }

    return data;
};