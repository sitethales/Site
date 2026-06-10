import { useEffect, useRef, memo, useMemo } from "react";
import { gsap } from "gsap";
import { m, LazyMotion, useInView, useReducedMotion } from "framer-motion";
import Ripple from "@/components/magicui/ripple";
import OrbitingCircles from "@/components/OrbitingCircles";
import { Button } from "@/components/ui/button";
import { Heart, Users, Shield, Rainbow, HeartHandshake, Star, Brain } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Carrega as features de animação fora do caminho crítico
const loadFeatures = () => import("framer-motion").then((r) => r.domAnimation);

// Memorizando ícones para evitar re-renderizações desnecessárias
const MemoizedHeart = memo(() => <Heart className="w-6 h-6 text-red-300" />);
const MemoizedUsers = memo(() => <Users className="w-6 h-6 text-gray-500" />);
const MemoizedShield = memo(() => <Shield className="w-6 h-6 text-blue-300" />);
const MemoizedRainbow = memo(() => <Rainbow className="w-6 h-6 text-purple-300" />);
const MemoizedHeartHandshake = memo(() => <HeartHandshake className="w-6 h-6 text-green-200" />);
const MemoizedBrain = memo(() => <Brain className="w-6 h-6 text-red-300" />);
const MemoizedStar = memo(() => <Star className="w-6 h-6 text-yellow-400" />);

const Hero = () => {
  // Referências para elementos DOM para animação
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // Pausa as animações infinitas quando a seção sai da viewport
  const inView = useInView(sectionRef, { amount: 0 });
  const reduceMotion = useReducedMotion();
  const animationsActive = inView && !reduceMotion;

  useEffect(() => {
    // Criando contexto GSAP para limpeza automática
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          force3D: true, // Forçar aceleração 3D
          clearProps: "transform" // Limpar propriedades após animação
        }
      });

      // Animações com melhor performance
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.1"
        );
    });

    // Limpeza automática
    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      data-offscreen={animationsActive ? undefined : ''}
      className="min-h-screen flex items-center justify-center bg-gradient-warm relative overflow-hidden"
    >
      {/* Animated background elements - Otimizado com renderização condicional */}
      <div className="absolute inset-0">
        {/* Ripple condicionalmente renderizado apenas em dispositivos não-móveis */}
        {!isMobile && <Ripple />}

        {/* Lazy loading das animações para melhorar performance inicial */}
        <LazyMotion features={loadFeatures}>
          {/* Reduzido número de formas geométricas e simplificadas as animações */}
          <m.div
            className="absolute top-20 left-10 w-24 h-24 bg-primary/5 rounded-2xl"
            animate={animationsActive ? {
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            } : undefined}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              // Menos trabalho para o navegador com menos keyframes
              repeatDelay: 0.5,
            }}
          />

          {/* Elemento central com animação mais leve */}
          <m.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/3 rounded-3xl"
            animate={animationsActive ? (isMobile ? { rotate: 180 } : { rotate: 360 }) : undefined}
            transition={{
              duration: isMobile ? 30 : 20, // Mais lento em dispositivos móveis
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating particles - apenas em desktop e com a seção visível */}
          {useMemo(() => {
            if (isMobile || !animationsActive) return null;

            return [...Array(4)].map((_, i) => (
              <m.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 15}%`,
                }}
                animate={{
                  y: [0, -20, 0], // Amplitude reduzida
                  opacity: [0.2, 0.6, 0.2], // Menor variação de opacidade
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeInOut",
                  repeatDelay: 0.2 // Pausa entre repetições para reduzir CPU
                }}
              />
            ));
          }, [isMobile, animationsActive])}
        </LazyMotion>

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-accent/10"></div>
      </div>

      <div className="container mx-auto px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo à esquerda */}
          <div className="space-y-10">
            {/* Usando refs em vez de classes para animação GSAP, removendo motion.div duplicado */}
            <h1
              ref={titleRef}
              className="hero-title text-[2.5rem] lg:text-7xl tracking-tight font-bold leading-tight text-primary mt-32 md:mt-20"
            >
              O cuidado especializado que sua avaliação psicológica merece
            </h1>

            <p
              ref={subtitleRef}
              className="hero-subtitle font-montserrat text-xl md:text-2xl text-muted-foreground leading-relaxed"
            >
              Psicólogo Especialista em Avaliação Psicológica com abordagem ética, técnica e acolhedora.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="animated"
                size="lg"
                onClick={scrollToContact}
                className="hero-cta px-10 py-6 font-montserrat font-semibold text-lg"
              >
                Entrar em Contato
              </Button>

              <Button
                variant="glass"
                size="lg"
                asChild
                className="hero-cta px-10 py-6 font-montserrat font-semibold text-lg"
              >
                <a
                  href="https://wa.me/5548984136071"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar Agora
                </a>
              </Button>
            </div>
          </div>

          {/* OrbitingCircles à direita - Otimizado com componentes memorizados */}
          <div className="flex justify-center items-center pb-3 my-10 md:my-0">
            {useMemo(() => (
              <OrbitingCircles
                innerRadius={isMobile ? 80 : 100}
                outerRadius={isMobile ? 130 : 160}
                innerDuration={isMobile ? 25 : 20}
                outerDuration={isMobile ? 30 : 25}
                innerChildren={[
                  <div key="inner-1" className="p-3 bg-primary/10 rounded-full border border-primary/10">
                    <MemoizedHeart />
                  </div>,
                  <div key="inner-2" className="p-3 bg-primary/10 rounded-full border border-primary/10">
                    <MemoizedUsers />
                  </div>,
                  <div key="inner-3" className="p-3 bg-primary/10 rounded-full border border-primary/10">
                    <MemoizedShield />
                  </div>
                ]}
                outerChildren={[
                  <div key="outer-1" className="p-3 bg-primary/10 rounded-full border border-primary/10">
                    <MemoizedRainbow />
                  </div>,
                  <div key="outer-2" className="p-3 bg-primary/10 rounded-full border border-primary/10">
                    <MemoizedHeartHandshake />
                  </div>,
                  <div key="outer-3" className="p-3 bg-primary/10 rounded-full border border-primary/10">
                    <MemoizedBrain />
                  </div>,
                  <div key="outer-4" className="p-3 bg-primary/10 rounded-full border border-primary/10">
                    <MemoizedStar />
                  </div>
                ]}
              />
            ), [isMobile])} {/* Memorizando o componente para evitar re-renderizações */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
