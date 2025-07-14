import { useEffect } from 'react';
import { X, FileText, Clock, Users, CheckCircle } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    process: string[];
    duration: string;
    format: string;
    includes: string[];
  } | null;
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  // Função para gerar mensagem personalizada baseada no serviço
  const generateWhatsAppMessage = (serviceTitle: string): string => {
    const baseMessage = "Olá! Meu nome é [NOME] e gostaria de agendar uma consulta para";
    
    // Mapeamento de títulos para mensagens específicas
    const serviceMessages: { [key: string]: string } = {
      "Avaliação Psicológica para Cirurgia Bariátrica": 
        `${baseMessage} avaliação psicológica para cirurgia bariátrica. Preciso do laudo psicológico como parte do protocolo pré-operatório. Gostaria de saber sobre disponibilidade de horários e valores. Obrigado(a)!`,
      
      "Avaliação Psicológica para Processos Seletivos e Concursos Públicos":
        `${baseMessage} avaliação psicológica para processo seletivo/concurso público. Preciso do laudo psicológico conforme edital específico. Poderia me informar sobre disponibilidade e procedimentos? Obrigado(a)!`,
      
      "Avaliação Psicológica para Procedimentos Cirúrgicos":
        `${baseMessage} avaliação psicológica para procedimento cirúrgico (laqueadura/vasectomia/redesignação sexual/cirurgia estética). Necessito do parecer psicológico conforme exigência médica. Gostaria de informações sobre agendamento. Obrigado(a)!`,
      
      "Avaliações Psicológicas no Contexto Jurídico":
        `${baseMessage} avaliação psicológica no contexto jurídico. Preciso de parecer técnico/laudo para processo judicial ou atuação como assistente técnico. Poderia me fornecer informações sobre o procedimento? Obrigado(a)!`,
      
      "Avaliação Psicossocial Ocupacional":
        `${baseMessage} avaliação psicossocial ocupacional. Necessito do parecer psicológico para fins trabalhistas/ocupacionais. Gostaria de saber sobre disponibilidade e valores. Obrigado(a)!`,
      
      "Outras Avaliações Específicas":
        `${baseMessage} avaliação psicológica específica (adoção/reprodução assistida/transplante/viagem com animal de apoio). Preciso do laudo conforme exigência legal. Poderia me informar sobre o procedimento? Obrigado(a)!`
    };

    // Retorna a mensagem específica ou uma mensagem genérica se não encontrar
    return serviceMessages[serviceTitle] || 
           `${baseMessage} avaliação psicológica. Gostaria de saber mais informações sobre o processo e agendar uma consulta. Obrigado(a)!`;
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-lg border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white p-5 border-b border-gray-200 z-10 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{service.title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Conteúdo com scroll interno minimalista */}
        <div className="overflow-y-auto p-5 bg-gray-50 scrollbar-minimal">
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-gray-700 text-base leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Process */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-900 font-medium">
                <FileText className="w-4 h-4 text-blue-500" />
                <h3 className="text-base font-medium">Como Funciona</h3>
              </div>
              
              <div className="space-y-2">
                {service.process.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 p-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-600 text-sm flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-green-500" />
                  <h4 className="text-sm font-medium text-gray-900">Duração</h4>
                </div>
                <p className="text-gray-600 text-sm">{service.duration}</p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-amber-500" />
                  <h4 className="text-sm font-medium text-gray-900">Formato</h4>
                </div>
                <p className="text-gray-600 text-sm">{service.format}</p>
              </div>
            </div>

            {/* Includes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-900">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <h3 className="text-base font-medium">O que está incluído</h3>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <ul className="space-y-2">
                  {service.includes.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA (fixo no rodapé) */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-lg">
          <div className="mb-3">
            <p className="text-xs text-gray-500 text-center">
              * Lembre-se de substituir [NOME] pelo seu nome na mensagem
            </p>
          </div>
          <a
            href={`https://wa.me/5548984136071?text=${encodeURIComponent(generateWhatsAppMessage(service.title))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-md font-medium transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.688"/>
            </svg>
            Agendar via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;