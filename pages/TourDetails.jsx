import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import  BtnBlue from '../components/Btn-Blue';
import useAuthStore from "../store/authStore";
import { addToWishlist } from "../services/wishlistApi";
import { createBooking } from "../services/bookingApi";
import { createReview, getReviewsByTour } from "../services/reviewApi";

const apiBaseUrl = (import.meta.env.VITE_API_URL ?? import.meta.env.VITE_AUTH_API_URL ?? 'http://localhost:5000/api')
    .trim()
    .replace(/\/+$/, '');

const toTourDetails = (tour) => ({
    id: tour.id,
    name: tour.title,
    overview: tour.overview,
    description: tour.description,
    image: tour.images?.[0]?.url ?? '',
    pricePerPerson: tour.discountPrice ?? tour.price,
    duration: tour.duration,
    nights: tour.nights,
    maxGroupSize: tour.maxGroupSize,
    tag: tour.category,
    location: tour.location,
    country: tour.country,
    bestTimeToVisit: tour.bestTimeToVisit,
    tourType: tour.tourType,
    destinations: tour.destinations ?? [],
    highlights: tour.highlights ?? [],
    inclusions: tour.inclusions ?? [],
    exclusions: tour.exclusions ?? [],
    rating: tour.rating,
    totalReviews: tour.totalReviews,
    itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [],
});

const toReviewItem = (review) => ({
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
    userName: review.user?.name ?? review.user?.email ?? 'Traveler',
});

const Stars = ({ rating = 0 }) => (
    <div className="flex items-center gap-1 text-[#f59e0b]" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>{index < Math.round(rating) ? '★' : '☆'}</span>
        ))}
    </div>
);

const DetailBlock = ({ label, value }) => (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#558ffc]">{label}</p>
        <p className="mt-2 text-base leading-7 text-[#161618]">{value}</p>
    </div>
);

const BulletList = ({ items = [] }) => (
    <ul className="space-y-3">
        {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[#56575c]">
                <span className="mt-1 text-[#558ffc]">•</span>
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const TourDetailsSkeleton = () => (
    <div className="details max-w-6xl mx-auto animate-pulse px-4 py-8 sm:px-6 lg:p-8">
        <div className="mx-auto mb-6 h-10 w-4/5 rounded-full bg-gray-200 sm:h-14 sm:w-3/5" />
        <div className="mx-auto mb-8 h-6 w-full rounded-full bg-gray-200 sm:h-8 sm:w-4/5" />
        <div className="mt-6 flex justify-center">
            <div className="h-72 w-full rounded-3xl bg-gray-200 shadow-lg sm:h-96 lg:h-144" />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-100 p-8">
                <div className="mb-6 h-7 w-40 rounded-full bg-gray-200" />
                <div className="space-y-4">
                    <div className="h-5 w-full rounded-full bg-gray-200" />
                    <div className="h-5 w-11/12 rounded-full bg-gray-200" />
                    <div className="h-5 w-10/12 rounded-full bg-gray-200" />
                </div>
            </div>

            <div className="rounded-2xl bg-gray-100 p-8">
                <div className="mb-6 h-7 w-40 rounded-full bg-gray-200" />
                <div className="space-y-4">
                    <div className="h-5 w-full rounded-full bg-gray-200" />
                    <div className="h-5 w-11/12 rounded-full bg-gray-200" />
                    <div className="h-5 w-10/12 rounded-full bg-gray-200" />
                </div>
            </div>
        </div>
        <div className="mt-20 flex flex-col items-center gap-4 border-t border-gray-100 p-10">
            <div className="h-6 w-40 rounded-full bg-gray-200" />
            <div className="h-12 w-56 rounded-full bg-gray-200" />
            <div className="h-6 w-32 rounded-full bg-gray-200" />
        </div>
        <div className="mx-auto mt-4 h-14 w-40 rounded-full bg-gray-200" />
    </div>
);

const TourDetails = () => {

    const [Tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(false);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState('');
    const [bookingForm, setBookingForm] = useState({ date: '', peopleCount: 1 });
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [reviewsError, setReviewsError] = useState('');
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewError, setReviewError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);

    const loadTour = async () => {
        const response = await fetch(`${apiBaseUrl}/tours/${id}`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to load tour');
        }

        setTour(toTourDetails(result.data));
    };

    useEffect(() => {
        const FetchTour = async () => {
            try {
                await loadTour();
                setError('');
            }
            catch (error) {
                setError(error.message || 'Failed to load tour');
            } finally {
                setLoading(false);
            }
        }
        FetchTour();
    }, [id])

    useEffect(() => {
        const loadReviews = async () => {
            try {
                setReviewsLoading(true);
                const result = await getReviewsByTour(id);
                setReviews(Array.isArray(result.data) ? result.data.map(toReviewItem) : []);
                setReviewsError('');
            } catch (reviewFetchError) {
                setReviewsError(reviewFetchError.message || 'Failed to load reviews.');
            } finally {
                setReviewsLoading(false);
            }
        };

        loadReviews();
    }, [id]);


    async function handleBooking(){
       if (!Tour) return;

       if (!token) {
           setError('Please log in first to save a tour to your wishlist.');
           return;
       }

       setActionLoading(true);

       try {
           await addToWishlist({ tourId: Tour.id, token });
           alert("Added to wishlist");
       } catch (wishlistError) {
           setError(wishlistError.message || 'Unable to add to wishlist.');
       } finally {
           setActionLoading(false);
       }

    }

    const handleBookingFormChange = (event) => {
        const { name, value } = event.target;

        setBookingForm((current) => ({
            ...current,
            [name]: name === 'peopleCount' ? Number(value) : value,
        }));
    };

    const handleCreateBooking = async (event) => {
        event.preventDefault();

        if (!token) {
            setBookingError('Please log in first to create a booking.');
            return;
        }

        setBookingLoading(true);
        setBookingError('');

        try {
            await createBooking({
                tourId: Tour.id,
                date: bookingForm.date,
                peopleCount: bookingForm.peopleCount,
                token,
            });

            setBookingModalOpen(false);
            setBookingForm({ date: '', peopleCount: 1 });
            navigate('/bookings');
        } catch (createError) {
            setBookingError(createError.message || 'Unable to create booking.');
        } finally {
            setBookingLoading(false);
        }
    };

    const handleReviewChange = (event) => {
        const { name, value } = event.target;

        setReviewForm((current) => ({
            ...current,
            [name]: name === 'rating' ? Number(value) : value,
        }));
    };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();

        if (!token) {
            setReviewError('Please log in first to post a review.');
            return;
        }

        setReviewLoading(true);
        setReviewError('');

        try {
            const result = await createReview({
                tourId: Tour.id,
                rating: reviewForm.rating,
                comment: reviewForm.comment,
                token,
            });

            const nextReview = toReviewItem(result.data);
            setReviews((current) => [nextReview, ...current]);
            setReviewForm({ rating: 5, comment: '' });
            await loadTour();
        } catch (submitError) {
            setReviewError(submitError.message || 'Failed to submit review.');
        } finally {
            setReviewLoading(false);
        }
    };

    const minBookingDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const estimatedTotal = Number(Tour?.pricePerPerson || 0) * Number(bookingForm.peopleCount || 1);
    return (
        <>
            {
                loading ? (
                    <TourDetailsSkeleton />
                ) : error ? (
                    <h1>{error}</h1>
                ) : Tour ?
                    <>
                        <div className="details max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:p-8">
                            <h1 className="text-4xl font-semibold text-center mb-4 sm:text-5xl lg:text-[3.5rem]">{Tour.name}</h1>
                            <p className="text-center text-[#56575c] text-base sm:text-lg lg:text-[1.4rem] max-w-3xl mx-auto leading-relaxed mb-8">{Tour.description}</p>
                            
                            <div className="image flex justify-center mt-6">
                                <img src={Tour.image} className="w-full max-h-128 object-cover rounded-3xl shadow-lg" alt={Tour.name} />
                            </div>

                            <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                <DetailBlock label="Duration" value={`${Tour.duration} Days / ${Tour.nights} Nights`} />
                                <DetailBlock label="Best Time to Visit" value={Tour.bestTimeToVisit} />
                                <DetailBlock label="Tour Type" value={Tour.tourType} />
                            </div>

                            <div className="mt-8 rounded-4xl border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(22,22,24,0.06)] md:p-10">
                                <h2 className="text-3xl font-semibold text-[#161618]">Tour Overview</h2>
                                <p className="mt-4 text-lg leading-8 text-[#56575c]">{Tour.overview}</p>
                                <p className="mt-5 text-base leading-7 text-[#56575c]">{Tour.description}</p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {Tour.destinations.map((destination) => (
                                        <span key={destination} className="rounded-full bg-[#f7f8fc] px-4 py-2 text-sm font-medium text-[#161618]">
                                            {destination}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16">
                                <div className="highlights-section bg-blue-50 p-6 sm:p-8 rounded-2xl">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">✨ Highlights</h3>
                                    <BulletList items={Tour.highlights} />
                                </div>

                                <div className="inclusions-section bg-green-50 p-6 sm:p-8 rounded-2xl">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">✔️ Inclusions</h3>
                                    <BulletList items={Tour.inclusions} />
                                </div>
                            </div>

                            <div className="mt-12 rounded-4xl border border-red-100 bg-red-50 p-6 sm:p-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-red-700">✖️ Exclusions</h3>
                                <BulletList items={Tour.exclusions} />
                            </div>

                            <div className="mt-12 rounded-4xl border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(22,22,24,0.06)] md:p-10">
                                <h2 className="text-3xl font-semibold text-[#161618] mb-6">Day-wise Itinerary</h2>
                                <div className="space-y-5">
                                    {Tour.itinerary.map((day) => (
                                        <article key={day.id} className="rounded-3xl border border-gray-100 bg-[#f7f8fc] p-6">
                                            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#558ffc]">Day {day.dayNumber}</p>
                                                    <h3 className="mt-2 text-xl font-semibold text-[#161618]">{day.title}</h3>
                                                </div>
                                                <div className="text-sm text-[#56575c] md:text-right">
                                                    {day.overnightStay ? <p>Overnight: {day.overnightStay}</p> : null}
                                                    {day.mealsIncluded ? <p>Meals: {day.mealsIncluded}</p> : null}
                                                </div>
                                            </div>
                                            <p className="mt-4 leading-7 text-[#56575c]">{day.description}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>

                            <div className="pricing-footer text-center mt-16 sm:mt-20 p-6 sm:p-10 border-t border-gray-100">
                                <p className="text-xl sm:text-2xl text-gray-500">Price per person</p>
                                <h2 className="text-4xl sm:text-5xl font-bold text-[#161618] mt-2">${Tour.pricePerPerson}</h2>
                                <p className="text-blue-600 font-semibold mt-4 text-xl">{Tour.tag}</p>
                                <p className="mt-3 text-sm text-[#56575c]">Max group size: {Tour.maxGroupSize}</p>
                                <div className="mt-5 flex flex-col items-center gap-2">
                                    <Stars rating={Tour.rating} />
                                    <p className="text-sm text-[#56575c]">{Tour.totalReviews} review(s)</p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <div onClick={handleBooking} className="bookingBtn w-full text-center sm:w-auto">
                                    <BtnBlue title={actionLoading ? "Saving..." : "Add to Wishlist"} disabled={actionLoading} />
                                </div>

                                <div className="bookingBtn w-full text-center sm:w-auto">
                                    <BtnBlue title="Book Now" onClick={() => setBookingModalOpen(true)} />
                                </div>
                            </div>

                            {bookingModalOpen ? (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                                    <div className="w-full max-w-2xl rounded-4xl bg-white p-6 shadow-2xl md:p-8">
                                        <div className="mb-6 flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-2xl font-semibold text-[#161618]">Create Booking</h3>
                                                <p className="mt-1 text-sm text-[#56575c]">Choose your travel date and number of people.</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setBookingModalOpen(false)}
                                                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-[#161618]"
                                            >
                                                Close
                                            </button>
                                        </div>

                                        <form className="grid gap-5" onSubmit={handleCreateBooking}>
                                            <div className="grid gap-5 md:grid-cols-2">
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-[#161618]">Travel date</label>
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        value={bookingForm.date}
                                                        min={minBookingDate}
                                                        onChange={handleBookingFormChange}
                                                        className="w-full rounded-2xl border border-gray-200 bg-[#f8f9fd] px-5 py-4 text-[#161618] outline-none focus:border-[#558ffc]"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-[#161618]">People count</label>
                                                    <input
                                                        type="number"
                                                        name="peopleCount"
                                                        value={bookingForm.peopleCount}
                                                        min="1"
                                                        max={Tour.maxGroupSize}
                                                        onChange={handleBookingFormChange}
                                                        className="w-full rounded-2xl border border-gray-200 bg-[#f8f9fd] px-5 py-4 text-[#161618] outline-none focus:border-[#558ffc]"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="rounded-2xl bg-[#f7f8fc] p-5">
                                                <p className="text-sm text-[#56575c]">Estimated total</p>
                                                <p className="mt-1 text-3xl font-semibold text-[#161618]">${estimatedTotal.toFixed(2)}</p>
                                                <p className="mt-2 text-sm text-[#56575c]">This is based on {bookingForm.peopleCount} traveler(s).</p>
                                            </div>

                                            {bookingError ? (
                                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                                    {bookingError}
                                                </div>
                                            ) : null}

                                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                                <BtnBlue type="button" title="Cancel" variant="light" onClick={() => setBookingModalOpen(false)} />
                                                <BtnBlue type="submit" title={bookingLoading ? 'Creating...' : 'Confirm Booking'} disabled={bookingLoading} />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : null}

                            <div className="mt-20 rounded-4xl border border-gray-100 bg-white p-6 shadow-[0_20px_60px_rgba(22,22,24,0.06)] md:p-10">
                                <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <h2 className="text-3xl font-semibold text-[#161618]">Reviews</h2>
                                        <p className="mt-1 text-sm text-[#56575c]">Read feedback from travelers and share your own experience.</p>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-full bg-[#f7f8fc] px-4 py-2 text-sm text-[#56575c]">
                                        <Stars rating={Tour.rating} />
                                        <span>{Tour.totalReviews} review(s)</span>
                                    </div>
                                </div>

                                <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
                                    <form className="rounded-3xl border border-gray-100 bg-[#f7f8fc] p-5 sm:p-6 shadow-sm" onSubmit={handleReviewSubmit}>
                                        <h3 className="text-xl font-semibold text-[#161618]">Write a review</h3>
                                        <p className="mt-1 text-sm text-[#56575c]">Rating is required. Keep comments specific and useful.</p>

                                        <div className="mt-5">
                                            <label className="mb-2 block text-sm font-medium text-[#161618]">Rating</label>
                                            <select
                                                name="rating"
                                                value={reviewForm.rating}
                                                onChange={handleReviewChange}
                                                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-[#161618] outline-none focus:border-[#558ffc]"
                                                required
                                            >
                                                {[5, 4, 3, 2, 1].map((value) => (
                                                    <option key={value} value={value}>{value} star{value > 1 ? 's' : ''}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mt-5">
                                            <label className="mb-2 block text-sm font-medium text-[#161618]">Comment</label>
                                            <textarea
                                                name="comment"
                                                value={reviewForm.comment}
                                                onChange={handleReviewChange}
                                                rows="5"
                                                placeholder="Tell other travelers what stood out to you..."
                                                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-[#161618] outline-none focus:border-[#558ffc]"
                                                required
                                            />
                                        </div>

                                        {reviewError ? (
                                            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                                {reviewError}
                                            </div>
                                        ) : null}

                                        <div className="mt-5 flex justify-end">
                                            <BtnBlue type="submit" title={reviewLoading ? 'Submitting...' : 'Submit Review'} disabled={reviewLoading} />
                                        </div>
                                    </form>

                                    <div className="space-y-4">
                                        {reviewsLoading ? (
                                            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 text-sm text-[#56575c]">
                                                Loading reviews...
                                            </div>
                                        ) : reviewsError ? (
                                            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
                                                {reviewsError}
                                            </div>
                                        ) : reviews.length === 0 ? (
                                            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 text-sm text-[#56575c]">
                                                No reviews yet. Be the first to share your experience.
                                            </div>
                                        ) : (
                                            reviews.map((review) => (
                                                <article key={review.id} className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-[#161618]">{review.userName}</h4>
                                                            <p className="mt-1 text-xs text-[#56575c]">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <div className="rounded-full bg-[#f7f8fc] px-3 py-1">
                                                            <Stars rating={review.rating} />
                                                        </div>
                                                    </div>
                                                    <p className="mt-4 leading-7 text-[#56575c]">{review.comment}</p>
                                                </article>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : <h1>Tour not found</h1>
            }
        </>
    );
}
export default TourDetails; 