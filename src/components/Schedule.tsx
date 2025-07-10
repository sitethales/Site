import { useRef, useEffect } from 'react';
import { Clock, XCircle, CalendarCheck, HeartPulse, PhoneCall, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

const Schedule = () => {
  // Refs para elementos que serão animados
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const scheduleItemsRef = useRef([]);
  const serviceItemsRef = useRef([]);
  const noticeRef = useRef(null);
  const buttonRef = useRef(null);

  // Dados dos horários
  const schedule = [
    { period: "Dias de Semana", days: "Segunda à Sexta", hours: "8h às 22h", available: true, icon: Clock },
    { period: "Sábado", days: "Sábado", hours: "Fechado", available: false, icon: XCircle },
    { period: "Domingo", days: "Domingo", hours: "Fechado", available: false, icon: XCircle }
  ];

  // Dados dos serviços
  const services = [
    {
      id: 1,
      name: "Agendamento Flexível",
      description: "Horários adaptados às suas necessidades",
      icon: CalendarCheck
    },
    {
      id: 2,
      name: "Atendimento Prioritário",  
      description: "Clientes que agendam com antecedência têm prioridade",
      icon: HeartPulse
    },
    {
      id: 3,
      name: "Atendimento Telefônico",
      description: "Disponível por telefone fora do expediente",
      icon: PhoneCall
    },
    {
      id: 4,
      name: "Horários Estendidos",
      description: "Disponibilidade de horários estendidos sob consulta",
      icon: Clock3
    }
  ];

  // Configura as animações quando o componente é montado
  useEffect(() => {
    // Animações únicas otimizadas ao invés de múltiplas animações separadas
    const animateElements = () => {
      // Usa um timeline para gerenciar todas as animações juntas
      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
          duration: 0.4
        }
      });
      
      // Adiciona animações ao timeline de forma sequencial
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0 },
        '-=0.3'  // Começando um pouco antes da anterior terminar
      )
      .fromTo(
        [leftColumnRef.current, rightColumnRef.current],
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.15  // Pequeno intervalo entre cada coluna
        },
        '-=0.2'
      )
      .fromTo(
        scheduleItemsRef.current.filter(Boolean),
        { opacity: 0, y: 8 },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.08,  // Intervalo reduzido para fluidez
          clearProps: "transform"  // Limpa propriedades após animação
        },
        '-=0.2'
      )
      .fromTo(
        serviceItemsRef.current.filter(Boolean),
        { opacity: 0, y: 8 },
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.08,
          clearProps: "transform"
        },
        '-=0.3'
      )
      .fromTo(
        [noticeRef.current, buttonRef.current].filter(Boolean),
        { opacity: 0 },
        { 
          opacity: 1,
          stagger: 0.1
        },
        '-=0.2'
      );
    };
    
    // Observer para animações com base no scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateElements();
          observer.disconnect(); // Desconecta o observer completamente após a animação
        }
      });
    }, {
      threshold: 0.15, // Aumentando um pouco para iniciar quando mais da seção estiver visível
      rootMargin: "0px 0px -10% 0px" // Inicia a animação um pouco antes da seção entrar totalmente na viewport
    });

    // Guarda referência ao elemento para a limpeza
    const sectionElement = sectionRef.current;
    
    // Observa a seção
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    // Limpeza do observer
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="horarios"
      className="py-16 bg-gradient-warm"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="font-arima text-4xl md:text-5xl font-bold text-primary mb-3 opacity-0"
          >
            Atendimento
          </h2>
          <p 
            ref={subtitleRef}
            className="font-montserrat text-muted-foreground text-lg max-w-2xl mx-auto opacity-0"
          >
            Horários flexíveis para sua conveniência
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Horários simplificados */}
          <div 
            ref={leftColumnRef}
            className="bg-card rounded-xl shadow-card border border-border overflow-hidden h-full opacity-0"
          >
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold text-primary text-center mb-6">
                Horários
              </h3>
              
              <div className="space-y-4">
                {schedule.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      ref={el => scheduleItemsRef.current[index] = el}
                      className={`p-4 rounded-lg border flex items-center justify-between opacity-0 ${
                        item.available 
                          ? 'bg-primary/5 border-primary/20' 
                          : 'bg-muted/30 border-border/50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          item.available ? 'bg-primary/10 text-primary' : 'bg-muted/60 text-muted-foreground'
                        }`}>
                          <Icon size={18} strokeWidth={1.5} />
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-foreground">
                            {item.period}
                          </h4>
                          
                          <p className="font-montserrat text-xs text-muted-foreground">
                            {item.days}
                          </p>
                        </div>
                      </div>
                      
                      <p className={`font-montserrat font-medium text-sm md:text-base ${
                        item.available ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {item.hours}
                      </p>
                    </div>
                  )
                })}
              </div>
              
              <div 
                ref={noticeRef}
                className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/20 text-center opacity-0"
              >
                <div className="flex justify-center items-center gap-2">
                  <CalendarCheck size={18} className="text-primary" />
                  <p className="font-montserrat text-xs text-foreground">
                    Agendamento por Email ou WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna Direita - Serviços com design minimalista */}
          <div 
            ref={rightColumnRef}
            className="bg-card rounded-xl shadow-card border border-border overflow-hidden h-full backdrop-blur-sm opacity-0"
          >
            <div className="px-4 py-8 md:p-8 h-full flex flex-col">
              <h3 className="text-xl font-semibold text-foreground text-center mb-6">
                Facilidades
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 flex-grow">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div 
                      key={service.id}
                      ref={el => serviceItemsRef.current[index] = el}
                      className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg border border-border/50 opacity-0"
                    >
                      <div className="p-2 bg-primary/10 rounded-full mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-medium text-foreground text-base mb-1">{service.name}</h4>
                      <p className="font-montserrat text-xs text-muted-foreground">{service.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-auto pt-4 text-center">
                <Button 
                  ref={buttonRef}
                  variant="animated" 
                  size="lg"
                  className="px-8 py-3 opacity-0"
                  onClick={() => {
                    const element = document.getElementById("contato");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Agendar Consulta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;