import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const SEOFAQSection = () => {
  const faqs = [
    {
      question: "O que é avaliação psicológica e quando é necessária?",
      answer: "A avaliação psicológica é um processo técnico-científico que visa compreender o funcionamento psicológico de uma pessoa através de testes, entrevistas e observações. É necessária para processos judiciais, concursos públicos, cirurgias bariátricas, porte de arma, mudança de nome e gênero, entre outros.",
      keywords: ["avaliação psicológica", "laudo psicológico", "quando fazer avaliação psicológica"]
    },
    {
      question: "Qual a diferença entre laudo, relatório e parecer psicológico?",
      answer: "O laudo psicológico é um documento técnico detalhado resultante de avaliação psicológica. O relatório é mais descritivo e narrativo, usado em acompanhamentos. O parecer é uma opinião técnica específica sobre uma questão psicológica pontual.",
      keywords: ["laudo psicológico", "relatório psicológico", "parecer psicológico", "diferenças"]
    },
    {
      question: "Como funciona o atendimento psicológico online?",
      answer: "O atendimento online é realizado via videochamada em plataforma segura. Oferece a mesma qualidade do presencial, com vantagens como flexibilidade de horário e economia de tempo. Ideal para consultas, orientações e seguimentos terapêuticos.",
      keywords: ["psicólogo online", "consulta online", "terapia online", "atendimento virtual"]
    },
    {
      question: "Você atende a comunidade LGBTQIA+?",
      answer: "Sim, sou especializado em atendimento à comunidade LGBTQIA+ com abordagem afirmativa e acolhedora. Ofereço suporte para questões de identidade de gênero, orientação sexual, processos de transição e outros desafios específicos da comunidade.",
      keywords: ["psicólogo lgbtqia+", "atendimento lgbtqia+", "identidade de gênero", "orientação sexual"]
    },
    {
      question: "Quanto tempo demora uma avaliação psicológica?",
      answer: "O processo de avaliação psicológica geralmente leva de 3 a 5 sessões, dependendo da complexidade e finalidade. Inclui entrevistas, aplicação de testes psicológicos, análise dos resultados e elaboração do documento final.",
      keywords: ["tempo avaliação psicológica", "quantas sessões", "duração laudo psicológico"]
    },
    {
      question: "Você atende em Santa Catarina?",
      answer: "Sim, atendo em Santa Catarina com foco na região de Florianópolis e Grande Florianópolis. Oferço atendimento presencial e online, facilitando o acesso para pessoas de toda a região.",
      keywords: ["psicólogo santa catarina", "psicólogo florianópolis", "atendimento santa catarina"]
    },
    {
      question: "Como agendar uma consulta ou avaliação?",
      answer: "Você pode agendar através do WhatsApp (48) 98413-6071 ou ligação telefônica. Respondo rapidamente para esclarecer dúvidas e encontrar o melhor horário para seu atendimento.",
      keywords: ["agendar consulta", "marcar avaliação", "contato psicólogo"]
    },
    {
      question: "Qual o valor dos serviços psicológicos?",
      answer: "Os valores variam conforme o tipo de serviço (consulta, avaliação, elaboração de laudo). Entre em contato para informações detalhadas sobre investimento e formas de pagamento. Priorizo acessibilidade e qualidade.",
      keywords: ["preço psicólogo", "valor consulta", "custo avaliação psicológica"]
    },
    {
      question: "Você tem experiência com avaliações para processos judiciais?",
      answer: "Sim, tenho experiência em avaliações psicológicas para diversos processos judiciais, incluindo guarda de menores, capacidade civil, insanidade mental, entre outros. Elaboro documentos técnicos conforme normas do CFP.",
      keywords: ["avaliação judicial", "laudo para justiça", "perícia psicológica"]
    },
    {
      question: "O sigilo profissional é garantido?",
      answer: "Absolutamente. O sigilo profissional é um princípio fundamental da psicologia. Todas as informações compartilhadas são confidenciais e protegidas pelo Código de Ética Profissional do Psicólogo.",
      keywords: ["sigilo profissional", "confidencialidade", "ética psicólogo"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes sobre Avaliação Psicológica
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Esclarecemos as principais dúvidas sobre <strong>avaliação psicológica</strong>, 
            <strong> atendimento LGBTQIA+</strong> e <strong>serviços psicológicos</strong> em Santa Catarina.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  <p>{faq.answer}</p>
                  <div className="mt-4 text-xs text-gray-400">
                    <strong>Palavras-chave:</strong> {faq.keywords.join(', ')}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Não encontrou sua pergunta? Entre em contato conosco!
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://wa.me/5548984136071" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </a>
            <a 
              href="tel:+5548984136071"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ligar Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOFAQSection;
