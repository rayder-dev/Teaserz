"use client";

import type React from "react";

import { cn } from "@/lib/utils";

interface HexagonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
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

export function HexagonAvatar({
  src,
  fallback,
  size = "md",
  glowColor = "from-purple-600 to-blue-600",
  className,
  ...props
}: HexagonAvatarProps) {
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

      {/* Hexagon container */}
      <div
        className={cn(
          "relative",
          sizes[size],
          "before:content-[''] before:absolute before:inset-0",
          "before:bg-gradient-to-r before:from-white/20 before:to-white/5",
          "after:content-[''] after:absolute after:inset-[1px]",
          `after:bg-gradient-to-r after:${glowColor} after:opacity-10`,
          className
        )}
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          borderRadius: "24%",
        }}
        {...props}
      >
        <div
          className="absolute inset-[1px] overflow-hidden"
          style={{
            borderRadius: "24%",
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        >
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
