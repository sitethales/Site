import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, Phone, Mail, Users, Award, Heart, Shield } from 'lucide-react';

const SEOContent = () => {
  const services = [
    {
      title: "Avaliação Psicológica",
      description: "Elaboração de laudos, relatórios e pareceres psicológicos para diversas finalidades com rigor técnico e ético.",
      keywords: ["laudo psicológico", "relatório psicológico", "parecer psicológico", "avaliação psicológica"]
    },
    {
      title: "Atendimento LGBTQIA+",
      description: "Atendimento especializado para a comunidade LGBTQIA+ com abordagem acolhedora e respeitosa.",
      keywords: ["psicólogo lgbtqia+", "diversidade sexual", "identidade de gênero", "terapia afirmativa"]
    },
    {
      title: "Consultas Online",
      description: "Atendimento psicológico via videochamada para maior conveniência e acessibilidade.",
      keywords: ["psicólogo online", "consulta online", "terapia online", "atendimento virtual"]
    }
  ];

  const locations = [
    "Santa Catarina",
    "Florianópolis",
    "Grande Florianópolis",
    "Região Sul"
  ];

  const specialties = [
    "Avaliação Psicológica",
    "Psicologia Clínica",
    "Atendimento LGBTQIA+",
    "Elaboração de Laudos",
    "Relatórios Psicológicos",
    "Pareceres Técnicos",
    "Orientação Psicológica",
    "Suporte Emocional"
  ];

  return (
    <section className="py-16 bg-gray-50 section-animate">
      <div className="container mx-auto px-4">
        {/* SEO-friendly header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Psicólogo Especializado em Santa Catarina
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Atendimento psicológico especializado em <strong>avaliação psicológica</strong> e 
            <strong> comunidade LGBTQIA+</strong> em Santa Catarina. Elaboração de laudos, 
            relatórios e pareceres psicológicos com abordagem ética e acolhedora.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.keywords.map((keyword, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Location and Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Área de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Atendimento psicológico em <strong>Santa Catarina</strong> com foco na 
                região de <strong>Florianópolis</strong> e Grande Florianópolis.
              </p>
              <div className="flex flex-wrap gap-2">
                {locations.map((location, i) => (
                  <Badge key={i} variant="outline">
                    {location}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Horário de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Segunda a Sexta</span>
                  <span className="font-semibold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span className="font-semibold">08:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span className="text-gray-500">Fechado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Specialties */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Especialidades em Psicologia
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((specialty, i) => (
              <Badge key={i} variant="default" className="text-sm py-2 px-4">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Atendimento LGBTQIA+</h4>
            <p className="text-sm text-gray-600">
              Especializado em diversidade sexual e identidade de gênero
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Profissional Qualificado</h4>
            <p className="text-sm text-gray-600">
              Psicólogo credenciado pelo CRP com formação especializada
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Abordagem Acolhedora</h4>
            <p className="text-sm text-gray-600">
              Ambiente seguro e respeitoso para todos os clientes
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Sigilo Profissional</h4>
            <p className="text-sm text-gray-600">
              Confidencialidade e ética garantidas em todos os atendimentos
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Precisa de Avaliação Psicológica em Santa Catarina?
          </h3>
          <p className="text-gray-600 mb-6">
            Entre em contato para agendar sua consulta ou tirar dúvidas sobre nossos serviços
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="tel:+5548984136071" 
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (48) 98413-6071
            </a>
            <a 
              href="https://wa.me/5548984136071" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContent;
