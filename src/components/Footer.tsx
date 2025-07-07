
const Footer = () => {
  return (
    <footer className="bg-cinza-escuro text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo e Copyright */}
          <div>
            <img
              src="https://thalesvalimangelo.com.br/wp-content/uploads/2022/10/ThalesValim_Logo-11-1.png"
              alt="Thales Valim Angelo"
              className="h-12 w-auto mx-auto md:mx-0 mb-4 opacity-80"
            />
            <p className="font-montserrat text-gray-300 text-sm">
              Copyright 2023 – Todos os direitos reservados.
            </p>
          </div>
          
          {/* Contato */}
          <div>
            <h4 className="font-arima font-semibold text-white mb-4">Contato</h4>
            <div className="space-y-2 text-sm">
              <p className="font-montserrat text-gray-300">
                📞 (48) 98413-6071
              </p>
              <p className="font-montserrat text-gray-300">
                ✉️ contato@thalesvalimangelo.com.br
              </p>
            </div>
          </div>
          
          {/* Informações Profissionais */}
          <div>
            <h4 className="font-arima font-semibold text-white mb-4">Informações</h4>
            <div className="space-y-2 text-sm">
              <p className="font-montserrat text-gray-300">
                📍 Florianópolis, SC
              </p>
              <p className="font-montserrat text-gray-300">
                CRP: [Número do registro]
              </p>
              <p className="font-montserrat text-gray-300">
                Especialista LGBTQIA+
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
