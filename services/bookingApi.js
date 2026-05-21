import { getSupabaseClient } from './supabaseClient';
import { mapBookingRow, normalizeSupabaseError } from './supabaseHelpers';

const bookingSelect = `
    id,
    user_id,
    tour_id,
    date,
    people_count,
    total_price,
    payment_status,
    booking_status,
    created_at,
    tour:tours (
        id,
        title,
        location,
        country,
        price,
        discount_price,
        duration,
        nights,
        max_group_size,
        rating,
        total_reviews,
        overview,
        description,
        category,
        best_time_to_visit,
        tour_type,
        destinations,
        highlights,
        inclusions,
        exclusions,
        created_at,
        tour_images (
            id,
            url,
            created_at
        )
    )
`;

const requireSessionUser = async (supabase) => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw normalizeSupabaseError(error, 'Please log in to continue');
    }

    if (!data.user) {
        throw new Error('Please log in to continue');
    }

    return data.user;
};

const fetchBookingById = async (supabase, bookingId, fallbackMessage) => {
    const { data, error } = await supabase
        .from('bookings')
        .select(bookingSelect)
        .eq('id', bookingId)
        .single();

    if (error) {
        throw normalizeSupabaseError(error, fallbackMessage);
    }

    if (!data) {
        throw new Error(fallbackMessage);
    }

    return mapBookingRow(data);
};

export const createBooking = async ({ tourId, date, peopleCount, token: _token } = {}) => {
    const supabase = getSupabaseClient();
    await requireSessionUser(supabase);

    const { data, error } = await supabase.rpc('create_booking', {
        p_tour_id: tourId,
        p_date: date,
        p_people_count: Number(peopleCount),
    });

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to create booking');
    }

    if (!data?.id) {
        throw new Error('Failed to create booking');
    }

    return {
        status: 'success',
        data: await fetchBookingById(supabase, data.id, 'Failed to create booking'),
    };
};

export const getBookings = async (_token) => {
    const supabase = getSupabaseClient();
    await requireSessionUser(supabase);

    const { data, error } = await supabase
        .from('bookings')
        .select(bookingSelect)
        .order('created_at', { ascending: false });

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to load bookings');
    }

    return {
        status: 'success',
        data: (data ?? []).map(mapBookingRow),
    };
};

export const payBooking = async ({ bookingId, token: _token } = {}) => {
    const supabase = getSupabaseClient();
    await requireSessionUser(supabase);

    const { data, error } = await supabase.rpc('pay_booking', {
        p_booking_id: bookingId,
    });

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to confirm booking payment');
    }

    if (!data?.id) {
        throw new Error('Failed to confirm booking payment');
    }

    return {
        status: 'success',
        data: await fetchBookingById(supabase, data.id, 'Failed to confirm booking payment'),
    };
};