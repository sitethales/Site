import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const AnimatedContactButton = () => {
  const buttonRef = useRef(null);
  const envelopeRef = useRef(null);
  const phoneRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const envelope = envelopeRef.current;
    const phone = phoneRef.current;
    const gradient = gradientRef.current;
    
    // Configuração inicial
    gsap.set(phone, { scale: 0, transformOrigin: 'center' });
    gsap.set(gradient, { opacity: 0, scale: 0.95 });
    
    // Timeline principal
    const tl = gsap.timeline({ paused: true });
    
    // Animação no hover
    tl.to(envelope, {
      scale: 0,
      duration: 0.3,
      ease: 'power2.in'
    }, 0)
    .to(phone, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, 0.1)
    .to(gradient, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'sine.out'
    }, 0);
    
    // Event handlers
    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();
    
    button.addEventListener('mouseenter', onEnter);
    button.addEventListener('mouseleave', onLeave);
    
    return () => {
      button.removeEventListener('mouseenter', onEnter);
      button.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <a
      href="https://wa.me/5548984136071"
      target="_blank"
      rel="noopener noreferrer"
      ref={buttonRef}
      className="relative overflow-hidden inline-block bg-primary text-white px-8 py-3 rounded-xl font-medium"
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 6px rgba(79, 70, 229, 0.1)'
      }}
    >
      {/* Gradiente animado sutil */}
      <div 
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-r from-[#a78bfa]/20 via-[#7dd3fc]/30 to-[#a78bfa]/20"
        style={{
          backgroundSize: '200% 100%',
          zIndex: 0,
          opacity: 0,
          transform: 'scale(0.95)',
        }}
      ></div>
      
      {/* Conteúdo do botão */}
      <span className="relative z-10 flex items-center gap-3">
        <span>Contato</span>
        
        <div className="relative w-6 h-6">
          <svg ref={envelopeRef} className="absolute inset-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6L12 13L22 6" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
          
          <svg ref={phoneRef} className="absolute inset-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 4H9L11 9L8.5 10.5C9.5 12.5 11.5 14.5 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" />
            <path d="M15 7C15.5304 7 16.0391 7.21071 16.4142 7.58579C16.7893 7.96086 17 8.46957 17 9" />
            <path d="M15 3C16.5913 3 18.1174 3.63214 19.2426 4.75736C20.3679 5.88258 21 7.4087 21 9" />
          </svg>
        </div>
      </span>
    </a>
  );
};