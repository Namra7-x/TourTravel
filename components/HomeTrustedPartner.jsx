import { motion } from 'framer-motion';
import { useInView } from '../utils/useInView';
import { slideInFromLeft, slideInFromRight, scaleIn, staggerContainer, fadeInUp } from '../utils/animationVariants';

const HomeTrustedPartner = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const stats = [
        { number: "10k+", label: "Happy Travelers" },
        { number: "15+", label: "Years of Expertise" },
        { number: "99%", label: "Positive Reviews" },
    ];

    return (
        <>
            <section ref={ref} className="TrustedPartner bg-[#f0f2f7] py-24">
                <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-10 lg:py-16">
                    <div className="grid gap-10 items-center max-w-7xl mx-auto lg:grid-cols-2 lg:gap-12">
                        {/* Left: Image */}
                        <motion.div
                            className="min-w-0 aspect-4/3 overflow-hidden rounded-3xl shadow-lg"
                            variants={slideInFromLeft}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img 
                                src="https://framerusercontent.com/images/yYupIXRGBwdTKkxHwUm3XdGnvlg.png?scale-down-to=1024"
                                className="h-full w-full object-cover"
                                alt="travel"
                            />
                        </motion.div>

                        {/* Right: Content */}
                        <motion.div
                            variants={slideInFromRight}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                        >
                            <motion.h1
                                className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#161618] mb-6 leading-tight"
                                variants={fadeInUp}
                            >
                                Your Trusted Travel Partner is Here
                            </motion.h1>
                            <motion.p
                                className="text-base sm:text-lg font-light text-[rgb(86,87,92)] mb-10 lg:mb-12 leading-relaxed max-w-2xl"
                                variants={fadeInUp}
                                custom={1}
                            >
                                We're more than just a travel agency, we're your trusted partner in creating unforgettable journeys. Our commitment to personalized service, expert advice, and competitive pricing sets us apart.
                            </motion.p>

                            {/* Stats */}
                            <motion.div
                                className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
                                variants={staggerContainer}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="rounded-3xl bg-white p-5 shadow-sm"
                                        variants={scaleIn}
                                        custom={index}
                                        whileHover={{
                                            y: -8,
                                            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <motion.h2
                                            className="text-4xl font-semibold text-[#558ffc] mb-2"
                                            initial={{ scale: 0.8 }}
                                            animate={inView ? { scale: 1 } : { scale: 0.8 }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                        >
                                            {stat.number}
                                        </motion.h2>
                                        <p className="text-[rgb(86,87,92)] font-light">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeTrustedPartner;