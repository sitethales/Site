import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Cookie } from 'lucide-react';
import { setCookieConsent, getCookieConsent } from '../utils/analytics';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = getCookieConsent();
    setIsVisible(!hasConsent);
  }, []);

  const handleAccept = () => {
    setCookieConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setCookieConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-4 md:right-4 md:left-auto md:max-w-md">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 text-sm">
                Cookies e Privacidade
              </h3>
            </div>
            <button
              onClick={handleDecline}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Este site utiliza cookies para melhorar sua experiência de navegação. 
            Ao continuar, você concorda com nossa política de privacidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={handleAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1 text-sm h-9"
            >
              Aceitar Cookies
            </Button>
            <Button 
              onClick={handleDecline}
              variant="outline"
              className="flex-1 text-sm h-9 border-gray-300 hover:bg-gray-50"
            >
              Recusar
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            Você pode alterar suas preferências a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
