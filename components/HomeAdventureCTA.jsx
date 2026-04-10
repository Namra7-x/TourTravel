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
        className="relative max-w-7xl mx-auto min-h-[420px] sm:min-h-[520px] lg:aspect-[1140/578] rounded-3xl overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0">
          <motion.img
            src="https://framerusercontent.com/images/UqwbnrbwQ7sNsDpw7kihreAsBc.png?scale-down-to=2048"
            className="w-full h-full object-cover"
            alt="Adventure"
            initial={{ scale: 1.1 }}
            animate={inView ? { scale: 1 } : { scale: 1.1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/5"></div>
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center h-full px-5 sm:px-8 py-14 sm:py-16"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-medium text-white mb-5 sm:mb-6 leading-tight max-w-4xl"
            variants={fadeInUp}
            custom={0}
          >
            Are You Ready to Start Your Adventure?
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl leading-relaxed"
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
              size="lg"
              className="bg-[#558ffc] text-white hover:bg-black"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HomeAdventureCTA;