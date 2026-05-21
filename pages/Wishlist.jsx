import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { getWishlist, removeFromWishlist } from '../services/wishlistApi';
import BtnBlue from '../components/Btn-Blue';
import { createBooking } from '../services/bookingApi';

const Wishlist = () => {
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState('');
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState('');
    const [bookingForm, setBookingForm] = useState({ date: '', peopleCount: 1 });

    useEffect(() => {
        const loadWishlist = async () => {
            try {
                if (!token) {
                    setError('Please log in to view your wishlist.');
                    return;
                }

                const result = await getWishlist(token);
                setWishlistItems(Array.isArray(result.data) ? result.data : []);
                setError('');
            } catch (wishlistError) {
                setError(wishlistError.message || 'Failed to load wishlist.');
            } finally {
                setLoading(false);
            }
        };

        loadWishlist();
    }, [token]);

    const handleRemove = async (wishlistId) => {
        try {
            setActionLoading(wishlistId);
            await removeFromWishlist({ wishlistId, token });
            setWishlistItems((current) => current.filter((item) => item.id !== wishlistId));
        } catch (removeError) {
            setError(removeError.message || 'Failed to remove wishlist item.');
        } finally {
            setActionLoading('');
        }
    };

    const openBookingModal = (item) => {
        setSelectedItem(item);
        setBookingForm({ date: '', peopleCount: 1 });
        setBookingError('');
        setBookingModalOpen(true);
    };

    const handleBookingChange = (event) => {
        const { name, value } = event.target;

        setBookingForm((current) => ({
            ...current,
            [name]: name === 'peopleCount' ? Number(value) : value,
        }));
    };

    const handleCreateBookingFromWishlist = async (event) => {
        event.preventDefault();

        if (!selectedItem) {
            return;
        }

        if (!token) {
            setBookingError('Please log in first to create a booking.');
            return;
        }

        setBookingLoading(true);
        setBookingError('');

        try {
            const createdBooking = await createBooking({
                tourId: selectedItem.tour.id,
                date: bookingForm.date,
                peopleCount: bookingForm.peopleCount,
                token,
            });

            await removeFromWishlist({ wishlistId: selectedItem.id, token });
            setWishlistItems((current) => current.filter((item) => item.id !== selectedItem.id));
            setBookingModalOpen(false);
            setSelectedItem(null);
            navigate('/bookings', { state: { bookingId: createdBooking.data?.id } });
        } catch (createError) {
            setBookingError(createError.message || 'Failed to create booking from wishlist.');
        } finally {
            setBookingLoading(false);
        }
    };

    const minBookingDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const estimatedTotal = Number(selectedItem?.tour?.discountPrice ?? selectedItem?.tour?.price ?? 0) * Number(bookingForm.peopleCount || 1);

    if (loading) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">Loading wishlist...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">{error}</h2>
                <Link to="/tour" className="text-blue-500 underline mt-4 inline-block">Explore Tours</Link>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">No wishlist items yet!</h2>
                <Link to="/tour" className="text-blue-500 underline mt-4 inline-block">Explore Tours</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold">My Wishlist</h1>
            </div>

            <div className="space-y-6">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="grid gap-4 bg-gray-50 p-4 rounded-2xl items-start border border-gray-100 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                        <img src={item.tour?.images?.[0]?.url ?? ''} className="w-full aspect-[4/3] object-cover rounded-xl" alt={item.tour?.title ?? ''} />
                        <div className="grow min-w-0">
                            <h3 className="text-xl font-semibold">{item.tour?.title}</h3>
                            <p className="text-gray-500">{item.tour?.location}, {item.tour?.country}</p>
                            <p className="text-gray-500">${item.tour?.discountPrice ?? item.tour?.price} per person</p>
                        </div>
                        <div className="flex flex-col gap-2 sm:items-end">
                            <button
                                onClick={() => handleRemove(item.id)}
                                disabled={actionLoading === item.id}
                                className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {actionLoading === item.id ? 'Removing...' : 'Remove'}
                            </button>
                            <button
                                onClick={() => openBookingModal(item)}
                                className="rounded-full bg-[#558ffc] px-4 py-2 text-sm font-bold text-white"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {bookingModalOpen && selectedItem ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                    <div className="w-full max-w-2xl rounded-4xl bg-white p-6 shadow-2xl md:p-8">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-[#161618]">Book from Wishlist</h3>
                                <p className="mt-1 text-sm text-[#56575c]">This will create a booking and then remove the item from your wishlist.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setBookingModalOpen(false)}
                                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-[#161618]"
                            >
                                Close
                            </button>
                        </div>

                        <form className="grid gap-5" onSubmit={handleCreateBookingFromWishlist}>
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#161618]">Travel date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={bookingForm.date}
                                        min={minBookingDate}
                                        onChange={handleBookingChange}
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
                                        max={selectedItem?.tour?.maxGroupSize ?? 1}
                                        onChange={handleBookingChange}
                                        className="w-full rounded-2xl border border-gray-200 bg-[#f8f9fd] px-5 py-4 text-[#161618] outline-none focus:border-[#558ffc]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="rounded-2xl bg-[#f7f8fc] p-5">
                                <p className="text-sm text-[#56575c]">Estimated total</p>
                                <p className="mt-1 text-3xl font-semibold text-[#161618]">${estimatedTotal.toFixed(2)}</p>
                                <p className="mt-2 text-sm text-[#56575c]">This will be saved as a booking after confirmation.</p>
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
        </div>
    );
};

export default Wishlist;