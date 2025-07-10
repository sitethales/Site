import React from 'react';

const ForWho = () => {

   const targetAudience = [
    {
      title: "Empresas e organizações",
      description: "Para organizações que solicitam avaliações psicossociais em processos de admissão, retorno ao trabalho, mudança de função ou desligamento. Também inclui avaliações em recrutamento e seleção.",
      image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-OFwUiXE5rQRHFHmyeQ3A174tB4u8Bi.png&w=3840&q=75"
    },
    {
      title: "Advogados(as) e profissionais do Direito",
      description: "Atuação como assistente técnico e produção de pareceres psicológicos em processos judiciais. Apoio a ações nas áreas de família, cível e criminal.",
      image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-fK0f4JKk6zHX1amymK92K6T2OE3L3q.png&w=3840&q=75"
    },
    {
      title: "Público Geral",
      description: "Para quem precisa de avaliação para procedimentos cirúrgicos (bariátrica, laqueadura, vasectomia, redesignação sexual), processos seletivos e concursos, psicodiagnóstico, afirmação de gênero, entre outras finalidades clínicas, legais ou institucionais.",
      image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-WaLIdwjgmqnfE0GndCGu1R9ReZOal5.png&w=3840&q=75"
    },
    {
      title: "Profissionais da saúde e instituições médicas",
      description: "Atendimento a demandas clínicas que requerem parecer ou laudo psicológico como parte de tratamentos, como cirurgias, terapia hormonal para afirmação de gênero, reprodução assistida e outras intervenções médicas.",
      image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ViY6rawiI2uiV9tsy3QGZXdyngtXrC.png&w=3840&q=75"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-accent/20 to-white section-animate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-arima text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Direcionado Para Quem?
          </h2>
          <p className="font-montserrat text-gray-600 text-lg max-w-2xl mx-auto">
            Avaliações psicológicas realizadas com base ética, escuta qualificada e precisão técnica
voltadas a diferentes contextos e demandas.
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
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {audience.title}
                </h3>
                <p className="font-montserrat text-muted-foreground text-xs leading-relaxed px-2 md:px-0">
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