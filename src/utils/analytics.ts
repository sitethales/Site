// Google Analytics and tracking configuration
// Add your Google Analytics ID here when ready to track

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics tracking ID not found');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
    anonymize_ip: true, // LGPD compliance
    cookie_flags: 'SameSite=Strict;Secure'
  });
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', 'engagement', formName);
};

// Track clicks on contact buttons
export const trackContactClick = (method: string) => {
  trackEvent('contact_click', 'engagement', method);
};

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'contact', 'whatsapp_button');
};

// Track phone clicks
export const trackPhoneClick = () => {
  trackEvent('phone_click', 'contact', 'phone_button');
};

// Track email clicks
export const trackEmailClick = () => {
  trackEvent('email_click', 'contact', 'email_button');
};

// Track scroll depth
export const trackScrollDepth = () => {
  let maxScroll = 0;
  const milestones = [25, 50, 75, 100];
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && maxScroll < milestone) {
          trackEvent('scroll_depth', 'engagement', `${milestone}%`);
        }
      });
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Facebook Pixel (optional)
export const initFacebookPixel = (pixelId: string) => {
  if (!pixelId) return;
  
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
};

// Google Tag Manager (alternative to direct GA)
export const initGTM = (gtmId: string) => {
  if (!gtmId) return;
  
  // GTM script
  const script = document.createElement('script');
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;
  document.head.appendChild(script);
  
  // GTM noscript
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.appendChild(noscript);
};

// Performance tracking
export const trackPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (perfData) {
          const pageLoadTime = perfData.loadEventEnd - perfData.loadEventStart;
          const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
          
          trackEvent('page_load_time', 'performance', 'load_time', Math.round(pageLoadTime));
          trackEvent('dom_content_loaded', 'performance', 'dom_time', Math.round(domContentLoadedTime));
        }
      }, 0);
    });
  }
};

// LGPD Compliance helpers
export const getCookieConsent = (): boolean => {
  return localStorage.getItem('cookieConsent') === 'true';
};

export const setCookieConsent = (consent: boolean) => {
  localStorage.setItem('cookieConsent', consent.toString());
  if (consent) {
    initGA();
  }
};

export const shouldTrack = (): boolean => {
  return getCookieConsent() && GA_TRACKING_ID !== '';
};
