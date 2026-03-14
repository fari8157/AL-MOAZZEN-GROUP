// src/components/home/WhyChooseUs.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, ShieldCheck, Headphones } from 'lucide-react';
import { GoldDivider } from '../ui/shared';

/* ─── Entrance variants ───────────────────────────────────────── */

const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.75, ease: 'easeOut', delay },
  }),
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1], delay },
  }),
};

/* ─── Component ───────────────────────────────────────────────── */

const WhyChooseUs = () => {

  const features = [
    {
      icon: <Plane size={28} />,
      title: "Easy Travel Arrangements",
      desc: "We handle flights, visa processing, and transport so your Umrah journey begins with complete peace of mind."
    },
    {
      icon: <Hotel size={28} />,
      title: "Premium Hotel Accommodation",
      desc: "Stay in carefully selected hotels near the Haram, ensuring comfort, convenience, and spiritual focus."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Trusted & Reliable Service",
      desc: "With years of experience guiding pilgrims, we provide a safe, transparent, and well-organized Umrah experience."
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Pilgrim Support",
      desc: "Our dedicated support team is available around the clock to assist you throughout your journey."
    },
  ];

  return (
    <section className="wcu-section mesh-bg">

      <style>{`

        /* ─── BASE ────────────────────────────────────────────────── */

        .wcu-section {
          padding: 90px 24px;
          position: relative;
          overflow: hidden;
        }

        .wcu-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .wcu-header {
          text-align: center;
          margin-bottom: 64px;
        }

        /* label badge */
        .wcu-label-wrap {
          margin-bottom: 20px;
        }

        .wcu-label-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 28px;
          border-radius: 999px;
          border: 1px solid rgba(200,162,77,0.45);
          background: rgba(200,162,77,0.07);
        }

        /* heading */
        .wcu-heading {
          font-size: clamp(30px, 4vw, 50px);
          font-weight: 700;
          color: #1a4731;
          line-height: 1.15;
          margin-bottom: 8px;
        }

        /* subtitle */
        .wcu-subtitle {
          font-size: 17px;
          font-style: italic;
          color: #6b7280;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.75;
        }

        /* cards grid */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        /* card */
        .wcu-card {
          background: white;
          border-radius: 24px;
          padding: 36px;
          border: 1px solid rgba(200,162,77,0.1);
          box-shadow: 0 4px 24px rgba(26,71,49,0.06);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition:
            transform       0.38s cubic-bezier(0.22,1,0.36,1),
            box-shadow      0.38s cubic-bezier(0.22,1,0.36,1),
            border-color    0.3s ease,
            background      0.3s ease;
        }

        /* lift + gold glow on hover */
        .wcu-card:hover {
          transform: translateY(-14px) scale(1.025);
          box-shadow:
            0 24px 48px rgba(26,71,49,0.13),
            0 0 0 1px rgba(200,162,77,0.35),
            0 0 32px rgba(200,162,77,0.12);
          border-color: rgba(200,162,77,0.4);
          background: linear-gradient(160deg, #ffffff 60%, rgba(200,162,77,0.04) 100%);
        }

        /* top gold bar — grows on hover */
        .wcu-card-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c8a24d, transparent);
          opacity: 0.7;
          transform: scaleX(0.4);
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
        }

        .wcu-card:hover .wcu-card-bar {
          transform: scaleX(1);
          opacity: 1;
        }

        /* shimmer sweep pseudo-element */
        .wcu-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(200,162,77,0.07) 45%,
            rgba(248,230,150,0.12) 50%,
            rgba(200,162,77,0.07) 55%,
            transparent 100%
          );
          background-size: 250% 100%;
          background-position: -100% 0;
          transition: background-position 0.6s ease;
          pointer-events: none;
          border-radius: 24px;
        }

        .wcu-card:hover::before {
          background-position: 200% 0;
        }

        /* icon box */
        .wcu-card-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(26,71,49,0.06), rgba(26,71,49,0.12));
          border: 1px solid rgba(26,71,49,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a4731;
          margin-bottom: 24px;
          transition:
            background     0.35s ease,
            color          0.35s ease,
            border-color   0.35s ease,
            transform      0.4s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow     0.35s ease;
        }

        /* icon flips to gold on card hover */
        .wcu-card:hover .wcu-card-icon {
          background: linear-gradient(135deg, #c8a24d, #e8c76a);
          color: #fff;
          border-color: transparent;
          transform: rotate(8deg) scale(1.12);
          box-shadow: 0 8px 24px rgba(200,162,77,0.35);
        }

        .wcu-card-title {
          font-size: 19px;
          font-weight: 700;
          color: #1a4731;
          margin-bottom: 12px;
          transition: color 0.3s ease;
        }

        .wcu-card:hover .wcu-card-title {
          color: #c8a24d;
        }

        .wcu-card-desc {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.75;
          transition: color 0.3s ease;
        }

        .wcu-card:hover .wcu-card-desc {
          color: #4b5563;
        }

        /* shimmer keyframes */
        @keyframes gold-shimmer-text {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .why-label-text {
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: linear-gradient(
            90deg,
            #8a6820 0%,
            #c8a24d 30%,
            #f0d98a 50%,
            #c8a24d 70%,
            #8a6820 100%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gold-shimmer-text 5s linear infinite;
        }

        /* ─── RESPONSIVE — tablets (≤768px) ──────────────────────── */

        @media (max-width: 768px) {

          .wcu-section {
            padding: 64px 20px;
          }

          .wcu-header {
            margin-bottom: 40px;
          }

          .wcu-label-badge {
            padding: 8px 18px;
            gap: 8px;
          }

          .why-label-text {
            font-size: 11px;
            letter-spacing: 0.15em;
          }

          .wcu-heading {
            font-size: clamp(24px, 6vw, 36px);
          }

          .wcu-subtitle {
            font-size: 15px;
            max-width: 100%;
            padding: 0 8px;
          }

          .wcu-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .wcu-card {
            padding: 24px 20px;
          }

          .wcu-card-icon {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            margin-bottom: 16px;
          }

          .wcu-card-title {
            font-size: 16px;
            margin-bottom: 8px;
          }

          .wcu-card-desc {
            font-size: 13px;
            line-height: 1.65;
          }

        }

        /* ─── RESPONSIVE — phones (≤480px) ───────────────────────── */

        @media (max-width: 480px) {

          .wcu-section {
            padding: 48px 16px;
          }

          .wcu-label-badge {
            padding: 7px 14px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .why-label-text {
            font-size: 10px;
            letter-spacing: 0.1em;
          }

          .wcu-heading {
            font-size: clamp(22px, 7vw, 30px);
          }

          .wcu-subtitle {
            font-size: 14px;
            line-height: 1.7;
          }

          /* single column on very small phones */
          .wcu-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .wcu-card {
            padding: 22px 18px;
            border-radius: 18px;
          }

          .wcu-card-title {
            font-size: 15px;
          }

          .wcu-card-desc {
            font-size: 13px;
          }

        }

      `}</style>

      {/* Decorative light */}
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,162,77,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="wcu-inner">

        {/* ── SECTION HEADER ── */}
        <div className="wcu-header">

          {/* Label badge — drops down */}
          <motion.div
            className="wcu-label-wrap"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.0}
          >
            <span className="wcu-label-badge">
              <span style={{ color: '#c8a24d', fontSize: 12, lineHeight: 1 }}>✦</span>
              <span className="why-label-text">Why Choose Al-Moazzen Group</span>
              <span style={{ color: '#c8a24d', fontSize: 12, lineHeight: 1 }}>✦</span>
            </span>
          </motion.div>

          {/* Heading — slides up */}
          <motion.h2
            className="font-display wcu-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
          >
            Your Trusted Partner
            <br />
            <span className="gold-shimmer">
              For a Blessed Umrah Journey
            </span>
          </motion.h2>

          {/* Divider — fades in */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
          >
            <GoldDivider />
          </motion.div>

          {/* Subtitle — fades up */}
          <motion.p
            className="font-serif wcu-subtitle"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.42}
          >
            With years of experience serving thousands of pilgrims,
            we ensure every step of your Umrah journey is smooth,
            comfortable, and spiritually fulfilling.
          </motion.p>

        </div>

        {/* ── FEATURE CARDS ── */}
        <div className="wcu-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="wcu-card"
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.55 + i * 0.12}
            >
              <div className="wcu-card-bar" />

              <div className="wcu-card-icon">
                {f.icon}
              </div>

              <h3 className="font-display wcu-card-title">{f.title}</h3>

              <p className="wcu-card-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;