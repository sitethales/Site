#!/bin/bash

# Script de Configuração Automática - Google Analytics
# Execute este script após criar sua conta no Google Analytics

echo "🚀 Configurando Google Analytics para thalesvalempsi.com.br"
echo "=============================================="

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
else
    echo "✅ Arquivo .env já existe"
fi

# Solicitar o GA Tracking ID
echo ""
echo "📊 Para configurar o Google Analytics, você precisa:"
echo "1. Criar uma conta em https://analytics.google.com/"
echo "2. Adicionar uma nova propriedade para 'thalesvalempsi.com.br'"
echo "3. Escolher 'Web' como plataforma"
echo "4. Copiar o 'Measurement ID' (formato: G-XXXXXXXXXX)"
echo ""

read -p "Digite seu Google Analytics Measurement ID (G-XXXXXXXXXX): " GA_ID

if [ ! -z "$GA_ID" ]; then
    # Atualizar o arquivo .env
    if grep -q "REACT_APP_GA_TRACKING_ID" .env; then
        sed -i '' "s/REACT_APP_GA_TRACKING_ID=.*/REACT_APP_GA_TRACKING_ID=$GA_ID/" .env
    else
        echo "REACT_APP_GA_TRACKING_ID=$GA_ID" >> .env
    fi
    
    echo "✅ Google Analytics configurado com sucesso!"
    echo "   Measurement ID: $GA_ID"
else
    echo "❌ ID não fornecido. Configure manualmente no arquivo .env"
fi

echo ""
echo "🔧 Próximos passos:"
echo "1. Execute: npm run build"
echo "2. Faça o deploy do site"
echo "3. Verifique se o tracking está funcionando no Google Analytics"
echo "4. Configure eventos personalizados (já incluídos no código)"
echo ""

# Verificar se o site está sendo construído corretamente
echo "🏗️  Testando build do projeto..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build executado com sucesso!"
else
    echo "❌ Erro no build. Verifique os logs com: npm run build"
fi

echo ""
echo "📋 Checklist pós-configuração:"
echo "□ Verificar se o GA está coletando dados (pode levar 24-48h)"
echo "□ Configurar objetivos no Google Analytics"
echo "□ Ligar Google Analytics ao Google Search Console"
echo "□ Configurar alertas para quedas de tráfego"
echo "□ Instalar a extensão Google Analytics Debugger (opcional)"
echo ""

echo "🎯 Links úteis:"
echo "- Google Analytics: https://analytics.google.com/"
echo "- Google Search Console: https://search.google.com/search-console/"
echo "- Google My Business: https://business.google.com/"
echo "- Teste de dados estruturados: https://search.google.com/test/rich-results"
echo ""

echo "✨ Configuração concluída! Boa sorte com o SEO!"
