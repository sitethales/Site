// SEO utilities for better search engine optimization

export const generatePageTitle = (pageName?: string): string => {
  const baseName = "Thales Valim Angelo - Psicólogo Clínico";
  return pageName ? `${pageName} | ${baseName}` : `${baseName} | Avaliação Psicológica`;
};

export const generateMetaDescription = (pageDescription?: string): string => {
  const baseDescription = "Psicólogo especializado em Avaliação Psicológica e atendimento  . Elaboração de laudos, relatórios e pareceres psicológicos. Atendimento online e presencial em Santa Catarina.";
  return pageDescription || baseDescription;
};

export const generateKeywords = (additionalKeywords: string[] = []): string => {
  const baseKeywords = [
    'psicólogo',
    'avaliação psicológica',
    'laudo psicológico',
    'relatório psicológico',
    'psicologia clínica',
    'thales valim angelo',
    'santa catarina',
    'florianópolis',
    'psicólogo online',
    'atendimento psicológico',
    'psicólogo  ',
    'diversidade sexual',
    'identidade de gênero',
    'saúde mental',
    'terapia online',
    'consulta psicológica',
    'avaliação neuropsicológica',
    'parecer psicológico',
    'psicólogo credenciado',
    'CRP',
    'atendimento presencial',
    'psicoterapia',
    'orientação psicológica'
  ];
  
  return [...baseKeywords, ...additionalKeywords].join(', ');
};

export const generateStructuredData = (pageType: 'home' | 'service' | 'about' | 'contact' = 'home') => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Thales Valim Angelo",
    "description": "Psicólogo especializado em Avaliação Psicológica e atendimento  ",
    "image": "https://thalesvalempsi.com.br/lovable-uploads/c600054e-c290-4656-ae88-f910dbdea559.png",
    "url": "https://thalesvalempsi.com.br",
    "telephone": "+55-48-98413-6071",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Santa Catarina",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.5954,
      "longitude": -48.5480
    },
    "openingHours": "Mo-Fr 08:00-18:00",
    "serviceType": "Avaliação Psicológica",
    "areaServed": "Santa Catarina",
    "provider": {
      "@type": "Person",
      "name": "Thales Valim Angelo",
      "jobTitle": "Psicólogo",
      "alumniOf": "Universidade Federal de Santa Catarina",
      "description": "Psicólogo especializado em Avaliação Psicológica e atendimento  "
    }
  };

  switch (pageType) {
    case 'service':
      return {
        ...baseData,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Serviços Psicológicos",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Avaliação Psicológica",
                "description": "Elaboração de laudos, relatórios e pareceres psicológicos para diversas finalidades"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Atendimento  ",
                "description": "Atendimento psicológico especializado para a comunidade  "
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Consulta Online",
                "description": "Atendimento psicológico via videochamada"
              }
            }
          ]
        }
      };
    case 'about':
      return {
        ...baseData,
        "@type": "Person",
        "jobTitle": "Psicólogo Clínico",
        "worksFor": {
          "@type": "Organization",
          "name": "Consultório Particular"
        }
      };
    case 'contact':
      return {
        ...baseData,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-48-98413-6071",
          "contactType": "Customer Service",
          "areaServed": "BR",
          "availableLanguage": "Portuguese"
        }
      };
    default:
      return baseData;
  }
};

export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Arima:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);

  // Preload critical images
  const heroImage = new Image();
  heroImage.src = '/lovable-uploads/c600054e-c290-4656-ae88-f910dbdea559.png';
};

export const optimizeImages = () => {
  // Add lazy loading to images
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });
};

export const addBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  const existingScript = document.querySelector('script[data-type="breadcrumb"]');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('data-type', 'breadcrumb');
  script.textContent = JSON.stringify(breadcrumbData);
  document.head.appendChild(script);
};
