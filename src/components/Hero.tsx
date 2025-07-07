import { useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import Ripple from "@/components/magicui/ripple";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import OrbitingCircles from "@/components/OrbitingCircles";
import { Heart, Users, Shield, Rainbow, HeartHandshake, Star, Brain } from "lucide-react";

const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4 }
    )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-warm relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <Ripple />
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 bg-primary/5 rounded-2xl backdrop-blur-sm"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full backdrop-blur-sm"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/3 rounded-3xl backdrop-blur-sm"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <AnimatedBeam className="opacity-30" duration={8} />
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-accent/10"></div>
      </div>

      <div className="container mx-auto px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo à esquerda */}
          <div className="space-y-8">
            <motion.h1 
              className="hero-title font-arima text-5xl md:text-7xl font-bold leading-tight text-primary mt-32 md:mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              O cuidado especial que sua saúde merece
            </motion.h1>

            <motion.p 
              className="hero-subtitle font-montserrat text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Psicólogo Clínico especialista em atendimento LGBTQIA+ com abordagem
              humanizada e acolhedora
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={scrollToContact}
                className="hero-cta bg-primary text-primary-foreground px-10 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-warm shadow-card"
              >
                Entrar em Contato
              </button>

              <a
                href="https://wa.me/5548984136071"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/80 backdrop-blur-sm border border-border text-foreground px-10 py-4 rounded-xl font-montserrat font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-background shadow-card"
              >
                Agendar Agora
              </a>
            </motion.div>
          </div>

          {/* OrbitingCircles à direita */}
          <div className="flex justify-center items-center pb-3 my-10 md:my-0">
            <OrbitingCircles 
              innerRadius={100} 
              outerRadius={160}
              innerDuration={20}
              outerDuration={25}
              innerChildren={[
                <div className="p-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/10">
                  <Heart className="w-6 h-6 text-red-300" />
                </div>,
                <div className="p-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/10">
                  <Users className="w-6 h-6 text-gray-500" />
                </div>,
                <div className="p-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/10">
                  <Shield className="w-6 h-6 text-blue-300" />
                </div>
              ]}
              outerChildren={[
                <div className="p-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/10">
                  <Rainbow className="w-6 h-6 text-purple-300" />
                </div>,
                <div className="p-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/10">
                  <HeartHandshake className="w-6 h-6 text-green-200" />
                </div>,
                <div className="p-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/10">
                  <Brain className="w-6 h-6 text-red-300" />
                </div>,
                <div className="p-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/10">
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
              ]}
            />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;