
const Footer = () => {
  return (
    <footer className="bg-cinza-escuro text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo e Copyright */}
          <div>
            <img
              src="/logo-header.webp"
              alt="Thales Valim Angelo"
              className="h-12 w-auto mx-auto md:mx-0 mb-4 opacity-80"
              loading="lazy"
            />
            <p className="font-montserrat text-gray-300 text-sm">
              Copyright {new Date().getFullYear()} – Todos os direitos reservados. Desenvolvido por João Vitor Franco
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
                ✉️ thalesvalimpsi@gmail.com
              </p>
            </div>
          </div>
          
          {/* Informações Profissionais */}
          <div>
            <h4 className="font-arima font-semibold text-white mb-4">Informações</h4>
            <div className="space-y-2 text-sm">
              <p className="font-montserrat text-gray-300">
                📍
                Praça XV de Novembro, 153, Florianópolis, SC
              </p>
              <p className="font-montserrat text-gray-300">
                CRP: 12/22939
              </p>
              <p className="font-montserrat text-gray-300">
                Especialização em Avaliação Psicológica
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
