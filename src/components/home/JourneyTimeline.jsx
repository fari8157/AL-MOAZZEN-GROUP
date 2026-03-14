// src/components/home/JourneyTimeline.jsx

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ClipboardList, FileText, MapPin, CheckCircle2 } from "lucide-react";
import { GoldDivider } from "../ui/shared";

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
    transition: { duration: 0.75, ease: "easeOut", delay },
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

const JourneyTimeline = () => {
  const { t } = useTranslation();

  const steps = [
    {
      n: "01",
      icon: <ClipboardList size={28} />,
      title: t("home.umrahJourney.step1.title") || "Choose Your Package",
      desc: t("home.umrahJourney.step1.desc") || "Select the Umrah package that best suits your travel needs, dates, and preferences."
    },
    {
      n: "02",
      icon: <FileText size={28} />,
      title: t("home.umrahJourney.step2.title") || "Visa & Documentation",
      desc: t("home.umrahJourney.step2.desc") || "We assist you with Umrah visa processing and all necessary travel documentation."
    },
    {
      n: "03",
      icon: <MapPin size={28} />,
      title: t("home.umrahJourney.step3.title") || "Travel & Accommodation",
      desc: t("home.umrahJourney.step3.desc") || "Enjoy comfortable flights and carefully selected hotels close to the Haram."
    },
    {
      n: "04",
      icon: <CheckCircle2 size={28} />,
      title: t("home.umrahJourney.step4.title") || "Complete Your Umrah",
      desc: t("home.umrahJourney.step4.desc") || "Perform your sacred pilgrimage with peace of mind and full support from our team."
    }
  ];

  return (
    <section className="jt-section">

      <style>{`

        /* ─── FIX: remove any inherited top margin/padding ─────── */
        .jt-section {
          padding: 80px 24px 96px;   /* tighter top — was 96px */
          margin-top: 0;             /* kill any external gap   */
          background: var(--ivory, #faf6ee);
          position: relative;
          overflow: hidden;
        }

        .jt-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* header */
        .jt-header {
          text-align: center;
          margin-bottom: 72px;
        }

        /* badge */
        .jt-badge-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 8px;
        }

        @keyframes sacred-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 16px rgba(200,162,77,0.3), 0 0 32px rgba(200,162,77,0.1); }
          50%       { box-shadow: 0 0 24px rgba(200,162,77,0.55), 0 0 48px rgba(200,162,77,0.2); }
        }
        @keyframes float-diamond {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50%       { transform: translateY(-4px) rotate(45deg); }
        }

        .sacred-label-wrap {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 10px 28px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(26,71,49,0.08), rgba(200,162,77,0.12));
          border: 1.5px solid rgba(200,162,77,0.5);
          animation: badge-glow 3s ease-in-out infinite;
          position: relative;
        }

        .sacred-label-text {
          font-family: Cinzel, serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #8a6820 0%, #c8a24d 30%, #f0d98a 50%, #c8a24d 70%, #8a6820 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sacred-shimmer 4s linear infinite;
        }

        .sacred-diamond {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #c8a24d, #f0d98a);
          animation: float-diamond 2.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* heading */
        .jt-heading {
          font-size: clamp(30px, 4vw, 50px);
          font-weight: 700;
          color: #1a4731;
          line-height: 1.15;
          margin-bottom: 12px;
        }

        /* subtitle */
        .jt-subtitle {
          font-size: 17px;
          font-style: italic;
          color: #6b7280;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.75;
        }

        /* connector line */
        .timeline-connector {
          position: absolute;
          top: 80px;
          left: 12.5%;
          right: 12.5%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,162,77,0.35), rgba(200,162,77,0.35), transparent);
          z-index: 0;
        }

        /* desktop grid */
        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        /* ── card base ──────────────────────────────────────────── */
        .timeline-step-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 36px 24px 32px;
          border-radius: 20px;
          background: #fff;
          border: 1.5px solid rgba(200,162,77,0.15);
          box-shadow: 0 2px 16px rgba(26,71,49,0.05);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition:
            transform    0.35s cubic-bezier(0.22,1,0.36,1),
            box-shadow   0.35s cubic-bezier(0.22,1,0.36,1),
            border-color 0.35s ease;
        }

        /* ── card hover ─────────────────────────────────────────── */
        .timeline-step-card:hover {
          transform: translateY(-10px);
          border-color: rgba(200,162,77,0.65);
          box-shadow:
            0 20px 48px rgba(26,71,49,0.10),
            0 0 0 1px rgba(200,162,77,0.25),
            inset 0 0 0 1px rgba(200,162,77,0.10);
        }

        /* top gold accent bar — always visible, glows on hover */
        .timeline-step-card::before {
          content: '';
          position: absolute;
          top: 0; left: 16px; right: 16px;
          height: 2px;
          border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, transparent, #c8a24d, #f0d070, #c8a24d, transparent);
          opacity: 0.45;
          transition: opacity 0.35s ease, left 0.35s ease, right 0.35s ease;
        }
        .timeline-step-card:hover::before {
          left: 0; right: 0;
          opacity: 1;
        }

        /* bottom green accent bar — grows on hover */
        .timeline-step-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; right: 50%;
          height: 2px;
          border-radius: 4px 4px 0 0;
          background: linear-gradient(90deg, #1a4731, #2d7a52, #1a4731);
          transition: left 0.4s cubic-bezier(0.22,1,0.36,1), right 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .timeline-step-card:hover::after {
          left: 0; right: 0;
        }

        /* children above pseudo-elements */
        .timeline-step-card > * { position: relative; z-index: 1; }

        /* ── icon circle ─────────────────────────────────────────── */
        .timeline-step-card .jt-icon-circle {
          transition:
            background   0.35s ease,
            box-shadow   0.35s ease,
            border-color 0.35s ease,
            transform    0.4s cubic-bezier(0.34,1.4,0.64,1);
        }
        /* stays green — just brightens and lifts */
        .timeline-step-card:hover .jt-icon-circle {
          background: linear-gradient(135deg, #1e5438, #2d7a52) !important;
          border-color: rgba(200,162,77,0.7) !important;
          box-shadow:
            0 8px 28px rgba(26,71,49,0.28),
            0 0 0 4px rgba(200,162,77,0.12) !important;
          transform: translateY(-4px) scale(1.08);
        }

        /* icon svg stays gold, just gets brighter */
        .timeline-step-card .jt-icon-circle svg {
          transition: color 0.3s ease, filter 0.3s ease;
        }
        .timeline-step-card:hover .jt-icon-circle svg {
          color: #f5e29a !important;
          filter: drop-shadow(0 0 6px rgba(200,162,77,0.55));
        }

        /* ── number badge ────────────────────────────────────────── */
        .timeline-step-card .jt-num-badge {
          transition:
            background  0.3s ease,
            color       0.3s ease,
            box-shadow  0.3s ease;
        }
        .timeline-step-card:hover .jt-num-badge {
          background: linear-gradient(135deg, #c8a24d, #f0d070) !important;
          color: #1a2e1a !important;
          box-shadow: 0 3px 12px rgba(200,162,77,0.45) !important;
        }

        /* ── title ───────────────────────────────────────────────── */
        .timeline-step-card .jt-card-title {
          transition: color 0.3s ease;
        }
        .timeline-step-card:hover .jt-card-title {
          color: #1a4731 !important;
        }

        /* ── desc ────────────────────────────────────────────────── */
        .timeline-step-card .jt-card-desc {
          transition: color 0.3s ease;
        }
        .timeline-step-card:hover .jt-card-desc {
          color: #4b5563 !important;
        }

        /* mobile vertical timeline */
        .timeline-mobile-list {
          display: none;
          flex-direction: column;
          gap: 0;
          position: relative;
        }
        .timeline-mobile-line {
          position: absolute;
          left: 23px;
          top: 24px;
          bottom: 24px;
          width: 2px;
          background: linear-gradient(to bottom, rgba(200,162,77,0.1), rgba(200,162,77,0.4), rgba(200,162,77,0.1));
        }
        .timeline-mobile-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 20px 0 20px 8px;
          position: relative;
        }
        .timeline-mobile-dot {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          flex-shrink: 0;
          background: linear-gradient(135deg, #1a4731, #2d7a52);
          border: 2px solid rgba(200,162,77,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c8a24d;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 16px rgba(26,71,49,0.2);
        }

        /* ─── RESPONSIVE — tablet (≤900px) ──────────────────────── */
        @media (max-width: 900px) {
          .timeline-grid      { grid-template-columns: repeat(2, 1fr) !important; }
          .timeline-connector { display: none !important; }

          .jt-section  { padding: 64px 20px 80px; }
          .jt-header   { margin-bottom: 48px; }

          .jt-heading  { font-size: clamp(26px, 5vw, 40px); }
          .jt-subtitle { font-size: 15px; max-width: 100%; padding: 0 8px; }

          .sacred-label-text { font-size: 11px; letter-spacing: 0.18em; }
          .sacred-label-wrap { padding: 8px 20px; }
        }

        /* ─── RESPONSIVE — phone (≤540px) ───────────────────────── */
        @media (max-width: 540px) {
          .timeline-grid        { display: none !important; }
          .timeline-mobile-list { display: flex !important; }

          .jt-section  { padding: 48px 16px 64px; }
          .jt-header   { margin-bottom: 36px; }

          .jt-heading  { font-size: clamp(24px, 7vw, 34px); }
          .jt-subtitle { font-size: 14px; line-height: 1.7; }

          .sacred-label-text { font-size: 10px; letter-spacing: 0.12em; }
          .sacred-label-wrap { padding: 7px 16px; gap: 10px; }
        }

      `}</style>

      <div className="jt-inner">

        {/* ── Header ── */}
        <div className="jt-header">

          {/* Badge — drops down */}
          <motion.div
            className="jt-badge-wrap"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.0}
          >
            <div className="sacred-label-wrap">
              <div className="sacred-diamond" />
              <span className="sacred-label-text">
                {t("home.umrahJourney.badge") || "Your Sacred Journey"}
              </span>
              <div className="sacred-diamond" />
            </div>
          </motion.div>

          {/* Heading — slides up */}
          <motion.h2
            className="font-display jt-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
          >
            {t("home.umrahJourney.titleStart") || "Your Umrah Journey"}
            <br />
            <span className="gold-shimmer">
              {t("home.umrahJourney.titleEnd") || "Step by Step"}
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
            className="font-serif jt-subtitle"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.42}
          >
            {t("home.umrahJourney.subtitle") ||
              "From planning your travel to completing your blessed pilgrimage, our team ensures every step of your Umrah journey is smooth, organized, and spiritually fulfilling."}
          </motion.p>

        </div>

        {/* ── Desktop / Tablet Grid ── */}
        <div style={{ position: "relative" }}>
          <div className="timeline-connector" />

          <div className="timeline-grid">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.55 + i * 0.13}
                className="timeline-step-card"
              >
                {/* Circle icon */}
                <div
                  className="jt-icon-circle"
                  style={{
                    width: 96, height: 96, borderRadius: "50%",
                    background: "linear-gradient(135deg,#1a4731,#2d7a52)",
                    border: "2px solid rgba(200,162,77,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#c8a24d", marginBottom: 24, position: "relative",
                    cursor: "default",
                    boxShadow: "0 8px 32px rgba(26,71,49,0.2)",
                  }}
                >
                  {step.icon}
                  <div className="jt-num-badge" style={{
                    position: "absolute", top: -8, right: -8,
                    width: 28, height: 28, borderRadius: "50%",
                    background: "linear-gradient(135deg,#c8a24d,#e8c76a)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: "#1a1a1a",
                    fontFamily: "Cinzel, serif",
                    boxShadow: "0 2px 8px rgba(200,162,77,0.4)",
                  }}>
                    {step.n}
                  </div>
                </div>

                <h3
                  className="font-display jt-card-title"
                  style={{ fontSize: 18, fontWeight: 700, color: "#1a4731", marginBottom: 10 }}
                >
                  {step.title}
                </h3>

                <p className="jt-card-desc" style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile Vertical Timeline ── */}
        <div className="timeline-mobile-list">
          <div className="timeline-mobile-line" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1 + i * 0.12}
              className="timeline-mobile-item"
            >
              <div className="timeline-mobile-dot">
                {React.cloneElement(step.icon, { size: 20 })}
                <div style={{
                  position: "absolute", top: -6, right: -6,
                  width: 20, height: 20, borderRadius: "50%",
                  background: "linear-gradient(135deg,#c8a24d,#e8c76a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: "#1a1a1a",
                  fontFamily: "Cinzel, serif",
                }}>
                  {i + 1}
                </div>
              </div>

              <div style={{ paddingTop: 4, flex: 1 }}>
                <span style={{
                  fontSize: 10, color: "#c8a24d", letterSpacing: "0.18em",
                  textTransform: "uppercase", fontFamily: "Cinzel, serif",
                  display: "block", marginBottom: 4,
                }}>
                  {t("home.umrahJourney.stepLabel") || "Step"} {step.n}
                </span>
                <h3 className="font-display" style={{
                  fontSize: 17, fontWeight: 700, color: "#1a4731", marginBottom: 6
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JourneyTimeline;