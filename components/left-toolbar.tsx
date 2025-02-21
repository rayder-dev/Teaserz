"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const toolbarItems = [
  {
    icon: "🎬",
    gradient: "from-purple-400 to-violet-600",
    activeGradient: "from-purple-500 to-violet-700",
  },
  {
    icon: "🎮",
    gradient: "from-pink-400 to-fuchsia-600",
    activeGradient: "from-pink-500 to-fuchsia-700",
  },
  {
    icon: "🎵",
    gradient: "from-sky-400 to-cyan-600",
    activeGradient: "from-sky-500 to-cyan-700",
  },
  {
    icon: "Live",
    gradient: "from-green-400 to-emerald-600",
    activeGradient: "from-green-500 to-emerald-700",
  },
];

export function LeftToolbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#5c4f81]/40 backdrop-blur-2xl border-r border-white/[0.02]">
      <div className="flex flex-col items-center gap-4 p-4 pt-16">
        {toolbarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative group",
              "w-12 h-12 rounded-full",
              "transition-all duration-300"
            )}
          >
            {/* Glow effect */}
            <div
              className={cn(
                "absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300",
                `bg-gradient-to-r ${item.gradient}`,
                "group-hover:opacity-70",
                activeIndex === index && "opacity-70"
              )}
            />

            {/* Icon container */}
            <div
              className={cn(
                "relative w-full h-full rounded-full",
                "flex items-center justify-center",
                "bg-black/20 backdrop-blur-sm",
                "before:absolute before:inset-0 before:rounded-full",
                "before:bg-gradient-to-r",
                `before:${
                  activeIndex === index ? item.activeGradient : item.gradient
                }`,
                "before:opacity-20",
                "hover:before:opacity-30",
                "transition-all duration-300",
                // Border
                "after:absolute after:inset-[1px] after:rounded-full",
                "after:bg-gradient-to-r after:from-white/10 after:to-white/5"
              )}
            >
              <span
                className={`relative  text-emerald-400 font-bold ${
                  item.icon === "Live" ? "text-sm" : " text-xl"
                }`}
              >
                {item.icon}
              </span>
            </div>

            {/* Active indicator */}
            {activeIndex === index && (
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-sky-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
