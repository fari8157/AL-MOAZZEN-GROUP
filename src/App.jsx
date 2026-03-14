import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Packages from './pages/Packages';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';


function App() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    // Set document direction based on language
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        
        <Route path="*" element={<div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <button onClick={() => window.location.href = '/'} className="btn btn-primary">Go Home</button>
        </div>} />
      </Routes>
    </Layout>
  );
}

export default App;
