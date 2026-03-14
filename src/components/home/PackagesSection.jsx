// src/components/home/PackagesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import { SectionLabel, GoldDivider } from '../ui/shared';

const getPackages = (t) => {
  const silverFeatures = t('packages.features.silver', { returnObjects: true });
  const goldFeatures = t('packages.features.gold', { returnObjects: true });
  const royalFeatures = t('packages.features.royal', { returnObjects: true });

  return [
    {
      badge: t('packages.badges.mostPopular') || 'Most Popular',
      name: t('packages.names.silver') || 'Silver Serenity',
      nameAr: 'العمرة الفضية',
      price: '1,299',
      days: 10,
      features: Array.isArray(silverFeatures) ? silverFeatures : ['Economy Class Flights', '3-Star Hotel Near Haram', 'Visa Processing', 'Airport Transfers', '24/7 Support'],
      headerBg: '#f8f8f8',
      headerTextColor: '#1a4731',
      priceColor: '#1a4731',
      badgeColor: '#6b7280',
      featured: false,
    },
    {
      badge: t('packages.badges.bestValue') || 'Best Value',
      name: t('packages.names.gold') || 'Golden Grace',
      nameAr: 'العمرة الذهبية',
      price: '2,499',
      days: 14,
      features: Array.isArray(goldFeatures) ? goldFeatures : ['Business Class Flights', '5-Star Makkah Hotel', 'Fast-Track Visa', 'Private Transfers', 'Tour Guide', '24/7 VIP Support'],
      headerBg: 'linear-gradient(135deg,#c8a24d,#e8c76a)',
      headerTextColor: '#1a1a1a',
      priceColor: '#1a1a1a',
      badgeColor: '#1a1a1a',
      featured: true,
    },
    {
      badge: t('packages.badges.exclusive') || 'Exclusive',
      name: t('packages.names.royal') || 'Royal Devotion',
      nameAr: 'العمرة الملكية',
      price: '4,999',
      days: 21,
      features: Array.isArray(royalFeatures) ? royalFeatures : ['First Class Flights', 'Luxury Hilton / Fairmont', 'VIP Visa Service', 'Limousine Service', 'Private Scholar Guide', 'Zamzam Package', 'Gourmet Meals'],
      headerBg: 'linear-gradient(135deg,#1a4731,#2d7a52)',
      headerTextColor: 'white',
      priceColor: '#c8a24d',
      badgeColor: '#c8a24d',
      featured: false,
    },
  ];
};

const PackagesSection = () => {
  const { t } = useTranslation();
  const packageList = getPackages(t);

  return (
    <section
      className="islamic-bg noise"
      style={{
        padding: '96px 24px',
        background: 'linear-gradient(180deg,#1a4731 0%,#0f2d1e 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <SectionLabel>{t('home.packages.label') || 'Curated Packages'}</SectionLabel>
          <h2 className="font-display" style={{ fontSize: 'clamp(30px,4vw,50px)', fontWeight: 700, color: 'white', lineHeight: 1.15 }}>
            {t('home.packages.titleStart') || 'Choose Your Sacred'}
            <br /><span className="gold-shimmer">{t('home.packages.titleEnd') || 'Pilgrimage Experience'}</span>
          </h2>
          <GoldDivider />
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))',
          gap: 24, alignItems: 'start',
        }}>
          {packageList.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="pkg-card"
              style={{
                marginTop: pkg.featured ? -20 : 0,
                boxShadow: pkg.featured
                  ? '0 40px 80px rgba(200,162,77,0.2)'
                  : '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              {/* Card header */}
              <div style={{ background: pkg.headerBg, padding: '32px 28px', position: 'relative' }}>
                {/* badge */}
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(0,0,0,0.12)', borderRadius: 50,
                  padding: '4px 12px', fontSize: 11, fontWeight: 700,
                  color: pkg.badgeColor, letterSpacing: '0.05em', fontFamily: 'Cinzel, serif',
                }}>
                  {pkg.badge}
                </div>

                <div className="font-serif" style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>
                  {pkg.nameAr}
                </div>
                <h3 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: pkg.headerTextColor }}>
                  {pkg.name}
                </h3>

                {/* Price */}
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 13, color: `${pkg.priceColor}99` }}>{t('home.packages.currency') || 'SAR'}</span>
                  <span className="font-display" style={{ fontSize: 46, fontWeight: 700, color: pkg.priceColor }}>
                    {pkg.price}
                  </span>
                  <span style={{ fontSize: 13, color: `${pkg.priceColor}80` }}>{t('home.packages.perPerson') || '/ person'}</span>
                </div>

                {/* Days pill */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(0,0,0,0.1)', borderRadius: 50,
                  padding: '4px 12px', marginTop: 12,
                  fontSize: 12, color: pkg.headerTextColor,
                }}>
                  <Calendar size={12} /> {pkg.days} {t('home.packages.days') || 'Days'}
                </div>
              </div>

              {/* Features */}
              <div style={{ padding: '28px 28px' }}>
                <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                  {pkg.features.map((feat, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.04 + i * 0.1 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 0', borderBottom: '1px solid rgba(200,162,77,0.08)',
                      }}
                    >
                      <CheckCircle2 size={15} style={{ color: '#c8a24d', flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: '#374151' }}>{feat}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-shine"
                  style={{
                    width: '100%', padding: '14px', borderRadius: 50,
                    border: pkg.featured ? 'none' : '2px solid #c8a24d',
                    background: pkg.featured ? 'linear-gradient(135deg,#c8a24d,#e8c76a)' : 'transparent',
                    color: pkg.featured ? '#1a1a1a' : '#c8a24d',
                    fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'Cinzel, serif', letterSpacing: '0.05em',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  {t('home.packages.bookBtn') || 'Book This Package'} <ArrowRight size={15} className="rtl:rotate-180" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
