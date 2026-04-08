import '../css/Hero.css';
import BtnBlue from './Btn-Blue';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero">
            <video autoPlay loop muted playsInline className="hero-video">
                <source
                    src="https://framerusercontent.com/assets/XvbiMVjOJBPlHtNv6Me5vWXnTA.mp4"
                    type="video/mp4"
                />
            </video>
            <div className="overlay" />

            <div className="hero-content">
                <span className={`hero-tag ${loaded ? 'anim-in' : ''}`}>
                    ✦ YOUR JOURNEY STARTS HERE
                </span>
                <h1 className={`hero-title ${loaded ? 'anim-in delay-1' : ''}`}>
                    Escape to<br />Paradise
                </h1>
                <p className={`hero-desc ${loaded ? 'anim-in delay-2' : ''}`}>
                    Ignite your wanderlust and unlock a world of possibilities.
                    From serene beaches to bustling cities, we offer travel
                    packages to suit every taste and budget.
                </p>
                <div className={`hero-actions ${loaded ? 'anim-in delay-3' : ''}`}>
                    <BtnBlue title="Book a Tour" size="lg" />
                    <BtnBlue title="Learn More" variant="light" size="lg" />
                </div>
            </div>

            <div className={`scroll-indicator ${loaded ? 'anim-in delay-4' : ''}`}>
                <div className="scroll-line" />
                <span>SCROLL</span>
            </div>
        </section>
    );
};

export default Hero;