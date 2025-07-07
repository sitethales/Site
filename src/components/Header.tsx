import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      // Animação inicial do header
      gsap.fromTo(headerRef.current, 
        { y: -100, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out" 
        }
      );
      
      // Animação do logo
      gsap.fromTo(logoRef.current, 
        { scale: 0.8, opacity: 0 }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: "back.out(1.7)", 
          delay: 0.2 
        }
      );
      
      // Animação dos itens de navegação
      gsap.fromTo(navRef.current?.children || [], 
        { y: -20, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.1, 
          ease: "power2.out",
          delay: 0.4
        }
      );
      
      // Efeito de scroll
      gsap.to(headerRef.current, {
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        boxShadow: isScrolled ? '0 4px 20px -4px hsl(0 0% 0% / 0.1)' : 'none',
        duration: 0.3,
        ease: "power2.out",
        immediateRender: false
      });
    });

    return () => ctx.current?.revert();
  }, [isScrolled]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    
    if (mobileMenuRef.current) {
      // Animação de entrada do menu
      gsap.fromTo(mobileMenuRef.current, 
        { 
          height: 0, 
          opacity: 0 
        }, 
        { 
          height: 'auto', 
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.out" 
        }
      );
      
      // Animação dos itens do menu
      gsap.fromTo(mobileMenuItemsRef.current, 
        { 
          x: -30, 
          opacity: 0 
        }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.3, 
          stagger: 0.08, 
          delay: 0.15, 
          ease: "power2.out" 
        }
      );
    }
  };

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      // Animação de saída dos itens do menu
      gsap.to(mobileMenuItemsRef.current, 
        { 
          x: -30, 
          opacity: 0, 
          duration: 0.2, 
          stagger: 0.05, 
          ease: "power2.in" 
        }
      );
      
      // Animação de fechamento do menu
      gsap.to(mobileMenuRef.current, 
        { 
          height: 0, 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.in",
          onComplete: () => setIsMobileMenuOpen(false)
        }
      );
    } else {
      setIsMobileMenuOpen(false);
    }
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
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-white/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            ref={logoRef}
            src="https://thalesvalimangelo.com.br/wp-content/uploads/2022/10/ThalesValim_Logo-11-1.png"
            alt="Thales Valim Angelo"
            className="h-16 md:h-16 w-auto transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => scrollToSection('home')}
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
          <a
            href="https://wa.me/5548984136071"
            target="_blank"
            rel="noopener noreferrer"
            className=" hidden md:inline bg-primary text-primary-foreground px-3 py-1.5 md:px-5 md:py-2 rounded-xl font-montserrat font-medium text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-elegant whitespace-nowrap"
          >
            Agendar
          </a>

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
        className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-border shadow-xl overflow-hidden"
        style={{ 
          height: 0, 
          opacity: 0,
          willChange: 'height, opacity' 
        }}
      >
        <nav className="container mx-auto px-4 py-4 space-y-2">
          {['home', 'sobre', 'servicos', 'faq', 'contato'].map((section, index) => (
            <button
              key={section}
              ref={el => mobileMenuItemsRef.current[index] = el}
              onClick={() => scrollToSection(section)}
              className="block w-full text-left font-montserrat text-foreground hover:text-primary transition-all duration-300 py-3 px-2 hover:bg-accent/10 rounded-lg capitalize"
              style={{ opacity: 0, transform: 'translateX(-30px)' }}
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
            className="mt-4 block w-full text-center bg-primary text-primary-foreground py-3 rounded-xl font-montserrat font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-elegant"
            style={{ opacity: 0, transform: 'translateX(-30px)' }}
            ref={el => {
              if (el) mobileMenuItemsRef.current[5] = el as any;
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