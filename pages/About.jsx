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
            <section className="px-4 py-20 sm:px-8 lg:px-20 lg:py-24">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-5xl mx-auto text-center"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="section-title mb-5 sm:mb-6"
                    >
                        Welcome to Travely
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="section-copy px-2 sm:px-0"
                    >
                        We're passionate about travel and committed to creating unforgettable experiences for our clients. With years of industry experience, we've perfected the art of curating personalized journeys that inspire and delight.
                    </motion.p>
                </motion.div>
            </section>

            {/* Content Section */}
            <section className="px-4 py-16 sm:px-8 sm:py-20 lg:px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid gap-12 items-center lg:grid-cols-2 lg:gap-16">
                        {/* Images Grid */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid w-full max-w-xl grid-cols-2 gap-4 mx-auto sm:gap-5 lg:mx-0"
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
                                    className="aspect-[4/3] w-full object-cover"
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
                                    className="aspect-[4/3] w-full object-cover"
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
                                    className="aspect-[4/3] w-full object-cover"
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
                                    className="aspect-[4/3] w-full object-cover"
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
                                className="mb-6 text-3xl font-medium leading-tight text-[#161618] sm:mb-8 sm:text-4xl lg:text-5xl"
                            >
                                Discover the World,<br />Redefined it!
                            </motion.h2>
                            <motion.p
                                variants={fadeInUp}
                                className="content-copy mb-6"
                            >
                                Discover the World, Redefined! At our travel agency, we believe that every journey should be a unique adventure tailored just for you. With our dedicated team of travel experts, we go beyond traditional services to curate experiences that resonate with your dreams and desires. From hidden gems to iconic landmarks.
                            </motion.p>
                            <motion.p
                                variants={fadeInUp}
                                className="content-copy"
                            >
                                Discover the World, Redefined! We are not just a travel agency; we are your gateway to extraordinary experiences. Our passion for travel drives us to craft personalized itineraries that reflect your interests and aspirations. With our insider knowledge and commitment to excellence.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trusted Partner Section */}
            <section className="bg-[#f0f2f7] px-4 py-16 sm:px-8 sm:py-20 lg:px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid gap-12 items-center lg:grid-cols-2 lg:gap-16">
                        {/* Left: Text Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.h2
                                variants={fadeInUp}
                                className="mb-6 text-3xl font-medium leading-tight text-[#161618] sm:text-4xl lg:text-5xl"
                            >
                                Your Trusted Travel<br />Partner ar Here
                            </motion.h2>
                            <motion.p
                                variants={fadeInUp}
                                className="content-copy mb-8 sm:mb-12"
                            >
                                We're more than just a travel agency, we're your trusted partner in creating unforgettable journeys. Our commitment to personalized service, expert advice, and competitive pricing sets us apart.
                            </motion.p>

                            {/* Stats */}
                            <motion.div
                                variants={fadeInUp}
                                className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
                            >
                                <div>
                                    <h3 className="mb-2 text-3xl font-semibold text-[#558ffc] sm:text-4xl">10k+</h3>
                                    <p className="text-[#56575c] font-light">Happy Travelers</p>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-3xl font-semibold text-[#558ffc] sm:text-4xl">15+</h3>
                                    <p className="text-[#56575c] font-light">Years of Expertise</p>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-3xl font-semibold text-[#558ffc] sm:text-4xl">99%</h3>
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
