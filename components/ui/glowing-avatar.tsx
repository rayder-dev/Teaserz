"use client";

import type React from "react";

import { cn } from "@/lib/utils";

interface GlowingAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  glowColor?: string;
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

export function GlowingAvatar({
  src,
  fallback,
  size = "md",
  glowColor = "from-purple-600 to-blue-600",
  className,
  ...props
}: GlowingAvatarProps) {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-50 blur-xl transition-opacity duration-500",
          `bg-gradient-to-r ${glowColor}`,
          "group-hover:opacity-70"
        )}
      />

      {/* Rounded container */}
      <div
        className={cn(
          "relative rounded-full overflow-hidden",
          sizes[size],
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-gradient-to-r before:from-white/20 before:to-white/5",
          "after:content-[''] after:absolute after:inset-[1px]",
          `after:bg-gradient-to-r after:${glowColor} after:opacity-10`,
          className
        )}
        {...props}
      >
        <div className="absolute inset-[1px] overflow-hidden rounded-full">
          {src ? (
            <img
              src={src || "/placeholder.svg"}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-medium">
              {fallback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
