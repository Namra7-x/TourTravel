import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { getBookings, payBooking } from '../services/bookingApi';



const TourBookings = () => {
    const token = useAuthStore((state) => state.token);
    const [bookedTour, setBookedTour] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState('');

    useEffect(() => {
        const loadBookings = async () => {
            try {
                if (!token) {
                    setError('Please log in to view your bookings.');
                    return;
                }

                const result = await getBookings(token);
                setBookedTour(Array.isArray(result.data) ? result.data : []);
                setError('');
            } catch (bookingsError) {
                setError(bookingsError.message || 'Failed to load bookings.');
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, [token]);

    const handlePay = async (bookingId) => {
        try {
            setActionLoading(bookingId);
            const result = await payBooking({ bookingId, token });
            setBookedTour((current) =>
                current.map((booking) =>
                    booking.id === bookingId ? result.data : booking,
                ),
            );
        } catch (payError) {
            setError(payError.message || 'Failed to confirm booking payment.');
        } finally {
            setActionLoading('');
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">Loading bookings...</h2>
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

    if (bookedTour.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">No bookings yet!</h2>
                <Link to="/tour" className="text-blue-500 underline mt-4 inline-block">Explore Tours</Link>
            </div>
        );
    }



    return (
        <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold">My Bookings</h1>
            </div>

            <div className="space-y-6">
                {bookedTour.map((tour) => (
                    <div key={tour.id} className="grid gap-4 bg-gray-50 p-4 rounded-2xl items-start border border-gray-100 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                        <img src={tour.tour?.images?.[0]?.url ?? ''} className="w-full aspect-4/3 object-cover rounded-xl" alt={tour.tour?.title ?? ''} />
                        <div className="grow min-w-0">
                            <h3 className="text-xl font-semibold">{tour.tour?.title}</h3>
                            <p className="text-gray-500">{new Date(tour.date).toLocaleDateString()} · {tour.peopleCount} traveler(s)</p>
                            <p className="text-gray-500">Total: ${tour.totalPrice}</p>
                            <p className="text-sm font-medium text-[#558ffc]">Status: {tour.bookingStatus}</p>
                            <p className="text-sm text-[#56575c]">Payment: {tour.paymentStatus}</p>
                        </div>
                        <div className="flex justify-start sm:justify-end">
                            <button
                                onClick={() => handlePay(tour.id)}
                                disabled={actionLoading === tour.id || tour.paymentStatus === 'success'}
                                className="rounded-full bg-[#558ffc] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {actionLoading === tour.id
                                    ? 'Processing...'
                                    : tour.paymentStatus === 'success'
                                        ? 'Paid'
                                        : 'Pay Now'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourBookings;