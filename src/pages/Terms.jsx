import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/ui';

const Terms = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-20">
            <Section title={t('legal.terms.title')}>
                <div className="max-w-3xl mx-auto prose prose-md text-gray-600 rtl:text-right">
                    <p className="mb-4">{t('legal.terms.mainDesc')}</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.section1.title')}</h2>
                    <p>{t('legal.terms.section1.desc')}</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.section2.title')}</h2>
                    <p>{t('legal.terms.section2.desc')}</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.section3.title')}</h2>
                    <p>{t('legal.terms.section3.desc')}</p>
                </div>
            </Section>
        </div>
    );
};

export default Terms;
