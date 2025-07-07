import { useState } from 'react';
import { Brain, FileText, Users, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import ServiceModal from './ServiceModal';

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BrainIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 transition-all duration-500 group-hover:opacity-60">
      <defs>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d="M100 40c-20 0-35 15-35 35 0 5 1 10 3 14-8 2-14 9-14 18 0 12 8 22 20 22 2 0 4 0 6-1 3 8 11 14 20 14 5 0 9-2 13-5 4 3 8 5 13 5 9 0 17-6 20-14 2 1 4 1 6 1 12 0 20-10 20-22 0-9-6-16-14-18 2-4 3-9 3-14 0-20-15-35-35-35z" fill="url(#brainGrad)" />
      <circle cx="85" cy="70" r="3" fill="hsl(var(--primary))" opacity="0.4" />
      <circle cx="115" cy="70" r="3" fill="hsl(var(--primary))" opacity="0.4" />
      <path d="M80 90 Q100 100 120 90" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  );

  const DocumentIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 transition-all duration-500 group-hover:opacity-60">
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="60" y="40" width="80" height="120" rx="4" fill="url(#docGrad)" />
      <rect x="70" y="60" width="60" height="4" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="70" y="75" width="45" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="70" y="87" width="55" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="70" y="99" width="40" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      <circle cx="125" cy="130" r="12" fill="hsl(var(--accent))" opacity="0.6" />
      <path d="M120 130 L125 135 L135 125" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
    </svg>
  );

  const JusticeIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 transition-all duration-500 group-hover:opacity-60">
      <defs>
        <linearGradient id="justiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <line x1="100" y1="50" x2="100" y2="150" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.4" />
      <line x1="70" y1="70" x2="130" y2="70" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
      <rect x="60" y="75" width="20" height="15" fill="url(#justiceGrad)" />
      <rect x="120" y="80" width="20" height="15" fill="url(#justiceGrad)" />
      <line x1="70" y1="75" x2="70" y2="90" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
      <line x1="130" y1="75" x2="130" y2="95" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="45" r="8" fill="hsl(var(--primary))" opacity="0.3" />
    </svg>
  );

  const CareerIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 transition-all duration-500 group-hover:opacity-60">
      <defs>
        <linearGradient id="careerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d="M50 120 Q75 80 100 100 Q125 120 150 80" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" opacity="0.4" />
      <circle cx="50" cy="120" r="8" fill="url(#careerGrad)" />
      <circle cx="100" cy="100" r="6" fill="hsl(var(--secondary))" opacity="0.6" />
      <circle cx="150" cy="80" r="10" fill="url(#careerGrad)" />
      <polygon points="145,75 150,70 155,75 150,85" fill="hsl(var(--primary))" opacity="0.5" />
      <circle cx="80" cy="140" r="4" fill="hsl(var(--primary-glow))" opacity="0.4" />
      <circle cx="120" cy="130" r="4" fill="hsl(var(--primary-glow))" opacity="0.4" />
    </svg>
  );

  const services = [
    {
      Icon: Brain,
      name: "Psicodiagnóstico",
      description: "Avaliação completa para identificação de transtornos como TDAH, Burnout e TEPT",
      className: "lg:col-span-1",
      gradient: "from-primary/5 to-primary/10",
      illustration: <BrainIllustration />,
      details: {
        title: "Psicodiagnóstico",
        description: "Avaliação psicológica completa para identificação de transtornos mentais, fornecendo diagnósticos precisos e planos de tratamento personalizados.",
        process: [
          "Entrevista inicial detalhada",
          "Aplicação de testes psicológicos",
          "Análise comportamental",
          "Relatório psicológico completo",
          "Devolutiva com orientações"
        ],
        duration: "4 a 6 sessões",
        format: "Online ou presencial",
        includes: [
          "Entrevista clínica",
          "Bateria de testes",
          "Relatório detalhado",
          "Orientações para tratamento"
        ]
      }
    },
    {
      Icon: FileText,
      name: "Avaliação Compulsória",
      description: "Avaliações obrigatórias para procedimentos médicos e concursos públicos",
      className: "lg:col-span-1",
      gradient: "from-accent/20 to-accent/40",
      illustration: <DocumentIllustration />,
      details: {
        title: "Avaliação Psicológica Compulsória",
        description: "Avaliações psicológicas obrigatórias para procedimentos médicos, concursos públicos e outras situações que exigem parecer psicológico oficial.",
        process: [
          "Agendamento conforme cronograma",
          "Entrevista psicológica específica",
          "Aplicação de instrumentos",
          "Emissão de laudo oficial"
        ],
        duration: "2 a 3 sessões",
        format: "Preferencialmente presencial",
        includes: [
          "Entrevista direcionada",
          "Testes específicos",
          "Laudo psicológico oficial",
          "Documentação técnica"
        ]
      }
    },
    {
      Icon: Users,
      name: "Psicologia Jurídica",
      description: "Assessoria para questões jurídicas e pareceres técnicos",
      className: "lg:col-span-1",
      gradient: "from-muted/30 to-muted/60",
      illustration: <JusticeIllustration />,
      details: {
        title: "Psicologia Jurídica",
        description: "Assessoria psicológica para questões jurídicas, incluindo pareceres técnicos, análise de laudos e fundamentação teórica para processos legais.",
        process: [
          "Análise documental",
          "Estudo do caso",
          "Pesquisa teórica",
          "Elaboração de parecer"
        ],
        duration: "Variável conforme complexidade",
        format: "Remoto com reuniões online",
        includes: [
          "Análise crítica de laudos",
          "Elaboração de quesitos",
          "Parecer fundamentado",
          "Assessoria especializada"
        ]
      }
    },
    {
      Icon: Heart,
      name: "Orientação Profissional",
      description: "Autoconhecimento e descoberta vocacional para carreira",
      className: "lg:col-span-1",
      gradient: "from-secondary/20 to-secondary/40",
      illustration: <CareerIllustration />,
      details: {
        title: "Orientação Profissional",
        description: "Processo de autoconhecimento e descoberta vocacional para auxiliar na escolha profissional ou redirecionamento de carreira.",
        process: [
          "Avaliação do perfil pessoal",
          "Exploração de aptidões",
          "Conhecimento do mercado",
          "Elaboração de plano de carreira"
        ],
        duration: "6 a 8 sessões",
        format: "Online via Google Meet",
        includes: [
          "Testes de interesse",
          "Dinâmicas de autoconhecimento",
          "Informação profissional",
          "Plano de desenvolvimento"
        ]
      }
    }
  ];

  const openModal = (service: any) => {
    setSelectedService(service.details);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="servicos" className="py-20 bg-muted/30 section-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="font-arima text-4xl md:text-5xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Serviços Oferecidos
            </motion.h2>
            <motion.p 
              className="font-montserrat text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Atendimento psicológico especializado com abordagem humanizada e acolhedora
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <BentoGrid className="lg:grid-cols-2">
              {services.map((service) => (
                <BentoCard 
                  key={service.name}
                  name={service.name}
                  description={service.description}
                  className={service.className}
                  onClick={() => openModal(service)}
                  cta="Saiba mais"
                  background={
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30`} />
                      <div className="absolute inset-0 blur-sm group-hover:blur-none transition-all duration-500">
                        {service.illustration}
                      </div>
                    </div>
                  }
                  Icon={service.Icon}
                />
              ))}
            </BentoGrid>
          </motion.div>
        </div>
      </section>

      <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </>
  );
};

export default Services;