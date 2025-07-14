import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { AnimatedContactButton } from './ui/button-perso';
import { useIsMobile } from '@/hooks/use-mobile';

// Melhorando o tipo para o ref do menu mobile para aceitar tanto botões quanto links
type MobileMenuItemElement = HTMLButtonElement | HTMLAnchorElement;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuItemsRef = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
  const ctx = useRef<gsap.Context | null>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const isMobile = useIsMobile();

  // Debounce para melhorar o desempenho do evento de scroll
  useEffect(() => {
    let scrollTimeout: number;
    
    const handleScroll = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = window.requestAnimationFrame(() => {
        const scrolled = window.scrollY > 10;
        if (isScrolled !== scrolled) {
          setIsScrolled(scrolled);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(scrollTimeout);
    };
  }, [isScrolled]);

  // useLayoutEffect para iniciar as animações antes do paint para evitar flashes
  useLayoutEffect(() => {
    // Inicializa as animações apenas uma vez na montagem
    ctx.current = gsap.context(() => {
      // Animação inicial do header - usando transform em vez de top para performance
      gsap.fromTo(headerRef.current, 
        { 
          yPercent: -100, 
          opacity: 0,
          force3D: true // Força aceleração por hardware
        }, 
        { 
          yPercent: 0, 
          opacity: 1, 
          duration: isMobile ? 0.6 : 0.8, 
          ease: "power2.out",
          clearProps: "transform" // Limpa as props após a animação para performance
        }
      );
      
      // Animação do logo - usando transformações que acionam o GPU
      gsap.fromTo(logoRef.current, 
        { 
          scale: 0.8, 
          opacity: 0,
          force3D: true
        }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: "back.out(1.7)", 
          delay: 0.15,
          clearProps: "transform" 
        }
      );
      
      // Animação dos itens de navegação
      if (navRef.current?.children && navRef.current.children.length > 0) {
        gsap.fromTo(Array.from(navRef.current.children), 
          { 
            y: -20, 
            opacity: 0,
            force3D: true
          }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.3, 
            stagger: 0.05, 
            ease: "power2.out",
            delay: 0.3,
            clearProps: "transform"
          }
        );
      }
    });

    return () => ctx.current?.revert();
  }, [isMobile]); // Dependência do isMobile para ajustar as animações baseado no tipo de dispositivo
  
  // Efeito separado para o scroll - melhor performance e animação melhorada
  useEffect(() => {
    // Cancela qualquer animação anterior para evitar acumulação
    if (scrollTween.current) {
      scrollTween.current.kill();
    }
    
    // Cria nova animação com valores atualizados e efeito de fade melhorado
    if (headerRef.current) {
      // Define um atraso menor quando estiver scrollando para baixo (fade in mais rápido)
      // e um atraso maior quando voltar ao topo (fade out mais suave)
      const delay = isScrolled ? 0 : 0.1;
      
      scrollTween.current = gsap.to(headerRef.current, {
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.97)' : 'rgba(255, 255, 255, 0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        boxShadow: isScrolled ? '0 4px 20px -4px hsl(0 0% 0% / 0.12)' : 'none',
        duration: isScrolled ? 0.35 : 0.5, // Duração maior para o fade out
        ease: isScrolled ? "power2.out" : "power2.inOut", // Easing diferente para cada direção
        delay: delay, // Aplica o atraso configurado
        overwrite: "auto" // Sobrescreve automaticamente animações conflitantes
      });
      
      // Efeito sutil de escala para enfatizar a transição
      gsap.to(headerRef.current, {
        scale: isScrolled ? 1 : 0.999,
        duration: 0.2,
        clearProps: isScrolled ? "" : "scale", // Limpa a propriedade apenas no fade out
        ease: "sine.out"
      });
    }
  }, [isScrolled]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  const openMobileMenu = () => {
    // Primeiro define o estado para evitar problemas de timing
    setIsMobileMenuOpen(true);
    
    // Dá um pequeno tempo para o DOM atualizar antes de animar
    setTimeout(() => {
      if (mobileMenuRef.current) {
        // Primeiro configura o estado inicial para evitar flashes
        gsap.set(mobileMenuRef.current, { 
          height: 'auto',
          opacity: 0,
          visibility: 'hidden',
        });
        
        // Obtém a altura real para animação precisa
        const height = mobileMenuRef.current.offsetHeight;
        
        // Reconfigura para o estado inicial da animação
        gsap.set(mobileMenuRef.current, { 
          height: 0,
          opacity: 0, 
          visibility: 'visible',
          overflow: 'hidden',
        });
        
        // Anima para a altura final
        gsap.to(mobileMenuRef.current, { 
          height: height,
          opacity: 1,
          duration: 0.3, 
          ease: "power2.out",
          onComplete: () => {
            // Limpa as propriedades restritivas após a animação
            gsap.set(mobileMenuRef.current, { overflow: 'visible', height: 'auto' });
          }
        });
        
        // Anima os itens do menu um por um
        const menuItems = mobileMenuItemsRef.current.filter(Boolean);
        gsap.fromTo(menuItems, 
          { 
            x: -15, 
            opacity: 0
          }, 
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.2, 
            stagger: 0.05, 
            delay: 0.1,
            ease: "power1.out",
            clearProps: "transform"
          }
        );
      }
    }, 10); // Um pequeno delay para garantir que o DOM foi atualizado
  };

  const closeMobileMenu = () => {
    if (!mobileMenuRef.current) {
      setIsMobileMenuOpen(false);
      return;
    }
    
    // Primeiro anima os itens do menu
    const menuItems = mobileMenuItemsRef.current.filter(Boolean);
    gsap.to(menuItems, 
      { 
        x: -15, 
        opacity: 0, 
        duration: 0.15, 
        stagger: 0.03, 
        ease: "power1.in"
      }
    );
    
    // Primeiro obtém a altura atual
    const currentHeight = mobileMenuRef.current.offsetHeight;
    
    // Define para essa altura explícita para evitar saltos
    gsap.set(mobileMenuRef.current, { 
      height: currentHeight,
      overflow: 'hidden' 
    });
    
    // Então anima para altura zero
    gsap.to(mobileMenuRef.current, 
      { 
        height: 0, 
        opacity: 0, 
        duration: 0.25, 
        delay: 0.1,
        ease: "power1.in",
        onComplete: () => {
          // Atualiza o estado depois que a animação termina
          setIsMobileMenuOpen(false);
        }
      }
    );
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 will-change-transform will-change-background"
    >
      <div className="container mx-auto px-6 py-4 md:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            ref={logoRef}
            src="/logo-header.webp"
            alt="Thales Valim Angelo"
            className="h-[80px] md:h-24 w-auto transition-transform duration-300 hover:scale-105 cursor-pointer will-change-transform"
            onClick={() => scrollToSection('home')}
            loading="eager"
          />
        </div>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {['home', 'sobre', 'servicos', 'faq', 'contato'].map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`font-montserrat text-sm xl:text-base font-medium transition-all duration-300 hover:text-primary hover:scale-105 capitalize`}
            >
              {section === 'home' ? 'Home' : 
               section === 'sobre' ? 'Sobre' :
               section === 'servicos' ? 'Serviços' :
               section === 'faq' ? 'FAQ' : 'Contato'}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="hidden lg:inline">
            <AnimatedContactButton /> 
          </div>
            

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 hover:bg-background/10 text-foreground`}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`lg:hidden bg-white/95 backdrop-blur-lg border-t border-border shadow-xl ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        style={{ 
          height: 'auto', 
          opacity: 0,
          willChange: 'opacity, height',
          transform: 'translateZ(0)' // Força aceleração por hardware
        }}
      >
        <nav className="container mx-auto px-4 py-4 space-y-2">
          {['home', 'sobre', 'servicos', 'faq', 'contato'].map((section, index) => (
            <button
              key={section}
              ref={el => mobileMenuItemsRef.current[index] = el}
              onClick={() => scrollToSection(section)}
              className="block w-full text-left font-montserrat text-foreground hover:text-primary transition-transform duration-300 py-3 px-2 hover:bg-accent/10 rounded-lg capitalize"
              style={{ opacity: 0 }}
            >
              {section === 'home' ? 'Home' : 
               section === 'sobre' ? 'Sobre' :
               section === 'servicos' ? 'Serviços' :
               section === 'faq' ? 'FAQ' : 'Contato'}
            </button>
          ))}
          
          <a
            href="https://wa.me/5548984136071"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full text-center bg-primary text-primary-foreground py-3 rounded-xl font-montserrat font-medium transition-transform duration-300 hover:scale-[1.02] hover:shadow-elegant will-change-transform"
            style={{ opacity: 0 }}
            ref={el => {
              if (el) mobileMenuItemsRef.current[5] = el as HTMLAnchorElement;
            }}
          >
            Agendar Consulta
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;