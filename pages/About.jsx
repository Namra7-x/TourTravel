import { motion } from "framer-motion";
import HomeExp from "../components/HomeExp";
import { FAQSection } from "../components/FAQSection";

const About = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const images = [
        {
            src: "https://framerusercontent.com/images/UeEQOBDB7docOBY51egVdVxHoWQ.png?scale-down-to=512",
            alt: "Lake Bled, Slovenia"
        },
        {
            src: "https://framerusercontent.com/images/K6gLwV033eiafCctyu6T26EcZ0.png",
            alt: "Eiffel Tower, Paris"
        },
        {
            src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
            alt: "Mountain landscape"
        },
        {
            src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600",
            alt: "Japanese temple with cherry blossoms"
        }
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="pt-20 pb-20 px-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-5xl mx-auto text-center"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-6xl font-medium text-[#161618] mb-6"
                    >
                        Welcome to Travely
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-[#56575c] text-lg font-light leading-relaxed max-w-4xl mx-auto"
                    >
                        We're passionate about travel and committed to creating unforgettable experiences for our clients. With years of industry experience, we've perfected the art of curating personalized journeys that inspire and delight.
                    </motion.p>
                </motion.div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 gap-16 items-center">
                        {/* Images Grid */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-2 gap-5 w-full max-w-xl"
                        >
                            {/* Top row */}
                            <motion.div
                                variants={imageVariants}
                                className="overflow-hidden rounded-[1.5rem]"
                                whileHover="zoom"
                            >
                                <motion.img
                                    variants={{ zoom: { scale: 1.05 } }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    src={images[0].src}
                                    alt={images[0].alt}
                                    className="w-full h-56 object-cover"
                                />
                            </motion.div>
                            <motion.div
                                variants={imageVariants}
                                className="overflow-hidden rounded-[1.5rem]"
                                whileHover="zoom"
                            >
                                <motion.img
                                    variants={{ zoom: { scale: 1.05 } }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    src={images[1].src}
                                    alt={images[1].alt}
                                    className="w-full h-56 object-cover"
                                />
                            </motion.div>
                            {/* Bottom row */}
                            <motion.div
                                variants={imageVariants}
                                className="overflow-hidden rounded-[1.5rem]"
                                whileHover="zoom"
                            >
                                <motion.img
                                    variants={{ zoom: { scale: 1.05 } }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    src={images[2].src}
                                    alt={images[2].alt}
                                    className="w-full h-56 object-cover"
                                />
                            </motion.div>
                            <motion.div
                                variants={imageVariants}
                                className="overflow-hidden rounded-[1.5rem]"
                                whileHover="zoom"
                            >
                                <motion.img
                                    variants={{ zoom: { scale: 1.05 } }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    src={images[3].src}
                                    alt={images[3].alt}
                                    className="w-full h-56 object-cover"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.h2
                                variants={fadeInUp}
                                className="text-5xl font-medium text-[#161618] mb-8 leading-tight"
                            >
                                Discover the World,<br />Redefined it!
                            </motion.h2>
                            <motion.p
                                variants={fadeInUp}
                                className="text-[#56575c] text-base font-light leading-relaxed mb-6"
                            >
                                Discover the World, Redefined! At our travel agency, we believe that every journey should be a unique adventure tailored just for you. With our dedicated team of travel experts, we go beyond traditional services to curate experiences that resonate with your dreams and desires. From hidden gems to iconic landmarks.
                            </motion.p>
                            <motion.p
                                variants={fadeInUp}
                                className="text-[#56575c] text-base font-light leading-relaxed"
                            >
                                Discover the World, Redefined! We are not just a travel agency; we are your gateway to extraordinary experiences. Our passion for travel drives us to craft personalized itineraries that reflect your interests and aspirations. With our insider knowledge and commitment to excellence.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trusted Partner Section */}
            <section className="bg-[#f0f2f7] py-20 px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 gap-16 items-center">
                        {/* Left: Text Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.h2
                                variants={fadeInUp}
                                className="text-5xl font-medium text-[#161618] mb-6 leading-tight"
                            >
                                Your Trusted Travel<br />Partner ar Here
                            </motion.h2>
                            <motion.p
                                variants={fadeInUp}
                                className="text-[#56575c] text-lg font-light leading-relaxed mb-12"
                            >
                                We're more than just a travel agency, we're your trusted partner in creating unforgettable journeys. Our commitment to personalized service, expert advice, and competitive pricing sets us apart.
                            </motion.p>

                            {/* Stats */}
                            <motion.div
                                variants={fadeInUp}
                                className="grid grid-cols-3 gap-8"
                            >
                                <div>
                                    <h3 className="text-4xl font-semibold text-[#558ffc] mb-2">10k+</h3>
                                    <p className="text-[#56575c] font-light">Happy Travelers</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-semibold text-[#558ffc] mb-2">15+</h3>
                                    <p className="text-[#56575c] font-light">Years of Expertise</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-semibold text-[#558ffc] mb-2">99%</h3>
                                    <p className="text-[#56575c] font-light">Positive Reviews</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right: Image */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <img
                                src="https://framerusercontent.com/images/yYupIXRGBwdTKkxHwUm3XdGnvlg.png?scale-down-to=1024"
                                alt="Happy travelers"
                                className="w-full h-auto rounded-3xl object-cover aspect-[4/3]"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience Slider Section */}
            <HomeExp videoSrc="https://framerusercontent.com/assets/oRYmO4FLNmJGo2toKagrvdXZsvw.mp4" />

            {/* FAQ Section */}
            <FAQSection />
        </div>
    );
};

export default About;
