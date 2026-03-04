import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    const { t } = useTranslation();
    const phoneNumber = "966501234567"; // Replace with real number
    const message = encodeURIComponent(t('ui.whatsappMsg'));
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
            aria-label={t('ui.whatsappLabel')}
        >
            <MessageCircle size={32} />
            <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border rtl:right-auto rtl:left-full rtl:ml-4 rtl:mr-0 rtl:ms-4">
                {t('ui.whatsappText')}
            </span>
        </motion.a>
    );
};

export default WhatsAppButton;
