// src/components/home/CTASection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, CheckCircle2 } from 'lucide-react';
import { Particles } from '../ui/shared';

const CTASection = () => {
  const { t } = useTranslation();

  const trustRaw = t('home.cta.trustBadges', { returnObjects: true });
  const trust = Array.isArray(trustRaw) && trustRaw.length > 0 ? trustRaw : ['No Hidden Fees', 'Visa Guaranteed', 'Fully Licensed'];

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '112px 24px' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1564769610726-59cead6a6f8f?q=80&w=2070&auto=format&fit=crop"
          alt="Madinah"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg,rgba(26,71,49,0.95) 0%,rgba(15,45,30,0.9) 100%)',
        }} />
      </div>

      <Particles />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ fontSize: 52, marginBottom: 16 }}>🕋</div>

          <h2
            className="font-display"
            style={{ fontSize: 'clamp(30px,5vw,58px)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.1 }}
          >
            {t('home.cta.titleStart') || 'Begin Your'}{' '}
            <span className="gold-shimmer">{t('home.cta.titleEnd') || 'Sacred Journey'}</span>
          </h2>

          <div className="gold-divider" />

          <p
            className="font-serif"
            style={{
              fontSize: 18, fontStyle: 'italic', color: 'rgba(255,255,255,0.7)',
              maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.75,
            }}
          >
            {t('home.cta.subtitle') || 'Let Al-Moazzen Group be your trusted companion on the path to Allah\'s house. Our team is ready to make your Umrah unforgettable.'}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(200,162,77,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-shine"
              style={{
                background: 'linear-gradient(135deg,#c8a24d,#e8c76a)',
                color: '#1a1a1a', border: 'none', borderRadius: 50,
                padding: '18px 44px', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em',
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <Phone size={17} /> {t('home.cta.call') || 'Call Us Now'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, background: 'rgba(200,162,77,0.1)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'transparent',
                border: '2px solid rgba(200,162,77,0.45)',
                color: '#c8a24d', borderRadius: 50,
                padding: '18px 44px', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em',
                transition: 'background 0.3s',
              }}
            >
              {t('home.cta.quote') || 'Get Free Quote'}
            </motion.button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {trust.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.55)', fontSize: 13 }}
              >
                <CheckCircle2 size={14} style={{ color: '#c8a24d' }} /> {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
