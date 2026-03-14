// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Facebook, Instagram, Twitter, Mail, Phone,
  MapPin, MessageSquare, ArrowRight,
} from 'lucide-react';

/* ── animation variants ── */
const container = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, staggerChildren: 0.1, ease: 'easeOut' },
  },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const services = [
    t('home.whyChoose.card2.title'),
    t('home.whyChoose.card1.title'),
    t('footer.vip'),
    t('footer.visa'),
    t('footer.hotelTrans'),
  ];

  const quickLinks = [
    { label: t('nav.about'),    path: '/about'    },
    { label: t('nav.packages'), path: '/packages' },
    { label: t('nav.faq'),      path: '/faq'      },
    { label: t('nav.blog'),     path: '/blog'     },
    { label: t('footer.privacy'), path: '/privacy' },
    { label: t('footer.terms'),   path: '/terms'   },
  ];

  const socials = [
    { icon: <Facebook size={18} />,    label: 'Facebook'              },
    { icon: <Instagram size={18} />,   label: 'Instagram'             },
    { icon: <Twitter size={18} />,     label: 'Twitter'               },
    { icon: <MessageSquare size={18} />, label: t('footer.whatsapp') },
  ];

  /* ── shared style tokens ── */
  const S = {
    footer: {
      position: 'relative',
      background: '#0a1f14',
      color: 'white',
      paddingTop: 96, paddingBottom: 48,
      overflow: 'hidden',
    },
    topBorder: {
      position: 'absolute', top: 0, left: 0, right: 0, height: 1,
      background: 'linear-gradient(90deg, transparent, #c8a24d, transparent)',
    },
    gridWrap: {
      maxWidth: 1280, margin: '0 auto', padding: '0 24px',
      position: 'relative', zIndex: 1,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 48, marginBottom: 64,
    },
    colHeading: {
      fontFamily: 'Cinzel, serif',
      fontSize: 15, fontWeight: 700, color: 'white',
      marginBottom: 24, position: 'relative', display: 'inline-block',
    },
    underline: {
      position: 'absolute', bottom: -6, left: 0,
      width: 36, height: 2,
      background: '#c8a24d',
    },
    footerLink: {
      display: 'flex', alignItems: 'center', gap: 8,
      textDecoration: 'none',
      fontSize: 14, color: '#9ca3af',
      transition: 'color 0.3s', marginBottom: 12,
    },
    socialBtn: {
      width: 40, height: 40, borderRadius: '50%',
      border: '1px solid rgba(255,255,255,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#9ca3af', cursor: 'pointer',
      transition: 'all 0.35s', background: 'transparent',
    },
    contactRow: {
      display: 'flex', alignItems: 'flex-start', gap: 12,
      marginBottom: 16,
    },
    waBtn: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '10px 22px', borderRadius: 50,
      border: '1px solid rgba(200,162,77,0.4)',
      color: '#c8a24d', background: 'transparent',
      fontSize: 13, fontWeight: 600, cursor: 'pointer',
      fontFamily: 'Cinzel, serif', transition: 'all 0.3s',
    },
    copyright: {
      paddingTop: 32,
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', flexWrap: 'wrap',
      alignItems: 'center', justifyContent: 'space-between', gap: 12,
    },
  };

  return (
    <footer style={S.footer} className="islamic-bg">
      {/* Decorative top border */}
      <div style={S.topBorder} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={S.gridWrap}
      >
        <div style={S.grid}>

          {/* ── Col 1 : Brand ── */}
          <motion.div variants={item}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, textDecoration: 'none', marginBottom: 24 }}>
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(200,162,77,0.25)',
                borderRadius: 12, padding: '6px 8px',
              }}>
                <img src="/logo.png" alt="Al-Moazzen Group" style={{ height: 52, width: 'auto' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 700, color: 'white' }}>
                  AL-MOAZZEN <span style={{ color: '#c8a24d' }}>GROUP</span>
                </div>
                <div style={{ fontSize: 10, color: '#6b7280', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 3 }}>
                  {t('footer.tagline')}
                </div>
              </div>
            </Link>

            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, marginBottom: 28, maxWidth: 280 }}>
              {t('footer.brandDesc')}
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map((s, idx) => (
                <motion.a
                  key={idx} href="#" aria-label={s.label}
                  whileHover={{ scale: 1.12 }}
                  style={S.socialBtn}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#c8a24d';
                    e.currentTarget.style.borderColor = '#c8a24d';
                    e.currentTarget.style.color = '#1a1a1a';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = '#9ca3af';
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2 : Services ── */}
          <motion.div variants={item}>
            <h4 style={S.colHeading}>
              {t('nav.services')}
              <div style={S.underline} />
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {services.map((svc, idx) => (
                <li key={idx}>
                  <Link
                    to="/services"
                    style={S.footerLink}
                    onMouseEnter={e => e.currentTarget.style.color = '#c8a24d'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                  >
                    <ArrowRight size={13} style={{ color: '#c8a24d', flexShrink: 0 }} />
                    {svc}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3 : Quick Links ── */}
          <motion.div variants={item}>
            <h4 style={S.colHeading}>
              {t('nav.quickLinks')}
              <div style={S.underline} />
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {quickLinks.map((lnk, idx) => (
                <li key={idx}>
                  <Link
                    to={lnk.path}
                    style={S.footerLink}
                    onMouseEnter={e => e.currentTarget.style.color = '#c8a24d'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                  >
                    <ArrowRight size={13} style={{ color: '#c8a24d', flexShrink: 0 }} />
                    {lnk.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 4 : Contact ── */}
          <motion.div variants={item}>
            <h4 style={{ ...S.colHeading, color: '#c8a24d' }}>
              {t('footer.contactInfo')}
              <div style={S.underline} />
            </h4>

            <div style={S.contactRow}>
              <MapPin size={17} style={{ color: '#c8a24d', flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7 }}>
                {t('footer.address')}
              </span>
            </div>

            <div style={S.contactRow}>
              <Phone size={17} style={{ color: '#c8a24d', flexShrink: 0 }} />
              <a href="tel:+966501234567" style={{ fontSize: 14, color: '#9ca3af', textDecoration: 'none' }}>
                +966 50 123 4567
              </a>
            </div>

            <div style={{ ...S.contactRow, marginBottom: 28 }}>
              <Mail size={17} style={{ color: '#c8a24d', flexShrink: 0 }} />
              <a href="mailto:info@almoazzengroup.sa" style={{ fontSize: 14, color: '#9ca3af', textDecoration: 'none' }}>
                info@almoazzengroup.sa
              </a>
            </div>

            <p style={{ fontSize: 10, color: '#4b5563', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 12 }}>
              {t('footer.support')}
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04, background: '#c8a24d', color: 'white' }}
              style={S.waBtn}
            >
              <MessageSquare size={15} />
              {t('footer.whatsapp')}
            </motion.a>
          </motion.div>

        </div>{/* /grid */}

        {/* ── Copyright bar ── */}
        <div style={S.copyright}>
          <p style={{ fontSize: 13, color: '#4b5563' }}>
            {t('footer.copy', { year })}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#4b5563' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8a24d', display: 'inline-block' }} />
            {t('footer.crafted')}
          </div>
        </div>

      </motion.div>
    </footer>
  );
};

export default Footer;
