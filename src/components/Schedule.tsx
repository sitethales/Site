import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, XCircle, CalendarCheck, HeartPulse, PhoneCall } from 'lucide-react';
import { AnimatedList } from '@/components/magicui/animated-list';

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Schedule = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  
  useEffect(() => {
    // Configurar a animação apenas quando o componente estiver montado
    const ctx = gsap.context(() => {
      // Animação para o título
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Animação para a coluna esquerda
      gsap.from(leftColumnRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      // Animação para a coluna direita
      gsap.from(rightColumnRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const schedule = [
    { period: "Dias de Semana", days: "Segunda à Sexta", hours: "8h às 22h", available: true, icon: Clock },
    { period: "Sábado", days: "Sábado", hours: "Fechado", available: false, icon: XCircle },
    { period: "Domingo", days: "Domingo", hours: "Fechado", available: false, icon: XCircle }
  ];

  const services = [
    {
      id: 1,
      name: "Agendamento Flexível",
      description: "Horários adaptados às suas necessidades",
      icon: <CalendarCheck className="w-5 h-5 text-blue-600" />
    },
    {
      id: 2,
      name: "Atendimento Prioritário",
      description: "Clientes que agendam com antecedência têm prioridade",
      icon: <HeartPulse className="w-5 h-5 text-blue-600" />
    },
    {
      id: 3,
      name: "Atendimento Telefônico",
      description: "Disponível por telefone fora do expediente",
      icon: <PhoneCall className="w-5 h-5 text-blue-600" />
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 section-animate"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef}
          className="font-sans text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12"
        >
          Horários de Atendimento
        </h2>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Horários */}
          <div 
            ref={leftColumnRef}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full"
          >
            <div className="p-8">
              <h3 className="font-sans text-xl font-semibold text-gray-800 text-center mb-8">
                Agenda Semanal
              </h3>
              
              <div className="grid gap-6">
                {schedule.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border transition-all duration-300 flex items-center ${
                        item.available 
                          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-full mr-4 flex items-center justify-center ${
                        item.available ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      
                      <div>
                        <h4 className="font-sans font-semibold text-gray-900 text-lg">
                          {item.period}
                        </h4>
                        
                        <p className="font-sans text-sm text-gray-600">
                          {item.days}
                        </p>
                        
                        <p className={`font-sans font-semibold ${
                          item.available ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {item.hours}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="flex justify-center items-center gap-2">
                  <CalendarCheck size={20} className="text-yellow-600" />
                  <p className="text-center font-sans text-sm text-yellow-700">
                    Para agendar uma consulta, entre em contato através dos canais disponíveis
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna Direita - Serviços com AnimatedList */}
          <div 
            ref={rightColumnRef}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full"
          >
            <div className="px-4 py-8 md:p-8 h-full flex flex-col">
              <h3 className="font-sans text-xl font-semibold text-gray-800 text-center mb-8">
                Nossos Serviços
              </h3>
              
              <div className="flex-grow flex justify-center">
                <AnimatedList>
                  {services.map((service) => (
                    <div 
                      key={service.id} 
                      className="flex items-center p-4 md:p-6 border-b border-gray-300 last:border-b-0 bg-blue-100 rounded-lg"
                    >
                      <div className="mr-4">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-sans font-semibold text-gray-900">{service.name}</h4>
                        <p className="font-sans text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </AnimatedList>
              </div>
              
              <div className="mt-auto pt-6 text-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-sans font-medium shadow-sm hover:shadow-md transition-all">
                  Agendar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;