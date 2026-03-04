import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/ui';

const Privacy = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-20">
            <Section title={t('legal.privacy.title')}>
                <div className="max-w-3xl mx-auto prose prose-gray rtl:text-right">
                    <p>{t('legal.privacy.updated')}</p>
                    <h2>{t('legal.privacy.intro.title')}</h2>
                    <p>{t('legal.privacy.intro.desc')}</p>
                    <h2>{t('legal.privacy.data.title')}</h2>
                    <p>{t('legal.privacy.data.desc')}</p>
                </div>
            </Section>
        </div>
    );
};

export default Privacy;
