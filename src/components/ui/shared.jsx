// src/components/ui/shared.jsx
// Re-usable primitives used across multiple home sections

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/* ─────────────────────────────────────────────
   Floating gold particles (used on dark sections)
───────────────────────────────────────────── */
export const Particles = ({ count = 12 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size:     Math.random() * 4 + 2,
    left:     Math.random() * 100,
    delay:    Math.random() * 8,
    duration: Math.random() * 10 + 8,
    shape:    i % 3 === 0 ? '✦' : i % 3 === 1 ? '◆' : '●',
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: '-20px',
            fontSize: `${p.size}px`,
            color: '#c8a24d',
            opacity: 0.6,
            animationDuration: `${p.duration}s`,
            animationDelay:    `${p.delay}s`,
          }}
        >
          {p.shape}
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Animated counter — counts up when scrolled into view
───────────────────────────────────────────── */
export const AnimatedCounter = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step  = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else                     setCount(Math.floor(current));
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="stat-number" style={{ fontSize: 48, fontWeight: 700 }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

/* ─────────────────────────────────────────────
   Section label pill  e.g.  ✦ Why Choose Us ✦
───────────────────────────────────────────── */
export const SectionLabel = ({ children }) => (
  <span className="section-label">{children}</span>
);

/* ─────────────────────────────────────────────
   Gold divider (centred)
───────────────────────────────────────────── */
export const GoldDivider = () => <div className="gold-divider" />;
