import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star, Award, Zap } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Lekhari - Urdu AI Platform",
    role: "Project Lead",
    description:
      "World's first scratched-based Urdu language AI model. Revolutionary NLP solution for Urdu linguistic processing including synonyms, antonyms, grammar check, and summarization.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tags: ["Python", "Machine Learning", "NLP", "React", "AI"],
    link: "https://lekharicelt.vercel.app/",
    featured: true,
    highlight: "World's First Urdu AI Model",
  },
  {
    id: 2,
    title: "ZeroWaveLabs",
    role: "Full Stack Developer",
    description:
      "Tech agency website offering premium services and free resources. Built with modern technologies featuring stunning animations and responsive design.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://zerowavelabs.com/",
    featured: false,
  },
  {
    id: 3,
    title: "STC Form Panda",
    role: "Full Stack Developer",
    description:
      "Enterprise form management system built with .NET Web API backend and React frontend. Robust SQL Server database with complex business logic.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: [".NET Core", "React", "SQL Server", "REST API"],
    link: "https://stc.formpanda.com.au/",
    featured: false,
  },
];

const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-medium mb-4">
            My Work
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Featured </span>
            <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real-world solutions I've delivered for clients
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "group relative glass-card rounded-3xl overflow-hidden transition-all duration-500",
                "hover:border-primary/50 hover:shadow-[0_0_60px_hsl(var(--primary)/0.15)]",
                project.featured && "ring-2 ring-accent/30"
              )}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/50 backdrop-blur-sm">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold text-accent">Featured</span>
                </div>
              )}

              <div className={cn(
                "grid md:grid-cols-2 gap-0",
                index % 2 === 1 && "md:grid-flow-dense"
              )}>
                {/* Image */}
                <div className={cn(
                  "relative h-64 md:h-80 overflow-hidden",
                  index % 2 === 1 && "md:col-start-2"
                )}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card via-card/50 to-transparent" />
                  
                  {/* Animated Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-500",
                    activeProject === project.id && "opacity-100"
                  )} />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  {/* Role Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-secondary" />
                    <span className="text-secondary text-sm font-medium">{project.role}</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Highlight */}
                  {project.highlight && (
                    <div className="flex items-center gap-2 mb-4 text-accent">
                      <Star className="w-4 h-4 fill-accent" />
                      <span className="text-sm font-semibold">{project.highlight}</span>
                    </div>
                  )}

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <Button variant="hero" size="default" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none">
                <div className={cn(
                  "absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500",
                  activeProject === project.id && "opacity-100",
                  "bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
