import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="text-lg font-semibold text-[#161618] pr-4">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex-shrink-0"
                >
                    {isOpen ? (
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <circle cx="14" cy="14" r="13" stroke="#56575c" strokeWidth="1.5" />
                            <path d="M9 14H19" stroke="#56575c" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    ) : (
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <circle cx="14" cy="14" r="13" stroke="#56575c" strokeWidth="1.5" />
                            <path d="M9 14H19M14 9V19" stroke="#56575c" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    )}
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6">
                            <p className="text-[#56575c] text-base font-light leading-relaxed">{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How do I book a trip?",
            answer: "You can book a trip through our website, by calling our office, or by visiting one of our physical locations. Our travel agents are available to assist you."
        },
        {
            question: "How do I plan a journey with Travely?",
            answer: "Simply browse our destinations, choose your preferred package, and customize it to your liking. Our team will handle the rest to create your perfect journey."
        },
        {
            question: "How do I secure my plans with Travely?",
            answer: "Once you've selected your trip, you can secure your booking with a deposit. We offer flexible payment options to confirm your reservation."
        },
        {
            question: "What forms of payment do you accept?",
            answer: "We accept all major credit cards, debit cards, bank transfers, and PayPal. All transactions are secure and encrypted."
        },
        {
            question: "How do I reserve a journey with Travely?",
            answer: "Reserving a journey is easy! Select your destination, pick your dates, and complete the booking form. We'll send you a confirmation within 24 hours."
        },
        {
            question: "What should I do to book a trip with Travely?",
            answer: "Visit our bookings page, fill in your travel details, and follow the checkout process. It only takes a few minutes to secure your dream vacation."
        }
    ];

    return (
        <section className="py-20 px-20">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                        }}
                        className="text-5xl font-medium text-[#161618] mb-4"
                    >
                        Everything You Need to Know
                    </motion.h2>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
                        }}
                        className="text-[#56575c] text-lg font-light max-w-3xl mx-auto"
                    >
                        Whether you're curious about our services, cancellation policies, or travel packages, our FAQ section has got you covered. Find quick and reliable answers to make your plan.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-5">
                        {faqs.slice(0, 3).map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <FAQItem
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                                />
                            </motion.div>
                        ))}
                    </div>
                    <div className="space-y-5">
                        {faqs.slice(3, 6).map((faq, index) => (
                            <motion.div
                                key={index + 3}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <FAQItem
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index + 3}
                                    onToggle={() => setOpenIndex(openIndex === index + 3 ? null : index + 3)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { FAQSection, FAQItem };
