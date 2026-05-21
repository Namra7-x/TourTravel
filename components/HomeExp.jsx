import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../utils/useInView";
import { fadeInUp, staggerContainer, scaleIn } from "../utils/animationVariants";

const HomeExp = ({ videoSrc = "https://framerusercontent.com/assets/vcDo4jaVBqJXArUO9845j1SDy8.mp4" }) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const reviews = [
        {
            id: 1,
            rating: "★★★★★",
            text: "I cannot recommend Waned Roust Travels enough. Their commitment to excellence truly sets them apart. ",
            image: "https://framerusercontent.com/images/rHuTnm1v0Vb0oSSEKRLkakYnwE.png",
            name: "Olivia Brown",
            role: "Art Director"
        },
        {
            id: 2,
            rating: "★★★★★",
            text: "Amazing experience! The team made our honeymoon truly unforgettable. Every detail was perfectly arranged. Highly recommend!",
            image: "https://framerusercontent.com/images/nV5WEF7nPAK2yHDYLtV5KR0wnsg.png",
            name: "James Wilson",
            role: "Software Engineer"
        },
        {
            id: 3,
            rating: "★★★★★",
            text: "Best travel agency I've ever worked with. Professional, attentive, and truly cares about customers. Will book again!",
            image: "https://framerusercontent.com/images/mqLBSH1K6DwM5POqQly1QKlYoA.png",
            name: "Sarah Chen",
            role: "Marketing Manager"
        },
        {
            id: 4,
            rating: "★★★★★",
            text: "Our family vacation was perfectly planned. The kids had the time of their lives! Thank you for an amazing experience!",
            image: "https://framerusercontent.com/images/SRhEBTB8JYJYmoYQJlksgXDLmQ.png",
            name: "Michael Davis",
            role: "Business Owner"
        },
        {
            id: 5,
            rating: "★★★★★",
            text: "Incredible service from start to finish. The team went above and beyond. Will definitely book again!",
            image: "https://framerusercontent.com/images/1EZnmq1gugNHCDHYVOG4rNUQt4.png",
            name: "Emily Taylor",
            role: "Designer"
        }
    ];

    const swiperRef = useRef(null);

    // Initialize Swiper after component mounts
    useEffect(() => {
        if (typeof window === "undefined" || typeof window.Swiper === "undefined") {
            return undefined;
        }

        const swiper = new window.Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 16,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            loop: true,
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

        swiperRef.current = swiper;

        return () => {
            swiper.destroy(true, true);
            swiperRef.current = null;
        };
    }, []);

    const goNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    const goPrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    return (
        <>
            <motion.section
                ref={ref}
                className="Experience py-16 sm:py-20 lg:py-24"
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <motion.header
                    variants={fadeInUp}
                    custom={0}
                >
                    <h1 className="text-center text-2xl sm:text-4xl lg:text-5xl font-medium text-[#161618] px-4 leading-tight">
                        <motion.span
                            className="text-[#558ffc]"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            450+
                        </motion.span> Share Experiences
                    </h1>
                    <p className="max-w-3xl w-full px-4 text-center font-light mt-4 text-[rgb(86,87,92)] mx-auto text-sm sm:text-base leading-relaxed">
                        Join 9600 travelers sharing experiences!
                    </p>
                </motion.header>

                {/* Swiper Container */}
                <motion.div
                    className="my-12 px-4 sm:px-6 lg:px-10"
                    variants={fadeInUp}
                    custom={1}
                >
                    <div className="swiper mySwiper">
                        <div className="swiper-wrapper">
                            {reviews.map((review, idx) => (
                                <div key={review.id} className="swiper-slide h-auto">
                                    <motion.div
                                        className="card border-2 py-6 sm:py-8 px-5 sm:px-8 rounded-2xl border-gray-200 h-full bg-white shadow-sm flex flex-col justify-between"
                                        style={{ minHeight: '280px' }}
                                        whileHover={{
                                            y: -8,
                                            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.h1
                                            className="text-amber-300 text-xl sm:text-2xl"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ delay: idx * 0.1, duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
                                        >
                                            {review.rating}
                                        </motion.h1>
                                        <p className="my-5 text-sm sm:text-base lg:text-lg leading-relaxed">"{review.text}"</p>
                                        <motion.div
                                            className="profile gap-4 flex items-center mt-4 min-w-0"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                            transition={{ delay: 0.3 + idx * 0.05 }}
                                        >
                                            <motion.img
                                                className="w-14 h-14 rounded-full"
                                                src={review.image}
                                                alt={review.name}
                                                whileHover={{ scale: 1.15 }}
                                            />
                                            <div className="name min-w-0">
                                                <h2 className="font-medium text-sm sm:text-base leading-tight">{review.name}</h2>
                                                <p className="text-gray-500 text-sm">{review.role}</p>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Buttons */}
                <motion.div
                    className="flex justify-center items-center gap-4 mt-8 px-4"
                    variants={fadeInUp}
                    custom={2}
                >
                    <motion.button
                        onClick={goPrev}
                        className="w-12 h-12 rounded-full border-2 border-[#558ffc] text-[#558ffc] flex items-center justify-center hover:bg-[#558ffc] hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ←
                    </motion.button>
                    <motion.button
                        onClick={goNext}
                        className="w-12 h-12 rounded-full border-2 border-[#558ffc] text-[#558ffc] flex items-center justify-center hover:bg-[#558ffc] hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        →
                    </motion.button>
                </motion.div>
            </motion.section>
            <motion.section
                className="relative mt-8 overflow-hidden rounded-4xl bg-black sm:mt-12"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.video
                    className="aspect-4/3 w-full object-cover sm:aspect-video"
                    src={videoSrc}
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    muted
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                />

                <motion.h1
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-center text-white text-xl sm:text-4xl lg:text-6xl leading-tight max-w-4xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Lets Start a Journey
                </motion.h1>
            </motion.section>
        </>
    );
}

export default HomeExp;
