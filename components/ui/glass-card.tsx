import type React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: string;
  blur?: "sm" | "md" | "lg";
  intensity?: "light" | "medium" | "heavy";
  border?: boolean;
  hoverEffect?: boolean;
}

const blurValues = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
};

const intensityValues = {
  light: "bg-white/[0.02]",
  medium: "bg-white/[0.04]",
  heavy: "bg-white/[0.08]",
};

export function GlassCard({
  gradient = "from-white/[0.05] to-white/[0.03]",
  blur = "md",
  intensity = "medium",
  border = true,
  hoverEffect = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        blurValues[blur],
        intensityValues[intensity],
        border && "border border-white/[0.05]",
        hoverEffect && "transition-all duration-300 hover:bg-white/[0.06]",
        "before:absolute before:inset-0",
        `before:bg-gradient-to-b ${gradient}`,
        "before:opacity-20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
