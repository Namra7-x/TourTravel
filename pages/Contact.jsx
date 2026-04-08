import { motion } from "framer-motion";
import { useState } from "react";
import HeroMarquee from "../components/HeroMarquee";
import { FAQSection } from "../components/FAQSection";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="overflow-hidden">
            {/* Header Section */}
            <section className="pt-20 pb-20 px-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-6xl font-medium text-[#161618] mb-6"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-[#56575c] text-lg font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Need help or have a request? Our team is here to answer your questions and make your travel smooth. Contact us today!
                    </motion.p>
                </motion.div>
            </section>

            {/* Contact Content Section */}
            <section className="py-20 px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 gap-8 items-start">
                        {/* Left Box - Video + Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl overflow-hidden h-[520px]"
                        >
                            {/* Background Video */}
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                src="https://framerusercontent.com/assets/Zh0GOoOvpnmiNUi8ufwMqiNM.mov"
                                autoPlay
                                loop
                                playsInline
                                preload="auto"
                                muted
                            />

                            {/* Contact Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 space-y-6">
                                {/* Address */}
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#558ffc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <p className="text-white text-base font-medium drop-shadow-md">2464 Royal Ln. Mesa, New Jersey 45463</p>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#558ffc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </div>
                                    <p className="text-white text-base font-medium drop-shadow-md">(629) 555-0129</p>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#558ffc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <p className="text-white text-base font-medium drop-shadow-md">travely@pixproo.com</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Box - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-[#f0f2f7] rounded-3xl p-8"
                        >
                            <form className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-base text-[#161618] mb-2">Name*</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-[#161618] text-base font-light placeholder:text-[#56575c] placeholder:font-light focus:outline-none focus:border-gray-300 transition-colors"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-base text-[#161618] mb-2">Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Hello@gmail.com"
                                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-[#161618] text-base font-light placeholder:text-[#56575c] placeholder:font-light focus:outline-none focus:border-gray-300 transition-colors"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-base text-[#161618] mb-2">Message*</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write Message"
                                        rows="5"
                                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-[#161618] text-base font-light placeholder:text-[#56575c] placeholder:font-light focus:outline-none focus:border-gray-300 transition-colors resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-[#558ffc] text-white text-base font-medium px-8 py-3.5 rounded-full hover:bg-[#3a70e8] transition-colors"
                                >
                                    Contact Us
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Image Marquee Section */}
            <HeroMarquee />

            {/* FAQ Section */}
            <FAQSection />
        </div>
    );
};

export default Contact;
