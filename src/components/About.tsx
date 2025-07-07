
const About = () => {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-white to-accent/20 section-animate">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image with overlay design */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://thalesvalimangelo.com.br/wp-content/uploads/2024/09/BAB2831-1-843x1024.jpg"
                alt="Thales Valim Angelo"
                className="w-full h-[650px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Floating info card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <span className="text-2xl font-bold text-primary">5+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Anos de experiência</p>
                    <p className="text-sm text-gray-600">Atendimento especializado LGBTQIA+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Clean content layout */}
          <div className="space-y-8">
            <div>
              <h2 className="font-arima text-4xl md:text-5xl font-bold text-primary mb-4">
                Thales Valim Angelo
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
              <p className="text-lg text-gray-600 font-light">
                Psicólogo Clínico especializado em Gestalt-terapia
              </p>
            </div>
            
            {/* Key highlights */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Especialização LGBTQIA+</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Atendimento humanizado e acolhedor em um espaço seguro e livre de julgamentos.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Abordagem Gestalt-terapia</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Priorizando o aqui e agora, integração de experiências e desenvolvimento da consciência.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Avaliação Psicológica</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Acompanhamento especializado para tratamentos de afirmação de gênero.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
