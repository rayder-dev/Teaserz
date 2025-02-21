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
  { icon: Music, label: "Music" },
  { icon: Gamepad, label: "Gaming" },
  { icon: Globe, label: "Science & Tech" },
  { icon: BookOpen, label: "Education" },
  { icon: Film, label: "Entertainment" },
  { icon: Building2, label: "Student Hubs" },
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
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-white/[0.06]"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </GlassCard>
  );
}
