# 📧 Configuração do EmailJS para Receber Emails

## 🔧 Passos para Configurar o EmailJS (Receber Emails)

### 1. Criar Conta no EmailJS
1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Faça login no dashboard

### 2. Configurar Serviço de Email
1. No dashboard, vá para **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. **IMPORTANTE**: Use o email onde você QUER RECEBER as mensagens
5. Configure com suas credenciais:
   - **Gmail**: Use app password (senha de app)
   - **Outros**: Use credenciais normais

### 3. Criar Template de Email
1. Vá para **"Email Templates"**
2. Clique em **"Create New Template"**
3. **IMPORTANTE**: Configure o template para enviar para o SEU email
4. Use este template:

```html
Para: seu-email@gmail.com (SEU EMAIL AQUI)
Assunto: Nova mensagem do site - {{subject}}

Olá Thales,

Você recebeu uma nova mensagem através do seu site:

===============================
DADOS DO CLIENTE:
===============================
Nome: {{name}}
Email: {{email}}
Telefone: {{phone}}
Assunto: {{subject}}

===============================
MENSAGEM:
===============================
{{message}}

===============================
Para responder, use o email: {{email}}
===============================

---
Mensagem enviada através do site thalesvalempsi.com.br
Data: {{date}}
```

### 4. Configurar o Destinatário
**MUITO IMPORTANTE**: No template, certifique-se de que:
- O campo "To" está configurado com SEU email
- O campo "From" pode ser o email do seu serviço
- O campo "Reply-To" deve ser: `{{email}}` (email do cliente)

### 5. Obter as Chaves Necessárias

Após a configuração, você precisará de 3 informações:

1. **Service ID**: Encontrado na seção "Email Services"
2. **Template ID**: Encontrado na seção "Email Templates" 
3. **Public Key**: Encontrado em "Account" > "General"

### 6. Atualizar o Código

No arquivo `src/components/Contact.tsx`, substitua as linhas 105-109:

```typescript
// SUBSTITUIR ESTAS LINHAS:
await emailjs.send(
  'SEU_SERVICE_ID',      // ← Cole aqui seu Service ID
  'SEU_TEMPLATE_ID',     // ← Cole aqui seu Template ID
  sanitizedData,
  'SUA_PUBLIC_KEY'       // ← Cole aqui sua Public Key
);
```

### 6. Exemplo de Configuração

```typescript
// Exemplo com suas chaves:
await emailjs.send(
  'service_abc123',      // Seu Service ID
  'template_xyz789',     // Seu Template ID
  sanitizedData,
  'user_123456789'       // Sua Public Key
);
```

## 🔒 Segurança

- ✅ As chaves do EmailJS são seguras para usar no frontend
- ✅ Não coloque senhas de email no código
- ✅ Use app passwords para Gmail
- ✅ Configure domínios permitidos no EmailJS

## 📧 Configuração Recomendada

### Para Gmail:
1. Habilite autenticação de 2 fatores
2. Crie uma "Senha de App" específica
3. Use essa senha no EmailJS

### Para Outlook/Hotmail:
1. Use credenciais normais
2. Certifique-se de que SMTP está habilitado

## 🔄 Teste da Configuração

1. Substitua as chaves no código
2. Faça o build: `npm run build`
3. Teste o formulário de contato
4. Verifique se o email chegou

## 📱 Informações Atuais no Código

Estas são as informações que estão atualmente no seu código e precisam ser substituídas:

```typescript
Service ID: 'service_yv2bgaa'
Template ID: 'template_n1bblcn'
Public Key: 'bydcH4PJkgHcGJ0o0'
```

## ❓ Dúvidas Comuns

**Q: É gratuito?**
A: Sim, EmailJS tem plano gratuito com 200 emails/mês

**Q: É seguro?**
A: Sim, as chaves são seguras para usar no frontend

**Q: Como testar?**
A: Use o próprio formulário do site após configurar

---

**Precisa de ajuda?** Me informe quando tiver as chaves e posso ajudar a configurar!
