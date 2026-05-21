const getDateValue = (value) => {
    if (!value) {
        return 0;
    }

    const timestamp = new Date(value).getTime();

    return Number.isNaN(timestamp) ? 0 : timestamp;
};

const sortByCreatedAt = (items = []) => [...items].sort((left, right) => getDateValue(left.createdAt) - getDateValue(right.createdAt));

const sortByDayNumber = (items = []) => [...items].sort((left, right) => Number(left.dayNumber ?? left.day_number ?? 0) - Number(right.dayNumber ?? right.day_number ?? 0));

export const normalizeSupabaseError = (error, fallbackMessage) => {
    if (!error) {
        return new Error(fallbackMessage);
    }

    const message = error.message || fallbackMessage;
    let normalizedError;

    if (error.code === '23505' || /duplicate|unique constraint/i.test(message)) {
        normalizedError = new Error('Duplicate record found');
    } else if (error.code === '42501' || /row-level security|permission denied/i.test(message)) {
        normalizedError = new Error('You do not have permission to perform this action');
    } else if (
        error.status === 429 ||
        /rate limit|too many requests|over_?email_?send_?rate_?limit/i.test(message)
    ) {
        normalizedError = new Error(
            'Confirmation emails are rate-limited. Wait about 60 seconds before trying again.'
        );
    } else {
        normalizedError = new Error(message || fallbackMessage);
    }

    if (error.code) {
        normalizedError.code = error.code;
    }

    if (error.status) {
        normalizedError.status = error.status;
    }

    return normalizedError;
};

export const mapAuthUser = (user) => {
    if (!user) {
        return null;
    }

    return {
        id: user.id,
        name: user.user_metadata?.name ?? user.user_metadata?.full_name ?? user.email ?? '',
        email: user.email ?? '',
        createdAt: user.created_at ?? user.createdAt ?? null,
    };
};

export const mapTourImage = (image) => ({
    id: image.id,
    url: image.url,
    createdAt: image.created_at ?? image.createdAt ?? null,
});

export const mapItineraryDay = (itinerary) => ({
    id: itinerary.id,
    dayNumber: itinerary.day_number ?? itinerary.dayNumber,
    title: itinerary.title,
    description: itinerary.description,
    overnightStay: itinerary.overnight_stay ?? itinerary.overnightStay ?? null,
    mealsIncluded: itinerary.meals_included ?? itinerary.mealsIncluded ?? null,
    createdAt: itinerary.created_at ?? itinerary.createdAt ?? null,
});

export const mapTourRecord = (tour) => {
    const images = sortByCreatedAt((tour.images ?? tour.tour_images ?? []).map(mapTourImage));
    const itinerary = sortByDayNumber((tour.itinerary ?? tour.itineraries ?? []).map(mapItineraryDay));

    return {
        id: tour.id,
        title: tour.title,
        location: tour.location,
        country: tour.country,
        price: tour.price,
        discountPrice: tour.discount_price ?? tour.discountPrice ?? null,
        duration: tour.duration,
        nights: tour.nights,
        maxGroupSize: tour.max_group_size ?? tour.maxGroupSize,
        rating: tour.rating,
        totalReviews: tour.total_reviews ?? tour.totalReviews,
        overview: tour.overview,
        description: tour.description,
        category: tour.category,
        bestTimeToVisit: tour.best_time_to_visit ?? tour.bestTimeToVisit ?? '',
        tourType: tour.tour_type ?? tour.tourType ?? '',
        destinations: tour.destinations ?? [],
        highlights: tour.highlights ?? [],
        inclusions: tour.inclusions ?? [],
        exclusions: tour.exclusions ?? [],
        createdAt: tour.created_at ?? tour.createdAt ?? null,
        images,
        itinerary,
    };
};

export const mapTourCard = (tour) => {
    const mappedTour = mapTourRecord(tour);

    return {
        ...mappedTour,
        image: mappedTour.images[0]?.url ?? '',
        name: mappedTour.title,
        pricePerPerson: mappedTour.discountPrice ?? mappedTour.price,
        tag: mappedTour.category,
    };
};

export const mapTourCardForRelation = (tour) => {
    const mappedTour = mapTourRecord(tour);

    return {
        ...mappedTour,
        image: mappedTour.images[0]?.url ?? '',
        name: mappedTour.title,
        pricePerPerson: mappedTour.discountPrice ?? mappedTour.price,
        tag: mappedTour.category,
    };
};

export const mapBookingRow = (booking) => ({
    id: booking.id,
    userId: booking.user_id ?? booking.userId,
    tourId: booking.tour_id ?? booking.tourId,
    date: booking.date,
    peopleCount: booking.people_count ?? booking.peopleCount,
    totalPrice: booking.total_price ?? booking.totalPrice,
    paymentStatus: booking.payment_status ?? booking.paymentStatus,
    bookingStatus: booking.booking_status ?? booking.bookingStatus,
    createdAt: booking.created_at ?? booking.createdAt ?? null,
    tour: booking.tour ? mapTourCardForRelation(booking.tour) : null,
});

export const mapWishlistRow = (wishlist) => ({
    id: wishlist.id,
    userId: wishlist.user_id ?? wishlist.userId,
    tourId: wishlist.tour_id ?? wishlist.tourId,
    createdAt: wishlist.created_at ?? wishlist.createdAt ?? null,
    tour: wishlist.tour ? mapTourCardForRelation(wishlist.tour) : null,
});

export const mapReviewProfile = (profile) => {
    if (!profile) {
        return null;
    }

    return {
        id: profile.id,
        name: profile.name ?? '',
        createdAt: profile.created_at ?? profile.createdAt ?? null,
    };
};

export const mapReviewRow = (review, profile = null) => ({
    id: review.id,
    userId: review.user_id ?? review.userId,
    tourId: review.tour_id ?? review.tourId,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.created_at ?? review.createdAt ?? null,
    user: profile ? mapReviewProfile(profile) : null,
});