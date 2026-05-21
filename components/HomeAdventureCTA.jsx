import { motion } from 'framer-motion';
import { useInView } from '../utils/useInView';
import BtnBlue from './Btn-Blue';
import { fadeInUp, staggerContainer } from '../utils/animationVariants';

const HomeAdventureCTA = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.section
      ref={ref}
      className="adventure-cta py-16 sm:py-20 lg:py-24 px-4"
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl"
        style={{ minHeight: 'clamp(300px, 42vh, 520px)' }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0">
          <motion.img
            src="https://framerusercontent.com/images/UqwbnrbwQ7sNsDpw7kihreAsBc.png?scale-down-to=2048"
            className="w-full h-full object-cover"
            alt="Adventure"
            loading="lazy"
            style={{ objectPosition: 'center center', display: 'block', width: '100%', height: '100%' }}
            initial={{ scale: 1.05 }}
            animate={inView ? { scale: 1 } : { scale: 1.05 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/15 to-black/5"></div>
        </div>

        <motion.div
          className="relative z-10 flex h-full min-w-0 flex-col items-center justify-center px-5 py-10 text-center sm:px-8 sm:py-14 lg:px-14"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1
            className="mb-4 max-w-2xl break-words text-xl font-medium leading-tight text-white sm:mb-6 sm:max-w-4xl sm:text-4xl md:text-5xl lg:text-6xl"
            variants={fadeInUp}
            custom={0}
          >
            Are You Ready to Start Your Adventure?
          </motion.h1>

          <motion.p
            className="mb-7 max-w-xl break-words text-xs leading-snug text-white/90 sm:mb-12 sm:max-w-3xl sm:text-base sm:leading-relaxed md:text-lg lg:text-xl"
            variants={fadeInUp}
            custom={1}
          >
            Don't wait any longer. Start planning your dream vacation today. Contact us
            to discuss your travel needs and let us handle the details.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={2}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BtnBlue
              title="Join a Moment"
              size="sm"
              className="bg-[#558ffc] text-white hover:bg-black"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HomeAdventureCTA;