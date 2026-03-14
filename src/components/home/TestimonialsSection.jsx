// src/components/home/TestimonialsSection.jsx

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Particles, GoldDivider } from "../ui/shared";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
  hidden: { opacity: 0, scale: 0.9, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.34, 1.4, 0.64, 1], delay },
  }),
};

/* ─── Data ────────────────────────────────────────────────────── */

const REVIEWS = [
  {
    name: "Ahmed Al-Rashidi",
    city: "Riyadh",
    text: "Al-Moazzen Group made our Umrah absolutely perfect. Every detail was taken care of from the airport to the Haram.",
    stars: 5
  },
  {
    name: "Fatima Hassan",
    city: "Cairo",
    text: "The VIP package was extraordinary. Our hotel was walking distance from the Kaaba.",
    stars: 5
  },
  {
    name: "Omar Sheikh",
    city: "London",
    text: "Traveling from the UK was easy thanks to the excellent coordination.",
    stars: 5
  },
  {
    name: "Abdul Rahman",
    city: "Malappuram, Kerala",
    text: "Everything was organized perfectly and the journey was peaceful.",
    stars: 5
  },
  {
    name: "Shabeer Ali",
    city: "Kozhikode, Kerala",
    text: "Very professional service. Hotels and transport were excellent.",
    stars: 5
  },
  {
    name: "Fathima Nazeera",
    city: "Kochi, Kerala",
    text: "Highly recommended Umrah travel service.",
    stars: 5
  }
];

/* ─── Component ───────────────────────────────────────────────── */

const TestimonialsSection = () => {

  const swiperRef = useRef(null);

  return (
    <section className="ts-section">

      <style>{`

        .ts-section {
          padding: 100px 24px;
          background: linear-gradient(135deg, #0f2d1e, #1a4731);
          position: relative;
          overflow: visible;
        }

        .ts-inner {
          max-width: 1200px;
          margin: auto;
          position: relative;
          z-index: 2;
        }

        /* ── header ── */
        .ts-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .ts-label {
          display: inline-block;
          color: #c8a24d;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 6px 18px;
          border: 1px solid rgba(200,162,77,0.5);
          border-radius: 999px;
          background: rgba(200,162,77,0.1);
          margin-bottom: 16px;
        }

        .ts-heading {
          font-size: clamp(28px, 4vw, 50px);
          font-weight: 700;
          color: #c8a24d;
          margin: 0;
        }

        /* ── nav buttons ── */
        .ts-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(200,162,77,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          box-shadow: 0 0 12px rgba(200,162,77,0.25);
        }
        .ts-nav-btn:hover {
          transform: translateY(-50%) scale(1.12);
          box-shadow: 0 0 24px rgba(200,162,77,0.6);
          background: rgba(200,162,77,0.15);
        }
        .ts-nav-left  { left: -30px; }
        .ts-nav-right { right: -30px; }

        /* ── review card ── */
        .ts-card {
          padding: 36px;
          border-radius: 20px;
          backdrop-filter: blur(16px);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(200,162,77,0.45);
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          width: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          transition:
            transform  0.38s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.38s cubic-bezier(0.22,1,0.36,1),
            border     0.3s ease;
          overflow: hidden;
        }

        /* top gold bar reveals on hover */
        .ts-card::before {
          content: '';
          position: absolute;
          top: 0; left: 20px; right: 20px;
          height: 2px;
          border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, transparent, #c8a24d, #f0d070, #c8a24d, transparent);
          opacity: 0.4;
          transition: opacity 0.35s ease, left 0.35s ease, right 0.35s ease;
        }
        .ts-card:hover::before {
          left: 0; right: 0;
          opacity: 1;
        }

        .ts-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 28px 60px rgba(200,162,77,0.28);
          border: 1px solid rgba(200,162,77,0.85);
          z-index: 50;
        }

        .ts-card-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 16px;
        }

        .ts-card-text {
          color: #f3f4f6;
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 22px;
          flex-grow: 1;
          transition: color 0.3s ease;
        }
        .ts-card:hover .ts-card-text {
          color: #fff;
        }

        .ts-card-user {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }

        .ts-card-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c8a24d, #e7c86a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #111;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease;
        }
        .ts-card:hover .ts-card-avatar {
          transform: scale(1.12);
          box-shadow: 0 4px 16px rgba(200,162,77,0.45);
        }

        .ts-card-name {
          color: #c8a24d;
          font-weight: 700;
          transition: color 0.3s ease;
        }
        .ts-card:hover .ts-card-name {
          color: #f0d070;
        }

        .ts-card-city {
          font-size: 12px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ── responsive ── */
        @media (max-width: 768px) {
          .ts-section  { padding: 64px 20px; }
          .ts-nav-left  { left: -10px; }
          .ts-nav-right { right: -10px; }
          .ts-nav-btn   { width: 40px; height: 40px; }
          .ts-heading   { font-size: clamp(22px, 6vw, 36px); }
          .ts-label     { font-size: 11px; letter-spacing: 0.15em; }
          .ts-card      { padding: 24px 20px; }
        }

        @media (max-width: 480px) {
          .ts-section { padding: 48px 16px; }
          .ts-nav-btn { display: none; }
          .ts-heading { font-size: clamp(20px, 7vw, 28px); }
        }

      `}</style>

      <Particles />

      <div className="ts-inner">

        {/* ── Header ── */}
        <div className="ts-header">

          {/* Label — drops down */}
          <motion.div
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.0}
          >
            <span className="ts-label">Pilgrim Stories</span>
          </motion.div>

          {/* Heading — slides up */}
          <motion.h2
            className="ts-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
          >
            Words from Our Blessed Pilgrims
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

        </div>

        {/* ── Carousel ── */}
        <motion.div
          style={{ position: "relative", paddingTop: "20px" }}
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.42}
        >

          {/* Left button */}
          <button
            className="ts-nav-btn ts-nav-left"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft size={22} color="#c8a24d" />
          </button>

          {/* Right button */}
          <button
            className="ts-nav-btn ts-nav-right"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight size={22} color="#c8a24d" />
          </button>

          {/* Swiper */}
          <Swiper
            style={{ overflow: "visible", paddingBottom: "40px" }}
            modules={[Autoplay, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={30}
            breakpoints={{
              0:    { slidesPerView: 1 },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {REVIEWS.map((r, i) => (
              <SwiperSlide key={i} style={{ height: "auto", display: "flex" }}>
                <div className="ts-card">

                  {/* Stars */}
                  <div className="ts-card-stars">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <Star key={j} size={16} fill="#c8a24d" color="#c8a24d" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="ts-card-text">"{r.text}"</p>

                  {/* User */}
                  <div className="ts-card-user">
                    <div className="ts-card-avatar">{r.name[0]}</div>
                    <div>
                      <div className="ts-card-name">{r.name}</div>
                      <div className="ts-card-city">
                        <MapPin size={12} /> {r.city}
                      </div>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </motion.div>

      </div>
    </section>
  );
};

export default TestimonialsSection;