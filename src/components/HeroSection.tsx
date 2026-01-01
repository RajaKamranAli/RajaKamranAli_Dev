import { Button } from "@/components/ui/button";
import TypewriterText from "./TypewriterText";
import { ArrowRight, Linkedin, Mail, Github } from "lucide-react";
import kamranImage from "@/assets/kamran-profile.webp";
import { useEffect, useState } from "react";

// Animated drops component
const AnimatedDrops = () => {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);
  
  useEffect(() => {
    const newDrops = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 2 + Math.random() * 3,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${drop.left}%`,
            width: `${drop.size}px`,
            height: `${drop.size * 2.5}px`,
            animation: `dropFall ${drop.duration}s linear ${drop.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const roles = [
    ".NET Web API Expert",
    "React JS Developer", 
    "SQL Server Specialist",
    "ML Engineer",
    "Full Stack Developer",
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      
      {/* Animated drops in background */}
      <AnimatedDrops />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left side - Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Intro badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground font-mono">Available for Projects</span>
            </div>
            
            {/* Name */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
              <span className="text-muted-foreground font-light">Hi, I'm</span>
              <br />
              <span className="text-gradient-primary">Kamran Ali</span>
            </h1>

            {/* Typewriter */}
            <div className="h-10 mb-6 animate-fade-in animation-delay-200">
              <TypewriterText 
                texts={roles} 
                className="text-primary font-mono text-xl md:text-2xl" 
              />
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-in animation-delay-400">
              Building cutting-edge solutions with modern technologies. 
              Creator of the <span className="text-accent font-semibold">world's first scratched-based Urdu AI Model</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8 animate-fade-in animation-delay-600">
              <Button variant="hero" size="xl" asChild>
                <a href="#portfolio" className="group">
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#contact">
                  Let's Connect
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in animation-delay-1000">
              <a 
                href="https://github.com/kamranali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/kamran-ali-557b70212" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:rajakamranali755@gmail.com"
                className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right side - Hexagonal image with text overlay */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in">
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-primary/10 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[380px] h-[380px] md:w-[470px] md:h-[470px] rounded-full border border-primary/5 animate-spin-slow" />
              </div>
              
              {/* Floating particles around image */}
              <div className="absolute -top-4 left-1/4 w-3 h-3 rounded-full bg-primary/50 animate-float" />
              <div className="absolute top-1/4 -right-2 w-2 h-2 rounded-full bg-accent/50 animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/4 -left-4 w-4 h-4 rounded-full bg-secondary/40 animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute -bottom-2 right-1/4 w-2 h-2 rounded-full bg-primary/40 animate-float" style={{ animationDelay: '0.5s' }} />
              
              {/* Hexagonal container */}
              <div className="relative w-[300px] h-[340px] md:w-[360px] md:h-[410px]">
                {/* Hexagon clip path wrapper */}
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                >
                  {/* Image - properly centered on face */}
                  <img 
                    src={kamranImage}
                    alt="Kamran Ali - Full Stack Developer"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                  />
                  
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  
                  {/* Text overlay on image */}
                  <div className="absolute bottom-8 left-0 right-0 px-4">
                    <div className="glass-card rounded-lg px-4 py-3 border border-primary/30 backdrop-blur-md text-center">
                      <TypewriterText 
                        texts={roles} 
                        className="text-primary font-mono text-sm md:text-base tracking-wide" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Hexagonal border SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 114" preserveAspectRatio="none">
                  <polygon 
                    points="50,1 99,26 99,88 50,113 1,88 1,26" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="0.4"
                    opacity="0.7"
                  />
                  <polygon 
                    points="50,4 96,27.5 96,86.5 50,110 4,86.5 4,27.5" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="0.2"
                    opacity="0.4"
                  />
                </svg>
              </div>

              {/* Stats floating card - 10+ Projects */}
              <div className="absolute -top-4 -right-4 md:-right-8 glass-card rounded-xl p-4 border border-primary/30 animate-fade-in animation-delay-600 shadow-lg">
                <div className="text-2xl font-bold text-gradient-primary">10+</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              
              {/* Stats floating card - 3+ Years */}
              <div className="absolute -bottom-4 -right-4 md:-right-8 glass-card rounded-xl p-4 border border-primary/30 animate-fade-in animation-delay-1000 shadow-lg">
                <div className="text-2xl font-bold text-gradient-primary">3+</div>
                <div className="text-xs text-muted-foreground">Years Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary/60 animate-pulse" />
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes dropFall {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-15px) scale(1.1);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
