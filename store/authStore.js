import { create } from 'zustand';

const STORAGE_KEY = 'travely-auth';

const readStoredAuth = () => {
    if (typeof window === 'undefined') {
        return { user: null, token: null };
    }

    try {
        const rawValue = window.localStorage.getItem(STORAGE_KEY);

        if (!rawValue) {
            return { user: null, token: null };
        }

        const parsedValue = JSON.parse(rawValue);

        return {
            user: parsedValue.user ?? null,
            token: parsedValue.token ?? null,
        };
    } catch {
        return { user: null, token: null };
    }
};

const saveStoredAuth = (session) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

const clearStoredAuth = () => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
};

const initialAuth = readStoredAuth();

const useAuthStore = create((set) => ({
    user: initialAuth.user,
    token: initialAuth.token,
    isAuthenticated: Boolean(initialAuth.user || initialAuth.token),
    setAuth: ({ user = null, token = null } = {}) => {
        const nextSession = { user, token };

        saveStoredAuth(nextSession);

        set({
            user,
            token,
            isAuthenticated: Boolean(user || token),
        });
    },
    logout: () => {
        clearStoredAuth();

        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },
}));

export default useAuthStore;