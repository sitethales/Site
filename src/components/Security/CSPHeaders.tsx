import { useEffect } from 'react';

// Security headers and input sanitization
export const useSecurityHeaders = () => {
  useEffect(() => {
    // Add security headers via meta tags (for static sites)
    const addMetaTag = (name: string, content: string) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (!existing) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Security headers
    addMetaTag('referrer', 'strict-origin-when-cross-origin');
    addMetaTag('robots', 'index, follow');
    
    // X-Frame-Options equivalent
    if (window.self !== window.top) {
      window.top?.location.replace(window.location.href);
    }
  }, []);
};

// Input sanitization utility
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Phone number validation and sanitization
export const sanitizePhoneNumber = (phone: string): string => {
  return phone.replace(/[^\d\s\-\+\(\)]/g, '').trim();
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};