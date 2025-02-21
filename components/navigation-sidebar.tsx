import {
  Home,
  Music,
  Gamepad,
  Globe,
  BookOpen,
  Film,
  Building2,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navigationItems = [
  { icon: Home, label: "Home" },
  { icon: Music, label: "Trailers" },
  { icon: Gamepad, label: "Teasers" },
  { icon: Globe, label: "Promotional" },
  { icon: BookOpen, label: "Interviews" },
  { icon: Film, label: "History" },
  { icon: Building2, label: "Watchlist" },
];

export function NavigationSidebar() {
  return (
    <GlassCard
      className="h-full border-r rounded-none"
      gradient="from-white/[0.02] to-transparent"
    >
      <div className="flex gap-2 items-center h-[3.2em] px-7">
        <Image src="/logo.png" height={35} width={35} alt="Logo" />
        <h1 className="text-white font-bold text-xl">Teaserz</h1>
      </div>
      <div className="p-4">
        <nav className="space-y-3">
          {navigationItems.map((item, index) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-3 font-medium text-gray-300 hover:text-white hover:bg-white/[0.06]
                ${index === 0 && "bg-black/20"}`}
            >
              <item.icon className="h-10 w-10" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </GlassCard>
  );
}
