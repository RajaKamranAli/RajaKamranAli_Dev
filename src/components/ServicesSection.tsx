import { useState } from "react";
import { cn } from "@/lib/utils";
import { Server, Database, Code2, Brain, ArrowUpRight } from "lucide-react";

const services = [
  {
    id: 1,
    icon: Server,
    title: ".NET Web APIs",
    description:
      "Building robust, scalable RESTful APIs using ASP.NET Core. Clean architecture, Entity Framework, and best practices for enterprise-grade solutions.",
    features: ["RESTful Architecture", "Entity Framework Core", "JWT Authentication", "API Documentation"],
    color: "primary",
  },
  {
    id: 2,
    icon: Database,
    title: "SQL Server",
    description:
      "Expert database design, optimization, and management. Complex queries, stored procedures, and performance tuning for maximum efficiency.",
    features: ["Database Design", "Query Optimization", "Stored Procedures", "Data Migration"],
    color: "secondary",
  },
  {
    id: 3,
    icon: Code2,
    title: "React JS",
    description:
      "Modern, responsive front-end development with React. State management, hooks, TypeScript integration, and stunning UI/UX design.",
    features: ["TypeScript", "State Management", "Responsive Design", "Component Libraries"],
    color: "primary",
  },
  {
    id: 4,
    icon: Brain,
    title: "Machine Learning",
    description:
      "Custom ML models built from scratch. Specializing in NLP, with experience creating the world's first Urdu language AI model.",
    features: ["NLP Models", "Custom Training", "Model Optimization", "Production Deployment"],
    color: "accent",
  },
];

const ServicesSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-medium mb-4">
            What I Do
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Expert </span>
            <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Delivering end-to-end solutions with cutting-edge technologies
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredId === service.id;
            
            return (
              <div
                key={service.id}
                className={cn(
                  "group relative glass-card rounded-2xl p-8 transition-all duration-500 cursor-pointer",
                  "hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]",
                  isHovered && "scale-[1.02]"
                )}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Glow Effect */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
                    isHovered && "opacity-100"
                  )}
                  style={{
                    background: `radial-gradient(circle at center, hsl(var(--${service.color}) / 0.1), transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300",
                    "bg-gradient-to-br from-primary/20 to-secondary/20",
                    "group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                  )}
                >
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-display text-xl font-semibold mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
                    {service.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground border border-border/50"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div
                    className={cn(
                      "absolute -top-10 -right-10 w-20 h-20 rotate-45 transition-all duration-500",
                      "bg-gradient-to-br from-primary/10 to-transparent",
                      isHovered && "from-primary/20"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
