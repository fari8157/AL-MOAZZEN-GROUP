// src/components/home/HeroSection.jsx

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Particles } from "../ui/shared";

/* ─── Reusable entrance variants ─────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay },
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

const HeroSection = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 200]);

  const [wordIdx, setWordIdx] = useState(0);

  const cyclingWordsRaw = t("home.hero.cyclingWords", { returnObjects: true });
  const CYCLING_WORDS =
    Array.isArray(cyclingWordsRaw) && cyclingWordsRaw.length > 0
      ? cyclingWordsRaw
      : ["Sacred", "Blessed", "Divine", "Spiritual", "Holy"];

  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx((i) => (i + 1) % CYCLING_WORDS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">

      {/* ── Background ── */}
      <motion.div className="hero-bg" style={{ y: bgY }}>
        <img
          // src="https://t3.ftcdn.net/jpg/09/30/47/86/360_F_930478659_ANNV5161gWZfYybGkc7FJFJ5O3VdP1Tt.jpg"
          //  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop"
           src="/herosection.png"
          alt="Makkah"
        />
        <div className="hero-overlay" />
      </motion.div>

      <Particles />

      {/* ── Content ── */}
      <div className="hero-content">

        {/* Label — drops down from above */}
        <motion.div
          className="hero-label"
          variants={fadeDown}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <Moon size={13} />
          <span>{t("home.hero.label") || "Al-Moazzen Group — Jeddah, Saudi Arabia"}</span>
          <Moon size={13} />
        </motion.div>

        {/* Title line 1 — slides up */}
        <motion.h1
          className="hero-title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
        >
          {t("home.hero.titleStart") || "Begin Your"}{" "}

          <span className="word-wrapper">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.45 }}
                className="title-gold"
              >
                {CYCLING_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Title line 2 — slides up, slightly later */}
        <motion.h1
          className="hero-title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          {t("home.hero.titleEnd") || "Umrah Journey"}
        </motion.h1>

        {/* Arabic line — fades in with gentle scale */}
        <motion.div
          className="hero-arabic"
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
        >
          {t("home.hero.arabicLine") || "لَبَّيْكَ اللَّهُمَّ لَبَّيْك"}
        </motion.div>

        {/* Subtitle — fades up */}
        <motion.p
          className="hero-subtitle"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.88}
        >
          {t("home.hero.subtitle") ||
            "Experience the blessed pilgrimage with peace and comfort. Al-Moazzen Group handles every detail so you can focus on devotion and your spiritual journey."}
        </motion.p>

        {/* Buttons — pop in with spring bounce */}
        <motion.div
          className="hero-buttons"
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          custom={1.05}
        >
          <button className="btn-gold">
            {t("home.hero.planBtn") || "Plan My Umrah"}
            <ArrowRight size={18} className="rtl:rotate-180" />
          </button>

          <button className="btn-glass">
            {t("home.hero.viewBtn") || "View Packages"}
          </button>
        </motion.div>

      </div>

      {/* Scroll indicator — fades in last */}
      <motion.div
        className="scroll-indicator"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1.4}
      >
        <span>{t("home.hero.scroll") || "Scroll"}</span>
        <ChevronDown size={18} />
      </motion.div>

      <style>{`

/* ─── BASE ────────────────────────────────────────────────────── */

.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: white;
}

/* background */

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-bg img {
  width: 100%;
  height: 120%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.75));
}

/* content */

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 900px;
  padding-left: 8%;
  padding-right: 24px;
  text-align: left;
}

/* label */

.hero-label {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  background: rgba(200,162,77,.12);
  border: 1px solid rgba(200,162,77,.35);
  padding: 8px 20px;
  border-radius: 50px;
  margin-bottom: 28px;
  font-size: 12px;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: #c8a24d;
}

/* titles */

.hero-title {
  font-size: clamp(44px, 7vw, 92px);
  font-weight: 700;
  line-height: 1.05;
  color: white;
  text-align: left;
}

/* prevents layout movement on cycling word */

.word-wrapper {
  display: inline-block;
  width: 170px;
}

/* gold shimmer */

.title-gold {
  background: linear-gradient(120deg, #c8a24d, #f5e29a, #c8a24d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: goldShimmer 6s linear infinite;
}

/* arabic */

.hero-arabic {
  font-size: 28px;
  color: #c8a24d;
  margin-top: 12px;
  margin-bottom: 20px;
}

/* subtitle */

.hero-subtitle {
  font-size: 18px;
  line-height: 1.8;
  max-width: 520px;
  opacity: .85;
  margin-bottom: 40px;
  font-style: italic;
}

/* buttons */

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-gold {
  background: linear-gradient(135deg, #c8a24d, #e8c76a);
  color: #111;
  padding: 16px 38px;
  border-radius: 50px;
  border: none;
  font-weight: 700;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(200,162,77,.45);
}

.btn-glass {
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.25);
  color: white;
  padding: 16px 38px;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn-glass:hover {
  background: rgba(255,255,255,.15);
  transform: translateY(-2px);
}

/* scroll indicator */

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: .6;
  font-size: 11px;
  letter-spacing: .25em;
  text-transform: uppercase;
}

/* shimmer */

@keyframes goldShimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* ─── RESPONSIVE — tablets (≤768px) ──────────────────────────── */

@media (max-width: 768px) {

  .hero-content {
    padding-left: 24px;
    padding-right: 24px;
    text-align: center;
  }

  .hero-label {
    font-size: 10px;
    padding: 6px 14px;
    letter-spacing: .1em;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-title {
    font-size: clamp(32px, 9vw, 52px);
    text-align: center;
  }

  .word-wrapper {
    width: auto;
    min-width: 0;
  }

  .hero-arabic {
    font-size: 22px;
    text-align: center;
  }

  .hero-subtitle {
    font-size: 15px;
    max-width: 100%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .btn-gold,
  .btn-glass {
    padding: 14px 32px;
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

}

/* ─── RESPONSIVE — phones (≤480px) ───────────────────────────── */

@media (max-width: 480px) {

  .hero-content {
    padding-left: 18px;
    padding-right: 18px;
  }

  .hero-title {
    font-size: clamp(28px, 10vw, 40px);
  }

  .hero-arabic {
    font-size: 18px;
    margin-top: 8px;
    margin-bottom: 14px;
  }

  .hero-subtitle {
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 28px;
  }

  .btn-gold,
  .btn-glass {
    padding: 13px 28px;
    font-size: 14px;
  }

}

      `}</style>

    </section>
  );
};

export default HeroSection;