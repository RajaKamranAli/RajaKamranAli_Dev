import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Code2, Sparkles, Zap, CheckCircle2 } from "lucide-react";

const codeLines = [
  { type: "comment", content: "// Building the future with code" },
  { type: "keyword", content: "const" },
  { type: "variable", content: " developer" },
  { type: "operator", content: " = " },
  { type: "bracket", content: "{" },
  { type: "property", content: "  name: " },
  { type: "string", content: '"Kamran Ali"' },
  { type: "comma", content: "," },
  { type: "property", content: "  skills: " },
  { type: "bracket", content: "[" },
  { type: "string", content: '".NET"' },
  { type: "comma", content: ", " },
  { type: "string", content: '"React"' },
  { type: "comma", content: ", " },
  { type: "string", content: '"ML"' },
  { type: "bracket", content: "]" },
  { type: "comma", content: "," },
  { type: "property", content: "  passion: " },
  { type: "string", content: '"Innovation"' },
  { type: "bracket", content: "};" },
  { type: "empty", content: "" },
  { type: "keyword", content: "async function" },
  { type: "function", content: " buildSolution" },
  { type: "bracket", content: "() {" },
  { type: "keyword", content: "  await" },
  { type: "variable", content: " analyze" },
  { type: "bracket", content: "(requirements);" },
  { type: "keyword", content: "  await" },
  { type: "variable", content: " design" },
  { type: "bracket", content: "(architecture);" },
  { type: "keyword", content: "  await" },
  { type: "variable", content: " implement" },
  { type: "bracket", content: "(features);" },
  { type: "keyword", content: "  return" },
  { type: "string", content: " success" },
  { type: "operator", content: ";" },
  { type: "bracket", content: "}" },
];

const colorMap: Record<string, string> = {
  comment: "text-muted-foreground/60",
  keyword: "text-secondary",
  variable: "text-primary",
  operator: "text-foreground",
  bracket: "text-foreground/80",
  property: "text-accent",
  string: "text-secondary",
  comma: "text-foreground/60",
  function: "text-primary",
  empty: "",
};

const features = [
  { icon: Code2, text: "Clean Code Architecture", delay: 0 },
  { icon: Zap, text: "High Performance", delay: 200 },
  { icon: Sparkles, text: "Modern Technologies", delay: 400 },
  { icon: CheckCircle2, text: "Production Ready", delay: 600 },
];

const LiveDemoSection = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("live-demo");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="live-demo" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-primary text-sm font-medium mb-4">
            Live Demo
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">See My Work </span>
            <span className="text-gradient-primary">In Action</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Watch how I transform ideas into elegant solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Code Editor */}
          <div className="glass-card rounded-2xl overflow-hidden border-primary/20 shadow-[0_0_60px_hsl(var(--primary)/0.1)]">
            {/* Editor Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-secondary/60" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">
                developer.ts
              </span>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm overflow-x-auto min-h-[400px]">
              <div className="space-y-1">
                {codeLines.slice(0, visibleLines).map((line, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-4 animate-fade-in",
                      line.type === "empty" && "h-4"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-muted-foreground/40 w-6 text-right select-none">
                      {index + 1}
                    </span>
                    <span className={colorMap[line.type]}>{line.content}</span>
                  </div>
                ))}
                {visibleLines < codeLines.length && (
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground/40 w-6 text-right">
                      {visibleLines + 1}
                    </span>
                    <span className="w-2 h-5 bg-primary animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-4 glass-card rounded-xl p-4 transition-all duration-500",
                      isInView && "animate-slide-left",
                      "hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                    )}
                    style={{ animationDelay: `${feature.delay + 500}ms` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="text-3xl font-display font-bold text-gradient-primary mb-1">
                  99%
                </div>
                <div className="text-sm text-muted-foreground">Code Quality</div>
              </div>
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="text-3xl font-display font-bold text-gradient-primary mb-1">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoSection;
