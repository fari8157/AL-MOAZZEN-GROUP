import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Hotel, Plane, Calendar, User, CheckCircle2, Star,
  ArrowRight, Phone, ShieldCheck, Crown, Sparkles, ChevronDown,
  Users, FileCheck, Headphones
} from 'lucide-react';
import { Particles, GoldDivider, AnimatedCounter } from '../components/ui/shared';
import { NAV_BAR_H } from '../components/layout/Navbar';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

/* ── Clean label — works on both light & dark backgrounds ── */
const Label = ({ light = false, children }) => (
  <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '9px 26px', borderRadius: 999,
      border: `1px solid ${light ? 'rgba(200,162,77,0.5)' : 'rgba(200,162,77,0.45)'}`,
      background: light ? 'rgba(200,162,77,0.12)' : 'rgba(200,162,77,0.08)',
      fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 600,
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: '#c8a24d',
    }}>
      {children}
    </span>
  </div>
);

/* ── data ── */
const PACKAGES = [
  {
    tier:     'Silver Serenity',
    label:    'Economy',
    price:    '1,299',
    currency: 'SAR',
    duration: '10 Days',
    badge:    null,
    color:    '#6b7280',
    gradient: 'linear-gradient(135deg,#4b5563,#6b7280)',
    hotel:    '4-Star Hotel, 500m from Haram',
    flight:   'Economy Class',
    transport:'Shared Coach Transfers',
    icon:     <Star size={22} />,
    includes: [
      'Umrah Visa Processing',
      'Economy Class Return Flights',
      'Shared Air-Conditioned Coach',
      '4-Star Hotel Accommodation',
      'Breakfast & Dinner Daily',
      'Group Guided Ziyarat Tour',
      '24/7 Group Support',
      'Ihram & Welcome Kit',
    ],
    notIncluded: ['Private Guide', 'Business Class', 'Private Transfer'],
  },
  {
    tier:     'Golden Grace',
    label:    'Premium',
    price:    '2,499',
    currency: 'SAR',
    duration: '14 Days',
    badge:    'Most Popular',
    color:    '#c8a24d',
    gradient: 'linear-gradient(135deg,#c8a24d,#e8c76a)',
    hotel:    '5-Star Hotel, 200m from Haram',
    flight:   'Economy Plus Class',
    transport:'Private Sedan Transfers',
    icon:     <Sparkles size={22} />,
    includes: [
      'Umrah Visa Express Processing',
      'Economy Plus Return Flights',
      'Private Sedan Transfers',
      '5-Star Hotel Accommodation',
      'Full Board (3 Meals Daily)',
      'Private Guided Ziyarat Tours',
      'Dedicated Personal Support',
      'Premium Ihram & Gift Hamper',
      'Makkah ↔ Madinah Transfer',
      'Prayer Time Scheduling',
    ],
    notIncluded: ['Business Class', 'Royal Suite'],
  },
  {
    tier:     'Royal Devotion',
    label:    'VIP',
    price:    '4,999',
    currency: 'SAR',
    duration: '21 Days',
    badge:    'Ultimate',
    color:    '#1a4731',
    gradient: 'linear-gradient(135deg,#1a4731,#2d6e50)',
    hotel:    'Royal Suite, Steps from Haram',
    flight:   'Business Class',
    transport:'Private Luxury SUV 24/7',
    icon:     <Crown size={22} />,
    includes: [
      'Umrah Visa Priority Processing',
      'Business Class Return Flights',
      'Private Luxury SUV 24/7',
      'Royal Suite Hotel — Steps from Haram',
      'Personal Chef & Bespoke Dining',
      'Dedicated Personal Mutawwif',
      'Private Scholar-Led Sessions',
      'Fast-Track Tawaf Scheduling',
      'Exclusive Prayer Area Access',
      'Royal Ihram Kit & Luxury Gifts',
      'Post-Trip Spiritual Debrief',
      'Lifetime Alumni Membership',
    ],
    notIncluded: [],
  },
];

const FAQS = [
  { q: 'When is the best time to perform Umrah?', a: 'Umrah can be performed at any time of the year, unlike Hajj. The most spiritually rewarding periods are Ramadan, Dhul Hijjah, and the cooler winter months (November–February) for greater comfort.' },
  { q: 'How long does visa processing take?', a: 'Standard processing takes 5–7 business days. Our Express service (included in Golden Grace & Royal Devotion) delivers approval within 48 hours in most cases.' },
  { q: 'Can I customise my package?', a: 'Absolutely. Every package is fully customisable — upgrade your flight class, extend your stay, add private guided tours, or include family members with adjusted pricing.' },
  { q: 'Is the price per person?', a: 'Yes, all prices listed are per person based on double occupancy. Solo traveller and family group rates are available upon request.' },
  { q: 'What documents do I need for the visa?', a: 'A valid passport (min. 6 months validity), recent passport photo, vaccination certificate (Meningitis required), and for women under 45, a Mahram document. We guide you through every requirement.' },
];

const STATS = [
  { value: 3,     suffix: '',   label: 'Package Tiers',    icon: <Star size={20} /> },
  { value: 50000, suffix: '+',  label: 'Pilgrims Served',  icon: <Users size={20} /> },
  { value: 99,    suffix: '%',  label: 'Visa Approval',    icon: <FileCheck size={20} /> },
  { value: 24,    suffix: '/7', label: 'Support',          icon: <Headphones size={20} /> },
];

/* ── inline Car icon (not in lucide) ── */
const Car = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v4a2 2 0 0 1-2 2h-2"/>
    <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
  </svg>
);

/* ════════════════════════════════════════ */
const Packages = () => {
  useTranslation();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroBgY     = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div style={{ background: '#faf6ee', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>

      <style>{`
        @keyframes hero-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(6px); opacity: 1; }
        }

        .pkg-hero-shimmer {
          background: linear-gradient(90deg,#8a6820 0%,#c8a24d 30%,#f0d98a 50%,#c8a24d 70%,#8a6820 100%);
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

        .faq-item {
          border: 1px solid rgba(200,162,77,0.2);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 14px;
          background: white;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .faq-item:hover {
          border-color: rgba(200,162,77,0.45);
          box-shadow: 0 8px 32px rgba(26,71,49,0.06);
        }
        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 28px;
          cursor: pointer;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .hero-stats-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .packages-grid     { grid-template-columns: 1fr !important; }
          .always-inc-grid   { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .always-inc-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>


      {/* ══════════════════════════════════
          1. HERO
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

        {/* Overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom,rgba(10,28,18,0.78) 0%,rgba(10,28,18,0.55) 50%,rgba(10,28,18,0.88) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(200,162,77,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 70% 70%, rgba(26,71,49,0.3) 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <motion.div style={{
          opacity: heroOpacity, position: 'relative', zIndex: 2,
          textAlign: 'center', padding: '0 24px', maxWidth: 900,
        }}>
          {/* Badge */}
          <div style={{ animation: 'hero-fade-up 0.8s ease forwards', animationDelay: '0.1s', opacity: 0, marginBottom: 24 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '9px 26px', borderRadius: 999,
              border: '1px solid rgba(200,162,77,0.5)',
              background: 'rgba(200,162,77,0.1)',
              fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#c8a24d', backdropFilter: 'blur(8px)',
            }}>
              ✦ Umrah Packages ✦
            </span>
          </div>

          {/* Heading */}
          <div style={{ animation: 'hero-fade-up 0.8s ease forwards', animationDelay: '0.25s', opacity: 0 }}>
            <h1 style={{
              fontFamily: 'Cinzel, serif', fontSize: 'clamp(36px,6vw,78px)',
              fontWeight: 700, lineHeight: 1.1, color: '#ffffff', marginBottom: 12,
            }}>
              Your Journey,
            </h1>
            <h1 style={{
              fontFamily: 'Cinzel, serif', fontSize: 'clamp(36px,6vw,78px)',
              fontWeight: 700, lineHeight: 1.1, marginBottom: 28,
            }}>
              <span className="pkg-hero-shimmer">Your Package</span>
            </h1>
          </div>

          {/* Divider */}
          <div style={{ animation: 'hero-fade-up 0.8s ease forwards', animationDelay: '0.4s', opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to right,transparent,#c8a24d)' }} />
              <div style={{ width: 7, height: 7, background: '#c8a24d', transform: 'rotate(45deg)', boxShadow: '0 0 8px rgba(200,162,77,0.8)' }} />
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to left,transparent,#c8a24d)' }} />
            </div>
          </div>

          {/* Subtitle */}
          <div style={{ animation: 'hero-fade-up 0.8s ease forwards', animationDelay: '0.5s', opacity: 0 }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(17px,2.2vw,22px)', fontStyle: 'italic',
              color: 'rgba(255,255,255,0.7)', lineHeight: 1.75,
              maxWidth: 620, margin: '0 auto 52px',
            }}>
              Three tiers of Umrah excellence — each fully customisable to your
              budget, timeline, and spiritual aspirations.
            </p>
          </div>

          {/* Stats */}
          <div
            className="hero-stats-grid"
            style={{
              animation: 'hero-fade-up 0.8s ease forwards', animationDelay: '0.65s', opacity: 0,
              display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
              gap: 16, maxWidth: 780, margin: '0 auto',
            }}
          >
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat-card">
                <div style={{ color: '#c8a24d', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                  {s.icon}
                </div>
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 'clamp(20px,2.5vw,28px)',
                  fontWeight: 700, color: '#ffffff', lineHeight: 1,
                }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 9.5, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 6,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
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
          2. PACKAGE CARDS
      ══════════════════════════════════ */}
      <section style={{ padding: '110px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%,rgba(200,162,77,0.06) 0%,transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="islamic-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 80 }}>
            <Label>Compare Plans</Label>
            <h2 style={{
              fontFamily: 'Cinzel,serif', fontSize: 'clamp(26px,3.5vw,42px)',
              fontWeight: 700, color: '#1a4731', marginTop: 16,
            }}>
              Find Your Perfect{' '}
              <span style={{ color: '#c8a24d' }}>Umrah Package</span>
            </h2>
            <GoldDivider />
            <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 560, margin: '20px auto 0', lineHeight: 1.8 }}>
              All packages include visa processing, accommodation, and full on-ground support.
              Every journey is fully customisable to your needs.
            </p>
          </motion.div>

          {/* Cards */}
          <div
            className="packages-grid"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              gap: 28, alignItems: 'end',
            }}
          >
            {PACKAGES.map((pkg, i) => {
              const isFeatured = i === 1;
              return (
                <motion.div key={i}
                  {...fadeUp(i * 0.12)}
                  whileHover={{ y: isFeatured ? -6 : -10 }}
                  style={{
                    borderRadius: 24, overflow: 'hidden',
                    boxShadow: isFeatured
                      ? '0 32px 80px rgba(200,162,77,0.2),0 0 0 2px rgba(200,162,77,0.4)'
                      : '0 16px 48px rgba(26,71,49,0.08)',
                    background: 'white',
                    marginTop: isFeatured ? 0 : 24,
                    transition: 'transform 0.3s,box-shadow 0.3s',
                    position: 'relative',
                  }}
                >
                  {/* Popular badge */}
                  {pkg.badge && (
                    <div style={{
                      position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                      background: pkg.gradient,
                      padding: '6px 20px', borderRadius: '0 0 14px 14px',
                      fontFamily: 'Cinzel,serif', fontSize: 9.5,
                      letterSpacing: '0.18em', color: i === 1 ? '#1a1a1a' : 'white',
                      fontWeight: 700, textTransform: 'uppercase', zIndex: 2,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      whiteSpace: 'nowrap',
                    }}>
                      ✦ {pkg.badge} ✦
                    </div>
                  )}

                  {/* Header */}
                  <div style={{
                    background: pkg.gradient,
                    padding: pkg.badge ? '40px 32px 28px' : '28px 32px',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', top: -20, right: -20,
                      width: 120, height: 120, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                    }} />
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
                      color: i === 1 ? '#1a1a1a' : 'rgba(255,255,255,0.9)',
                    }}>
                      {pkg.icon}
                      <span style={{ fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                        {pkg.label}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'Cinzel,serif', fontSize: 22, fontWeight: 700,
                      color: i === 1 ? '#1a1a1a' : 'white', marginBottom: 16, lineHeight: 1.2,
                    }}>
                      {pkg.tier}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{
                        fontFamily: 'Cinzel,serif', fontSize: 36, fontWeight: 700,
                        color: i === 1 ? '#1a1a1a' : 'white', lineHeight: 1,
                      }}>
                        {pkg.currency} {pkg.price}
                      </span>
                      <span style={{ fontSize: 13, color: i === 1 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)' }}>
                        / person
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
                      {[
                        { icon: <Calendar size={13} />, text: pkg.duration },
                        { icon: <Plane size={13} />, text: pkg.flight },
                      ].map((item, j) => (
                        <div key={j} style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          color: i === 1 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
                          fontSize: 12.5,
                        }}>
                          {item.icon} {item.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '28px 32px' }}>
                    {/* Highlights */}
                    <div style={{
                      background: 'rgba(26,71,49,0.04)', borderRadius: 12,
                      padding: '14px 18px', marginBottom: 24,
                      border: '1px solid rgba(200,162,77,0.15)',
                    }}>
                      {[
                        { icon: <Hotel size={14} />, text: pkg.hotel },
                        { icon: <Car size={14} />, text: pkg.transport },
                      ].map((item, j) => (
                        <div key={j} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          fontSize: 13.5, color: '#4b5563', marginBottom: j === 0 ? 8 : 0,
                        }}>
                          <span style={{ color: '#1a4731' }}>{item.icon}</span>
                          {item.text}
                        </div>
                      ))}
                    </div>

                    {/* Includes */}
                    <div style={{ marginBottom: 24 }}>
                      <div style={{
                        fontFamily: 'Cinzel,serif', fontSize: 10.5, letterSpacing: '0.16em',
                        textTransform: 'uppercase', color: '#1a4731', marginBottom: 14,
                      }}>
                        What's Included
                      </div>
                      {pkg.includes.map((item, j) => (
                        <div key={j} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          marginBottom: 9, fontSize: 14, color: '#374151',
                        }}>
                          <CheckCircle2 size={14} style={{ color: '#1a4731', flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                      {pkg.notIncluded.map((item, j) => (
                        <div key={j} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          marginBottom: 9, fontSize: 14, color: '#9ca3af',
                        }}>
                          <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid #d1d5db', flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      style={{
                        width: '100%', padding: '14px', borderRadius: 50, border: 'none',
                        background: isFeatured
                          ? 'linear-gradient(135deg,#c8a24d,#e8c76a)'
                          : 'linear-gradient(135deg,#1a4731,#2d6e50)',
                        color: isFeatured ? '#1a1a1a' : 'white',
                        fontFamily: 'Cinzel,serif', fontSize: 13, fontWeight: 700,
                        letterSpacing: '0.06em', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        boxShadow: isFeatured
                          ? '0 8px 28px rgba(200,162,77,0.4)'
                          : '0 8px 28px rgba(26,71,49,0.25)',
                      }}
                    >
                      Book / Enquire <ArrowRight size={14} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Customise note */}
          <motion.p {...fadeUp(0.3)} style={{
            textAlign: 'center', fontSize: 15, color: '#9ca3af',
            marginTop: 40, fontStyle: 'italic',
          }}>
            ✦ All packages are fully customisable — speak to us to tailor every detail to your needs ✦
          </motion.p>
        </div>
      </section>


      {/* ══════════════════════════════════
          3. ALWAYS INCLUDED
      ══════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg,#0f2d1e 0%,#1a4731 100%)',
        padding: '100px 40px', position: 'relative', overflow: 'hidden',
      }}>
        <div className="islamic-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <Particles count={10} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 72 }}>

            {/* inline label for dark section */}
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '9px 26px', borderRadius: 999,
                border: '1px solid rgba(200,162,77,0.5)',
                background: 'rgba(200,162,77,0.1)',
                fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8a24d',
              }}>
                Every Package
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Cinzel,serif', fontSize: 'clamp(26px,3.5vw,42px)',
              fontWeight: 700, color: 'white', marginTop: 16,
            }}>
              Always{' '}
              <span style={{
                background: 'linear-gradient(90deg,#8a6820,#c8a24d,#f0d98a,#c8a24d,#8a6820)',
                backgroundSize: '250% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Included
              </span>
            </h2>
            <GoldDivider />
          </motion.div>

          <div
            className="always-inc-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}
          >
            {[
              { icon: '🛂', title: 'Visa Processing',    desc: 'End-to-end Umrah visa handling with near-100% approval rate.' },
              { icon: '🕋', title: 'Spiritual Guidance', desc: 'Group or personal Mutawwif guidance for all rituals and Ziyarat.' },
              { icon: '📱', title: '24/7 Support',        desc: 'WhatsApp, phone & on-ground support throughout your journey.' },
              { icon: '🛡️', title: 'Travel Insurance',   desc: 'Comprehensive pilgrimage travel insurance included in all tiers.' },
              { icon: '🎁', title: 'Welcome Package',     desc: 'Ihram kit, prayer mat, supplication booklet, and essentials bag.' },
              { icon: '🤝', title: 'No Hidden Fees',      desc: 'Transparent pricing — everything listed is everything you pay.' },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}
                whileHover={{ y: -6, background: 'rgba(255,255,255,0.1)' }}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(200,162,77,0.18)',
                  borderRadius: 20, padding: '32px 26px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 10 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      

    </div>
  );
};

export default Packages;