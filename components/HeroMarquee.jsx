import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animationVariants';

const HeroMarquee = () => {
    const trackRef = useRef(null);
    const contentRef = useRef(null);
    const cardHeight = 'clamp(260px, 50vw, 560px)';
    const largeWidth = 'clamp(300px, 56vw, 760px)';

    const images = [
        {
            large: 'https://framerusercontent.com/images/6C3O8SKh6u1QcdWvQncFzCkAR8.png',
            small1: 'https://framerusercontent.com/images/oR2EOWPaNnTOmHfPV81nDbE8AzA.png',
            small2: 'https://framerusercontent.com/images/S81QUz99PMLGnonarzbMif0vo.png',
        },
        {
            large: 'https://framerusercontent.com/images/Oo4lR0lmHMJWRLPU8sE4pR1X5qY.png',
            small1: 'https://framerusercontent.com/images/fr6H5RLcQQ0VjEUVpmq1Br0m82g.png',
            small2: 'https://framerusercontent.com/images/1B8HZM0y4o6mCx9bizQ6EVTLM.png',
        },
        {
            large: 'https://framerusercontent.com/images/J4hyM37WQwxPv0SHDmmtOQZeC8.png',
            small1: 'https://framerusercontent.com/images/u8MMH8Bme91Z53h222eZb7BkoNo.png',
            small2: 'https://framerusercontent.com/images/jENubnq0tDPg2wkWOGoFR3UOw.png',
        },
        {
            large: 'https://framerusercontent.com/images/6C3O8SKh6u1QcdWvQncFzCkAR8.png',
            small1: 'https://framerusercontent.com/images/oR2EOWPaNnTOmHfPV81nDbE8AzA.png',
            small2: 'https://framerusercontent.com/images/S81QUz99PMLGnonarzbMif0vo.png',
        },
    ];

    useEffect(() => {
        const track = trackRef.current;
        const content = contentRef.current;

        if (!track || !content) {
            return undefined;
        }

        const normalSpeed = 60;
        const hoverSpeed = 30;
        const smoothing = 0.08;

        let frameId = 0;
        let lastTime = performance.now();
        let offset = 0;
        let currentSpeed = normalSpeed;
        let targetSpeed = normalSpeed;
        let contentWidth = content.scrollWidth;

        const updateWidth = () => {
            contentWidth = content.scrollWidth;
        };

        let observer = null;

        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(updateWidth);
            observer.observe(content);
        } else {
            window.addEventListener('resize', updateWidth);
        }

        const tick = (time) => {
            const delta = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;

            currentSpeed += (targetSpeed - currentSpeed) * smoothing;

            const loopWidth = Math.max(contentWidth, 1);
            offset = (offset + currentSpeed * delta) % loopWidth;

            track.style.transform = `translate3d(${-offset}px, 0, 0)`;
            frameId = requestAnimationFrame(tick);
        };

        const handleEnter = () => {
            targetSpeed = hoverSpeed;
        };

        const handleLeave = () => {
            targetSpeed = normalSpeed;
        };

        track.addEventListener('pointerenter', handleEnter);
        track.addEventListener('pointerleave', handleLeave);
        frameId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frameId);
            if (observer) {
                observer.disconnect();
            } else {
                window.removeEventListener('resize', updateWidth);
            }
            track.removeEventListener('pointerenter', handleEnter);
            track.removeEventListener('pointerleave', handleLeave);
        };
    }, []);

    return (
        <motion.section
            className="overflow-hidden py-12 sm:py-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div
                ref={trackRef}
                className="flex w-max will-change-transform"
                style={{ transform: 'translate3d(0, 0, 0)' }}
            >
                <div ref={contentRef} className="flex items-center">
                    {images.map((item, idx) => (
                        <div
                            key={idx}
                            className="mr-4 flex shrink-0 items-stretch sm:mr-6 lg:mr-8"
                            style={{ height: cardHeight, width: largeWidth }}
                        >
                            <img
                                src={item.large}
                                className="h-full w-full min-h-0 rounded-2xl object-cover"
                                style={{ display: 'block', objectPosition: 'center' }}
                                alt="travel"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                <div aria-hidden="true" className="flex items-center">
                    {images.map((item, idx) => (
                        <div
                            key={idx}
                            className="mr-4 flex shrink-0 items-stretch sm:mr-6 lg:mr-8"
                            style={{ height: cardHeight, width: largeWidth }}
                        >
                            <img
                                src={item.large}
                                className="h-full w-full min-h-0 rounded-2xl object-cover"
                                style={{ display: 'block', objectPosition: 'center' }}
                                alt=""
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default HeroMarquee;
