import { getSupabaseClient } from './supabaseClient';
import { mapAuthUser, mapReviewRow, normalizeSupabaseError } from './supabaseHelpers';

const reviewSelect = 'id, user_id, tour_id, rating, comment, created_at';

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

const loadReviewProfiles = async (supabase, userIds) => {
    if (userIds.length === 0) {
        return new Map();
    }

    const { data, error } = await supabase
        .from('review_profiles')
        .select('id, name, created_at')
        .in('id', userIds);

    if (error) {
        if (error.code === '42P01') {
            return new Map();
        }

        throw normalizeSupabaseError(error, 'Failed to load reviewer details');
    }

    return new Map((data ?? []).map((profile) => [profile.id, profile]));
};

export const getReviewsByTour = async (tourId) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('reviews')
        .select(reviewSelect)
        .eq('tour_id', tourId)
        .order('created_at', { ascending: false });

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to load reviews');
    }

    const reviews = data ?? [];
    const profilesById = await loadReviewProfiles(
        supabase,
        [...new Set(reviews.map((review) => review.user_id).filter(Boolean))],
    );

    return {
        status: 'success',
        data: reviews.map((review) => mapReviewRow(review, profilesById.get(review.user_id) ?? null)),
    };
};

export const createReview = async ({ tourId, rating, comment, token: _token } = {}) => {
    const supabase = getSupabaseClient();
    const user = await requireSessionUser(supabase);

    const { data, error } = await supabase.rpc('create_review', {
        p_tour_id: tourId,
        p_rating: Number(rating),
        p_comment: comment,
    });

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to submit review');
    }

    if (!data?.id) {
        throw new Error('Failed to submit review');
    }

    return {
        status: 'success',
        data: mapReviewRow(data, mapAuthUser(user)),
    };
};