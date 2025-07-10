import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHead = ({
  title = "Thales Valim Angelo - Psicólogo Especialista em Avaliação Psicológica",
  description = "Psicólogo especializado em Avaliação Psicológica com abordagem ética, técnica e acolhedora. Elaboração de laudos, relatórios e pareceres psicológicos para diversas finalidades.",
  image = "/lovable-uploads/c600054e-c290-4656-ae88-f910dbdea559.png",
  url = "https://thalesvalimangelo.com.br",
  type = "website"
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', property);
        } else {
          tag.setAttribute('name', property);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', 'psicólogo, avaliação psicológica, laudo psicológico, relatório psicológico, psicologia clínica, thales valim angelo, santa catarina, florianópolis');
    updateMetaTag('author', 'Thales Valim Angelo');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('language', 'pt-BR');
    updateMetaTag('robots', 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', 'pt_BR', true);
    updateMetaTag('og:site_name', 'Thales Valim Angelo - Psicólogo', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO tags
    updateMetaTag('theme-color', '#3b4458');
    updateMetaTag('msapplication-TileColor', '#3b4458');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

    // Structured data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Thales Valim Angelo",
      "description": description,
      "image": image,
      "url": url,
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
      "provider": {
        "@type": "Person",
        "name": "Thales Valim Angelo",
        "jobTitle": "Psicólogo",
        "alumniOf": "Universidade Federal de Santa Catarina",
        "description": "Psicólogo especializado em Avaliação Psicológica"
      }
    };

    let jsonLd = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);

  }, [title, description, image, url, type]);

  return null;
};