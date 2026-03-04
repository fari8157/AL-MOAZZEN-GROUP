import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/ui';
import { ShieldCheck, Map, Clock, Users, Heart } from 'lucide-react';

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: <ShieldCheck size={32} />,
            title: t('services.card1.title'),
            desc: t('services.card1.desc')
        },
        {
            icon: <Map size={32} />,
            title: t('services.card2.title'),
            desc: t('services.card2.desc')
        },
        {
            icon: <Users size={32} />,
            title: t('services.card3.title'),
            desc: t('services.card3.desc')
        },
        {
            icon: <Clock size={32} />,
            title: t('services.card4.title'),
            desc: t('services.card4.desc')
        }
    ];

    return (
        <div className="pt-10">
            <Section title={t('services.title')} subtitle={t('services.subtitle')}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((item, i) => (
                        <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="mb-6 text-primary-500 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="bg-primary-50">
                <div className="max-w-4xl mx-auto text-center">
                    <Heart className="mx-auto text-primary-500 mb-6" size={48} fill="currentColor" />
                    <h2 className="text-3xl font-bold mb-6">{t('services.vipTitle')}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        {t('services.vipDesc')}
                    </p>
                    <button className="btn btn-primary px-8">{t('services.inquire')}</button>
                </div>
            </Section>
        </div>
    );
};

export default Services;
