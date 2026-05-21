import { getSupabaseClient } from './supabaseClient';
import { mapAuthUser, normalizeSupabaseError } from './supabaseHelpers';

const buildAuthPayload = (result) => ({
    status: 'success',
    data: {
        user: mapAuthUser(result.data.user),
        session: result.data.session ?? null,
        token: result.data.session?.access_token ?? null,
    },
});

const requestAuth = async (method, payload) => {
    const supabase = getSupabaseClient();
    const result =
        method === 'register'
            ? await supabase.auth.signUp({
                  email: payload.email,
                  password: payload.password,
                  options: {
                      data: {
                          name: payload.name,
                      },
                  },
              })
            : await supabase.auth.signInWithPassword({
                  email: payload.email,
                  password: payload.password,
              });

    if (result.error) {
        throw normalizeSupabaseError(result.error, 'Request failed');
    }

    return buildAuthPayload(result);
};

export const loginUser = (payload) => requestAuth('login', payload);

export const registerUser = (payload) => requestAuth('register', payload);

export const resendSignupConfirmation = async (email) => {
    const supabase = getSupabaseClient();
    const result = await supabase.auth.resend({
        type: 'signup',
        email,
    });

    if (result.error) {
        throw normalizeSupabaseError(result.error, 'Unable to resend confirmation email right now.');
    }

    return {
        status: 'success',
        message: 'Confirmation email sent. Check your inbox and spam folder.',
    };
};

export const extractSession = (data = {}) => {
    const session = data.session ?? data.data?.session ?? null;
    const user = data.user ?? data.data?.user ?? null;

    return {
        user,
        token:
            session?.access_token ??
            data.token ??
            data.accessToken ??
            data.jwt ??
            data.data?.token ??
            data.data?.accessToken ??
            null,
    };
};

export const getAuthBaseUrl = () => import.meta.env.VITE_SUPABASE_URL?.trim() ?? '';