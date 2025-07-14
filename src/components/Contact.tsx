  import React, { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MessageCircle, Phone, Clock, MapPin } from 'lucide-react';

const ContactForm = memo(() => {
  const whatsappNumber = "5548984136071"; // Substitua pelo seu número real
  const whatsappMessage = "Olá! Gostaria de agendar uma consulta.";

  // Refs para elementos GSAP
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const whatsappButtonRef = useRef<HTMLButtonElement>(null);
  const hourCardRef = useRef<HTMLDivElement>(null);
  const phoneCardRef = useRef<HTMLDivElement>(null);
  const locationCardRef = useRef<HTMLDivElement>(null);
  const instructionsRef = useRef<HTMLDivElement>(null);

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppHover = () => {
    gsap.to(whatsappButtonRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleWhatsAppLeave = () => {
    gsap.to(whatsappButtonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    // Criando contexto GSAP para limpeza automática
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          force3D: true,
          clearProps: "transform"
        }
      });

      // Animação do título
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
      // Animação do subtítulo
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      )
      // Animação do card principal
      .fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      // Animação do botão WhatsApp
      .fromTo(
        whatsappButtonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.2"
      )
      // Animação dos cards de informação
      .fromTo(
        [hourCardRef.current, phoneCardRef.current],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 },
        "-=0.3"
      )
      // Animação do card de localização
      .fromTo(
        locationCardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      )
      // Animação das instruções
      .fromTo(
        instructionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.1"
      );
    });

    return () => ctx.revert(); // Limpeza automática
  }, []);

  return (
    <div id='contato' className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-arima font-bold text-foreground mb-4"
          >
            Entre em Contato
          </h1>
          <p
            ref={subtitleRef}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-montserrat"
          >
            Entre em contato pelo WhatsApp para agendar sua consulta
          </p>
        </div>

        {/* Card Principal */}
        <div
          ref={cardRef}
          className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/50 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            {/* WhatsApp Button */}
            <div className="text-center mb-8">
              <button
                ref={whatsappButtonRef}
                onClick={handleWhatsAppClick}
                onMouseEnter={handleWhatsAppHover}
                onMouseLeave={handleWhatsAppLeave}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-montserrat font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-6 w-6" />
                Conversar no WhatsApp
              </button>
            </div>

            {/* Informações de Contato */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Horário de Atendimento */}
              <div
                ref={hourCardRef}
                className="bg-accent/30 backdrop-blur-sm rounded-xl p-6 border border-border/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground font-montserrat">Horário de Atendimento</h3>
                </div>
                <div className="space-y-2 font-montserrat">
                  <p className="text-foreground"><span className="font-medium">Segunda a Sexta:</span> 08:00 - 18:00</p>
                  <p className="text-muted-foreground text-sm">Sabado: Fechado</p>
                  <p className="text-muted-foreground text-sm">Domingo: Fechado</p>
                </div>
              </div>

              {/* Telefone */}
              <div
                ref={phoneCardRef}
                className="bg-accent/30 backdrop-blur-sm rounded-xl p-6 border border-border/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground font-montserrat">Telefone</h3>
                </div>
                <div className="font-montserrat">
                  <p className="text-foreground font-medium text-lg">(48) 98413-6071</p>
                  <p className="text-muted-foreground text-sm">Disponível no WhatsApp</p>
                </div>
              </div>
            </div>

            {/* Instruções */}
            <div
              ref={instructionsRef}
              className="mt-8 text-center"
            >
              <p className="text-muted-foreground font-montserrat">
                Clique no botão do WhatsApp acima para iniciar uma conversa comigo.
                <br />
                Respondo rapidamente e ajudo você a esclarecer suas dúvidas!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
