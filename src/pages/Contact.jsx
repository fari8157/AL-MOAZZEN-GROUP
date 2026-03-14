import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  MessageCircle, Clock, ArrowRight, ChevronDown, Sparkles,
  Users, Globe, Calendar
} from 'lucide-react';
import { Particles, GoldDivider } from '../components/ui/shared';
import { NAV_BAR_H } from '../components/layout/Navbar';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

/* ── Country dial codes ── */
const DIAL_CODES = [
  { code: '+91',  country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
  { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar' },
  { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+973', country: 'BH', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+968', country: 'OM', flag: '🇴🇲', name: 'Oman' },
  { code: '+92',  country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+60',  country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+62',  country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+44',  country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1',   country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+61',  country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+27',  country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: '+20',  country: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: '+212', country: 'MA', flag: '🇲🇦', name: 'Morocco' },
  { code: '+90',  country: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: '+33',  country: 'FR', flag: '🇫🇷', name: 'France' },
  { code: '+49',  country: 'DE', flag: '🇩🇪', name: 'Germany' },
];

const inputStyle = {
  width: '100%', padding: '14px 18px', borderRadius: 14,
  border: '1.5px solid rgba(200,162,77,0.25)',
  background: 'rgba(250,246,238,0.6)',
  fontFamily: 'Cormorant Garamond,serif', fontSize: 16,
  color: '#1a1a1a', outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
  boxSizing: 'border-box',
};

const Field = ({ label, children, hint }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <label style={{
      fontFamily: 'Cinzel,serif', fontSize: 11, letterSpacing: '0.14em',
      textTransform: 'uppercase', color: '#1a4731', fontWeight: 600,
    }}>
      {label}
    </label>
    {children}
    {hint && <span style={{ fontSize: 12, color: '#9ca3af' }}>{hint}</span>}
  </div>
);

const STATS = [
  { value: '40+',  label: 'Countries Served',  icon: <Globe size={20} /> },
  { value: '24/7', label: 'Support Available',  icon: <Clock size={20} /> },
  { value: '30min',label: 'Response Time',      icon: <MessageCircle size={20} /> },
  { value: '50K+', label: 'Pilgrims Helped',    icon: <Users size={20} /> },
];

/* ════════════════════════════════════════ */
const Contact = () => {
  const heroRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '', email: '', dialCode: '+91', phone: '',
    country: '', travelDate: '', groupSize: '1-2', message: '',
  });
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState('idle');

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroBgY     = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const focusStyle = (name) => focused === name ? {
    ...inputStyle,
    borderColor: 'rgba(200,162,77,0.7)',
    boxShadow: '0 0 0 3px rgba(200,162,77,0.12)',
    background: 'white',
  } : inputStyle;

  const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwSRfWprUmp9yIfuGQ3w7hNNEnbfui9nKyWYNfQ24ZLbb3jijtpedyXMd5QAX3VLbqd/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus('success');
      setFormData({
        name: '', email: '', dialCode: '+91', phone: '',
        country: '', travelDate: '', groupSize: '1-2', message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ background: '#faf6ee', fontFamily: 'Cormorant Garamond,Georgia,serif' }}>

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

        .contact-hero-shimmer {
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

        .phone-group {
          display: flex;
          gap: 0;
          border-radius: 14px;
          overflow: hidden;
          border: 1.5px solid rgba(200,162,77,0.25);
          background: rgba(250,246,238,0.6);
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .phone-group.focused {
          border-color: rgba(200,162,77,0.7);
          box-shadow: 0 0 0 3px rgba(200,162,77,0.12);
          background: white;
        }
        .dial-select {
          padding: 14px 10px 14px 14px;
          background: transparent;
          border: none;
          border-right: 1.5px solid rgba(200,162,77,0.2);
          font-family: Cormorant Garamond, serif;
          font-size: 15px;
          color: #1a1a1a;
          cursor: pointer;
          outline: none;
          min-width: 90px;
          appearance: none;
        }
        .phone-input {
          flex: 1;
          padding: 14px 18px;
          background: transparent;
          border: none;
          font-family: Cormorant Garamond, serif;
          font-size: 16px;
          color: #1a1a1a;
          outline: none;
          min-width: 0;
        }

        @media (max-width: 900px) {
          .contact-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .hero-stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .name-email-grid  { grid-template-columns: 1fr !important; }
          .promise-grid     { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .promise-grid     { grid-template-columns: 1fr !important; }
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
        <motion.div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1800&auto=format&fit=crop)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          y: heroBgY, scale: 1.1,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom,rgba(10,28,18,0.78) 0%,rgba(10,28,18,0.55) 50%,rgba(10,28,18,0.88) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 40%, rgba(200,162,77,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 60%, rgba(26,71,49,0.3) 0%, transparent 50%)`,
          pointerEvents: 'none',
        }} />

        <motion.div style={{
          opacity: heroOpacity, position: 'relative', zIndex: 2,
          textAlign: 'center', padding: '0 24px', maxWidth: 900,
        }}>
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
              ✦ Contact Us ✦
            </span>
          </div>

          <div style={{ animation: 'hero-fade-up 0.8s ease forwards', animationDelay: '0.25s', opacity: 0 }}>
            <h1 style={{
              fontFamily: 'Cinzel, serif', fontSize: 'clamp(36px,6vw,78px)',
              fontWeight: 700, lineHeight: 1.1, color: '#ffffff', marginBottom: 12,
            }}>
              Begin Your
            </h1>
            <h1 style={{
              fontFamily: 'Cinzel, serif', fontSize: 'clamp(36px,6vw,78px)',
              fontWeight: 700, lineHeight: 1.1, marginBottom: 28,
            }}>
              <span className="contact-hero-shimmer">Sacred Journey</span>
            </h1>
          </div>

          <div style={{ animation: 'hero-fade-up 0.8s ease forwards', animationDelay: '0.4s', opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to right,transparent,#c8a24d)' }} />
              <div style={{ width: 7, height: 7, background: '#c8a24d', transform: 'rotate(45deg)', boxShadow: '0 0 8px rgba(200,162,77,0.8)' }} />
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to left,transparent,#c8a24d)' }} />
            </div>
          </div>

          <div style={{ animation: 'hero-fade-up 0.8s ease forwards', animationDelay: '0.5s', opacity: 0 }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(17px,2.2vw,22px)', fontStyle: 'italic',
              color: 'rgba(255,255,255,0.7)', lineHeight: 1.75,
              maxWidth: 620, margin: '0 auto 52px',
            }}>
              Serving pilgrims from over 40 countries worldwide. Reach out in any
              language — our multilingual team is here for you, around the clock.
            </p>
          </div>

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
                  fontFamily: 'Cinzel, serif', fontSize: 'clamp(18px,2vw,26px)',
                  fontWeight: 700, color: '#ffffff', lineHeight: 1,
                }}>
                  {s.value}
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
          2. MAIN CONTACT GRID
      ══════════════════════════════════ */}
      <section style={{ padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="islamic-bg" style={{ position: 'absolute', inset: 0, opacity: 0.12 }} />
        <div style={{
          position: 'absolute', top: -100, left: -100, width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(26,71,49,0.06) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '9px 26px', borderRadius: 999,
                border: '1px solid rgba(200,162,77,0.45)',
                background: 'rgba(200,162,77,0.08)',
                fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8a24d',
              }}>
                Reach Out
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Cinzel,serif', fontSize: 'clamp(26px,3.5vw,42px)',
              fontWeight: 700, color: '#1a4731', marginTop: 16,
            }}>
              We'd Love to{' '}
              <span style={{ color: '#c8a24d' }}>Hear From You</span>
            </h2>
            <GoldDivider />
          </motion.div>

          <div
            className="contact-main-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'start' }}
          >

            {/* ── LEFT: Info + Map ── */}
            <motion.div
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 22, fontWeight: 700, color: '#1a4731', marginBottom: 32 }}>
                Contact Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
                {[
                  {
                    icon: <MapPin size={22} />,
                    title: 'Our Office',
                    lines: ['Al-Moazzen Building, King Abdulaziz Road', 'Jeddah 23435, Saudi Arabia'],
                  },
                  {
                    icon: <Phone size={22} />,
                    title: 'Phone & WhatsApp',
                    lines: ['+966 50 123 4567 (24/7)', '+966 12 987 6543 (Office)'],
                  },
                  {
                    icon: <Mail size={22} />,
                    title: 'Email',
                    lines: ['info@almoazzengroup.sa', 'support@almoazzengroup.sa'],
                  },
                  {
                    icon: <Clock size={22} />,
                    title: 'Office Hours',
                    lines: ['Saturday – Thursday: 8:00 AM – 10:00 PM', 'Friday: 2:00 PM – 9:00 PM (KSA Time)'],
                  },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                    whileHover={{ x: 6 }}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 16,
                      padding: '20px 24px', borderRadius: 16,
                      background: 'white',
                      border: '1px solid rgba(200,162,77,0.15)',
                      boxShadow: '0 4px 20px rgba(26,71,49,0.05)',
                      transition: 'transform 0.25s', cursor: 'default',
                    }}
                  >
                    <div style={{
                      width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                      background: 'linear-gradient(135deg,rgba(26,71,49,0.08),rgba(200,162,77,0.1))',
                      border: '1px solid rgba(200,162,77,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#1a4731',
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'Cinzel,serif', fontSize: 11, letterSpacing: '0.14em',
                        textTransform: 'uppercase', color: '#c8a24d', marginBottom: 6,
                      }}>
                        {item.title}
                      </div>
                      {item.lines.map((line, j) => (
                        <div key={j} style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.6 }}>{line}</div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.5 }}
                style={{
                  borderRadius: 20, overflow: 'hidden', height: 260,
                  position: 'relative',
                  border: '1px solid rgba(200,162,77,0.2)',
                  boxShadow: '0 8px 40px rgba(26,71,49,0.1)',
                }}
              >
                <div style={{
                  position: 'absolute', top: 12, left: 12, zIndex: 1,
                  background: 'linear-gradient(135deg,#c8a24d,#e8c76a)',
                  padding: '5px 12px', borderRadius: 50,
                  fontFamily: 'Cinzel,serif', fontSize: 9.5,
                  letterSpacing: '0.14em', color: '#1a1a1a', fontWeight: 700,
                }}>
                  📍 Jeddah, Saudi Arabia
                </div>
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118830.3749448102!2d39.126079!3d21.543333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059573715102570!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1709470000000!5m2!1sen!2s"
                  style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
                  allowFullScreen="" loading="lazy"
                />
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 0.15 }}
              style={{
                background: 'white', borderRadius: 28, padding: '48px 44px',
                boxShadow: '0 24px 80px rgba(26,71,49,0.1),0 0 0 1px rgba(200,162,77,0.15)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: -60, right: -60, width: 200, height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle,rgba(200,162,77,0.08) 0%,transparent 70%)',
                pointerEvents: 'none',
              }} />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '40px 0' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                      style={{
                        width: 80, height: 80, borderRadius: '50%',
                        background: 'linear-gradient(135deg,rgba(26,71,49,0.1),rgba(200,162,77,0.1))',
                        border: '2px solid rgba(200,162,77,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px', color: '#1a4731',
                      }}
                    >
                      <CheckCircle size={36} />
                    </motion.div>
                    <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 22, fontWeight: 700, color: '#1a4731', marginBottom: 12 }}>
                      Message Received!
                    </h3>
                    <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.8, marginBottom: 32 }}>
                      Jazakallah Khair for reaching out. One of our pilgrimage specialists
                      will contact you within 30 minutes during office hours.
                    </p>
                    <div style={{
                      background: 'rgba(26,71,49,0.04)', borderRadius: 14, padding: '16px 20px',
                      marginBottom: 28, border: '1px solid rgba(200,162,77,0.15)',
                      fontSize: 14, color: '#4b5563', lineHeight: 1.7,
                    }}>
                      📱 For urgent enquiries, WhatsApp us directly at{' '}
                      <a href="https://wa.me/966501234567" style={{ color: '#1a4731', fontWeight: 600 }}>
                        +966 50 123 4567
                      </a>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setStatus('idle')}
                      style={{
                        padding: '12px 28px', borderRadius: 50, border: 'none',
                        background: 'linear-gradient(135deg,#c8a24d,#e8c76a)',
                        color: '#1a1a1a', fontFamily: 'Cinzel,serif',
                        fontSize: 12.5, fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer',
                      }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div style={{ marginBottom: 32 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <Sparkles size={16} style={{ color: '#c8a24d' }} />
                        <span style={{
                          fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: '0.2em',
                          textTransform: 'uppercase', color: '#c8a24d',
                        }}>
                          Free Consultation
                        </span>
                      </div>
                      <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 22, fontWeight: 700, color: '#1a4731', lineHeight: 1.3 }}>
                        Plan Your Umrah Journey
                      </h3>
                      <p style={{ fontSize: 15, color: '#9ca3af', marginTop: 8, lineHeight: 1.6 }}>
                        Fill in your details and we'll craft a personalised package proposal for you.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                      {/* Name + Email */}
                      <div className="name-email-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="Full Name">
                          <input
                            required type="text" placeholder="Ahmad Al-Rashid"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                            style={focusStyle('name')}
                          />
                        </Field>
                        <Field label="Email Address">
                          <input
                            required type="email" placeholder="ahmad@example.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                            style={focusStyle('email')}
                          />
                        </Field>
                      </div>

                      {/* Phone with international dial code */}
                      <Field label="Phone / WhatsApp" hint="Select your country code then enter your number">
                        <div
                          className={`phone-group ${focused === 'phone' || focused === 'dial' ? 'focused' : ''}`}
                        >
                          <select
                            value={formData.dialCode}
                            onChange={e => setFormData({ ...formData, dialCode: e.target.value })}
                            onFocus={() => setFocused('dial')} onBlur={() => setFocused(null)}
                            className="dial-select"
                          >
                            {DIAL_CODES.map(d => (
                              <option key={d.code + d.country} value={d.code}>
                                {d.flag} {d.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel" placeholder="Enter your number"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                            className="phone-input"
                          />
                        </div>
                      </Field>

                      {/* Country + Travel Date */}
                      <div className="name-email-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="Your Country">
                          <input
                            type="text" placeholder="e.g. India, Malaysia, UK…"
                            value={formData.country}
                            onChange={e => setFormData({ ...formData, country: e.target.value })}
                            onFocus={() => setFocused('country')} onBlur={() => setFocused(null)}
                            style={focusStyle('country')}
                          />
                        </Field>
                        <Field label="Preferred Travel Date">
                          <input
                            type="month" placeholder="MM/YYYY"
                            value={formData.travelDate}
                            onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
                            onFocus={() => setFocused('date')} onBlur={() => setFocused(null)}
                            style={focusStyle('date')}
                          />
                        </Field>
                      </div>

                      {/* Group Size */}
                      <Field label="Group Size" hint="We arrange packages for solo travellers to large groups">
                        <div style={{ position: 'relative' }}>
                          <select
                            value={formData.groupSize}
                            onChange={e => setFormData({ ...formData, groupSize: e.target.value })}
                            onFocus={() => setFocused('group')} onBlur={() => setFocused(null)}
                            style={{ ...focusStyle('group'), appearance: 'none', paddingRight: 44, cursor: 'pointer' }}
                          >
                            <option value="1">Solo Traveller (1 person)</option>
                            <option value="1-2">Couple (2 people)</option>
                            <option value="3-5">Small Family (3–5 people)</option>
                            <option value="6-10">Family Group (6–10 people)</option>
                            <option value="11-25">Community Group (11–25 people)</option>
                            <option value="26-50">Large Group (26–50 people)</option>
                            <option value="50+">Organisational Group (50+ people)</option>
                          </select>
                          <ChevronDown size={16} style={{
                            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                            color: '#c8a24d', pointerEvents: 'none',
                          }} />
                        </div>
                      </Field>

                      {/* Message */}
                      <Field label="Your Message / Requirements">
                        <textarea
                          rows={4}
                          placeholder="Tell us about your budget, special needs, accessibility requirements, preferred language of support…"
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                          style={{ ...focusStyle('message'), resize: 'vertical', minHeight: 110 }}
                        />
                      </Field>

                      {/* Error */}
                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.p
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{
                              fontSize: 14, color: '#dc2626', textAlign: 'center',
                              background: 'rgba(220,38,38,0.06)', borderRadius: 10,
                              padding: '10px 16px', border: '1px solid rgba(220,38,38,0.15)',
                            }}
                          >
                            Something went wrong. Please try again or call us directly.
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <motion.button
                        type="submit" disabled={status === 'loading'}
                        whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                        whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                        style={{
                          width: '100%', padding: '16px', borderRadius: 50, border: 'none',
                          background: status === 'loading'
                            ? 'rgba(200,162,77,0.5)'
                            : 'linear-gradient(135deg,#c8a24d 0%,#e8c76a 55%,#c8a24d 100%)',
                          color: '#1a1a1a', fontFamily: 'Cinzel,serif',
                          fontSize: 13.5, fontWeight: 700, letterSpacing: '0.06em',
                          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                          boxShadow: status === 'loading' ? 'none' : '0 8px 32px rgba(200,162,77,0.4)',
                          transition: 'all 0.3s',
                        }}
                      >
                        {status === 'loading' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#1a1a1a' }}
                            />
                            Sending Your Message…
                          </>
                        ) : (
                          <> Send Message <Send size={15} /> </>
                        )}
                      </motion.button>

                      <p style={{ textAlign: 'center', fontSize: 12.5, color: '#9ca3af', lineHeight: 1.6 }}>
                        🔒 Your information is secure and never shared with third parties.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
          3. WHAT HAPPENS NEXT
      ══════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg,#0f2d1e 0%,#1a4731 100%)',
        padding: '90px 40px', position: 'relative', overflow: 'hidden',
      }}>
        <div className="islamic-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <Particles count={8} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '9px 26px', borderRadius: 999,
                border: '1px solid rgba(200,162,77,0.5)',
                background: 'rgba(200,162,77,0.1)',
                fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8a24d',
              }}>
                Our Promise
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Cinzel,serif', fontSize: 'clamp(24px,3vw,38px)',
              fontWeight: 700, color: 'white', marginTop: 16,
            }}>
              What Happens When{' '}
              <span style={{
                background: 'linear-gradient(90deg,#8a6820,#c8a24d,#f0d98a,#c8a24d,#8a6820)',
                backgroundSize: '250% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                You Reach Out
              </span>
            </h2>
            <GoldDivider />
          </motion.div>

          <div
            className="promise-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 22 }}
          >
            {[
              { num: '01', title: 'Instant Acknowledgement', desc: 'You\'ll receive a confirmation message the moment your enquiry reaches us.' },
              { num: '02', title: 'Specialist Assigned',     desc: 'A dedicated pilgrimage specialist is assigned to your enquiry within minutes.' },
              { num: '03', title: 'Personalised Proposal',   desc: 'Within 24 hours, you\'ll receive a tailored Umrah plan with transparent pricing.' },
              { num: '04', title: 'No Pressure. Ever.',      desc: 'We guide, not push. Take all the time you need — your journey, your decision.' },
            ].map((step, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} whileHover={{ y: -6 }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(200,162,77,0.18)',
                  borderRadius: 20, padding: '32px 26px',
                  backdropFilter: 'blur(10px)', transition: 'transform 0.3s',
                }}
              >
                <div style={{
                  fontFamily: 'Cinzel,serif', fontSize: 28, fontWeight: 700,
                  color: 'rgba(200,162,77,0.2)', lineHeight: 1, marginBottom: 16,
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 10 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;