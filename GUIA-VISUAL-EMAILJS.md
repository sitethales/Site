# 📸 Guia Visual: Configuração EmailJS Passo-a-Passo

## 🎯 Resultado Final

Quando alguém preencher o formulário do seu site, você receberá um email **profissional** assim:

```
📧 Assunto: Nova mensagem do site - Consulta sobre avaliação psicológica

[Email com design profissional exibindo]:
- Nome: João Silva
- Email: joao@email.com
- Telefone: (48) 99999-9999
- Assunto: Consulta sobre avaliação psicológica
- Mensagem: Olá, gostaria de agendar uma consulta...
```

## 🔧 Configuração Rápida

### 1. Acesse EmailJS
- **Site**: https://www.emailjs.com
- **Clique**: "Sign Up" (grátis)
- **Confirme**: seu email

### 2. Adicione Serviço de Email
- **Dashboard** → **Email Services** → **Add New Service**
- **Escolha**: Gmail (recomendado)
- **Email**: SEU email onde quer receber as mensagens
- **Senha**: Senha de app do Gmail (não sua senha normal)

### 3. Crie Template
- **Dashboard** → **Email Templates** → **Create New Template**
- **Cole** o código HTML que forneci acima
- **Configure**:
  - **Para**: seu-email@gmail.com
  - **De**: {{name}} <{{email}}>
  - **Assunto**: Nova mensagem do site - {{subject}}

### 4. Copie as Chaves
- **Service ID**: Na página "Email Services" 
- **Template ID**: Na página "Email Templates"
- **Public Key**: Em "Account" → "General"

### 5. Atualize o Código
No arquivo `src/config/emailjs.ts`, substitua:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'cole_seu_service_id_aqui',
  TEMPLATE_ID: 'cole_seu_template_id_aqui', 
  PUBLIC_KEY: 'cole_sua_public_key_aqui'
};
```

## 🎨 Preview do Email

O email que você receberá terá:

```
┌─────────────────────────────────────────────────────┐
│                  ✉️ Nova Mensagem                   │
│            Recebida através do seu site             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Olá, Thales! 👋                                   │
│                                                     │
│  Você recebeu uma nova mensagem através do seu      │
│  site. Aqui estão os detalhes:                     │
│                                                     │
│  ┌─────────────────────────────────────────────────┐ │
│  │ 👤 Nome:     João Silva                         │ │
│  │ 📧 Email:    joao@email.com                     │ │
│  │ 📱 Telefone: (48) 99999-9999                    │ │
│  │ 📋 Assunto:  Consulta sobre avaliação          │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
│  💬 Mensagem                                        │
│  ┌─────────────────────────────────────────────────┐ │
│  │ Olá, gostaria de agendar uma consulta sobre     │ │
│  │ avaliação psicológica. Quando você tem          │ │
│  │ disponibilidade?                                │ │
│  └─────────────────────────────────────────────────┘ │
│                                                     │
│              [📧 Responder Agora]                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│          Thales Valim Angelo - Psicólogo Clínico    │
│      Mensagem enviada através de                    │
│           thalesvalempsi.com.br                     │
└─────────────────────────────────────────────────────┘
```

## ✅ Checklist Final

- [ ] Conta criada no EmailJS
- [ ] Serviço de email configurado (Gmail)
- [ ] Template criado com HTML fornecido
- [ ] 3 chaves copiadas
- [ ] Código atualizado em `src/config/emailjs.ts`
- [ ] Teste realizado

## 🚀 Pronto para Usar!

Depois de configurar, o formulário do seu site estará 100% funcional e você receberá emails profissionais toda vez que alguém entrar em contato!

## 🔄 Teste Rápido

1. **Configure** as chaves no código
2. **Faça o build**: `npm run build`
3. **Acesse** o site e preencha o formulário
4. **Verifique** seu email em alguns minutos

**Dúvidas?** Me mande as 3 chaves e configuro para você! 🎯
