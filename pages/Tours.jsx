import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BtnBlue from "../components/Btn-Blue";

const Tours = () => {

    const [Tour, SetTour] = useState([]);

    useEffect(() => {
        const TourData = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();
                SetTour(data);
            }
            catch {
                console.log("error");
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
                    className="text-5xl text-center mt-32 font-medium"
                >
                    Your Perfect Getaway
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-[#56575c] text-light text-xl w-[70%] m-auto text-center mt-5"
                >
                    Whether you crave sandy beaches, majestic mountains, bustling cities, or serene forests, we bring you the best destinations from around the globe. Start your journey here and discover your dream getaway.
                </motion.p>
            </header>

            <div className="Tour-wrapper flex justify-center">
                <section className="data mt-19 grid grid-cols-3 gap-10 items-center">
                    {
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
                                    className="card w-90 bg-[#F0F2F7] p-5 rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-shadow hover:shadow-xl"
                                >

                                    {/* 1. Locked Image Container */}
                                    <div className="img-container relative aspect-video w-full overflow-hidden bg-gray-100 rounded-3xl">
                                        <motion.img
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            src={Tourdata.image}
                                            className="w-full h-full object-cover"
                                            alt={Tourdata.name}
                                        />
                                    </div>

                                    {/* 2. Content Area */}
                                    <div className="info p-2 flex flex-col grow mt-4">
                                        <h1 className="text-3xl font-semibold text-[#161618] line-clamp-1 mb-3">
                                            {Tourdata.name}
                                        </h1>

                                        <div className="price-days text-[1rem] text-[#56575c] flex justify-between gap-8 items-center ">
                                            <p className=" font-medium text-gray-500">
                                                <span className="font-bold text-lg">${Tourdata.pricePerPerson}</span>/Per person
                                            </p>
                                            <p className="rounded-full font-semibold">
                                                {Tourdata.duration} Days
                                            </p>
                                        </div>
                                    </div>

                                    {/* 3. Link Area */}
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
                    }
                </section>
            </div>
        </div>
    );
}

export default Tours;