import useTourStore from '../store/Store';
import { Link } from 'react-router-dom';



const TourBookings = () => {
    const { bookedTour, removeTour, clearBookings } = useTourStore();

    if (bookedTour.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold">No bookings yet!</h2>
                <Link to="/tour" className="text-blue-500 underline mt-4 inline-block">Explore Tours</Link>
            </div>
        );
    }



    return (
        <div className="max-w-4xl mx-auto p-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold">My Bookings</h1>
                <button onClick={clearBookings} className="text-red-500 font-medium">Clear All</button>
            </div>

            <div className="space-y-6">
                {bookedTour.map((tour) => (
                    <div key={tour.id} className="flex gap-6 bg-gray-50 p-4 rounded-2xl items-center border border-gray-100">
                        <img src={tour.image} className="w-32 h-24 object-cover rounded-xl" alt="" />
                        <div className="grow">
                            <h3 className="text-xl font-semibold">{tour.name}</h3>
                            <p className="text-gray-500">${tour.pricePerPerson} per person</p>
                        </div>
                        <button 
                            onClick={() => removeTour(tour.id)}
                            className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourBookings;