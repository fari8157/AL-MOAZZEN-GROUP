// src/components/LoadingScreen.jsx

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const steps = [
      { target: 35, delay: 300 },
      { target: 68, delay: 700 },
      { target: 88, delay: 1200 },
      { target: 100, delay: 1800 },
    ];

    const timers = steps.map(({ target, delay }) =>
      setTimeout(() => setProgress(target), delay)
    );

    const exit = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onComplete?.(), 600);
    }, 2600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exit);
    };
  }, [onComplete]);

  const containerV = {
    hidden: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } },
  };

  const starV = {
    hidden: { opacity: 0, rotate: -30, scale: 0.6 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
    },
  };

  const logoV = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut", delay: 0.55 },
    },
  };

  const textItem = (delay) => ({
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
    },
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={containerV}
          initial="hidden"
          animate="hidden"
          exit="exit"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background:
              "linear-gradient(160deg,#0a1c11 0%,#0f2d1e 50%,#081509 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Grid Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              pointerEvents: "none",
              backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(200,162,77,.6) 39px, rgba(200,162,77,.6) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(200,162,77,.6) 39px, rgba(200,162,77,.6) 40px)`,
            }}
          />

          {/* Glow */}
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(200,162,77,0.07) 0%,transparent 65%)",
            }}
          />

          {/* Corner ornaments */}
          {[
            { top: 24, left: 24, borderTop: "1.5px solid #c8a24d", borderLeft: "1.5px solid #c8a24d" },
            { top: 24, right: 24, borderTop: "1.5px solid #c8a24d", borderRight: "1.5px solid #c8a24d" },
            { bottom: 24, left: 24, borderBottom: "1.5px solid #c8a24d", borderLeft: "1.5px solid #c8a24d" },
            { bottom: 24, right: 24, borderBottom: "1.5px solid #c8a24d", borderRight: "1.5px solid #c8a24d" },
          ].map((style, i) => (
            <div key={i} style={{ position: "absolute", width: 36, height: 36, opacity: 0.25, ...style }} />
          ))}

          {/* STAR FRAME */}
          <motion.div
            variants={starV}
            initial="hidden"
            animate="visible"
            style={{
              position: "relative",
              width: 128,
              height: 128,
              marginBottom: 32,
            }}
          >
            {/* Rings */}
            <div
              style={{
                position: "absolute",
                inset: -14,
                borderRadius: "50%",
                border: "1.5px solid rgba(200,162,77,0.35)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: -26,
                borderRadius: "50%",
                border: "1px solid rgba(200,162,77,0.15)",
                animation: "pulse 2s ease-in-out infinite 0.4s",
              }}
            />

            {/* Star SVG */}
            <svg viewBox="0 0 120 120" fill="none" style={{ width: 128, height: 128 }}>
              <path
                d="M60 4 L70 20 L88 12 L84 32 L104 36 L92 52 L104 68 L84 72 L88 92 L68 88 L60 104 L52 88 L32 92 L36 72 L16 68 L28 52 L16 36 L36 32 L32 12 L50 20 Z"
                stroke="#c8a24d"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <circle cx="60" cy="60" r="38" fill="#0f2d1e" stroke="#c8a24d" />
            </svg>

            {/* CENTERED LOGO FIX */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.img
                variants={logoV}
                initial="hidden"
                animate="visible"
                src="/logo.png"
                alt="Al-Moazzen Group"
                style={{
                  width: "60%",
                  height: "60%",
                  objectFit: "contain",
                }}
              />
            </div>
          </motion.div>

          {/* Arabic */}
          <motion.div
            variants={textItem(0.62)}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 30,
              color: "#c8a24d",
              marginBottom: 4,
            }}
          >
            مجموعة المؤذن
          </motion.div>

          {/* English */}
          <motion.div
            variants={textItem(0.76)}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#e8d5a0",
              marginBottom: 6,
            }}
          >
            AL-MOAZZEN GROUP
          </motion.div>

          {/* Tagline */}
          <motion.div
            variants={textItem(0.9)}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 11,
              fontStyle: "italic",
              color: "rgba(200,162,77,0.55)",
              marginBottom: 36,
            }}
          >
            Spirituality & Excellence
          </motion.div>

          {/* Progress */}
          <div
            style={{
              width: 220,
              height: 2,
              background: "rgba(200,162,77,0.12)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg,#8a6820,#c8a24d,#f0d98a,#c8a24d)",
                transition: "width 0.6s",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;