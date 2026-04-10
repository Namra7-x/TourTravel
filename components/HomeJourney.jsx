import { motion } from 'framer-motion';
import { useInView } from '../utils/useInView';
import { scaleIn, staggerContainer, fadeInUp } from '../utils/animationVariants';

const HomeJourney = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const data = [{
        id: 1, img: "https://framerusercontent.com/images/J67o6ELj2iHdl0g8FXfRJ656r9U.png", head: "Medical Seaport", info: "We manage planning and booking for your adventure. Our services ensure a smooth travel experience."
    },
    {
        id : 2,
        img:"https://framerusercontent.com/images/SLQUmE3NhHzEJ5qqGOLyeodhReo.png",
        head:"Cultural Tours",
        info:"We handle the planning and booking for your adventure, ensuring every detail is covered for a seamless travel experience."
    },
    {
        id : 3,
        img:"https://framerusercontent.com/images/pyhj5Ifd2SEmV02rkNsX1YwSg.png",
        head:"Honeymoon Planning",
        info:"Let us take care of your adventure planning and bookings, so you can enjoy a hassle-free travel journey."
    }
];

    return (
        <>
            <section ref={ref} className="journey bg-[#f0f2f7] py-20 sm:py-24">
                <motion.header
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-medium px-4">Journey Solutions</h1>
                    <p className="text-center font-light mt-4 text-[rgb(86,87,92)] max-w-2xl mx-auto px-4 leading-relaxed">We manage planning and booking for your adventure. <br className="hidden sm:block" /> Our services ensure a smooth travel experience.</p>
                </motion.header>

                <motion.div
                    className="journey-cards mt-12 grid gap-6 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {data.map((item, index) => {
                        return (
                            <motion.div
                                key={item.id}
                                custom={index}
                                variants={scaleIn}
                                whileHover={{
                                    y: -12,
                                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                                    transition: { duration: 0.3 },
                                }}
                                className="card w-full rounded-3xl border border-white/70 bg-white p-5 shadow-sm cursor-pointer"
                            >
                                <motion.img
                                    src={item.img}
                                    alt={item.head}
                                    className="w-full h-auto rounded-2xl"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                />
                                <h1 className="font-medium text-2xl sm:text-3xl my-3">{item.head}</h1>
                                <p className="font-light mt-4 text-[rgb(86,87,92)] leading-relaxed">{item.info}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>
        </>
    );
};

export default HomeJourney;