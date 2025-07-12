# 🎯 Guia Completo: Como Configurar EmailJS para Receber Emails

## ✅ Passo 1: Criar Conta no EmailJS

1. **Acesse**: https://www.emailjs.com/
2. **Clique em**: "Sign Up" (Criar Conta)
3. **Preencha**: Nome, email e senha
4. **Confirme**: Email de verificação

## ✅ Passo 2: Configurar Serviço de Email

1. **No dashboard**, clique em **"Email Services"**
2. **Clique em**: "Add New Service"
3. **Escolha**: Gmail, Outlook, Yahoo, etc.
4. **Configure** com o email onde você QUER RECEBER as mensagens

### Para Gmail:
- **Email**: seu-email@gmail.com
- **Senha**: Use uma "Senha de App" (não sua senha normal)
- **Como criar senha de app**:
  1. Vá para sua conta Google
  2. Segurança → Autenticação de dois fatores
  3. Senhas de app → Gerar nova senha
  4. Use essa senha no EmailJS

### Para Outlook:
- **Email**: seu-email@hotmail.com ou @outlook.com
- **Senha**: Sua senha normal
- **Habilite**: SMTP se necessário

## ✅ Passo 3: Criar Template de Email

1. **No dashboard**, clique em **"Email Templates"**
2. **Clique em**: "Create New Template"
3. **Configure os campos**:

### Configuração do Template:
```
Para (To): seu-email@gmail.com (SEU EMAIL AQUI!)
De (From): {{name}} <{{email}}>
Assunto: Nova mensagem do site - {{subject}}
```

### Conteúdo do Template (HTML Profissional):
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Mensagem - Site</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px;
        }
        
        .greeting {
            font-size: 18px;
            font-weight: 500;
            color: #2c3e50;
            margin-bottom: 20px;
        }
        
        .info-card {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        
        .info-row {
            display: flex;
            margin-bottom: 12px;
            align-items: center;
        }
        
        .info-row:last-child {
            margin-bottom: 0;
        }
        
        .info-label {
            font-weight: 600;
            color: #495057;
            min-width: 80px;
            margin-right: 12px;
        }
        
        .info-value {
            color: #2c3e50;
            flex: 1;
        }
        
        .message-section {
            margin: 25px 0;
        }
        
        .message-title {
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 12px;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 8px;
        }
        
        .message-content {
            background-color: #ffffff;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            color: #495057;
            line-height: 1.7;
            white-space: pre-wrap;
        }
        
        .action-section {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
        }
        
        .reply-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .reply-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .footer {
            background-color: #2c3e50;
            color: #ffffff;
            padding: 25px;
            text-align: center;
            font-size: 14px;
        }
        
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e9ecef, transparent);
            margin: 20px 0;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 0;
                border-radius: 0;
            }
            
            .header, .content, .footer {
                padding: 20px;
            }
            
            .info-row {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .info-label {
                margin-bottom: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✉️ Nova Mensagem</h1>
            <p>Recebida através do seu site profissional</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Olá, Thales! 👋
            </div>
            
            <p>Você recebeu uma nova mensagem através do seu site. Aqui estão os detalhes:</p>
            
            <div class="info-card">
                <div class="info-row">
                    <span class="info-label">👤 Nome:</span>
                    <span class="info-value">{{name}}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📧 Email:</span>
                    <span class="info-value">{{email}}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📱 Telefone:</span>
                    <span class="info-value">{{phone}}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📋 Assunto:</span>
                    <span class="info-value">{{subject}}</span>
                </div>
            </div>
            
            <div class="message-section">
                <div class="message-title">💬 Mensagem</div>
                <div class="message-content">{{message}}</div>
            </div>
            
            <div class="divider"></div>
            
            <div class="action-section">
                <p style="margin-bottom: 15px; color: #495057;">
                    <strong>Responder ao cliente:</strong>
                </p>
                <a href="mailto:{{email}}?subject=Re: {{subject}}" class="reply-button">
                    📧 Responder Agora
                </a>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Thales Valim Angelo</strong> - Psicólogo Clínico</p>
            <p>Mensagem enviada através de <a href="https://thalesvalempsi.com.br">thalesvalempsi.com.br</a></p>
            <p style="margin-top: 10px; font-size: 12px; opacity: 0.8;">
                📅 {{date}} | 🕐 {{time}}
            </p>
        </div>
    </div>
</body>
</html>
```

### Template Alternativo (Ultra Minimalista)

Se preferir algo ainda mais clean, use este template:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        
        .email-container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .content {
            padding: 30px;
        }
        
        .field {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .field:last-child {
            border-bottom: none;
        }
        
        .label {
            font-weight: 600;
            color: #555;
            display: block;
            margin-bottom: 5px;
        }
        
        .value {
            color: #333;
        }
        
        .message {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border-left: 3px solid #2563eb;
            white-space: pre-wrap;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h2>Nova Mensagem</h2>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="label">Nome:</span>
                <span class="value">{{name}}</span>
            </div>
            
            <div class="field">
                <span class="label">Email:</span>
                <span class="value">{{email}}</span>
            </div>
            
            <div class="field">
                <span class="label">Telefone:</span>
                <span class="value">{{phone}}</span>
            </div>
            
            <div class="field">
                <span class="label">Assunto:</span>
                <span class="value">{{subject}}</span>
            </div>
            
            <div class="field">
                <span class="label">Mensagem:</span>
                <div class="message">{{message}}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>Mensagem enviada através de thalesvalempsi.com.br</p>
            <p><a href="mailto:{{email}}">Responder para {{email}}</a></p>
        </div>
    </div>
</body>
</html>
```

## 📝 Como Usar os Templates

### No EmailJS:
1. **Vá para "Email Templates"**
2. **Clique em "Create New Template"**
3. **Na aba "Content"**, cole o código HTML completo
4. **Configure os campos**:
   - **Para (To)**: seu-email@gmail.com
   - **De (From)**: {{name}} <{{email}}>
   - **Assunto**: Nova mensagem do site - {{subject}}

### Variáveis Automáticas:
- `{{name}}` - Nome do cliente
- `{{email}}` - Email do cliente  
- `{{phone}}` - Telefone do cliente
- `{{subject}}` - Assunto da mensagem
- `{{message}}` - Mensagem do cliente

## 🎯 Qual Template Escolher?

**Template Profissional (Primeiro):**
- ✅ Mais visual e elegante
- ✅ Botão de resposta integrado
- ✅ Design responsivo completo
- ✅ Cores da sua marca

**Template Minimalista (Segundo):**
- ✅ Mais clean e simples
- ✅ Carrega mais rápido
- ✅ Foco no conteúdo
- ✅ Menos código

**Recomendação:** Use o **Template Profissional** para causar uma melhor impressão!

## ✅ Passo 4: Obter as Chaves

Após configurar, você precisará copiar 3 informações:

1. **Service ID**: 
   - Vá para "Email Services"
   - Copie o ID do serviço (ex: service_abc123)

2. **Template ID**:
   - Vá para "Email Templates"
   - Copie o ID do template (ex: template_xyz789)

3. **Public Key**:
   - Vá para "Account" → "General"
   - Copie a Public Key (ex: user_123456)

## ✅ Passo 5: Configurar no Código

1. **Abra o arquivo**: `src/config/emailjs.ts`
2. **Substitua os valores**:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'seu_service_id_aqui',     // ← Cole aqui
  TEMPLATE_ID: 'seu_template_id_aqui',   // ← Cole aqui
  PUBLIC_KEY: 'sua_public_key_aqui'      // ← Cole aqui
};
```

## ✅ Passo 6: Testar

1. **Faça o build**: `npm run build`
2. **Teste o formulário** no site
3. **Verifique seu email** se chegou a mensagem

## 🔧 Exemplo Prático

Se suas chaves forem:
- Service ID: `service_abc123`
- Template ID: `template_xyz789`
- Public Key: `user_123456`

Então o arquivo `src/config/emailjs.ts` ficaria:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123',
  TEMPLATE_ID: 'template_xyz789',
  PUBLIC_KEY: 'user_123456'
};
```

## 🚨 Pontos Importantes

1. **Email de destino**: Certifique-se de que o template está configurado para enviar para SEU email
2. **Senha de app**: Para Gmail, use senha de app, não sua senha normal
3. **Teste sempre**: Após configurar, teste o formulário
4. **Limite gratuito**: 200 emails/mês no plano gratuito

## 📞 Precisa de Ajuda?

Quando você obtiver as 3 chaves, me mande e posso ajudar a configurar!

**Exemplo de mensagem:**
"Minhas chaves do EmailJS:
- Service ID: service_abc123
- Template ID: template_xyz789  
- Public Key: user_123456"

Aí eu configuro para você!
