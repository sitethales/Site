import { useEffect, memo } from 'react';
import { SEOHead } from '../components/SEO/MetaTags';
import { useSecurityHeaders } from '../components/Security/CSPHeaders';
import { withLazyLoading } from '../components/Performance/LazyComponents';
import { optimizeImages } from '../utils/seo-utils';
import { trackPerformance } from '../utils/analytics';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import ForWho from '../components/ForWho';
import Schedule from '../components/Schedule';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';

// Services é a única seção pesada (33KB + grafo framer-motion) — mantém lazy
const Services = withLazyLoading(() => import('../components/Services'));

const Index = memo(() => {
  // Apply security headers
  useSecurityHeaders();

  useEffect(() => {
    // SEO optimizations
    optimizeImages();

    // Performance tracking
    trackPerformance();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      <Header />
      <Hero />
      <About />
      <Services />
      <ForWho />
      <Schedule />
      <FAQ />
      <Contact />
      <Footer />
      <CookieConsent />
    </div>
  );
});

export default Index;
