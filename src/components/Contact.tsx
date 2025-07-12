import React, { useState, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { User, MessageCircle, Check, CheckCircle } from 'lucide-react';
import { sanitizeInput, isValidEmail, sanitizePhoneNumber } from './Security/CSPHeaders';
import { EMAILJS_CONFIG } from '../config/emailjs';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactForm = memo(() => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const steps = [
    { 
      title: 'Informações', 
      description: 'Seus dados de contato',
      icon: 'user'
    },
    { 
      title: 'Mensagem', 
      description: 'Detalhes da sua consulta',
      icon: 'message-circle'
    },
    { 
      title: 'Revisão', 
      description: 'Confirme os dados',
      icon: 'check'
    },
    { 
      title: 'Enviado!', 
      description: 'Mensagem recebida',
      icon: 'check-circle'
    },
  ];

  const validateStep = useCallback((step: number) => {
    const newErrors: FormErrors = {};
    
    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
      if (!formData.email.trim()) {
        newErrors.email = 'Email é obrigatório';
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Email inválido';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Telefone é obrigatório';
      } else if (!/^(\d{10,11})$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Telefone inválido';
      }
    }
    
    if (step === 1) {
      if (!formData.subject.trim()) newErrors.subject = 'Assunto é obrigatório';
      if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';
      else if (formData.message.length < 10) newErrors.message = 'Mensagem muito curta';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Formatação do telefone
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      let formattedValue = '';
      
      if (digits.length <= 11) {
        if (digits.length > 2) {
          formattedValue = `(${digits.slice(0, 2)}) `;
          if (digits.length > 2) {
            formattedValue += digits.slice(2, 7);
            if (digits.length > 7) {
              formattedValue += `-${digits.slice(7, 11)}`;
            }
          }
        } else {
          formattedValue = digits;
        }
      } else {
        formattedValue = formData.phone;
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateStep(activeStep)) {
      setIsSending(true);

      try {
        // Sanitize form data before sending
        const sanitizedData = {
          name: sanitizeInput(formData.name),
          email: sanitizeInput(formData.email),
          phone: sanitizePhoneNumber(formData.phone),
          subject: sanitizeInput(formData.subject),
          message: sanitizeInput(formData.message),
        };

        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          sanitizedData,
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        setIsSending(false);
        setIsSent(true);
        setActiveStep(3);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setErrors({});
        
        setTimeout(() => {
          setIsSent(false);
          setActiveStep(0);
        }, 5000);
      } catch (error) {
        console.error('Failed to send email:', error);
        setIsSending(false);
        alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
      }
    }
  }, [formData, activeStep, validateStep]);

  return (
    <div id='contato' className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-arima font-bold text-foreground mb-4"
          >
            Entre em Contato
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-montserrat"
          >
            Estou disponível para tirar dúvidas e agendar consultas
          </motion.p>
        </div>

        {/* Stepper Refinado */}
        <div className="mb-8 md:mb-12 px-4 md:px-0">
          <div className="flex justify-between items-center relative max-w-3xl mx-auto">
            {/* Linha de progresso de fundo */}
            <div className="absolute top-6 md:top-8 left-0 right-0 h-0.5 bg-border/50 -z-10 mx-8 md:mx-12">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                initial={{ width: '0%' }}
                animate={{ 
                  width: activeStep === 0 ? '0%' : 
                          activeStep === 1 ? '33.33%' : 
                          activeStep === 2 ? '66.66%' : '100%' 
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center z-10 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3 transition-all duration-300 shadow-card ${
                    index < activeStep 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : index === activeStep
                      ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20'
                      : 'bg-card text-muted-foreground border-2 border-border'
                  }`}
                >
                  {index < activeStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="h-5 w-5 md:h-6 md:w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.icon === 'user' && <User className="h-5 w-5 md:h-6 md:w-6" />}
                      {step.icon === 'message-circle' && <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />}
                      {step.icon === 'check' && <Check className="h-5 w-5 md:h-6 md:w-6" />}
                      {step.icon === 'check-circle' && <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />}
                    </motion.div>
                  )}
                </motion.div>
                
                <div className="text-center max-w-[80px] md:max-w-none">
                  <p className={`font-montserrat font-semibold text-xs md:text-sm transition-colors duration-300 ${
                    index <= activeStep ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground/70 hidden md:block mt-1">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/50 overflow-hidden"
        >
          <form ref={formRef} onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Passo 1: Informações de Contato */}
              {activeStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Seus dados de contato</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-montserrat font-medium text-foreground">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-montserrat ${
                          errors.name ? 'border-destructive' : 'border-border hover:border-primary/50'
                        }`}
                        placeholder="Digite seu nome completo"
                      />
                      {errors.name && <p className="mt-1 text-destructive text-sm font-montserrat">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-montserrat font-medium text-foreground">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-montserrat ${
                          errors.email ? 'border-destructive' : 'border-border hover:border-primary/50'
                        }`}
                        placeholder="seu@email.com"
                      />
                      {errors.email && <p className="mt-1 text-destructive text-sm font-montserrat">{errors.email}</p>}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-montserrat font-medium text-foreground">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-montserrat ${
                          errors.phone ? 'border-destructive' : 'border-border hover:border-primary/50'
                        }`}
                        placeholder="(00) 00000-0000"
                      />
                      {errors.phone && <p className="mt-1 text-destructive text-sm font-montserrat">{errors.phone}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Passo 2: Mensagem */}
              {activeStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Sua mensagem</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-montserrat font-medium text-foreground">
                        Assunto *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-montserrat ${
                          errors.subject ? 'border-destructive' : 'border-border hover:border-primary/50'
                        }`}
                        placeholder="Qual o motivo do seu contato?"
                      />
                      {errors.subject && <p className="mt-1 text-destructive text-sm font-montserrat">{errors.subject}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-montserrat font-medium text-foreground">
                        Mensagem *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className={`w-full px-4 py-3 border rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-montserrat resize-none ${
                          errors.message ? 'border-destructive' : 'border-border hover:border-primary/50'
                        }`}
                        placeholder="Descreva em detalhes sua dúvida ou necessidade..."
                      />
                      {errors.message && <p className="mt-1 text-destructive text-sm font-montserrat">{errors.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Passo 3: Revisão */}
              {activeStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Confira seus dados</h3>
                  </div>
                  
                  <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-border/30">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground text-sm font-montserrat">Nome</p>
                        <p className="font-medium text-foreground font-montserrat">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm font-montserrat">Email</p>
                        <p className="font-medium text-foreground font-montserrat">{formData.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground text-sm font-montserrat">Telefone</p>
                        <p className="font-medium text-foreground font-montserrat">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm font-montserrat">Assunto</p>
                        <p className="font-medium text-foreground font-montserrat">{formData.subject}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground text-sm font-montserrat">Mensagem</p>
                      <p className="font-medium text-foreground font-montserrat whitespace-pre-line">{formData.message}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Passo 4: Confirmação */}
              {activeStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-block mb-6"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-primary mb-4">Mensagem Enviada!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto font-montserrat">
                    Obrigado pelo seu contato. Responderei o mais breve possível.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botões de navegação */}
            {(activeStep < 3) && (
              <div className="flex justify-between items-center p-6 md:p-8 border-t border-border/50 bg-accent/20">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className={`px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 font-montserrat font-medium ${
                    activeStep === 0 
                      ? 'text-muted-foreground cursor-not-allowed' 
                      : 'text-primary hover:bg-primary/10 hover:scale-105'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Voltar
                </button>
                
                {activeStep < 2 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-card font-montserrat font-medium"
                  >
                    Próximo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSending}
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 disabled:opacity-70 shadow-card font-montserrat font-medium"
                  >
                    {isSending ? (
                      <>
                        Enviando...
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
