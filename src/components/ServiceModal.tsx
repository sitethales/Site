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
          <a
            href="https://wa.me/5548984136071"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-md font-medium transition-colors duration-300"
          >
            Agendar Consulta
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;