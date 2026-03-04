import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/ui';
import { motion } from 'framer-motion';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-10">
            <Section className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('about.title')}</h1>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            {t('about.desc1')}
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {t('about.desc2')}
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-3xl font-bold text-primary-500 mb-1">{t('about.stats.pilgrims')}</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">{t('about.stats.pilgrimsLabel')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-500 mb-1">{t('about.stats.experience')}</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">{t('about.stats.experienceLabel')}</div>
                            </div>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <img
                            src="/about-us.jpg"
                            alt={t('about.title')}
                            className="rounded-2xl shadow-2xl relative z-10 aspect-[4/3] object-cover"
                        />
                        <div className="absolute -bottom-6 -right-6 rtl:-right-auto rtl:-left-6 w-full h-full border-4 border-primary-100 rounded-2xl z-0" />
                    </motion.div>
                </div>
            </Section>

            <Section dark className="bg-spiritual-charcoal">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">{t('about.mission.title')}</h3>
                        <p className="text-gray-400">{t('about.mission.desc')}</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">{t('about.vision.title')}</h3>
                        <p className="text-gray-400">{t('about.vision.desc')}</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">{t('about.values.title')}</h3>
                        <p className="text-gray-400">{t('about.values.desc')}</p>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default About;
