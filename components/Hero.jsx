import '../css/Hero.css';
import BtnBlue from './Btn-Blue';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animationVariants';

const Hero = () => {
    return (
        <section className="hero">
            <video autoPlay loop muted playsInline className="hero-video">
                <source
                    src="https://framerusercontent.com/assets/XvbiMVjOJBPlHtNv6Me5vWXnTA.mp4"
                    type="video/mp4"
                />
            </video>
            <div className="overlay" />

            <motion.div
                className="hero-content"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.span className="hero-tag" variants={fadeInUp} custom={0}>
                    ✦ YOUR JOURNEY STARTS HERE
                </motion.span>
                <motion.h1 className="hero-title" variants={fadeInUp} custom={1}>
                    Escape to<br />Paradise
                </motion.h1>
                <motion.p className="hero-desc" variants={fadeInUp} custom={2}>
                    Ignite your wanderlust and unlock a world of possibilities.
                    From serene beaches to bustling cities, we offer travel
                    packages to suit every taste and budget.
                </motion.p>
                <motion.div className="hero-actions" variants={fadeInUp} custom={3}>
                    <BtnBlue title="Book a Tour" size="lg" />
                    <BtnBlue title="Learn More" variant="light" size="lg" />
                </motion.div>
            </motion.div>

            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="scroll-line" />
                <span>SCROLL</span>
            </motion.div>
        </section>
    );
};

export default Hero;