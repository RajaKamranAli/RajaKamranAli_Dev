import { cn } from "@/lib/utils";

interface GlowingOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "accent";
  animate?: boolean;
}

const GlowingOrb = ({
  className,
  size = "md",
  color = "primary",
  animate = true,
}: GlowingOrbProps) => {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-40 h-40",
    lg: "w-60 h-60",
    xl: "w-80 h-80",
  };

  const colorClasses = {
    primary: "bg-primary/30 shadow-[0_0_100px_50px_hsl(var(--primary)/0.3)]",
    secondary: "bg-secondary/30 shadow-[0_0_100px_50px_hsl(var(--secondary)/0.3)]",
    accent: "bg-accent/30 shadow-[0_0_100px_50px_hsl(var(--accent)/0.3)]",
  };

  return (
    <div
      className={cn(
        "rounded-full blur-3xl",
        sizeClasses[size],
        colorClasses[color],
        animate && "animate-float pulse-glow",
        className
      )}
    />
  );
};

export default GlowingOrb;
