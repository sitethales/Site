import React from 'react';

const ForWho = () => {

   const targetAudience = [
    {
      title: "LGBTQIA+",
      description: "LGBTQIA+ que buscam apoio especializado em um espaço seguro.",
      image: "/image-s0P0rbypZSGqrsWNgD2DTpsxcfsrMJ.png"
    },
    {
      title: "Famílias",
      description: "Familiares de LGBTQIA+ com dúvidas sobre identidade, orientação sexual ou gênero.",
      image: "/image-iSpZcrHmxvZHZPeIwv3rttJNK7TGqu.png"
    },
    {
      title: "Público Geral",
      description: "Adolescentes, adultos e idosos procurando acompanhamento para saúde mental (ansiedade, depressão, etc.).",
      image: "/image-WaLIdwjgmqnfE0GndCGu1R9ReZOal5.png"
    },
    {
      title: "Afirmação de Gênero",
      description: "Quem precisa de avaliação psicológica para tratamentos de afirmação de gênero (hormonioterapia, cirurgias).",
      image: "/image-6YCD688sjOC1kmBZgegAoQNGOCBOuQ.webp"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-accent/20 to-white section-animate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-arima text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Para Quem É
          </h2>
          <p className="font-montserrat text-gray-600 text-lg max-w-2xl mx-auto">
            Atendimento especializado e acolhedor para diferentes públicos e necessidades
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {targetAudience.map((audience, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="relative mb-6">
                {/* Container da imagem */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={audience.image}
                    alt={audience.title}
                    className=" h-40 md:h-48 lg:h-56 w-auto object-contain rounded-2xl mx-auto"
                    style={{
                      transition: 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)', 
                    }}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-arima text-xl font-semibold text-primary mb-3">
                  {audience.title}
                </h3>
                <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWho;