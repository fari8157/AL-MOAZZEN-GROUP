// src/pages/About.jsx
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Award, Users, Heart, Globe, ShieldCheck, Star,
  Clock, CheckCircle2, Sparkles, MapPin
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

/* ─── Data ────────────────────────────────────────────────────── */

const STATS = [
  { value: 50000, suffix: '+',  label: 'Pilgrims Served',     icon: <Users size={20} /> },
  { value: 15,    suffix: '+',  label: 'Years of Excellence',  icon: <Award size={20} /> },
  { value: 98,    suffix: '%',  label: 'Satisfaction Rate',   icon: <Star size={20} /> },
  { value: 24,    suffix: '/7', label: 'Support Available',   icon: <Clock size={20} /> },
];

const VALUES = [
  {
    icon: <Heart size={28} />,
    title: 'Spiritual Integrity',
    desc:  'Every journey we craft is rooted in sincere devotion. We hold the sacred nature of Umrah above all commercial consideration.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Guaranteed Trust',
    desc:  'Licensed, bonded, and fully compliant with Saudi Ministry regulations. Your pilgrimage investment is protected at every step.',
  },
  {
    icon: <Globe size={28} />,
    title: 'Global Expertise',
    desc:  'Serving pilgrims from over 40 countries with multilingual support, local expertise, and a worldwide network of trusted partners.',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Exceptional Quality',
    desc:  'From premium 5-star accommodation steps from the Haram to private guided tours — every detail is curated for excellence.',
  },
];

const MILESTONES = [
  { year: '2009', title: 'Founded',          desc: 'Al-Moazzen Group established in Jeddah with a mission to transform Umrah travel.' },
  { year: '2013', title: 'First 10,000',     desc: 'Proudly served our 10,000th pilgrim — a milestone celebrated with gratitude.' },
  { year: '2017', title: 'VIP Expansion',    desc: 'Launched our Royal Devotion tier, offering unparalleled luxury Umrah experiences.' },
  { year: '2021', title: 'Digital Platform', desc: 'Launched full online booking — seamless Umrah planning from anywhere in the world.' },
  { year: '2024', title: '50,000 Pilgrims',  desc: 'Crossed the 50,000 pilgrim milestone, cementing our place as a regional leader.' },
];

/* ─── Reusable label badge ────────────────────────────────────── */
const Label = ({ children }) => (
  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '9px 26px', borderRadius: 999,
      border: '1px solid rgba(200,162,77,0.45)',
      background: 'rgba(200,162,77,0.08)',
      fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 600,
      letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8a24d',
    }}>
      {children}
    </span>
  </div>
);

/* ════════════════════════════════════════ */
const About = () => {
  useTranslation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroBgY     = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div style={{ background: '#faf6ee', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>

      <style>{`

        /* ── shimmer / scroll animations ── */
        @keyframes hero-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(6px); opacity: 1; }
        }

        .hero-title-shimmer {
          background: linear-gradient(90deg, #8a6820 0%, #c8a24d 30%, #f0d98a 50%, #c8a24d 70%, #8a6820 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hero-shimmer 6s linear infinite;
        }

        .hero-stat-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(200,162,77,0.25);
          border-radius: 16px;
          padding: 20px 24px;
          text-align: center;
          backdrop-filter: blur(12px);
          transition: background 0.3s, border-color 0.3s;
        }
        .hero-stat-card:hover {
          background: rgba(200,162,77,0.1);
          border-color: rgba(200,162,77,0.5);
        }

        /* ── RESPONSIVE ──────────────────────────────────────── */

        /* Hero stats: 4 col → 2 col → 1 col */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 780px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr); max-width: 420px; }
        }
        @media (max-width: 420px) {
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }

        /* Hero heading */
        .hero-h1 {
          font-family: 'Cinzel', serif;
          font-size: clamp(28px, 6vw, 78px);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        /* Hero subtitle */
        .hero-subtitle {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(15px, 2.2vw, 22px);
          font-style: italic;
          color: rgba(255,255,255,0.7);
          line-height: 1.75;
          max-width: 640px;
          margin: 0 auto 52px;
        }
        @media (max-width: 480px) {
          .hero-subtitle { margin-bottom: 32px; }
        }

        /* Who We Are: 2 col → 1 col */
        .about-who-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .about-who-grid { grid-template-columns: 1fr !important; gap: 48px; }
          .about-img-float-tl { left: 0 !important; }
          .about-img-float-tr { right: 0 !important; top: 8px !important; }
        }

        /* Section padding */
        .about-section-pad  { padding: 110px 40px; }
        @media (max-width: 768px) { .about-section-pad { padding: 72px 24px; } }
        @media (max-width: 480px) { .about-section-pad { padding: 52px 16px; } }

        /* Section heading */
        .about-h2 {
          font-family: 'Cinzel', serif;
          font-size: clamp(22px, 3.5vw, 42px);
          font-weight: 700;
          line-height: 1.2;
        }

        /* Who We Are text heading */
        .about-who-h2 {
          font-family: 'Cinzel', serif;
          font-size: clamp(24px, 3.5vw, 44px);
          font-weight: 700;
          color: #1a4731;
          line-height: 1.2;
          margin-top: 16px;
          margin-bottom: 24px;
        }
        .about-who-p {
          font-size: clamp(15px, 1.5vw, 17px);
          color: #4b5563;
          line-height: 1.9;
          margin-bottom: 20px;
        }

        /* Values cards */
        .values-card {
          background: white;
          border-radius: 20px;
          padding: 44px 32px;
          border-top: 3px solid #c8a24d;
          box-shadow: 0 8px 40px rgba(26,71,49,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .values-card:hover { transform: translateY(-10px); }
        .values-card h3 {
          font-family: 'Cinzel', serif;
          font-size: clamp(15px, 1.5vw, 17px);
          font-weight: 700;
          color: #1a4731;
          margin-bottom: 12px;
        }
        .values-card p {
          font-size: clamp(13px, 1.3vw, 15.5px);
          color: #6b7280;
          line-height: 1.8;
        }

        /* Mission/Vision cards */
        .mvv-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03));
          border: 1px solid rgba(200,162,77,0.18);
          border-radius: 24px;
          padding: 44px 36px;
          backdrop-filter: blur(12px);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .mvv-card:hover { transform: translateY(-8px); box-shadow: 0 32px 64px rgba(0,0,0,0.3); }
        .mvv-card h3 {
          font-family: 'Cinzel', serif;
          font-size: clamp(16px, 1.6vw, 20px);
          font-weight: 700;
          color: white;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        .mvv-card p {
          font-size: clamp(13px, 1.3vw, 15.5px);
          color: rgba(255,255,255,0.6);
          line-height: 1.85;
        }

        /* ── Timeline — desktop (alternating left / right) ─── */
        .about-timeline-wrap { position: relative; }

        .timeline-center-line {
          position: absolute;
          left: 50%; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom,
            transparent,
            rgba(200,162,77,0.5) 8%,
            rgba(200,162,77,0.5) 92%,
            transparent);
          transform: translateX(-50%);
        }

        /* desktop row: left-card | dot | right-card */
        .timeline-row {
          display: grid;
          grid-template-columns: 1fr 56px 1fr;
          align-items: center;
          margin-bottom: 48px;
        }

        .timeline-card {
          background: white;
          border-radius: 18px;
          padding: 26px 30px;
          box-shadow: 0 8px 40px rgba(26,71,49,0.07);
          border: 1px solid rgba(200,162,77,0.18);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .timeline-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #c8a24d, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .timeline-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(26,71,49,0.12);
          border-color: rgba(200,162,77,0.4);
        }
        .timeline-card:hover::before { opacity: 1; }

        .timeline-card-year {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: #fff;
          background: linear-gradient(135deg, #c8a24d, #e8c76a);
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 12px;
          font-weight: 700;
        }
        .timeline-card-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(15px, 1.4vw, 18px);
          font-weight: 700;
          color: #1a4731;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .timeline-card-desc {
          font-size: clamp(13px, 1.2vw, 15px);
          color: #6b7280;
          line-height: 1.75;
          margin: 0;
        }

        /* dot + number */
        .timeline-dot-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .timeline-dot {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c8a24d, #e8c76a);
          border: 3px solid #faf6ee;
          box-shadow: 0 0 0 5px rgba(200,162,77,0.18);
          flex-shrink: 0;
        }

        /* ── desktop / mobile switcher ── */
        .tl-desktop { display: block; }
        .tl-mobile  { display: none;  }

        @media (max-width: 640px) {
          .tl-desktop { display: none !important; }
          .tl-mobile  { display: block !important; }

          /* left vertical line */
          .about-timeline-wrap::before {
            content: '';
            position: absolute;
            left: 10px; top: 0; bottom: 0; width: 2px;
            background: linear-gradient(to bottom,
              transparent,
              rgba(200,162,77,0.55) 4%,
              rgba(200,162,77,0.55) 96%,
              transparent);
            border-radius: 2px;
          }

          .tl-mobile-row {
            display: flex;
            align-items: flex-start;
            gap: 18px;
            margin-bottom: 24px;
          }

          /* dot column — aligns to the left line */
          .tl-mobile-dot-col {
            flex-shrink: 0;
            width: 22px;
            display: flex;
            justify-content: center;
            padding-top: 6px;
          }
          .tl-mobile-dot {
            width: 14px; height: 14px;
            border-radius: 50%;
            background: linear-gradient(135deg, #c8a24d, #e8c76a);
            border: 2px solid #faf6ee;
            box-shadow: 0 0 0 4px rgba(200,162,77,0.18);
            flex-shrink: 0;
          }

          /* card fills the rest */
          .tl-mobile-card-col {
            flex: 1;
            min-width: 0;
          }
          .tl-mobile-card-col .timeline-card {
            padding: 16px 18px;
            border-radius: 14px;
          }
          .tl-mobile-card-col .timeline-card-year  { font-size: 9px; padding: 3px 10px; }
          .tl-mobile-card-col .timeline-card-title { font-size: 15px; margin-bottom: 6px; }
          .tl-mobile-card-col .timeline-card-desc  { font-size: 13px; line-height: 1.65; }
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
        {/* Parallax bg */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/about1.png')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          y: heroBgY, scale: 1.1,
        }} />

        {/* Overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom,rgba(10,28,18,0.72) 0%,rgba(10,28,18,0.55) 50%,rgba(10,28,18,0.82) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(200,162,77,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(26,71,49,0.3) 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: 900 }}>

          {/* Badge — drops down */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
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
              ✦ About Al-Moazzen Group ✦
            </span>
          </motion.div>

          {/* Heading line 1 */}
          <motion.h1
            className="hero-h1"
            style={{ color: '#ffffff' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            Guiding Hearts
          </motion.h1>

          {/* Heading line 2 — shimmer */}
          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
            style={{ marginBottom: 28 }}
          >
            <span className="hero-title-shimmer">To The Holy Land</span>
          </motion.h1>

          {/* Gold divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
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
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            For over 15 years, Al-Moazzen Group has been the trusted companion of pilgrims
            from around the world — combining sacred devotion with world-class service.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="hero-stats-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
          >
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat-card">
                <div style={{ color: '#c8a24d', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                  {s.icon}
                </div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>
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
          2. WHO WE ARE
      ══════════════════════════════════ */}
      <section className="mesh-bg about-section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -200, left: -200, width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(26,71,49,0.08) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="about-who-grid">

          {/* Left: image */}
          <motion.div {...fadeLeft(0)} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <img
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=900&auto=format&fit=crop"
                alt="About Al-Moazzen"
                style={{ width: '100%', borderRadius: 20, objectFit: 'cover', aspectRatio: '4/3', display: 'block', boxShadow: '0 32px 80px rgba(26,71,49,0.18)' }}
              />
            </div>
            <div style={{
              position: 'absolute', bottom: -16, right: -16,
              width: '100%', height: '100%',
              border: '2px solid rgba(200,162,77,0.35)', borderRadius: 20, zIndex: 0,
            }} />
            <motion.div
              className="about-img-float-tl"
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', bottom: 28, left: -28, zIndex: 2,
                background: 'linear-gradient(135deg,#c8a24d,#e8c76a)',
                borderRadius: 16, padding: '16px 22px',
                boxShadow: '0 12px 40px rgba(200,162,77,0.35)',
              }}
            >
              <div style={{ fontFamily: 'Cinzel,serif', fontSize: 24, fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>15+</div>
              <div style={{ fontFamily: 'Cinzel,serif', fontSize: 9, letterSpacing: '0.18em', color: '#1a1a1a', opacity: 0.7, marginTop: 4 }}>YEARS OF TRUST</div>
            </motion.div>
            <motion.div
              className="about-img-float-tr"
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute', top: 24, right: -24, zIndex: 2,
                background: 'rgba(26,71,49,0.92)',
                border: '1px solid rgba(200,162,77,0.3)',
                borderRadius: 14, padding: '14px 18px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div style={{ fontFamily: 'Cinzel,serif', fontSize: 20, fontWeight: 700, color: '#c8a24d', lineHeight: 1 }}>50K+</div>
              <div style={{ fontFamily: 'Cinzel,serif', fontSize: 8.5, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>PILGRIMS SERVED</div>
            </motion.div>
          </motion.div>

          {/* Right: text */}
          <motion.div {...fadeRight(0.15)}>
            <motion.div {...fadeUp(0.1)}><Label>Who We Are</Label></motion.div>
            <motion.h2
              className="about-who-h2"
              {...fadeUp(0.2)}
            >
              Guiding Hearts to the{' '}
              <span style={{ color: '#c8a24d' }}>Holy Land</span>
            </motion.h2>
            <motion.div {...fadeUp(0.28)}><GoldDivider /></motion.div>
            <div style={{ height: 24 }} />
            <motion.p className="about-who-p" {...fadeUp(0.32)}>
              Al-Moazzen Group was founded on a single, unwavering belief: that every Muslim
              deserves to perform Umrah with complete peace of mind. From the moment you reach out
              to the moment you return home, our team of 80+ dedicated professionals ensures
              every detail is handled with care, precision, and spiritual sensitivity.
            </motion.p>
            <motion.p className="about-who-p" {...fadeUp(0.38)} style={{ marginBottom: 32 }}>
              Our name — Al-Moazzen — means "the one who calls to prayer." It is a name we wear
              with honour, reminding us daily of our sacred responsibility to those who answer
              that call and journey to Makkah and Madinah.
            </motion.p>
            {[
              'Fully licensed by the Saudi Ministry of Haj & Umrah',
              'Dedicated multilingual support in 12+ languages',
              'Partnerships with top 5-star hotels near Haram',
              'Seamless visa processing with 99% approval rate',
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(0.42 + i * 0.08)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}
              >
                <CheckCircle2 size={18} style={{ color: '#1a4731', marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: 'clamp(14px,1.4vw,16px)', color: '#4b5563', lineHeight: 1.6 }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* ══════════════════════════════════
          3. MISSION / VISION / VALUES
      ══════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg,#0f2d1e 0%,#1a4731 50%,#0f2d1e 100%)',
        position: 'relative', overflow: 'hidden',
      }}
        className="about-section-pad"
      >
        <div className="islamic-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <Particles count={10} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <motion.div {...fadeUp(0.0)}>
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '9px 26px', borderRadius: 999,
                  border: '1px solid rgba(200,162,77,0.45)',
                  background: 'rgba(200,162,77,0.08)',
                  fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8a24d',
                }}>Our Foundation</span>
              </div>
            </motion.div>

            <motion.h2
              className="about-h2"
              style={{ color: 'white', marginTop: 16 }}
              {...fadeUp(0.12)}
            >
              Mission, Vision &{' '}
              <span style={{
                background: 'linear-gradient(90deg,#8a6820,#c8a24d,#f0d98a,#c8a24d,#8a6820)',
                backgroundSize: '250% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Core Values</span>
            </motion.h2>
            <motion.div {...fadeUp(0.22)}><GoldDivider /></motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28 }}>
            {[
              { icon: '🕋', label: 'Our Mission', title: 'Serve Every Pilgrim',
                desc: 'To provide every Muslim with a spiritually enriching, safe, and seamless Umrah experience — regardless of budget or background.' },
              { icon: '🌙', label: 'Our Vision', title: 'The Leading Umrah Partner',
                desc: "To be the world's most trusted Umrah service provider, recognised for spiritual integrity, operational excellence, and transformative impact." },
              { icon: '⚖️', label: 'Our Values', title: 'Integrity Above All',
                desc: 'We operate with complete transparency, zero hidden fees, and an unwavering commitment to the sacred nature of this journey.' },
            ].map((card, i) => (
              <motion.div key={i} className="mvv-card" {...fadeUp(i * 0.12)}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{card.icon}</div>
                <div style={{
                  fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: '0.22em',
                  color: '#c8a24d', textTransform: 'uppercase', marginBottom: 10,
                }}>{card.label}</div>
                <h3>{card.title}</h3>
                <div style={{ width: 40, height: 1.5, background: 'rgba(200,162,77,0.4)', marginBottom: 16 }} />
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
          4. OUR VALUES (4 icons)
      ══════════════════════════════════ */}
      <section className="mesh-bg about-section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <motion.div {...fadeUp(0.0)}><Label>What Drives Us</Label></motion.div>
            <motion.h2 className="about-h2" style={{ color: '#1a4731', marginTop: 16 }} {...fadeUp(0.1)}>
              The Principles We Live By
            </motion.h2>
            <motion.div {...fadeUp(0.2)}><GoldDivider /></motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 28 }}>
            {VALUES.map((v, i) => (
              <motion.div key={i} className="values-card" {...fadeUp(i * 0.1)}>
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  style={{
                    width: 60, height: 60, borderRadius: 16,
                    background: 'linear-gradient(135deg,rgba(26,71,49,0.1),rgba(200,162,77,0.1))',
                    border: '1px solid rgba(200,162,77,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#1a4731', marginBottom: 22,
                  }}
                >
                  {v.icon}
                </motion.div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
          5. TIMELINE
      ══════════════════════════════════ */}
      <section style={{ background: '#faf6ee', position: 'relative', overflow: 'hidden' }} className="about-section-pad">
        <div style={{
          position: 'absolute', bottom: -100, right: -100, width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(200,162,77,0.07) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <motion.div {...fadeUp(0.0)}><Label>Our Journey</Label></motion.div>
            <motion.h2 className="about-h2" style={{ color: '#1a4731', marginTop: 16 }} {...fadeUp(0.1)}>
              Milestones of Excellence
            </motion.h2>
            <motion.div {...fadeUp(0.2)}><GoldDivider /></motion.div>
          </div>

          {/* Timeline */}
          <div className="about-timeline-wrap">

            {/* ── Desktop center line ── */}
            <div className="timeline-center-line" />

            {/* ── Desktop alternating layout (hidden on mobile) ── */}
            <div className="tl-desktop">
              {MILESTONES.map((m, i) => (
                <motion.div key={i} className="timeline-row" {...fadeUp(i * 0.1)}>
                  {/* left card (even) or empty */}
                  <div style={{ textAlign: 'right', paddingRight: 32 }}>
                    {i % 2 === 0 ? (
                      <div className="timeline-card">
                        <div className="timeline-card-year">{m.year}</div>
                        <div className="timeline-card-title">{m.title}</div>
                        <p className="timeline-card-desc">{m.desc}</p>
                      </div>
                    ) : null}
                  </div>

                  {/* center dot */}
                  <div className="timeline-dot-wrap">
                    <div className="timeline-dot" />
                  </div>

                  {/* right card (odd) or empty */}
                  <div style={{ paddingLeft: 32 }}>
                    {i % 2 !== 0 ? (
                      <div className="timeline-card">
                        <div className="timeline-card-year">{m.year}</div>
                        <div className="timeline-card-title">{m.title}</div>
                        <p className="timeline-card-desc">{m.desc}</p>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Mobile left-line layout (hidden on desktop) ── */}
            <div className="tl-mobile">
              {MILESTONES.map((m, i) => (
                <motion.div key={i} className="tl-mobile-row" {...fadeUp(i * 0.1)}>
                  {/* dot */}
                  <div className="tl-mobile-dot-col">
                    <div className="tl-mobile-dot" />
                  </div>
                  {/* card */}
                  <div className="tl-mobile-card-col">
                    <div className="timeline-card">
                      <div className="timeline-card-year">{m.year}</div>
                      <div className="timeline-card-title">{m.title}</div>
                      <p className="timeline-card-desc">{m.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;