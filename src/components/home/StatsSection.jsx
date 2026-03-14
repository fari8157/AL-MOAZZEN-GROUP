// src/components/home/StatsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Heart, Headphones } from 'lucide-react';
import { AnimatedCounter } from '../ui/shared';

const STATS = [
  { n: 50000, suffix: '+',  label: 'Pilgrims Served',  icon: <Users      size={24} /> },
  { n: 15,    suffix: '+',  label: 'Years Experience', icon: <Award      size={24} /> },
  { n: 98,    suffix: '%',  label: 'Satisfaction Rate',icon: <Heart      size={24} /> },
  { n: 24,    suffix: '/7', label: 'Support Always',   icon: <Headphones size={24} /> },
];

export const StatsSection = () => (
  <section
    className="islamic-bg"
    style={{
      background: 'linear-gradient(135deg, #1a4731 0%, #1e5c3a 50%, #1a4731 100%)',
      padding: '64px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <style>{`
      .stats-grid {
        max-width: 1280px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        position: relative;
        z-index: 1;
      }

      @media (max-width: 1024px) {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
      }

      @media (max-width: 480px) {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
      }

      .stat-card {
        text-align: center;
        padding: 28px 16px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(200, 162, 77, 0.15);
        transition: border-color 0.3s ease, background 0.3s ease;
      }

      .stat-card:hover {
        background: rgba(200, 162, 77, 0.07);
        border-color: rgba(200, 162, 77, 0.35);
      }

      @media (max-width: 480px) {
        .stat-card {
          padding: 20px 10px;
        }
      }
    `}</style>

    <div className="stats-grid">
      {STATS.map((s, i) => (
        <motion.div
          key={i}
          className="stat-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
        >
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(200,162,77,0.12)',
            border: '1px solid rgba(200,162,77,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c8a24d',
            margin: '0 auto 16px',
            flexShrink: 0,
          }}>
            {s.icon}
          </div>

          <AnimatedCounter target={s.n} suffix={s.suffix} />

          <div style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: 8,
            fontFamily: 'Cinzel, serif',
            lineHeight: 1.4,
          }}>
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);