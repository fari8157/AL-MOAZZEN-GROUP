// src/pages/Home.jsx
// ─────────────────────────────────────────────────────────────────
//  Composes all home-page sections in order.
//  SEO component and i18n are left as-is from your existing setup.
// ─────────────────────────────────────────────────────────────────
import React from 'react';
import { SEO } from '../components/utils/SEO';   // keep your existing SEO util

import HeroSection        from '../components/home/HeroSection';
import { StatsSection }   from '../components/home/StatsSection';
import WhyChooseUs        from '../components/home/WhyChooseUs';
import PackagesSection    from '../components/home/PackagesSection';
import JourneyTimeline    from '../components/home/JourneyTimeline';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection         from '../components/home/CTASection';

const Home = () => (
  <div style={{ overflow: 'hidden' }}>
    <SEO
      title="AL-MOAZZEN GROUP | Premium Umrah Travel Agency Jeddah"
      description="Experience a sacred and comfortable Umrah journey with AL-MOAZZEN GROUP. Premium packages from the heart of Jeddah, Saudi Arabia."
    />

    <HeroSection />
    <StatsSection />
    <WhyChooseUs />
  
    <JourneyTimeline />
    <TestimonialsSection />
   
  </div>
);

export default Home;
