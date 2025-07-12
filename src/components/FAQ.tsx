import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    question: "Qual é a duração de cada sessão?",
    answer: "Cada sessão tem duração de aproximadamente 1 hora, podendo variar conforme a necessidade específica de cada pessoa."
  },
  {
    question: "Os atendimentos são presenciais ou online?",
    answer: "Ambas as modalidades estão disponíveis. Os atendimentos presenciais acontecem no Centro de Florianópolis (SC), em local reservado e de fácil acesso. Também realizo atendimentos on-line para pessoas de qualquer lugar do Brasil e do exterior, com a mesma qualidade, ética e sigilo profissional."
  },
  {
    question: "Qual plataforma é utilizada para os atendimentos?",
    answer: "Utilizo Google Meet, Zoom ou WhatsApp, conforme a preferência e disponibilidade do paciente."
  },
  {
    question: "Como funcionam os valores das consultas?",
    answer: "Os valores seguem as diretrizes do CFP (Conselho Federal de Psicologia) e são discutidos individualmente com cada paciente."
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceito pagamentos via Pix e transferência bancária para maior comodidade dos pacientes."
  },
  {
    question: "É possível ter reembolso pelo plano de saúde?",
    answer: "Para isso, você deve verificar com a operadora se há cobertura e quais documentos são exigidos. Em caso de elegibilidade, emito nota fiscal e, se necessário, um relatório descritivo para fins de reembolso. A liberação e o valor dependem do seu plano."
  }
];

// Exportando diretamente a função como componente para permitir o Fast Refresh
export default function FAQ() {
  // Refs para elementos que serão animados
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const accordionRef = useRef(null);
  const faqItemsRef = useRef([]);
  
  // Configura as animações quando o componente é montado
  useEffect(() => {
    // Função para animar os elementos
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
        accordionRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6,
          onComplete: () => {
            // Garantir que o Accordion fique visível após a animação
            if (accordionRef.current) {
              gsap.set(accordionRef.current, { clearProps: "all" });
            }
          }
        },
        '-=0.2'
      );
      
      // Anima os itens do acordeão com efeito staggered
      // Adicionamos um pequeno delay para garantir que a animação do acordeão seja visível
      setTimeout(() => {
        gsap.fromTo(
          faqItemsRef.current.filter(Boolean),
          { 
            opacity: 0.5,
            y: 10
          },
          { 
            opacity: 1,
            y: 0,
            stagger: 0.1,
            clearProps: "transform",
            ease: 'power2.out'
          }
        );
      }, 300);
    };
    
    // Observer para animações com base no scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateElements();
          observer.disconnect(); // Desconecta o observer após a animação
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    });
    
    // Observa a seção
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Limpeza do observer
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="faq" 
      className="py-20 bg-muted/30"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className="text-center mb-16"
        >
          <h2 
            ref={titleRef}
            className="font-arima text-4xl md:text-5xl font-bold text-primary mb-4 opacity-0"
          >
            Perguntas Frequentes
          </h2>
          <p 
            ref={subtitleRef}
            className="font-montserrat text-muted-foreground text-lg max-w-2xl mx-auto opacity-0"
          >
            Esclareça suas dúvidas sobre o processo terapêutico
          </p>
        </div>

        <div 
          className="max-w-3xl mx-auto"
        >
          <div 
            ref={accordionRef}
            className="bg-card rounded-3xl shadow-warm border border-accent/20 overflow-hidden backdrop-blur-sm opacity-0"
          >
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-0"
            >
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-accent/20 last:border-b-0"
                  ref={(el) => {
                    if (el) faqItemsRef.current[index] = el;
                  }}
                >
                  <AccordionTrigger className="px-6 py-4 font-montserrat font-semibold text-primary hover:no-underline hover:bg-accent/10 transition-colors text-start">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="font-montserrat text-muted-foreground leading-relaxed text-start">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}