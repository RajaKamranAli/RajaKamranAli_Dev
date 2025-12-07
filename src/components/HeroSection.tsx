import { Button } from "@/components/ui/button";
import ParticleBackground from "./ParticleBackground";
import GlowingOrb from "./GlowingOrb";
import TypewriterText from "./TypewriterText";
import { ArrowRight, Play, Code2, Database, Brain, Layers } from "lucide-react";

const HeroSection = () => {
  const roles = [
    ".NET Web API Expert",
    "React JS Developer",
    "SQL Server Specialist",
    "ML Engineer",
    "Full Stack Developer",
  ];

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "10+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <ParticleBackground />
      
      {/* Glowing Orbs */}
      <GlowingOrb
        size="xl"
        color="primary"
        className="absolute top-1/4 right-1/4 opacity-40"
      />
      <GlowingOrb
        size="lg"
        color="secondary"
        className="absolute bottom-1/4 left-1/4 opacity-30 animation-delay-1000"
      />
      <GlowingOrb
        size="md"
        color="accent"
        className="absolute top-1/2 right-1/6 opacity-20 animation-delay-2000"
      />

      {/* Orbiting Elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
          {/* Orbit Rings */}
          <div className="absolute inset-0 border border-primary/10 rounded-full" />
          <div className="absolute inset-8 border border-secondary/10 rounded-full" />
          <div className="absolute inset-16 border border-primary/5 rounded-full" />
          
          {/* Orbiting Icons */}
          <div className="absolute inset-0 orbit">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-primary/30 shadow-lg">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="absolute inset-0 orbit-reverse animation-delay-600">
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-secondary/30 shadow-lg">
              <Database className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <div className="absolute inset-0 orbit animation-delay-1000">
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-accent/30 shadow-lg">
              <Brain className="w-5 h-5 text-accent" />
            </div>
          </div>
          <div className="absolute inset-0 orbit-reverse animation-delay-400">
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-primary/30 shadow-lg">
              <Layers className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for Projects</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient-primary">Kamran Ali</span>
          </h1>

          {/* Typewriter Subtitle */}
          <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 h-10 animate-fade-in animation-delay-200">
            <TypewriterText texts={roles} className="text-primary font-medium" />
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in animation-delay-400">
            Building cutting-edge solutions with modern technologies. 
            Creator of the <span className="text-accent font-semibold">world's first scratched-based Urdu AI Model</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in animation-delay-600">
            <Button variant="hero" size="xl" asChild>
              <a href="#portfolio" className="group">
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#services" className="group">
                <Play className="w-5 h-5" />
                See Services
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in animation-delay-1000">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
