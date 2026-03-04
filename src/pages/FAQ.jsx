import React, { useState } from 'react';
import { Section } from '../components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-6 text-left rtl:text-right transition-colors hover:text-primary-500"
            >
                <span className="text-lg font-semibold">{question}</span>
                {isOpen ? <Minus size={20} className="text-primary-500" /> : <Plus size={20} className="text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-600 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "When is the best time to perform Umrah?",
            answer: "While Umrah can be performed year-round, many prefer the months of October to March when the weather in Saudi Arabia is milder. Ramadan is also a highly spiritual time, though it is much more crowded."
        },
        {
            question: "How long does the Umrah visa process take?",
            answer: "Typically, Umrah visas are processed within 3 to 7 working days. We recommend booking at least 2-3 weeks in advance to ensure all documentation is in order."
        },
        {
            question: "Are flights included in the packages?",
            answer: "Our Premium and VIP packages include return flights. Economy packages can be customized to include flights or can be 'land-only' if you prefer to book your own travel."
        },
        {
            question: "Do you provide Ziyarat (Holy sites) tours?",
            answer: "Yes, all our packages include guided tours of major historical and religious sites in both Makkah and Madinah."
        },
        {
            question: "Is travel insurance necessary?",
            answer: "Standard Saudi health insurance is often included with the visa fee, but we highly recommend additional comprehensive travel insurance for peace of mind."
        }
    ];

    return (
        <div className="pt-10">
            <Section title="Frequently Asked Questions" subtitle="Find answers to common questions about our services and the Umrah journey.">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default FAQ;
