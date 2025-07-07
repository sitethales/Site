import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqItems = [
  {
    question: "Qual é a duração de cada sessão?",
    answer: "Cada sessão tem duração de aproximadamente 1 hora, podendo variar conforme a necessidade específica de cada paciente."
  },
  {
    question: "Os atendimentos são presenciais ou online?",
    answer: "Atualmente ofereço apenas atendimentos online, proporcionando maior comodidade e acesso aos meus serviços."
  },
  {
    question: "Qual plataforma é utilizada para os atendimentos?",
    answer: "Utilizo Google Meet, Zoom ou WhatsApp, conforme a preferência e disponibilidade do paciente."
  },
  {
    question: "Como funcionam os valores das consultas?",
    answer: "Os valores seguem as diretrizes do CFP (Conselho Federal de Psicologia) e são discutidos individualmente com cada paciente."
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceito pagamentos via Pix e transferência bancária para maior comodidade dos pacientes."
  },
  {
    question: "É possível ter reembolso pelo plano de saúde?",
    answer: "Sim, é possível solicitar reembolso através do recibo fornecido após cada sessão, junto com pedido médico contendo CID."
  }
];

const FAQ = () => {
return (
    <section id="faq" className="py-20 bg-muted/30 section-animate">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-arima text-4xl md:text-5xl font-bold text-primary mb-4">
            Perguntas Frequentes
          </h2>
          <p className="font-montserrat text-muted-foreground text-lg max-w-2xl mx-auto">
            Esclareça suas dúvidas sobre o processo terapêutico
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-card rounded-3xl shadow-warm border border-accent/20 overflow-hidden backdrop-blur-sm">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-0"
            >
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-accent/20 last:border-b-0"
                >
                  <AccordionTrigger className="px-6 py-4 font-montserrat font-semibold text-primary hover:no-underline hover:bg-accent/10 transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="font-montserrat text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default FAQ;