import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

    const faqs = [
        {
            question: t('faq.q1'),
            answer: t('faq.a1')
        },
        {
            question: t('faq.q2'),
            answer: t('faq.a2')
        },
        {
            question: t('faq.q3'),
            answer: t('faq.a3')
        },
        {
            question: t('faq.q4'),
            answer: t('faq.a4')
        },
        {
            question: t('faq.q5'),
            answer: t('faq.a5')
        }
    ];

    return (
        <div className="pt-10">
            <Section title={t('faq.title')} subtitle={t('faq.subtitle')}>
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
