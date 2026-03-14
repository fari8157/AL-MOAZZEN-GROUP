// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, X, Phone, ChevronRight } from 'lucide-react';

export const NAV_BAR_H = 88;

if (!document.getElementById('navbar-styles')) {
  const s = document.createElement('style');
  s.id = 'navbar-styles';
  s.textContent = `
    *{ box-sizing:border-box; }

    /* ── Single nav wrapper ── */
    .nav-root {
      position: fixed; top:0; left:0; right:0; z-index:50;
      transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    }
    .nav-root {
      background: rgba(250,246,238,0.96);
      backdrop-filter: blur(24px) saturate(180%);
      border-bottom: 1px solid rgba(200,162,77,0.15);
      box-shadow: 0 4px 32px rgba(26,71,49,0.09);
    }

    /* ── Grid bar ── */
    .nav-mainbar {
      height: ${NAV_BAR_H}px;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 0 36px;
      max-width: 1360px;
      margin: 0 auto;
      transition: height 0.35s ease;
    }
    .nav-scrolled .nav-mainbar { height: 68px; }

    @media(max-width:899px){
      .nav-mainbar {
        grid-template-columns: 1fr auto;
        padding: 0 20px;
      }
    }

    /* ── Logo text ── */
    .nav-logo-title {
      font-family: 'Cinzel', serif;
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.07em;
      line-height: 1.25;
      color: #1a4731;
    }
    .nav-logo-tagline {
      font-size: 10.5px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #c8a24d;
      margin-top: 4px;
      line-height: 1;
    }
    .nav-logo-img {
      height: 52px;
      width: auto;
      display: block;
    }
    .nav-logo-box {
      background: white;
      border: 1px solid rgba(200,162,77,0.35);
      border-radius: 12px;
      padding: 5px 7px;
      line-height: 0;
      box-shadow: 0 2px 14px rgba(26,71,49,0.1);
      transition: all 0.4s ease;
    }

    /* ── Pill nav ── */
    .nav-pill {
      display: flex; align-items: center; gap: 2px;
      border-radius: 100px; padding: 5px 5px;
      position: relative;
      transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
    }
    .nav-pill {
      background: rgba(255,255,255,0.96);
      border: 1px solid rgba(200,162,77,0.2);
      box-shadow: 0 4px 28px rgba(26,71,49,0.08);
    }

    /* ── Pill active indicator ── */
    .pill-indicator {
      position: absolute; border-radius: 100px; pointer-events: none;
      background: rgba(26,71,49,0.1);
      border: 1.5px solid rgba(200,162,77,0.45);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 10px rgba(26,71,49,0.08);
      transition: left 0.38s cubic-bezier(0.34,1.2,0.64,1),
                  top  0.38s cubic-bezier(0.34,1.2,0.64,1),
                  width  0.38s cubic-bezier(0.34,1.2,0.64,1),
                  height 0.38s cubic-bezier(0.34,1.2,0.64,1);
    }

    /* ── Nav link items ── */
    .nav-link-item {
      position: relative; z-index: 1;
      padding: 8px 17px; border-radius: 100px;
      font-family: 'Cinzel', serif; font-size: 12px;
      font-weight: 500; letter-spacing: 0.06em;
      text-decoration: none; white-space: nowrap;
      transition: color 0.22s; display: block;
    }
    .nav-link-item { color: #5a6a5e; }
    .nav-link-item:hover { color: #c8a24d !important; }
    .nav-link-item.nav-active { color: #1a4731 !important; font-weight: 700; }

    /* ── Book btn ── */
    .nav-book-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 10px 22px; border-radius: 100px; border: none;
      background: linear-gradient(135deg, #c8a24d 0%, #e8c76a 55%, #c8a24d 100%);
      background-size: 200% auto;
      color: #1a1a1a; font-family: 'Cinzel', serif;
      font-size: 12.5px; font-weight: 700; letter-spacing: 0.05em;
      cursor: pointer; white-space: nowrap;
      position: relative; overflow: hidden;
      transition: background-position 0.4s, box-shadow 0.3s, transform 0.2s;
    }
    .nav-book-btn:hover {
      background-position: right center;
      box-shadow: 0 6px 24px rgba(200,162,77,0.45);
      transform: scale(1.03);
    }
    .nav-book-btn::after {
      content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
      background: linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent);
      transition: left 0.48s;
    }
    .nav-book-btn:hover::after { left:100%; }

    /* ── Lang btn ── */
    .nav-lang-btn {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 8px 15px; border-radius: 100px;
      font-family: 'Cinzel', serif; font-size: 11px;
      font-weight: 600; letter-spacing: 0.05em;
      cursor: pointer; white-space: nowrap; transition: all 0.28s; border:none;
    }
    .nav-lang-btn {
      border: 1px solid rgba(200,162,77,0.22);
      background: rgba(200,162,77,0.05);
      color: #4b5563;
    }
    .nav-lang-btn:hover {
      border-color: rgba(200,162,77,0.5) !important;
      background: rgba(200,162,77,0.15) !important;
      color: #c8a24d !important;
    }

    /* ── Ham btn ── */
    .nav-ham-btn {
      width:40px; height:40px; border-radius:10px;
      display:flex; flex-direction:column; align-items:center;
      justify-content:center; gap:5px; cursor:pointer; padding:0;
      transition: all 0.28s;
    }
    .nav-ham-btn {
      border:1px solid rgba(200,162,77,0.2);
      background:rgba(200,162,77,0.06);
    }
    .nav-ham-btn:hover {
      border-color:rgba(200,162,77,0.5)!important;
      background:rgba(200,162,77,0.15)!important;
    }
    .ham-a, .ham-b {
      width:18px; height:1.5px; border-radius:2px;
      transition: background 0.3s;
      background: #1a4731;
    }
    .ham-b { width:12px; align-self:flex-end; }

    /* ── Desktop vs Mobile visibility ── */
    @media(min-width:900px){
      .nav-pill     { display:flex!important; }
      .desk-actions { display:flex!important; }
      .mob-actions  { display:none!important; }
    }
    @media(max-width:899px){
      .nav-pill     { display:none!important; }
      .desk-actions { display:none!important; }
      .mob-actions  { display:flex!important; }
    }

    /* ─── RESPONSIVE: logo text scaling ──────────────────────── */

    /* tablet: 600–899px */
    @media(max-width:899px) {
      .nav-mainbar       { height: 72px; }
      .nav-scrolled .nav-mainbar { height: 60px; }

      .nav-logo-img      { height: 42px; }
      .nav-logo-box      { border-radius: 10px; padding: 4px 6px; }

      .nav-logo-title    { font-size: 14px; letter-spacing: 0.06em; }
      .nav-logo-tagline  { font-size: 9px;  letter-spacing: 0.18em; margin-top: 3px; }
    }

    /* small phone: ≤480px */
    @media(max-width:480px) {
      .nav-mainbar       { height: 64px; padding: 0 14px; }
      .nav-scrolled .nav-mainbar { height: 56px; }

      .nav-logo-img      { height: 36px; }
      .nav-logo-box      { border-radius: 8px; padding: 3px 5px; }

      .nav-logo-title    { font-size: 12.5px; letter-spacing: 0.05em; }
      .nav-logo-tagline  { display: none; }   /* hide tagline on very small phones */

      .nav-ham-btn       { width: 36px; height: 36px; }
      .nav-lang-btn      { padding: 6px 8px; }
    }

    /* very small: ≤360px — hide brand text entirely, keep just logo image */
    @media(max-width:360px) {
      .nav-logo-brand-text { display: none; }
    }

    /* ── Drawer ── */
    .nav-drawer {
      position:fixed; top:0; right:0; bottom:0;
      width:min(320px,88vw); background:#0c2218;
      display:flex; flex-direction:column; z-index:9999;
    }
    .nav-drawer-overlay {
      position:fixed; inset:0;
      background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); z-index:9998;
    }
    .drawer-link {
      display:flex; align-items:center; justify-content:space-between;
      padding:13px 18px; border-radius:11px; margin-bottom:3px;
      text-decoration:none; font-family:'Cinzel',serif; font-size:13.5px;
      font-weight:500; letter-spacing:0.05em; color:rgba(255,255,255,0.68);
      transition:all 0.22s; position:relative; overflow:hidden;
    }
    .drawer-link::before {
      content:''; position:absolute; left:0; top:0; bottom:0;
      width:0; background:linear-gradient(90deg,rgba(200,162,77,0.1),transparent);
      transition:width 0.28s;
    }
    .drawer-link:hover { color:#c8a24d; padding-left:24px; }
    .drawer-link:hover::before { width:100%; }
    .drawer-link.d-active {
      color:#c8a24d;
      background:rgba(200,162,77,0.07);
      border:1px solid rgba(200,162,77,0.14);
    }
    .drawer-num { font-size:10px; color:rgba(200,162,77,0.3); }
  `;
  document.head.appendChild(s);
}

/* ════════════════════════════════ */
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location    = useLocation();

  const [scrolled,   setScrolled]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [indicator,  setIndicator]  = useState({ left:0, top:0, width:0, height:0 });

  const pillRef  = useRef(null);
  const linkRefs = useRef({});

  const navLinks = [
    { label: t('nav.home')     || 'Home',        path: '/'         },
    { label: t('nav.about')    || 'About Us',     path: '/about'    },
    { label: t('nav.services') || 'Our Services', path: '/services' },
    { label: t('nav.packages') || 'Packages',     path: '/packages' },
    { label: t('nav.faq')      || 'FAQ',           path: '/faq'      },
    { label: t('nav.contact')  || 'Contact',       path: '/contact'  },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setDrawerOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const calcIndicator = () => {
    const el   = linkRefs.current[location.pathname];
    const pill = pillRef.current;
    if (!el || !pill) return;
    const pR = pill.getBoundingClientRect();
    const lR = el.getBoundingClientRect();
    setIndicator({ left:lR.left-pR.left, top:lR.top-pR.top, width:lR.width, height:lR.height });
  };

  useEffect(() => {
    const t1 = setTimeout(calcIndicator, 0);
    const t2 = setTimeout(calcIndicator, 150);
    const t3 = setTimeout(calcIndicator, 400);
    if (document.fonts) document.fonts.ready.then(calcIndicator);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [location.pathname, scrolled]);

  const isActive   = p => p === '/' ? location.pathname === '/' : location.pathname.startsWith(p);
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');

  const state = scrolled ? 'nav-scrolled' : 'nav-top';

  return (
    <>
      {/* ── Nav bar ── */}
      <div className={`nav-root ${state}`}>
        <div className="nav-mainbar">

          {/* LEFT: Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', justifySelf:'start' }}>
            <motion.div
              className="nav-logo-box"
              whileHover={{ scale:1.05 }}
              transition={{ type:'spring', stiffness:400, damping:20 }}
            >
              <img
                src="/logo.png"
                alt="Al-Moazzen Group"
                className="nav-logo-img"
              />
            </motion.div>

            {/* Brand text — hidden on ≤360px via CSS */}
            <div className="nav-logo-brand-text" style={{ lineHeight:1 }}>
              <div className="nav-logo-title">
                AL-MOAZZEN <span style={{ color:'#c8a24d' }}>GROUP</span>
              </div>
              <div className="nav-logo-tagline">
                {t('footer.tagline') || 'Spirituality & Excellence'}
              </div>
            </div>
          </Link>

          {/* CENTER: Pill (desktop only) */}
          <div ref={pillRef} className="nav-pill" style={{ justifySelf:'center' }}>
            {indicator.width > 0 && (
              <motion.div
                className="pill-indicator"
                animate={indicator}
                transition={{ type:'spring', stiffness:380, damping:30 }}
              />
            )}
            {navLinks.map((link, i) => (
              <motion.div key={link.path}
                initial={{ opacity:0, y:-8 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: i*0.055+0.2 }}
              >
                <Link
                  ref={el => { linkRefs.current[link.path] = el; }}
                  to={link.path}
                  className={`nav-link-item ${isActive(link.path) ? 'nav-active' : ''}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Actions */}
          <div style={{ display:'flex', alignItems:'center', gap:8, justifySelf:'end' }}>

            {/* Desktop */}
            <div className="desk-actions" style={{ display:'flex', alignItems:'center', gap:8 }}>
              <motion.button className="nav-lang-btn" onClick={toggleLang} whileTap={{ scale:0.93 }}>
                <Globe size={12} />
                {i18n.language === 'en' ? 'العربية' : 'English'}
              </motion.button>
              <motion.button className="nav-book-btn" whileTap={{ scale:0.95 }}>
                {t('hero.cta') || 'Explore Packages'} <ChevronRight size={13} />
              </motion.button>
            </div>

            {/* Mobile */}
            <div className="mob-actions" style={{ display:'flex', alignItems:'center', gap:8 }}>
              <motion.button
                className="nav-lang-btn"
                onClick={toggleLang}
                whileTap={{ scale:0.93 }}
                style={{ padding:'7px 10px' }}
              >
                <Globe size={14} />
              </motion.button>
              <motion.button
                className="nav-ham-btn"
                onClick={() => setDrawerOpen(true)}
                whileTap={{ scale:0.9 }}
              >
                <div className="ham-a" />
                <div className="ham-b" />
              </motion.button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div className="nav-drawer-overlay"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div className="nav-drawer"
              initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
              transition={{ type:'spring', stiffness:310, damping:32 }}
            >
              <div style={{
                position:'absolute', left:0, top:0, bottom:0, width:2,
                background:'linear-gradient(180deg,transparent,#c8a24d 20%,#c8a24d 80%,transparent)',
                opacity:0.45,
              }} />

              {/* Drawer header */}
              <div style={{
                padding:'20px 20px 16px',
                borderBottom:'1px solid rgba(200,162,77,0.1)',
                display:'flex', alignItems:'center', justifyContent:'space-between',
              }}>
                <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
                  <div style={{
                    background:'rgba(200,162,77,0.08)', border:'1px solid rgba(200,162,77,0.18)',
                    borderRadius:9, padding:'4px 5px', lineHeight:0,
                  }}>
                    <img src="/logo.png" alt="" style={{ height:32, width:'auto' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily:'Cinzel,serif', fontSize:12.5, fontWeight:700, color:'white', letterSpacing:'0.07em' }}>
                      AL-MOAZZEN <span style={{ color:'#c8a24d' }}>GROUP</span>
                    </div>
                    <div style={{ fontSize:8.5, color:'#c8a24d', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:2 }}>
                      {t('footer.tagline') || 'Spirituality & Excellence'}
                    </div>
                  </div>
                </Link>
                <motion.button
                  whileTap={{ scale:0.88, rotate:90 }}
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    width:32, height:32, borderRadius:8, flexShrink:0,
                    border:'1px solid rgba(200,162,77,0.2)',
                    background:'rgba(200,162,77,0.07)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer', color:'#c8a24d',
                  }}
                >
                  <X size={14} />
                </motion.button>
              </div>

              <div style={{ textAlign:'center', padding:'8px 0 4px', color:'rgba(200,162,77,0.18)', fontSize:16, letterSpacing:7, userSelect:'none' }}>
                ✦ ◆ ✦ ◆ ✦
              </div>

              <div style={{ flex:1, padding:'6px 14px', overflowY:'auto' }}>
                {navLinks.map((link, i) => (
                  <motion.div key={link.path}
                    initial={{ opacity:0, x:18 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:i*0.065+0.08 }}
                  >
                    <Link
                      to={link.path}
                      className={`drawer-link ${isActive(link.path) ? 'd-active' : ''}`}
                    >
                      <span>{link.label}</span>
                      <span className="drawer-num">{String(i+1).padStart(2,'0')}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.4 }}
                style={{ padding:'16px 16px 28px', borderTop:'1px solid rgba(200,162,77,0.1)' }}
              >
                <motion.button onClick={toggleLang} whileTap={{ scale:0.96 }} style={{
                  width:'100%', padding:'10px', borderRadius:50, marginBottom:9,
                  border:'1px solid rgba(200,162,77,0.2)', background:'rgba(200,162,77,0.06)',
                  color:'#c8a24d', fontFamily:'Cinzel,serif', fontSize:12.5,
                  fontWeight:600, letterSpacing:'0.06em', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:7,
                }}>
                  <Globe size={13} />
                  {i18n.language === 'en' ? 'العربية' : 'English'}
                </motion.button>
                <motion.button whileTap={{ scale:0.97 }} style={{
                  width:'100%', padding:'13px', borderRadius:50, border:'none',
                  background:'linear-gradient(135deg,#c8a24d,#e8c76a)',
                  color:'#1a1a1a', fontFamily:'Cinzel,serif', fontSize:13.5,
                  fontWeight:700, letterSpacing:'0.05em', cursor:'pointer', marginBottom:12,
                  display:'flex', alignItems:'center', justifyContent:'center', gap:7,
                }}>
                  {t('hero.cta') || 'Explore Packages'} <ChevronRight size={14} />
                </motion.button>
                <div style={{
                  display:'flex', alignItems:'center', justifyContent:'center', gap:7,
                  color:'rgba(255,255,255,0.3)', fontSize:11.5,
                  fontFamily:'Cinzel,serif', letterSpacing:'0.07em',
                }}>
                  <Phone size={11} />
                  <a href="tel:+966501234567" style={{ color:'#c8a24d', textDecoration:'none' }}>
                    +966 50 123 4567
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;