
import { useEffect, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEOHead } from '../components/SEO/MetaTags';
import { useSecurityHeaders } from '../components/Security/CSPHeaders';
import { withLazyLoading } from '../components/Performance/LazyComponents';
import Header from '../components/Header';
import Hero from '../components/Hero';

// Lazy load heavy components for better performance
const About = withLazyLoading(() => import('../components/About'));
const Services = withLazyLoading(() => import('../components/Services'));
const ForWho = withLazyLoading(() => import('../components/ForWho'));
const Schedule = withLazyLoading(() => import('../components/Schedule'));
const FAQ = withLazyLoading(() => import('../components/FAQ'));
const Contact = withLazyLoading(() => import('../components/Contact'));
const Footer = withLazyLoading(() => import('../components/Footer'));

gsap.registerPlugin(ScrollTrigger);

const Index = memo(() => {
  // Apply security headers
  useSecurityHeaders();

  useEffect(() => {
    // Performance optimized GSAP animations
    const sections = gsap.utils.toArray('.section-animate');
    const triggers: ScrollTrigger[] = [];
    
    sections.forEach((section: any) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                // Mark as completed to avoid re-animation
                section.classList.add('animation-completed');
              }
            }
          );
        },
        once: true // Performance: only trigger once
      });
      triggers.push(trigger);
    });

    // Cleanup function
    return () => {
      triggers.forEach(trigger => trigger.kill());
      ScrollTrigger.refresh();
    };
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
    </div>
  );
});

export default Index;
