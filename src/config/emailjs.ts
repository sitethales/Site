// 📧 Configuração do EmailJS
// Substitua os valores abaixo pelas suas chaves do EmailJS

export const EMAILJS_CONFIG = {
  // Substitua pelos seus valores do EmailJS:
  SERVICE_ID: 'service_8obvlxd',     // ← Substitua pelo seu Service ID
  TEMPLATE_ID: 'template_csgs96r',   // ← Substitua pelo seu Template ID
  PUBLIC_KEY: 'BX6aLqKSrlOgerznb'    // ← Substitua pela sua Public Key
};

// 📝 INSTRUÇÕES:
// 1. Acesse https://www.emailjs.com/
// 2. Crie uma conta e configure seu serviço de email
// 3. Crie um template de email
// 4. Obtenha suas chaves e substitua os valores acima
// 5. Certifique-se de que o template está configurado para enviar para SEU email

// 🔧 DADOS DO FORMULÁRIO:
// O formulário enviará os seguintes dados:
// - name: Nome do cliente
// - email: Email do cliente
// - phone: Telefone do cliente
// - subject: Assunto da mensagem
// - message: Mensagem do cliente

// 📋 TEMPLATE RECOMENDADO:
// Para: seu-email@gmail.com
// Assunto: Nova mensagem do site - {{subject}}
// 
// Olá,
// 
// Você recebeu uma nova mensagem através do seu site:
// 
// Nome: {{name}}
// Email: {{email}}
// Telefone: {{phone}}
// Assunto: {{subject}}
// 
// Mensagem:
// {{message}}
// 
// Para responder, use o email: {{email}}
// 
// ---
// Mensagem enviada através do site thalesvalempsi.com.br
