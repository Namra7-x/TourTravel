import { getSupabaseClient } from './supabaseClient';
import { mapTourRecord, normalizeSupabaseError } from './supabaseHelpers';

const tourListSelect = `
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
`;

const tourDetailSelect = `
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
    ),
    itineraries (
        id,
        day_number,
        title,
        description,
        overnight_stay,
        meals_included,
        created_at
    )
`;

export const getTours = async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('tours')
        .select(tourListSelect)
        .order('created_at', { ascending: false });

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to load tours');
    }

    return {
        status: 'success',
        data: (data ?? []).map(mapTourRecord),
    };
};

export const getTourById = async (id) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('tours')
        .select(tourDetailSelect)
        .eq('id', id)
        .single();

    if (error) {
        throw normalizeSupabaseError(error, 'Failed to load tour');
    }

    if (!data) {
        throw new Error('Tour not found');
    }

    return {
        status: 'success',
        data: mapTourRecord(data),
    };
};