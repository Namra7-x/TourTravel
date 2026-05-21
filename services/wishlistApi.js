import { getSupabaseClient } from './supabaseClient';
import { mapWishlistRow, normalizeSupabaseError } from './supabaseHelpers';

const wishlistSelect = `
    id,
    user_id,
    tour_id,
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

const fetchTourById = async (supabase, tourId) => {
    const { data, error } = await supabase
        .from('tours')
        .select('id')
        .eq('id', tourId)
        .maybeSingle();

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to load tour');
    }

    if (!data) {
        throw new Error('Tour not found');
    }
};

export const addToWishlist = async ({ tourId, token: _token } = {}) => {
    const supabase = getSupabaseClient();
    const user = await requireSessionUser(supabase);

    await fetchTourById(supabase, tourId);

    const { data, error } = await supabase
        .from('wishlists')
        .insert({
            user_id: user.id,
            tour_id: tourId,
        })
        .select(wishlistSelect)
        .single();

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to add tour to wishlist');
    }

    return {
        status: 'success',
        data: mapWishlistRow(data),
    };
};

export const getWishlist = async (_token) => {
    const supabase = getSupabaseClient();
    await requireSessionUser(supabase);

    const { data, error } = await supabase
        .from('wishlists')
        .select(wishlistSelect)
        .order('created_at', { ascending: false });

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to load wishlist');
    }

    return {
        status: 'success',
        data: (data ?? []).map(mapWishlistRow),
    };
};

export const removeFromWishlist = async ({ wishlistId, token: _token } = {}) => {
    const supabase = getSupabaseClient();
    await requireSessionUser(supabase);

    const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('id', wishlistId);

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to remove wishlist item');
    }

    return {
        status: 'success',
        message: 'Wishlist item removed successfully',
    };
};