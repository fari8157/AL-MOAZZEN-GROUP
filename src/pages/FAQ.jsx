// src/pages/FAQ.jsx
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Plus, Minus, MessageCircle, Phone, Mail, ArrowRight,
  ShieldCheck, Clock, FileText, Plane, Hotel, Users, HelpCircle
} from 'lucide-react';
import { Particles, GoldDivider } from '../components/ui/shared';
import { NAV_BAR_H } from '../components/layout/Navbar';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

/* ── FAQ categories ── */
const CATEGORIES = [
  { id: 'all',      label: 'All Questions',  icon: <HelpCircle size={15} /> },
  { id: 'booking',  label: 'Booking & Visa', icon: <FileText size={15} /> },
  { id: 'packages', label: 'Packages',       icon: <Plane size={15} /> },
  { id: 'onground', label: 'On-Ground',      icon: <Hotel size={15} /> },
  { id: 'support',  label: 'Support',        icon: <Users size={15} /> },
];

const FAQS = [
  {
    cat: 'booking',
    q: 'How do I apply for an Umrah visa through Al-Moazzen?',
    a: 'It\'s completely handled by our team. Once you confirm your booking, we collect your passport scan, photo, and vaccination certificate (Meningitis is required). We submit everything to the Saudi consulate on your behalf. Standard processing takes 5–7 business days; express processing (included in Golden Grace & Royal Devotion) delivers approval within 48 hours in most cases.',
  },
  {
    cat: 'booking',
    q: 'What documents do I need to book?',
    a: 'You\'ll need a valid passport with at least 6 months validity from your travel date, a recent passport-sized photo, a Meningitis vaccination certificate, and for women under 45, a Mahram (male guardian) document. Our team walks you through every requirement step by step — no document is too confusing with us by your side.',
  },
  {
    cat: 'booking',
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 8–12 weeks in advance for standard travel periods, and 4–6 months ahead for Ramadan or Dhul Hijjah. Premium and Royal Devotion packages can sell out up to a year in advance due to limited hotel availability near the Haram. Early booking also locks in lower rates.',
  },
  {
    cat: 'packages',
    q: 'Can I customise my package?',
    a: 'Absolutely — every single package is fully customisable. You can upgrade your flight class, extend your stay in Makkah or Madinah, add private guided tours, include extra family members at adjusted rates, or build an entirely bespoke itinerary from scratch. Contact our team for a free personalised quote.',
  },
  {
    cat: 'packages',
    q: 'Are the prices per person or per group?',
    a: 'All listed prices are per person, based on double occupancy. Solo traveller rates, family group discounts, and private party rates are all available — call us for a tailored quote. Children under 12 travelling with a guardian receive discounted pricing across all tiers.',
  },
  {
    cat: 'packages',
    q: 'What is included in all packages?',
    a: 'Every Al-Moazzen package — regardless of tier — includes full Umrah visa processing, accommodation, return flights, airport transfers, an Ihram kit, spiritual guidance during rituals, and 24/7 on-ground support. There are zero hidden fees; everything is transparently itemised in your confirmation.',
  },
  {
    cat: 'onground',
    q: 'What is a Mutawwif and is one provided?',
    a: 'A Mutawwif is a licensed Umrah guide who accompanies you through the rituals — Tawaf, Sa\'i, and all obligatory acts — explaining their spiritual significance and ensuring you perform them correctly. All our packages include group Mutawwif services; Golden Grace and Royal Devotion offer private, dedicated guides throughout your entire stay.',
  },
  {
    cat: 'onground',
    q: 'How close are the hotels to Al-Masjid Al-Haram?',
    a: 'Our Silver Serenity hotels are within 500m of Al-Haram (approximately a 5–8 minute walk). Golden Grace properties are within 200m. Royal Devotion guests stay in Royal Suites directly adjoining the Haram complex — some rooms offer direct views of the Kaaba. All hotels are carefully vetted by our team every season.',
  },
  {
    cat: 'onground',
    q: 'What happens if I fall ill during my journey?',
    a: 'All packages include comprehensive pilgrimage travel insurance covering medical emergencies. Our 24/7 on-ground support team can arrange immediate medical assistance, hospital transport, or emergency repatriation if needed. We also have partnerships with English-speaking medical facilities in both Makkah and Madinah.',
  },
  {
    cat: 'support',
    q: 'How does 24/7 support work?',
    a: 'From the moment you book until you arrive home, our dedicated team is reachable via WhatsApp, phone, and email — round the clock. Royal Devotion guests also receive a personal WhatsApp line directly to their dedicated concierge. No query is too small; no hour is too late.',
  },
  {
    cat: 'support',
    q: 'What is your cancellation and refund policy?',
    a: 'Cancellations made 60+ days before departure receive a full refund minus visa processing fees. 30–59 days: 75% refund. 15–29 days: 50% refund. Under 14 days: non-refundable. We strongly recommend purchasing our travel protection add-on, which provides flexibility for unforeseen circumstances including medical emergencies.',
  },
  {
    cat: 'support',
    q: 'Do you offer group bookings for mosques or organisations?',
    a: 'Yes — group Umrah is one of our specialties. We regularly organise group journeys for mosques, Islamic centres, and organisations ranging from 10 to 500+ pilgrims. Group bookings receive dedicated coordinators, preferential pricing, and completely tailored itineraries. Contact our group desk for a consultation.',
  },
];

const STATS = [
  { value: 12,  suffix: '+', label: 'FAQ Topics'       },
  { value: 24,  suffix: '/7', label: 'Support Hours'   },
  { value: 2,   suffix: 'hr', label: 'Email Response'  },
  { value: 99,  suffix: '%', label: 'Issues Resolved'  },
];

/* ════════════════════════════════════════ */
const FAQ = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroBgY     = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filtered = activeCategory === 'all'
    ? FAQS
    : FAQS.filter(f => f.cat === activeCategory);

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

        .faq-hero-shimmer {
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

        @media (max-width: 768px) {
          .hero-stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .contact-grid     { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .contact-grid     { grid-template-columns: 1fr !important; }
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
        {/* Parallax BG — Kaaba Makkah */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1800&auto=format&fit=crop)',
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
          backgroundImage: `radial-gradient(circle at 25% 35%, rgba(200,162,77,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 75% 65%, rgba(26,71,49,0.3) 0%, transparent 50%)`,
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
              ✦ Help & FAQs ✦
            </span>
          </div>

          {/* Heading */}
          <div style={{ animation: 'hero-fade-up 0.8s ease forwards', animationDelay: '0.25s', opacity: 0 }}>
            <h1 style={{
              fontFamily: 'Cinzel, serif', fontSize: 'clamp(36px,6vw,78px)',
              fontWeight: 700, lineHeight: 1.1, color: '#ffffff', marginBottom: 12,
            }}>
              Got Questions?
            </h1>
            <h1 style={{
              fontFamily: 'Cinzel, serif', fontSize: 'clamp(36px,6vw,78px)',
              fontWeight: 700, lineHeight: 1.1, marginBottom: 28,
            }}>
              <span className="faq-hero-shimmer">We Have Answers</span>
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
              Everything you need to know about Umrah visa, packages, on-ground
              support, and more — answered by our pilgrimage specialists.
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
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px,2.5vw,30px)',
                  fontWeight: 700, color: '#ffffff', lineHeight: 1,
                }}>
                  {s.value}{s.suffix}
                </div>
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 9.5, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 8,
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
          2. FAQ ACCORDION
      ══════════════════════════════════ */}
      <section style={{ padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="islamic-bg" style={{ position: 'absolute', inset: 0, opacity: 0.12 }} />
        <div style={{
          position: 'absolute', top: -100, right: -100, width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(200,162,77,0.06) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 920, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '9px 26px', borderRadius: 999,
                border: '1px solid rgba(200,162,77,0.45)',
                background: 'rgba(200,162,77,0.08)',
                fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8a24d',
              }}>
                Common Questions
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Cinzel,serif', fontSize: 'clamp(26px,3.5vw,42px)',
              fontWeight: 700, color: '#1a4731', marginTop: 16,
            }}>
              Frequently Asked{' '}
              <span style={{ color: '#c8a24d' }}>Questions</span>
            </h2>
            <GoldDivider />
          </motion.div>

          {/* Category tabs */}
          <motion.div {...fadeUp(0.1)} style={{
            display: 'flex', gap: 8, flexWrap: 'wrap',
            justifyContent: 'center', marginBottom: 56,
          }}>
            {CATEGORIES.map(cat => (
              <motion.button key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '9px 20px', borderRadius: 50, cursor: 'pointer',
                  fontFamily: 'Cinzel,serif', fontSize: 11.5, fontWeight: 600,
                  letterSpacing: '0.08em',
                  border: activeCategory === cat.id ? 'none' : '1px solid rgba(200,162,77,0.25)',
                  background: activeCategory === cat.id
                    ? 'linear-gradient(135deg,#1a4731,#2d6e50)'
                    : 'white',
                  color: activeCategory === cat.id ? 'white' : '#4b5563',
                  boxShadow: activeCategory === cat.id
                    ? '0 6px 20px rgba(26,71,49,0.2)'
                    : '0 2px 8px rgba(26,71,49,0.05)',
                  transition: 'all 0.25s',
                }}
              >
                <span style={{ color: activeCategory === cat.id ? '#c8a24d' : '#1a4731' }}>
                  {cat.icon}
                </span>
                {cat.label}
                <span style={{
                  background: activeCategory === cat.id ? 'rgba(200,162,77,0.25)' : 'rgba(26,71,49,0.08)',
                  borderRadius: 50, padding: '1px 8px', fontSize: 10,
                  color: activeCategory === cat.id ? '#f0dfa0' : '#6b7280',
                }}>
                  {(cat.id === 'all' ? FAQS : FAQS.filter(f => f.cat === cat.id)).length}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* FAQ items */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {filtered.map((faq, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16,1,0.3,1] }}
                  style={{
                    background: 'white',
                    borderRadius: 18,
                    marginBottom: 12,
                    border: openIndex === i
                      ? '1px solid rgba(200,162,77,0.4)'
                      : '1px solid rgba(200,162,77,0.12)',
                    boxShadow: openIndex === i
                      ? '0 12px 48px rgba(26,71,49,0.1)'
                      : '0 2px 16px rgba(26,71,49,0.04)',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    style={{
                      width: '100%', display: 'flex',
                      alignItems: 'center', justifyContent: 'space-between',
                      gap: 20, padding: '24px 28px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flex: 1 }}>
                      <span style={{
                        fontFamily: 'Cinzel,serif', fontSize: 11,
                        color: openIndex === i ? '#c8a24d' : 'rgba(200,162,77,0.4)',
                        fontWeight: 700, letterSpacing: '0.1em', marginTop: 2, flexShrink: 0,
                        transition: 'color 0.25s',
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontFamily: 'Cinzel,serif', fontSize: 15.5, fontWeight: 600,
                        color: openIndex === i ? '#1a4731' : '#374151',
                        lineHeight: 1.4, transition: 'color 0.25s',
                      }}>
                        {faq.q}
                      </span>
                    </div>

                    <motion.div
                      animate={{
                        rotate: openIndex === i ? 45 : 0,
                        background: openIndex === i
                          ? 'linear-gradient(135deg,#c8a24d,#e8c76a)'
                          : 'rgba(26,71,49,0.06)',
                      }}
                      transition={{ duration: 0.28 }}
                      style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: openIndex === i ? 'none' : '1px solid rgba(200,162,77,0.2)',
                      }}
                    >
                      <Plus size={15} style={{ color: openIndex === i ? '#1a1a1a' : '#1a4731' }} />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '0 28px 26px 68px',
                          borderTop: '1px solid rgba(200,162,77,0.1)',
                          paddingTop: 20,
                        }}>
                          <p style={{ fontSize: 16, color: '#4b5563', lineHeight: 1.85 }}>
                            {faq.a}
                          </p>
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: 8, marginTop: 18,
                            fontSize: 13, color: '#9ca3af',
                          }}>
                            <span>Still have questions?</span>
                            <a href="#contact" style={{
                              color: '#c8a24d', fontFamily: 'Cinzel,serif',
                              fontSize: 12, fontWeight: 600, textDecoration: 'none',
                              letterSpacing: '0.06em',
                              display: 'flex', alignItems: 'center', gap: 4,
                            }}>
                              Ask us directly <ArrowRight size={11} />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>


      {/* ══════════════════════════════════
          3. STILL NEED HELP
      ══════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg,#0f2d1e 0%,#1a4731 100%)',
        padding: '100px 40px', position: 'relative', overflow: 'hidden',
      }}>
        <div className="islamic-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <Particles count={10} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 72 }}>

            {/* inline label — no SectionLabel symbol bug */}
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '9px 26px', borderRadius: 999,
                border: '1px solid rgba(200,162,77,0.5)',
                background: 'rgba(200,162,77,0.1)',
                fontFamily: 'Cinzel, serif', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c8a24d',
              }}>
                Still Need Help?
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Cinzel,serif', fontSize: 'clamp(26px,3.5vw,42px)',
              fontWeight: 700, color: 'white', marginTop: 16,
            }}>
              Our Team is{' '}
              <span style={{
                background: 'linear-gradient(90deg,#8a6820,#c8a24d,#f0d98a,#c8a24d,#8a6820)',
                backgroundSize: '250% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Always Here
              </span>
            </h2>
            <GoldDivider />
            <p style={{
              fontSize: 17, color: 'rgba(255,255,255,0.55)',
              maxWidth: 500, margin: '20px auto 0', lineHeight: 1.8,
            }}>
              Can't find what you're looking for? Reach out directly — a real
              pilgrimage specialist will respond within minutes.
            </p>
          </motion.div>

          <div
            className="contact-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24 }}
          >
            {[
              {
                icon: <Phone size={26} />,
                title: 'Call Us',
                value: '+966 50 123 4567',
                note: 'Available 24/7',
                action: 'Call Now',
                href: 'tel:+966501234567',
              },
              {
                icon: <MessageCircle size={26} />,
                title: 'WhatsApp',
                value: '+966 50 123 4567',
                note: 'Instant replies',
                action: 'Open WhatsApp',
                href: 'https://wa.me/966501234567',
              },
              {
                icon: <Mail size={26} />,
                title: 'Email Us',
                value: 'info@almoazzengroup.sa',
                note: 'Reply within 2 hours',
                action: 'Send Email',
                href: 'mailto:info@almoazzengroup.sa',
              },
              {
                icon: <Clock size={26} />,
                title: 'Office Hours',
                value: 'Sat–Thu, 8am–10pm',
                note: 'KSA Time (UTC+3)',
                action: null,
                href: null,
              },
            ].map((card, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                whileHover={{ y: -6 }}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(200,162,77,0.18)',
                  borderRadius: 22, padding: '36px 30px',
                  backdropFilter: 'blur(12px)',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                }}
              >
                <div style={{
                  width: 58, height: 58, borderRadius: '50%',
                  background: 'rgba(200,162,77,0.12)',
                  border: '1px solid rgba(200,162,77,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#c8a24d', margin: '0 auto 18px',
                }}>
                  {card.icon}
                </div>
                <div style={{
                  fontFamily: 'Cinzel,serif', fontSize: 10, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8,
                }}>
                  {card.title}
                </div>
                <div style={{
                  fontFamily: 'Cinzel,serif', fontSize: 15, fontWeight: 700,
                  color: 'white', marginBottom: 6,
                }}>
                  {card.value}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
                  {card.note}
                </div>
                {card.action && (
                  <a href={card.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '9px 20px', borderRadius: 50,
                    background: 'linear-gradient(135deg,#c8a24d,#e8c76a)',
                    color: '#1a1a1a', fontFamily: 'Cinzel,serif',
                    fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em',
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(200,162,77,0.3)',
                  }}>
                    {card.action} <ArrowRight size={11} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQ;