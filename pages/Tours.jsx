import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BtnBlue from "../components/Btn-Blue";
import { getTours } from "../services/tourApi";

const toTourCard = (tour) => ({
    id: tour.id,
    name: tour.title,
    image: tour.images?.[0]?.url ?? '',
    pricePerPerson: tour.discountPrice ?? tour.price,
    duration: tour.duration,
});

const TourCardSkeleton = () => (
    <div className="card w-full max-w-88 animate-pulse rounded-3xl border border-gray-100 bg-[#F0F2F7] p-5 shadow-sm overflow-hidden">
        <div className="aspect-video w-full rounded-3xl bg-gray-200" />
        <div className="mt-4 space-y-4 p-2">
            <div className="h-8 w-3/4 rounded-full bg-gray-200" />
            <div className="flex items-center justify-between gap-8">
                <div className="h-5 w-28 rounded-full bg-gray-200" />
                <div className="h-5 w-20 rounded-full bg-gray-200" />
            </div>
            <div className="h-14 w-full rounded-full bg-gray-200" />
        </div>
    </div>
);

const Tours = () => {

    const [Tour, SetTour] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const TourData = async () => {
            try {
                const result = await getTours();

                SetTour(Array.isArray(result.data) ? result.data.map(toTourCard) : []);
                setError('');
            } catch (fetchError) {
                setError(fetchError.message || 'Failed to load tours');
            } finally {
                setLoading(false);
            }
        }

        TourData();
    }, [])

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="overflow-hidden mb-20">
            <header>
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 px-4 text-center text-4xl font-medium sm:mt-28 sm:text-5xl lg:text-6xl"
                >
                    Your Perfect Getaway
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mx-auto mt-5 w-full max-w-4xl px-4 text-center text-base font-light text-[#56575c] sm:text-lg lg:text-xl"
                >
                    Whether you crave sandy beaches, majestic mountains, bustling cities, or serene forests, we bring you the best destinations from around the globe. Start your journey here and discover your dream getaway.
                </motion.p>
            </header>

            <div className="Tour-wrapper flex justify-center px-4 sm:px-6 lg:px-10">
                <section className="data mt-12 grid w-full max-w-7xl items-stretch justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <TourCardSkeleton key={index} />
                        ))
                    ) : error ? (
                        <p className="col-span-full text-center text-red-600">{error}</p>
                    ) : (
                        Tour.map((Tourdata, index) => {
                            return (
                                <motion.div 
                                    key={Tourdata.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: (index % 3) * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="card mx-auto w-full max-w-104 bg-[#F0F2F7] p-5 rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-shadow hover:shadow-xl"
                                >

                                    <div className="img-container relative aspect-video w-full overflow-hidden bg-gray-100 rounded-3xl">
                                        <motion.img
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            src={Tourdata.image}
                                            className="w-full h-full object-cover"
                                            alt={Tourdata.name}
                                        />
                                    </div>

                                    <div className="info p-2 flex flex-col grow mt-4">
                                        <h1 className="mb-3 text-2xl font-semibold leading-tight text-[#161618] line-clamp-1 sm:text-3xl">
                                            {Tourdata.name}
                                        </h1>

                                        <div className="price-days flex flex-col gap-2 text-sm text-[#56575c] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:text-[1rem]">
                                            <p className=" font-medium text-gray-500">
                                                <span className="font-bold text-lg">${Tourdata.pricePerPerson}</span>/Per person
                                            </p>
                                            <p className="rounded-full font-semibold">
                                                {Tourdata.duration} Days
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <Link 
                                            to={`/tour/${Tourdata.id}`}  
                                            className="w-full h-14 flex items-center justify-center border-2 border-gray-300 text-[#161618] rounded-full font-semibold transition-all duration-500 ease-in-out hover:bg-[#558ffc] hover:border-[#558ffc] hover:text-white hover:shadow-lg active:scale-[0.98]"
                                        >
                                            View More Details
                                        </Link>
                                    </div>
                                </motion.div>
                            )
                        })
                    )}
                </section>
            </div>
        </div>
    );
}

export default Tours;