import { useState } from 'react';
import { Brain, FileText, Users, Heart, ArrowRight, ClipboardCheck, Stethoscope, Scale, Briefcase, FileUser } from 'lucide-react';
import { motion } from 'framer-motion';
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import ServiceModal from './ServiceModal';

type ServiceDetails = {
  title: string;
  description: string;
  process: string[];
  duration: string;
  format: string;
  includes: string[];
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BrainIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 transition-all duration-500 group-hover:opacity-60">
      <defs>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d="M100 40c-20 0-35 15-35 35 0 5 1 10 3 14-8 2-14 9-14 18 0 12 8 22 20 22 2 0 4 0 6-1 3 8 11 14 20 14 5 0 9-2 13-5 4 3 8 5 13 5 9 0 17-6 20-14 2 1 4 1 6 1 12 0 20-10 20-22 0-9-6-16-14-18 2-4 3-9 3-14 0-20-15-35-35-35z" fill="url(#brainGrad)" />
      <circle cx="85" cy="70" r="3" fill="hsl(var(--primary))" opacity="0.4" />
      <circle cx="115" cy="70" r="3" fill="hsl(var(--primary))" opacity="0.4" />
      <path d="M80 90 Q100 100 120 90" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  );

  const DocumentIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 transition-all duration-500 group-hover:opacity-60">
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="60" y="40" width="80" height="120" rx="4" fill="url(#docGrad)" />
      <rect x="70" y="60" width="60" height="4" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="70" y="75" width="45" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="70" y="87" width="55" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="70" y="99" width="40" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      <circle cx="125" cy="130" r="12" fill="hsl(var(--accent))" opacity="0.6" />
      <path d="M120 130 L125 135 L135 125" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
    </svg>
  );

  const JusticeIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 transition-all duration-500 group-hover:opacity-60">
      <defs>
        <linearGradient id="justiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <line x1="100" y1="50" x2="100" y2="150" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.4" />
      <line x1="70" y1="70" x2="130" y2="70" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
      <rect x="60" y="75" width="20" height="15" fill="url(#justiceGrad)" />
      <rect x="120" y="80" width="20" height="15" fill="url(#justiceGrad)" />
      <line x1="70" y1="75" x2="70" y2="90" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
      <line x1="130" y1="75" x2="130" y2="95" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="45" r="8" fill="hsl(var(--primary))" opacity="0.3" />
    </svg>
  );

  const ConcursoIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-25 transition-all duration-500 group-hover:opacity-65">
      <defs>
        <linearGradient id="concursoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      
      {/* Clipboard/Prancheta */}
      <rect x="50" y="40" width="100" height="120" rx="6" fill="url(#concursoGrad)" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
      
      {/* Presilha superior */}
      <rect x="85" y="30" width="30" height="15" rx="3" fill="hsl(var(--primary))" opacity="0.4" />
      <rect x="88" y="33" width="24" height="9" rx="2" fill="hsl(var(--background))" opacity="0.8" />
      
      {/* Título do documento */}
      <rect x="60" y="55" width="80" height="6" rx="2" fill="hsl(var(--primary))" opacity="0.4" />
      
      {/* Questões/itens da prova */}
      <rect x="60" y="70" width="65" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="60" y="80" width="70" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="60" y="90" width="55" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="60" y="100" width="75" height="3" fill="hsl(var(--primary))" opacity="0.3" />
      
      {/* Alternativas marcadas */}
      <circle cx="70" cy="115" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
      <circle cx="85" cy="115" r="4" fill="hsl(var(--accent))" opacity="0.5" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      <circle cx="100" cy="115" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
      <circle cx="115" cy="115" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
      
      {/* Segunda linha de alternativas */}
      <circle cx="70" cy="130" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
      <circle cx="85" cy="130" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
      <circle cx="100" cy="130" r="4" fill="hsl(var(--accent))" opacity="0.5" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      <circle cx="115" cy="130" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
      
      {/* Check mark de aprovação */}
      <path d="M120 140 L130 150 L145 135" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" opacity="0.6" />
      
      {/* Selo de aprovado */}
      <circle cx="130" cy="75" r="12" fill="hsl(var(--accent))" opacity="0.2" stroke="hsl(var(--accent))" strokeWidth="2" strokeOpacity="0.4" />
      <path d="M125 75 L129 79 L135 73" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  );

  const BariatricaIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-25 transition-all duration-500 group-hover:opacity-65">
      <defs>
        <linearGradient id="scaleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="displayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      
      {/* Base sólida da balança */}
      <rect x="70" y="155" width="60" height="12" rx="6" fill="hsl(var(--primary))" opacity="0.6" />
      <rect x="75" y="160" width="50" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.3" />
      
      {/* Coluna central */}
      <rect x="97" y="140" width="6" height="15" fill="hsl(var(--primary))" opacity="0.7" />
      
      {/* Plataforma principal com bordas */}
      <rect x="45" y="135" width="110" height="18" rx="9" fill="url(#scaleGrad)" stroke="hsl(var(--accent))" strokeWidth="2.5" strokeOpacity="0.8" />
      <rect x="50" y="140" width="100" height="8" rx="4" fill="hsl(var(--background))" opacity="0.4" />
      
      {/* Display principal */}
      <rect x="70" y="105" width="60" height="28" rx="8" fill="url(#displayGrad)" stroke="#6b7280" strokeWidth="2.5" strokeOpacity="0.7" />
      <rect x="73" y="108" width="54" height="22" rx="4" fill="#ffffff" opacity="0.9" />
      
      {/* Texto e seta no display */}
      <text x="95" y="122" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">-15kg</text>
      <path d="M115 116 L115 125 M112 122 L115 125 L118 122" 
            stroke="#dc2626" 
            strokeWidth="2.5" 
            fill="none" 
            opacity="0.8" 
            strokeLinecap="round" />
      
      {/* Detalhes da superfície */}
      <circle cx="60" cy="144" r="2" fill="hsl(var(--accent))" opacity="0.5" />
      <circle cx="140" cy="144" r="2" fill="hsl(var(--accent))" opacity="0.5" />
      
      {/* Indicadores laterais */}
      <rect x="40" y="142" width="3" height="6" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
      <rect x="157" y="142" width="3" height="6" rx="1.5" fill="hsl(var(--primary))" opacity="0.4" />
    </svg>
  );

  const CirurgiaIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-25 transition-all duration-500 group-hover:opacity-65">
      <defs>
        <linearGradient id="cirurgiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      
      {/* Cruz médica principal - centro */}
      <circle cx="100" cy="100" r="35" fill="hsl(var(--background))" opacity="0.9" stroke="hsl(var(--primary))" strokeWidth="3" strokeOpacity="0.5" />
      <line x1="100" y1="75" x2="100" y2="125" stroke="hsl(var(--accent))" strokeWidth="6" opacity="0.8" />
      <line x1="75" y1="100" x2="125" y2="100" stroke="hsl(var(--accent))" strokeWidth="6" opacity="0.8" />
      
      {/* Bisturi simples */}
      <rect x="50" y="50" width="40" height="5" rx="2" fill="hsl(var(--primary))" opacity="0.6" />
      <polygon points="45,51 55,51 50,60 45,56" fill="hsl(var(--accent))" opacity="0.7" />
      
      {/* Seringa */}
      <rect x="130" y="130" width="25" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.6" />
      <rect x="125" y="129" width="8" height="6" rx="2" fill="hsl(var(--secondary))" opacity="0.6" />
      <line x1="155" y1="132" x2="165" y2="132" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.7" />
      
      {/* Tesoura cirúrgica */}
      <circle cx="50" cy="130" r="4" fill="hsl(var(--secondary))" opacity="0.6" />
      <circle cx="50" cy="140" r="4" fill="hsl(var(--secondary))" opacity="0.6" />
      <line x1="46" y1="133" x2="35" y2="125" stroke="hsl(var(--primary))" strokeWidth="2.5" opacity="0.6" />
      <line x1="46" y1="137" x2="35" y2="145" stroke="hsl(var(--primary))" strokeWidth="2.5" opacity="0.6" />
      
      {/* Pontos de sutura */}
      <path d="M130 50 Q135 45 140 50 Q135 55 130 50" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M145 50 Q150 45 155 50 Q150 55 145 50" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.6" />
      
      {/* Indicador de precisão/limpeza */}
      <circle cx="60" cy="170" r="3" fill="hsl(var(--accent))" opacity="0.5" />
      <circle cx="140" cy="170" r="3" fill="hsl(var(--accent))" opacity="0.5" />
    </svg>
  );

  const JuridicoIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-25 transition-all duration-500 group-hover:opacity-65">
      <defs>
        <linearGradient id="juridicoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="scaleMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* Base sólida e detalhada da balança */}
      <ellipse cx="100" cy="160" rx="25" ry="8" fill="hsl(var(--primary))" opacity="0.6" />
      <rect x="75" y="152" width="50" height="12" rx="6" fill="url(#scaleMetalGrad)" />
      <rect x="78" y="155" width="44" height="6" rx="3" fill="hsl(var(--background))" opacity="0.3" />
      
      {/* Haste principal mais robusta */}
      <rect x="97" y="60" width="6" height="95" rx="3" fill="url(#scaleMetalGrad)" />
      <circle cx="100" cy="65" r="8" fill="hsl(var(--primary))" opacity="0.5" stroke="hsl(var(--accent))" strokeWidth="2" strokeOpacity="0.6" />
      
      {/* Travessa horizontal da balança */}
      <rect x="60" y="82" width="80" height="6" rx="3" fill="url(#scaleMetalGrad)" />
      
      {/* Prato esquerdo aprimorado */}
      <line x1="70" y1="85" x2="70" y2="98" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.6" />
      <ellipse cx="70" cy="103" rx="18" ry="7" fill="url(#juridicoGrad)" stroke="hsl(var(--accent))" strokeWidth="2.5" strokeOpacity="0.7" />
      <ellipse cx="70" cy="101" rx="15" ry="5" fill="hsl(var(--background))" opacity="0.4" />
      
      {/* Prato direito aprimorado */}
      <line x1="130" y1="85" x2="130" y2="93" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.6" />
      <ellipse cx="130" cy="98" rx="18" ry="7" fill="url(#juridicoGrad)" stroke="hsl(var(--accent))" strokeWidth="2.5" strokeOpacity="0.7" />
      <ellipse cx="130" cy="96" rx="15" ry="5" fill="hsl(var(--background))" opacity="0.4" />
      
      {/* Martelo do juiz mais detalhado */}
      <rect x="142" y="123" width="28" height="10" rx="5" fill="hsl(var(--secondary))" opacity="0.7" />
      <rect x="145" y="125" width="22" height="6" rx="3" fill="hsl(var(--background))" opacity="0.5" />
      <rect x="154" y="115" width="10" height="25" rx="5" fill="hsl(var(--primary))" opacity="0.6" />
      <rect x="156" y="140" width="6" height="18" rx="3" fill="hsl(var(--primary))" opacity="0.5" />
      
      {/* Livro de leis mais detalhado */}
      <rect x="28" y="118" width="26" height="35" rx="3" fill="hsl(var(--accent))" opacity="0.6" />
      <rect x="30" y="120" width="22" height="31" rx="2" fill="hsl(var(--background))" opacity="0.7" />
      <rect x="32" y="125" width="18" height="3" fill="hsl(var(--primary))" opacity="0.5" />
      <rect x="32" y="131" width="16" height="2.5" fill="hsl(var(--primary))" opacity="0.4" />
      <rect x="32" y="136" width="17" height="2.5" fill="hsl(var(--primary))" opacity="0.4" />
      <rect x="32" y="141" width="14" height="2.5" fill="hsl(var(--primary))" opacity="0.4" />
      <rect x="32" y="146" width="15" height="2.5" fill="hsl(var(--primary))" opacity="0.4" />
      
      {/* Símbolo de justiça no topo aprimorado */}
      <circle cx="100" cy="52" r="15" fill="hsl(var(--primary))" opacity="0.5" stroke="hsl(var(--accent))" strokeWidth="3" strokeOpacity="0.6" />
      <circle cx="100" cy="52" r="10" fill="hsl(var(--background))" opacity="0.6" />
      <path d="M92 48 L100 40 L108 48" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
      
      {/* Documentos/papéis aprimorados */}
      <rect x="58" y="132" width="15" height="22" rx="2" fill="hsl(var(--secondary))" opacity="0.4" />
      <rect x="60" y="134" width="11" height="18" rx="1" fill="hsl(var(--background))" opacity="0.7" />
      <rect x="61" y="137" width="9" height="2" fill="hsl(var(--primary))" opacity="0.4" />
      <rect x="61" y="141" width="7" height="1.5" fill="hsl(var(--primary))" opacity="0.3" />
      <rect x="61" y="144" width="8" height="1.5" fill="hsl(var(--primary))" opacity="0.3" />
      
      {/* Pesos da justiça aprimorados */}
      <rect x="62" y="95" width="16" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.5" />
      <rect x="64" y="97" width="12" height="4" rx="1" fill="hsl(var(--background))" opacity="0.4" />
      
      <rect x="122" y="90" width="16" height="8" rx="2" fill="hsl(var(--secondary))" opacity="0.5" />
      <rect x="124" y="92" width="12" height="4" rx="1" fill="hsl(var(--background))" opacity="0.4" />
    </svg>
  );

  const OcupacionalIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-25 transition-all duration-500 group-hover:opacity-65">
      <defs>
        <linearGradient id="ocupacionalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect x="60" y="70" width="80" height="60" rx="6" fill="url(#ocupacionalGrad)" />
      <circle cx="100" cy="60" r="15" fill="hsl(var(--primary))" opacity="0.3" />
      <circle cx="95" cy="55" r="2" fill="hsl(var(--accent))" opacity="0.5" />
      <circle cx="105" cy="55" r="2" fill="hsl(var(--accent))" opacity="0.5" />
      <path d="M92 65 Q100 70 108 65" stroke="hsl(var(--secondary))" strokeWidth="1.5" fill="none" opacity="0.4" />
      <rect x="70" y="85" width="60" height="3" fill="hsl(var(--accent))" opacity="0.3" />
      <rect x="70" y="95" width="45" height="2" fill="hsl(var(--accent))" opacity="0.3" />
      <rect x="70" y="103" width="50" height="2" fill="hsl(var(--accent))" opacity="0.3" />
      <circle cx="80" cy="120" r="4" fill="hsl(var(--primary))" opacity="0.4" />
      <circle cx="100" cy="120" r="4" fill="hsl(var(--secondary))" opacity="0.4" />
      <circle cx="120" cy="120" r="4" fill="hsl(var(--accent))" opacity="0.4" />
      <rect x="50" y="140" width="100" height="8" rx="4" fill="hsl(var(--primary))" opacity="0.2" />
      <rect x="85" y="35" width="30" height="6" rx="3" fill="hsl(var(--secondary))" opacity="0.3" />
    </svg>
  );

  const EspecificasIllustration = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-25 transition-all duration-500 group-hover:opacity-65">
      <defs>
        <linearGradient id="especificasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect x="50" y="50" width="100" height="100" rx="8" fill="url(#especificasGrad)" />
      <circle cx="75" cy="75" r="8" fill="hsl(var(--primary))" opacity="0.3" />
      <circle cx="125" cy="75" r="8" fill="hsl(var(--secondary))" opacity="0.3" />
      <rect x="65" y="95" width="70" height="3" fill="hsl(var(--accent))" opacity="0.3" />
      <rect x="65" y="105" width="55" height="2" fill="hsl(var(--accent))" opacity="0.3" />
      <rect x="65" y="113" width="60" height="2" fill="hsl(var(--accent))" opacity="0.3" />
      <path d="M70 130 Q100 125 130 130" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.4" />
      <circle cx="85" cy="135" r="3" fill="hsl(var(--secondary))" opacity="0.4" />
      <circle cx="100" cy="138" r="3" fill="hsl(var(--accent))" opacity="0.4" />
      <circle cx="115" cy="135" r="3" fill="hsl(var(--primary))" opacity="0.4" />
      <rect x="90" y="40" width="20" height="6" rx="3" fill="hsl(var(--primary))" opacity="0.3" />
      <polygon points="95,155 100,165 105,155" fill="hsl(var(--accent))" opacity="0.4" />
    </svg>
  );

  const services = [
    {
      Icon: ClipboardCheck,
      name: "Processos Seletivos e Concursos",
      description: "Laudos para concursos públicos, aviação civil (CMA ANAC) e Forças Armadas",
      className: "lg:col-span-1",
      gradient: "from-blue-100/90 to-blue-200/60 hover:from-blue-200/95 hover:to-blue-300/75",
      illustration: <ConcursoIllustration />,
      details: {
        title: "Avaliação Psicológica para Processos Seletivos e Concursos Públicos",
        description: "Laudos para concursos públicos, admissões em empresas, aviação civil (CMA ANAC) e Forças Armadas. Documentos elaborados com precisão técnica, alinhados às exigências específicas de cada edital ou instituição.",
        process: [
          "Agendamento conforme cronograma do candidato",
          "Entrevista psicológica direcionada à finalidade do processo seletivo",
          "Aplicação de instrumentos psicométricos (testes psicológicos) validados",
          "Emissão de laudo ou parecer conforme exigência específica"
        ],
        duration: "1 a 2 sessões",
        format: "Presencial ou on-line, conforme a demanda e a exigência do edital ou instituição",
        includes: [
          "Entrevista dirigida ao objetivo da avaliação",
          "Aplicação de testes psicológicos padronizados",
          "Elaboração de laudo ou parecer técnico",
          "Documentação conforme critérios legais e institucionais"
        ]
      }
    },
    {
      Icon: Heart,
      name: "Cirurgia Bariátrica",
      description: "Avaliação psicológica especializada para procedimentos bariátricos",
      className: "lg:col-span-1",
      gradient: "from-rose-100/90 to-rose-200/60 hover:from-rose-200/95 hover:to-rose-300/75",
      illustration: <BariatricaIllustration />,
      details: {
        title: "Avaliação Psicológica para Cirurgia Bariátrica",
        description: "Avaliação psicológica especializada para candidatos à cirurgia bariátrica, focando na relação com o corpo, saúde e mudanças de estilo de vida.",
        process: [
          "Agendamento conforme cronograma individual",
          "Entrevista psicológica com foco na relação com o corpo, saúde e mudanças de estilo de vida",
          "Aplicação de testes psicológicos e instrumentos psicométricos complementares",
          "Emissão de laudo ou parecer psicológico conforme exigências médicas"
        ],
        duration: "1 a 2 sessões",
        format: "Presencial ou on-line, conforme a necessidade e exigência médica",
        includes: [
          "Entrevista psicológica dirigida à demanda cirúrgica",
          "Aplicação de testes psicológicos padronizados",
          "Elaboração de laudo psicológico",
          "Documentação conforme critérios legais e institucionais"
        ]
      }
    },
    {
      Icon: Stethoscope,
      name: "Procedimentos Cirúrgicos",
      description: "Avaliações para laqueadura, vasectomia, redesignação sexual e cirurgias estéticas",
      className: "lg:col-span-1",
      gradient: "from-emerald-100/90 to-emerald-200/60 hover:from-emerald-200/95 hover:to-emerald-300/75",
      illustration: <CirurgiaIllustration />,
      details: {
        title: "Avaliação Psicológica para Procedimentos Cirúrgicos",
        description: "Avaliações psicológicas para laqueadura, vasectomia, redesignação sexual (cirurgia de afirmação de gênero), cirurgias estéticas e reparadoras. Laudos e pareceres objetivos, com validade em todo o território nacional.",
        process: [
          "Agendamento conforme necessidade e urgência",
          "Entrevista psicológica centrada no contexto da cirurgia",
          "Aplicação de instrumentos psicométricos (testes psicológicos) validados",
          "Emissão de laudo ou parecer psicológico conforme exigências legais"
        ],
        duration: "1 a 2 sessões",
        format: "Presencial ou on-line, conforme o tipo de cirurgia e a orientação médica",
        includes: [
          "Entrevista psicológica dirigida à demanda cirúrgica",
          "Aplicação de testes psicológicos padronizados",
          "Elaboração de laudo ou parecer técnico",
          "Documentação conforme critérios legais e institucionais"
        ]
      }
    },
    {
      Icon: Scale,
      name: "Contexto Jurídico",
      description: "Pareceres e laudos técnicos para processos judiciais e atuação como assistente técnico",
      className: "lg:col-span-1",
      gradient: "from-violet-100/90 to-violet-200/60 hover:from-violet-200/95 hover:to-violet-300/75",
      illustration: <JuridicoIllustration />,
      details: {
        title: "Avaliações Psicológicas no Contexto Jurídico",
        description: "Atuação em processos judiciais com emissão de pareceres e laudos técnicos fundamentados, voltados à tomada de decisão em contextos legais. Inclui avaliações por nomeação judicial, por solicitação particular e atuação como assistente técnico em processos já em andamento.",
        process: [
          "Análise inicial da demanda jurídica e documentação envolvida",
          "Entrevistas psicológicas específicas conforme o objeto da ação",
          "Aplicação de instrumentos psicológicos e análise complementar",
          "Emissão de laudo, parecer ou resposta a quesitos técnicos"
        ],
        duration: "1 a 4 sessões, variável conforme a complexidade do caso (mínimo de 3 a 5 sessões)",
        format: "Preferencialmente presencial, com possibilidade de etapas on-line conforme viabilidade processual",
        includes: [
          "Estudo técnico do processo e dos autos (se aplicável)",
          "Entrevistas dirigidas e aplicação de testes psicológicos",
          "Emissão de parecer, laudo ou resposta a quesitos",
          "Atuação como assistente técnico em parceria com advogado(a)"
        ]
      }
    },
    {
      Icon: Briefcase,
      name: "Avaliação Psicossocial Ocupacional",
      description: "Prevenção de acidentes e promoção da saúde mental no trabalho",
      className: "lg:col-span-1",
      gradient: "from-orange-100/90 to-orange-200/60 hover:from-orange-200/95 hover:to-orange-300/75",
      illustration: <OcupacionalIllustration />,
      details: {
        title: "Avaliação Psicossocial Ocupacional",
        description: "Avaliação voltada à prevenção de acidentes e à promoção da saúde mental no ambiente de trabalho. Investiga as condições psicológicas do trabalhador para lidar com riscos ocupacionais e psicossociais, contribuindo para ambientes mais seguros e humanos.",
        process: [
          "Entrevista clínica focada nas exigências da função",
          "Aplicação de instrumentos psicológicos validados",
          "Análise das condições emocionais, cognitivas e comportamentais",
          "Emissão de parecer com resultado psicossocial e orientações"
        ],
        duration: "1 sessão (podendo variar conforme a complexidade do caso ou demanda da empresa)",
        format: "Presencial ou on-line, conforme viabilidade e exigência do empregador",
        includes: [
          "Entrevista psicológica dirigida à função e contexto de risco",
          "Aplicação de testes específicos (atenção, personalidade, enfrentamento ao estresse)",
          "Parecer psicológico com análise do perfil psicossocial",
          "Documentação válida para fins legais e institucionais"
        ]
      }
    },
    {
      Icon: FileUser,
      name: "Outras Avaliações Específicas",
      description: "Adoção, reprodução assistida, transplante e autorização de viagem com animal de apoio",
      className: "lg:col-span-1",
      gradient: "from-cyan-100/90 to-cyan-200/60 hover:from-cyan-200/95 hover:to-cyan-300/75",
      illustration: <EspecificasIllustration />,
      details: {
        title: "Outras Avaliações Específicas",
        description: "Atendimento voltado a situações que exigem avaliação psicológica formal para emissão de documentos legais ou comprobatórios. Entre as principais demandas: adoção, reprodução assistida, fertilização in vitro, transplante, autorização de viagem com animal de apoio emocional.",
        process: [
          "Agendamento conforme a urgência e exigência do processo",
          "Entrevista psicológica direcionada à finalidade da avaliação",
          "Aplicação de instrumentos, se necessário",
          "Emissão de laudo ou parecer conforme normas técnicas e legais"
        ],
        duration: "1 a 2 sessões",
        format: "Presencial ou on-line, conforme o tipo de avaliação e as exigências do solicitante",
        includes: [
          "Entrevista psicológica específica para cada caso",
          "Testes psicológicos (quando aplicável)",
          "Laudo ou parecer psicológico com validade nacional",
          "Documentação técnica adequada à finalidade"
        ]
      }
    }
  ];

  const openModal = (service: typeof services[0]) => {
    setSelectedService(service.details);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="servicos" className="py-20 bg-muted/30 section-animate">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="font-arima text-4xl md:text-5xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Serviços Oferecidos
            </motion.h2>
            <motion.p 
              className="font-montserrat text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Avaliações psicológicas com embasamento técnico e cuidado humanizado.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <BentoGrid className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {services.map((service) => (
                <BentoCard 
                  key={service.name}
                  name={service.name}
                  description={service.description}
                  className={service.className}
                  onClick={() => openModal(service)}
                  cta="Saiba mais"
                  background={
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-all duration-300`} />
                      <div className="absolute inset-0 blur-xs group-hover:blur-none transition-all duration-500">
                        {service.illustration}
                      </div>
                    </div>
                  }
                  Icon={service.Icon}
                />
              ))}
            </BentoGrid>
          </motion.div>
        </div>
      </section>

      <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </>
  );
};

export default Services;