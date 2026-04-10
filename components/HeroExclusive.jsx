import { motion } from 'framer-motion';
import { useInView } from '../utils/useInView';
import { slideInFromLeft, slideInFromRight, fadeInUp } from '../utils/animationVariants';

const HeroExclusive = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const cards = [
        {
            id: 1,
            video: "https://framerusercontent.com/assets/rukqDCtd2p6B6fajjjteEduhLK0.mp4",
            icon: "https://framerusercontent.com/images/klVTseQQFC0Im3Ulg8X1o56jo8.svg",
            title: "Get 30% Discounts for Previous Travelers",
            description: "Enjoy a 30% discount on exclusive travel packages for our valued travelers. Whether you want early bird specials or last-minute adventures, we have the perfect deal for you!"
        },
        {
            id: 2,
            video: "https://framerusercontent.com/assets/GDsApcBZ9JsDDZfuHDdXZE5dUbg.mp4",
            icon: "https://framerusercontent.com/images/klVTseQQFC0Im3Ulg8X1o56jo8.svg",
            title: "Get 24% Discounts for Group Traveler",
            description: " Take advantage of a fantastic 24% discount on our exclusive group travel packages! Whether you're planning a fun getaway with friends or a family reunion, we have the ideal offers to make your journey unforgettable."
        },
        {
            id: 3,
            video: "https://framerusercontent.com/assets/k1yHHotiYaeEInlsOjdbV2btE.mp4",
            icon: "https://framerusercontent.com/images/klVTseQQFC0Im3Ulg8X1o56jo8.svg",
            title: "Get 25% Exclusive Discounts for Couples",
            description: "Enjoy an exclusive 25% discount on our specially curated travel packages for couples! Whether you're looking for a romantic escape or a cozy weekend getaway, we have the perfect deals to create unforgettable memories together."
        }
    ];

    return (
        <>
            <section ref={ref} className="Exclusive py-20 sm:py-24 lg:py-28">
                <motion.header
                    className="max-w-5xl mx-auto"
                    variants={fadeInUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <h1 className="text-center text-2xl sm:text-4xl lg:text-5xl font-medium text-[#161618] px-4 leading-tight">Exclusive Deals & Discounts</h1>
                    <p className="max-w-2xl px-4 text-center font-light mt-4 text-[rgb(86,87,92)] mx-auto leading-relaxed text-base sm:text-lg">
                       Embark on a journey to far-flung corners of the globe. From the bustling streets of Tokyo to the serene beaches of Bali, our curated selection of exotic destinations offers.
                    </p>
                </motion.header>
                
                <div className="Exclusive-cards px-4 sm:px-8 lg:px-12 xl:px-48 py-12 sm:py-16">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            className={`card flex flex-col gap-6 items-center max-w-7xl mx-auto mb-12 sm:mb-16 lg:flex-row lg:gap-12 ${
                                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                            }`}
                            variants={index % 2 === 0 ? slideInFromLeft : slideInFromRight}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            custom={index}
                        >
                            <motion.div
                                className="video flex-1 min-w-0 w-full"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.4 }}
                            >
                                <video 
                                    className="w-full aspect-3/2 h-auto rounded-2xl object-cover" 
                                    src={card.video} 
                                    autoPlay 
                                    playsInline 
                                    loop
                                    muted
                                    preload="auto"
                                ></video>
                            </motion.div>
                            <motion.div
                                className="info flex-1 text-left lg:text-left w-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <motion.img
                                    src={card.icon}
                                    alt=""
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <h1 className="max-w-2xl text-2xl sm:text-3xl lg:text-5xl font-medium text-[#161618] leading-tight">{card.title}</h1>
                                <p className="max-w-xl font-light mt-4 text-[rgb(86,87,92)] leading-relaxed text-sm sm:text-base">{card.description}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default HeroExclusive;
