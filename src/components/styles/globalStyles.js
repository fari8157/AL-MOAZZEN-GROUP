// src/styles/globalStyles.js
// Inject once at app entry point — import this in main.jsx or App.jsx

export function injectGlobalStyles() {
  // ── Google Fonts ──
  if (!document.getElementById('almoazzen-fonts')) {
    const link = document.createElement('link');
    link.id = 'almoazzen-fonts';
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Cinzel:wght@400;600;700&family=Tajawal:wght@300;400;500;700&display=swap';
    document.head.appendChild(link);
  }

  // ── Global CSS ──
  if (!document.getElementById('almoazzen-styles')) {
    const style = document.createElement('style');
    style.id = 'almoazzen-styles';
    style.textContent = `
      :root {
        --emerald:       #1a4731;
        --emerald-mid:   #1e5c3a;
        --emerald-light: #2d7a52;
        --gold:          #c8a24d;
        --gold-bright:   #e8c76a;
        --gold-pale:     #f0dfa0;
        --ivory:         #faf6ee;
        --charcoal:      #1a1a1a;
        --warm-white:    #fffdf8;
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: 'Tajawal', sans-serif;
        background: var(--ivory);
        color: var(--charcoal);
        overflow-x: hidden;
      }

      /* ── Typography helpers ── */
      .font-display { font-family: 'Cinzel', serif; }
      .font-serif   { font-family: 'Cormorant Garamond', serif; }

      /* ── Islamic geometric pattern background ── */
      .islamic-bg {
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a24d' fill-opacity='0.07'%3E%3Cpath d='M30 0l8.66 5v10L30 20l-8.66-5V5L30 0zm0 40l8.66 5v10L30 60l-8.66-5V45L30 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }

      /* ── Gradient mesh background ── */
      .mesh-bg {
        background:
          radial-gradient(ellipse at 20% 50%, rgba(26,71,49,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(200,162,77,0.10) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 80%, rgba(26,71,49,0.10) 0%, transparent 60%),
          var(--ivory);
      }

      /* ── Noise texture overlay ── */
      .noise::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        pointer-events: none;
        opacity: 0.4;
      }

      /* ── Gold shimmer text ── */
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      .gold-shimmer {
        background: linear-gradient(90deg, #c8a24d 0%, #f0dfa0 40%, #c8a24d 60%, #e8c76a 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }

      /* ── Gold divider ── */
      .gold-divider {
        width: 80px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #c8a24d, transparent);
        margin: 16px auto;
      }

      /* ── Floating particles ── */
      @keyframes float-up {
        0%   { transform: translateY(0) rotate(0deg);    opacity: 0.8; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }
      .particle {
        position: absolute;
        pointer-events: none;
        animation: float-up linear infinite;
      }

      /* ── Pulse glow ── */
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(200,162,77,0.30); }
        50%       { box-shadow: 0 0 40px rgba(200,162,77,0.70), 0 0 80px rgba(200,162,77,0.30); }
      }
      .glow-gold { animation: pulse-glow 3s ease-in-out infinite; }

      /* ── Slow rotation ── */
      @keyframes rotate-slow {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .rotate-slow { animation: rotate-slow 30s linear infinite; }

      /* ── Scroll-indicator bounce ── */
      @keyframes bounce-soft {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(8px); }
      }
      .bounce-soft { animation: bounce-soft 2s ease-in-out infinite; }

      /* ── Button shine sweep ── */
      .btn-shine { position: relative; overflow: hidden; }
      .btn-shine::after {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent);
        transition: left 0.5s ease;
      }
      .btn-shine:hover::after { left: 100%; }

      /* ── Animated stat number ── */
      .stat-number {
        font-family: 'Cinzel', serif;
        background: linear-gradient(135deg, #c8a24d, #f0dfa0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* ── Package card ── */
      .pkg-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        transition: all 0.5s cubic-bezier(0.34,1.56,0.64,1);
      }
      .pkg-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(200,162,77,0.05), rgba(26,71,49,0.05));
        opacity: 0;
        transition: opacity 0.3s;
      }
      .pkg-card:hover::before { opacity: 1; }
      .pkg-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 40px 80px rgba(26,71,49,0.12);
      }

      /* ── Testimonial card ── */
      .testimonial-card {
        background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,246,238,0.9));
        backdrop-filter: blur(20px);
        border-radius: 24px;
        border: 1px solid rgba(200,162,77,0.2);
      }

      /* ── Navbar glass ── */
      .navbar-glass {
        background: rgba(250,246,238,0.85);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(200,162,77,0.15);
      }

      /* ── Hero overlay ── */
      .hero-overlay {
        background: linear-gradient(
          135deg,
          rgba(26,71,49,0.92) 0%,
          rgba(26,71,49,0.75) 40%,
          rgba(26,71,49,0.40) 70%,
          rgba(200,162,77,0.15) 100%
        );
      }

      /* ── Star-field dots ── */
      .star-field {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 30% 50%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.9) 0%, transparent 100%),
          radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.7) 0%, transparent 100%),
          radial-gradient(1px 1px at 50% 80%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 90% 30%, rgba(255,255,255,0.8) 0%, transparent 100%),
          radial-gradient(2px 2px at 15% 65%, rgba(200,162,77,0.9) 0%, transparent 100%),
          radial-gradient(2px 2px at 75% 45%, rgba(200,162,77,0.7) 0%, transparent 100%);
      }

      /* ── Footer bg ── */
      .footer-bg { background: #0a1f14; }

      /* ── Scrollbar ── */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track  { background: var(--ivory); }
      ::-webkit-scrollbar-thumb  { background: var(--gold); border-radius: 3px; }

      /* ── Section label pill ── */
      .section-label {
        display: inline-block;
        font-size: 11px;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: #c8a24d;
        font-family: 'Cinzel', serif;
        background: rgba(200,162,77,0.08);
        padding: 6px 16px;
        border-radius: 50px;
        border: 1px solid rgba(200,162,77,0.2);
        margin-bottom: 20px;
      }
    `;
    document.head.appendChild(style);
  }
}
