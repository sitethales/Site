import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
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
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="shadow-lg border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-gray-800">
            🍪 Cookies e Privacidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription className="text-xs text-gray-600">
            Este site utiliza cookies para melhorar sua experiência de navegação 
            e analisar o tráfego. Ao continuar navegando, você concorda com nossa 
            política de cookies.
          </CardDescription>
          <div className="flex space-x-2">
            <Button 
              onClick={handleAccept}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
            >
              Aceitar
            </Button>
            <Button 
              onClick={handleDecline}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Recusar
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Você pode alterar suas preferências a qualquer momento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
