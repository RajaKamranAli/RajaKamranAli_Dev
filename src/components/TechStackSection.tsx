import { cn } from "@/lib/utils";

const technologies = [
  {
    name: ".NET Core",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
    category: "Backend",
  },
  {
    name: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    category: "Backend",
  },
  {
    name: "SQL Server",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    category: "Database",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Frontend",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "ML/AI",
  },
  {
    name: "TensorFlow",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    category: "ML/AI",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Tools",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "DevOps",
  },
  {
    name: "Azure",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    category: "Cloud",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    category: "Frontend",
  },
];

const TechStackSection = () => {
  return (
    <section id="tech" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-medium mb-4">
            Technologies
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Tech </span>
            <span className="text-gradient-primary">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Infinite Scroll Marquee */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* First Row - Left to Right */}
          <div className="flex gap-8 mb-8 animate-marquee">
            {[...technologies, ...technologies].map((tech, index) => (
              <div
                key={`row1-${index}`}
                className="group flex-shrink-0 glass-card rounded-2xl p-6 w-40 h-40 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] transition-all duration-300 hover:scale-110"
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
                <span className="text-xs text-muted-foreground/60">{tech.category}</span>
              </div>
            ))}
          </div>

          {/* Second Row - Right to Left */}
          <div className="flex gap-8 animate-marquee-reverse">
            {[...technologies.slice().reverse(), ...technologies.slice().reverse()].map((tech, index) => (
              <div
                key={`row2-${index}`}
                className="group flex-shrink-0 glass-card rounded-2xl p-6 w-40 h-40 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] transition-all duration-300 hover:scale-110"
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
                <span className="text-xs text-muted-foreground/60">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Animation Styles */}
        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes marquee-reverse {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          
          .animate-marquee-reverse {
            animation: marquee-reverse 40s linear infinite;
          }
          
          .animate-marquee:hover,
          .animate-marquee-reverse:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
};

export default TechStackSection;
