// src/pages/Services.jsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ShieldCheck, Map, Clock, Users, Heart, Plane, Hotel,
  Star, Headphones, FileCheck, Car, Utensils, Camera,
  ArrowRight, CheckCircle2, Phone, ChevronRight, Sparkles
} from 'lucide-react';
import { Particles, GoldDivider, AnimatedCounter } from '../components/ui/shared';
import { NAV_BAR_H } from '../components/layout/Navbar';

/* ─── Entrance variants ───────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

const fadeLeft = (delay = 0) => ({
  initial:     { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

const fadeRight = (delay = 0) => ({
  initial:     { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

/* ─── Label badge ─────────────────────────────────────────────── */
const Label = ({ light = false, children }) => (
  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '9px 26px', borderRadius: 999,
      border: `1px solid ${light ? 'rgba(200,162,77,0.5)' : 'rgba(200,162,77,0.45)'}`,
      background: light ? 'rgba(200,162,77,0.12)' : 'rgba(200,162,77,0.08)',
      fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 600,
      letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8a24d',
    }}>
      {children}
    </span>
  </div>
);

/* ─── Data ────────────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: <Plane size={30} />,
    title: 'Premium Air Travel',
    desc: 'Business and economy class flights from 40+ departure cities worldwide, with flexible rebooking and dedicated check-in assistance.',
    features: ['Direct & connecting flights', 'Priority boarding', 'Extra baggage allowance', 'Airport meet & greet'],
  },
  {
    icon: <Hotel size={30} />,
    title: '5-Star Accommodation',
    desc: 'Hand-picked hotels within walking distance of Masjid Al-Haram and Masjid An-Nabawi — from premium comfort to Royal Suite luxury.',
    features: ['50–200m from Haram', 'Breakfast included', 'Room upgrades available', 'Concierge service'],
  },
  {
    icon: <FileCheck size={30} />,
    title: 'Visa Processing',
    desc: 'End-to-end Umrah visa assistance with a 99% approval rate. We handle every document, submission, and follow-up on your behalf.',
    features: ['99% approval rate', 'Document preparation', 'Express processing', 'Status tracking'],
  },
  {
    icon: <Car size={30} />,
    title: 'Private Transfers',
    desc: 'Comfortable, air-conditioned private transfers between airports, hotels, and all holy sites — available 24/7 with professional drivers.',
    features: ['Airport pick-up & drop', 'Makkah ↔ Madinah', 'Ziyarat tours', 'Wheelchair accessible'],
  },
  {
    icon: <Users size={30} />,
    title: 'Expert Guided Tours',
    desc: 'Knowledgeable scholars and guides lead you through the spiritual significance of every site — in your preferred language.',
    features: ['12+ languages', 'Scholar-led sessions', 'Historical context', 'Small group sizes'],
  },
  {
    icon: <Headphones size={30} />,
    title: '24/7 Support',
    desc: 'Our dedicated care team is available around the clock, every day of your journey — no issue too small, no hour too late.',
    features: ['WhatsApp & phone', 'On-ground team', 'Emergency assistance', 'Real-time updates'],
  },
  {
    icon: <Utensils size={30} />,
    title: 'Curated Dining',
    desc: 'From authentic Saudi cuisine to international options, we arrange halal dining experiences that nourish body and soul.',
    features: ['Halal certified', 'Full-board options', 'Dietary requirements', 'Group catering'],
  },
  {
    icon: <Camera size={30} />,
    title: 'Sacred Memories',
    desc: 'Professional photography packages to capture your most precious spiritual moments — a gift to treasure for generations.',
    features: ['Professional photographer', 'Edited gallery', 'Digital & print', 'Private sessions'],
  },
];

const VIP_PERKS = [
  'Dedicated personal Mutawwif (spiritual guide)',
  'Royal Suite accommodation steps from Al-Haram',
  'Private air-conditioned vehicle 24/7',
  'Fast-track Tawaf scheduling',
  'Exclusive access to premium prayer areas',
  'Personal chef & bespoke dining arrangements',
  'Premium Ihram kit & gift hamper',
  'Post-trip spiritual debrief session',
];

const STEPS = [
  { num: '01', title: 'Consultation',  desc: 'We listen to your needs, dates, and budget — then craft a personalised Umrah plan just for you.' },
  { num: '02', title: 'Customisation', desc: 'Choose your package tier, accommodation preference, and add-on services to build your perfect journey.' },
  { num: '03', title: 'Documentation', desc: 'We handle all visa applications, travel documents, and confirmations — you just pack your bags.' },
  { num: '04', title: 'Your Journey',  desc: 'Depart with full confidence knowing every detail is managed. Our team is with you every step of the way.' },
];

const STATS = [
  { value: 50000, suffix: '+',  label: 'Pilgrims Served',   icon: <Users size={20} /> },
  { value: 8,     suffix: '+',  label: 'Services Offered',  icon: <Star size={20} /> },
  { value: 99,    suffix: '%',  label: 'Visa Approval',     icon: <FileCheck size={20} /> },
  { value: 24,    suffix: '/7', label: 'Support Available', icon: <Headphones size={20} /> },
];

/* ════════════════════════════════════════ */
const Services = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroBgY     = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div style={{ background: '#faf6ee', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>

      <style>{`

        /* ── keyframes ── */
        @keyframes hero-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(6px); opacity: 1; }
        }
        @keyframes svc-bar-slide {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .services-hero-shimmer {
          background: linear-gradient(90deg, #8a6820 0%, #c8a24d 30%, #f0d98a 50%, #c8a24d 70%, #8a6820 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hero-shimmer 6s linear infinite;
        }

        /* ── hero stat cards ── */
        .hero-stat-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(200,162,77,0.25);
          border-radius: 16px;
          padding: 20px 24px;
          text-align: center;
          backdrop-filter: blur(12px);
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .hero-stat-card:hover {
          background: rgba(200,162,77,0.1);
          border-color: rgba(200,162,77,0.5);
          transform: translateY(-4px);
        }

        /* ── service cards ── */
        .svc-card {
          background: white;
          border-radius: 22px;
          padding: 40px 32px;
          border: 1.5px solid rgba(200,162,77,0.12);
          box-shadow: 0 4px 28px rgba(26,71,49,0.05);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition:
            transform    0.38s cubic-bezier(0.22,1,0.36,1),
            box-shadow   0.38s cubic-bezier(0.22,1,0.36,1),
            border-color 0.3s ease;
        }
        /* top gold bar expands on hover */
        .svc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 20px; right: 20px; height: 2.5px;
          border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, transparent, #c8a24d, #f0d070, #c8a24d, transparent);
          opacity: 0.4;
          transition: opacity 0.35s, left 0.35s, right 0.35s;
        }
        /* bottom green bar grows from center */
        .svc-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; right: 50%; height: 2px;
          border-radius: 4px 4px 0 0;
          background: linear-gradient(90deg, #1a4731, #2d7a52, #1a4731);
          transition: left 0.4s cubic-bezier(0.22,1,0.36,1), right 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-card:hover { transform: translateY(-10px); box-shadow: 0 24px 56px rgba(26,71,49,0.11); border-color: rgba(200,162,77,0.5); }
        .svc-card:hover::before { left: 0; right: 0; opacity: 1; }
        .svc-card:hover::after  { left: 0; right: 0; }

        /* children above pseudo elements */
        .svc-card > * { position: relative; z-index: 1; }

        /* icon box */
        .svc-icon {
          width: 62px; height: 62px; border-radius: 16px;
          background: linear-gradient(135deg, rgba(26,71,49,0.08), rgba(200,162,77,0.1));
          border: 1px solid rgba(200,162,77,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #1a4731; margin-bottom: 24px; flex-shrink: 0;
          transition: background 0.35s, border-color 0.35s, transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.35s;
        }
        .svc-card:hover .svc-icon {
          background: linear-gradient(135deg, #1e5438, #2d7a52);
          border-color: rgba(200,162,77,0.6);
          color: #f5e29a;
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 8px 24px rgba(26,71,49,0.25), 0 0 0 3px rgba(200,162,77,0.1);
        }
        .svc-card-title {
          font-family: 'Cinzel', serif; font-size: 17px;
          font-weight: 700; color: #1a4731; margin-bottom: 12px;
          transition: color 0.3s;
        }
        .svc-card:hover .svc-card-title { color: #c8a24d; }

        .svc-card-desc {
          font-size: 15px; color: #6b7280; line-height: 1.8;
          margin-bottom: 24px; flex: 1;
          transition: color 0.3s;
        }
        .svc-card:hover .svc-card-desc { color: #4b5563; }

        .svc-features {
          border-top: 1px solid rgba(200,162,77,0.15);
          padding-top: 20px;
          transition: border-color 0.3s;
        }
        .svc-card:hover .svc-features { border-color: rgba(200,162,77,0.3); }

        /* ── how it works cards ── */
        .how-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03));
          border: 1px solid rgba(200,162,77,0.18);
          border-radius: 24px; padding: 40px 32px; text-align: center;
          backdrop-filter: blur(12px);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s, border-color 0.3s;
          position: relative; overflow: hidden;
        }
        .how-card::before {
          content: '';
          position: absolute; top: 0; left: 50%; right: 50%; height: 2px;
          background: linear-gradient(90deg, #1a4731, #c8a24d, #1a4731);
          transition: left 0.4s cubic-bezier(0.22,1,0.36,1), right 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .how-card:hover { transform: translateY(-10px); box-shadow: 0 24px 56px rgba(0,0,0,0.25); border-color: rgba(200,162,77,0.4); }
        .how-card:hover::before { left: 0; right: 0; }
        .how-card > * { position: relative; z-index: 1; }
        .how-num {
          width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 24px;
          background: linear-gradient(135deg, #c8a24d, #e8c76a);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cinzel', serif; font-size: 16px; font-weight: 700; color: #1a1a1a;
          box-shadow: 0 8px 24px rgba(200,162,77,0.35);
          transition: transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s;
        }
        .how-card:hover .how-num {
          transform: scale(1.15);
          box-shadow: 0 12px 32px rgba(200,162,77,0.5);
        }

        /* ── VIP section ── */
        .vip-section-grid {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 72px; align-items: center;
        }
        .vip-perks-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px 24px; margin-bottom: 36px;
        }
        .vip-img-wrap { position: relative; }
        .vip-img {
          width: 100%; border-radius: 20px; object-fit: cover;
          aspect-ratio: 4/3; display: block;
          box-shadow: 0 32px 80px rgba(26,71,49,0.18);
          position: relative; z-index: 1;
        }
        .vip-img-border {
          position: absolute; bottom: -16px; left: -16px;
          width: 100%; height: 100%;
          border: 2px solid rgba(200,162,77,0.3);
          border-radius: 20px; z-index: 0;
        }
        .vip-badge {
          position: absolute; top: 24px; right: -20px; z-index: 2;
          background: linear-gradient(135deg, #c8a24d, #e8c76a);
          border-radius: 16px; padding: 16px 20px;
          box-shadow: 0 12px 40px rgba(200,162,77,0.4);
          text-align: center;
        }

        /* ── hero responsive ── */
        .hero-h1 {
          font-family: 'Cinzel', serif;
          font-size: clamp(28px, 6vw, 78px);
          font-weight: 700; line-height: 1.1;
        }
        .hero-subtitle {
          font-size: clamp(15px, 2.2vw, 22px);
          font-style: italic; color: rgba(255,255,255,0.7);
          line-height: 1.75; max-width: 620px;
          margin: 0 auto 52px;
        }
        .hero-stats-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 16px; max-width: 780px; margin: 0 auto;
        }

        /* ── section padding ── */
        .svc-pad { padding: 110px 40px; }

        /* ── RESPONSIVE ──────────────────────────────────── */

        @media (max-width: 1024px) {
          .vip-section-grid { grid-template-columns: 1fr; gap: 48px; }
          .vip-badge        { right: 0; }
          .vip-img-border   { bottom: -10px; left: -10px; }
        }

        @media (max-width: 768px) {
          .svc-pad           { padding: 72px 24px; }
          .hero-stats-grid   { grid-template-columns: repeat(2,1fr); max-width: 420px; }
          .vip-perks-grid    { grid-template-columns: 1fr; }
          .hero-subtitle     { margin-bottom: 32px; }

          .svc-card          { padding: 28px 22px; border-radius: 18px; }
          .svc-icon          { width: 52px; height: 52px; margin-bottom: 18px; }
          .svc-card-title    { font-size: 15px; }
          .svc-card-desc     { font-size: 14px; }

          .how-card          { padding: 32px 24px; }
        }

        @media (max-width: 480px) {
          .svc-pad           { padding: 52px 16px; }
          .hero-stats-grid   { gap: 10px; }
          .hero-subtitle     { font-size: 14px; }
        }

      `}</style>


      {/* ══════════════════════════════════
          1. HERO — staggered entrance
      ══════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative', minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', paddingTop: NAV_BAR_H,
        }}
      >
        {/* Parallax BG */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1800&auto=format&fit=crop)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          y: heroBgY, scale: 1.1,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom,rgba(10,28,18,0.75) 0%,rgba(10,28,18,0.55) 50%,rgba(10,28,18,0.85) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(circle at 75% 25%, rgba(200,162,77,0.08) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(26,71,49,0.3)    0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: 900 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22,1,0.36,1], delay: 0.1 }}
            style={{ marginBottom: 24 }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '9px 26px', borderRadius: 999,
              border: '1px solid rgba(200,162,77,0.5)',
              background: 'rgba(200,162,77,0.1)',
              fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#c8a24d', backdropFilter: 'blur(8px)',
            }}>
              ✦ Our Services ✦
            </span>
          </motion.div>

          {/* Heading line 1 */}
          <motion.h1
            className="hero-h1"
            style={{ color: '#fff', marginBottom: 12 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1], delay: 0.25 }}
          >
            Every Detail,
          </motion.h1>

          {/* Heading line 2 */}
          <motion.h1
            className="hero-h1"
            style={{ marginBottom: 28 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1], delay: 0.38 }}
          >
            <span className="services-hero-shimmer">Perfectly Handled</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 28 }}
          >
            <div style={{ width: 60, height: 1, background: 'linear-gradient(to right,transparent,#c8a24d)' }} />
            <div style={{ width: 7, height: 7, background: '#c8a24d', transform: 'rotate(45deg)', boxShadow: '0 0 8px rgba(200,162,77,0.8)' }} />
            <div style={{ width: 60, height: 1, background: 'linear-gradient(to left,transparent,#c8a24d)' }} />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1], delay: 0.6 }}
          >
            From flights and visas to guided Tawaf and 5-star accommodation —
            every aspect of your sacred journey is managed with devotion and precision.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="hero-stats-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1], delay: 0.75 }}
          >
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat-card">
                <div style={{ color: '#c8a24d', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                <div style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontFamily: 'Cinzel,serif', fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 2,
          animation: 'scroll-bounce 2s ease-in-out infinite',
        }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom,transparent,rgba(200,162,77,0.6))' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8a24d', boxShadow: '0 0 8px rgba(200,162,77,0.7)' }} />
        </div>
      </section>


      {/* ══════════════════════════════════
          2. ALL SERVICES GRID
      ══════════════════════════════════ */}
      <section className="mesh-bg svc-pad" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -200, right: -200, width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(200,162,77,0.06) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <motion.div {...fadeUp(0.0)}><Label>What We Offer</Label></motion.div>
            <motion.h2
              {...fadeUp(0.1)}
              style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 700, color: '#1a4731', marginTop: 16, lineHeight: 1.2 }}
            >
              Complete Umrah Care,{' '}
              <span style={{ color: '#c8a24d' }}>Start to Finish</span>
            </motion.h2>
            <motion.div {...fadeUp(0.18)}><GoldDivider /></motion.div>
            <motion.p
              {...fadeUp(0.25)}
              style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: '#6b7280', maxWidth: 580, margin: '20px auto 0', lineHeight: 1.8 }}
            >
              Every service below is handled in-house by our dedicated team —
              no outsourcing, no surprises, just seamless pilgrimage planning.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28 }}>
            {SERVICES.map((svc, i) => (
              <motion.div key={i} className="svc-card" {...fadeUp(i * 0.07)}>

                <div className="svc-icon">{svc.icon}</div>

                <div className="svc-card-title">{svc.title}</div>

                <p className="svc-card-desc">{svc.desc}</p>

                <div className="svc-features">
                  {svc.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <CheckCircle2 size={14} style={{ color: '#1a4731', flexShrink: 0, transition: 'color 0.3s' }} />
                      <span style={{ fontSize: 13.5, color: '#4b5563' }}>{f}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
          3. HOW IT WORKS
      ══════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg,#0f2d1e 0%,#1a4731 100%)',
        position: 'relative', overflow: 'hidden',
      }}
        className="svc-pad"
      >
        <div className="islamic-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <Particles count={10} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <motion.div {...fadeUp(0.0)}>
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '9px 26px', borderRadius: 999,
                  border: '1px solid rgba(200,162,77,0.5)',
                  background: 'rgba(200,162,77,0.1)',
                  fontFamily: 'Cinzel,serif', fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8a24d',
                }}>The Process</span>
              </div>
            </motion.div>
            <motion.h2
              {...fadeUp(0.1)}
              style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 700, color: 'white', marginTop: 16 }}
            >
              How It{' '}
              <span style={{
                background: 'linear-gradient(90deg,#8a6820,#c8a24d,#f0d98a,#c8a24d,#8a6820)',
                backgroundSize: '250% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Works</span>
            </motion.h2>
            <motion.div {...fadeUp(0.18)}><GoldDivider /></motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 28, position: 'relative' }}>
            {/* connector line */}
            <div style={{
              position: 'absolute', top: 40, left: '10%', right: '10%', height: 1,
              background: 'linear-gradient(90deg,transparent,rgba(200,162,77,0.3) 20%,rgba(200,162,77,0.3) 80%,transparent)',
              pointerEvents: 'none',
            }} />

            {STEPS.map((step, i) => (
              <motion.div key={i} className="how-card" {...fadeUp(i * 0.12)}>
                <div className="how-num">{step.num}</div>
                <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(15px,1.5vw,18px)', fontWeight: 700, color: 'white', marginBottom: 14 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 'clamp(13px,1.3vw,15px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
          4. VIP SECTION
      ══════════════════════════════════ */}
      <section className="mesh-bg svc-pad" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: -150, left: -150, width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(26,71,49,0.08) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="vip-section-grid">

          {/* Left: text */}
          <motion.div {...fadeLeft(0)}>
            <motion.div {...fadeUp(0.0)}><Label>Royal Devotion</Label></motion.div>
            <motion.h2
              {...fadeUp(0.1)}
              style={{
                fontFamily: 'Cinzel,serif', fontSize: 'clamp(24px,3.5vw,44px)',
                fontWeight: 700, color: '#1a4731', lineHeight: 1.2,
                marginTop: 16, marginBottom: 16,
              }}
            >
              The VIP Umrah{' '}
              <span style={{ color: '#c8a24d' }}>Experience</span>
            </motion.h2>
            <motion.div {...fadeUp(0.18)}><GoldDivider /></motion.div>
            <div style={{ height: 24 }} />
            <motion.p {...fadeUp(0.24)} style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: '#4b5563', lineHeight: 1.9, marginBottom: 12 }}>
              For those who wish to focus entirely on their spiritual connection —
              undistracted by logistics, unburdened by planning — our Royal Devotion
              VIP tier delivers an unmatched level of personal care and luxury.
            </motion.p>
            <motion.p {...fadeUp(0.3)} style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: '#4b5563', lineHeight: 1.9, marginBottom: 32 }}>
              Every moment of your Umrah is attended to by a dedicated team: from
              your personal Mutawwif guiding your Tawaf, to a private chef ensuring
              your sustenance is as nourishing as your prayers.
            </motion.p>

            <motion.div className="vip-perks-grid" {...fadeUp(0.36)}>
              {VIP_PERKS.map((perk, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <CheckCircle2 size={15} style={{ color: '#c8a24d', marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: 'clamp(12px,1.2vw,14px)', color: '#4b5563', lineHeight: 1.6 }}>{perk}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.44)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 30px', borderRadius: 50, border: 'none',
                background: 'linear-gradient(135deg,#c8a24d,#e8c76a)',
                color: '#1a1a1a', fontFamily: 'Cinzel,serif',
                fontSize: 12.5, fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(200,162,77,0.35)',
              }}>
                <Sparkles size={14} /> Enquire About VIP
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 30px', borderRadius: 50,
                border: '1.5px solid rgba(26,71,49,0.25)',
                background: 'transparent', color: '#1a4731',
                fontFamily: 'Cinzel,serif', fontSize: 12.5,
                fontWeight: 600, letterSpacing: '0.05em', cursor: 'pointer',
              }}>
                View All Packages <ChevronRight size={13} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: image — correctly proportioned, no overflow */}
          <motion.div className="vip-img-wrap" {...fadeRight(0.15)}>
            <img
              className="vip-img"
              src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=900&auto=format&fit=crop"
              alt="VIP Umrah — Masjid Al-Haram"
            />
            <div className="vip-img-border" />
            <motion.div
              className="vip-badge"
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={18} fill="#1a1a1a" style={{ color: '#1a1a1a', display: 'block', margin: '0 auto 6px' }} />
              <div style={{ fontFamily: 'Cinzel,serif', fontSize: 9, letterSpacing: '0.14em', color: '#1a1a1a', opacity: 0.75, textAlign: 'center' }}>
                ROYAL DEVOTION
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Services;