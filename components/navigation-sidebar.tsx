import {
  Home,
  Music,
  Gamepad,
  Globe,
  BookOpen,
  Film,
  Building2,
  Plus,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

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
      className="h-full border-r"
      gradient="from-white/[0.02] to-transparent"
    >
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
        <Button
          variant="ghost"
          className="mt-4 w-10 h-10 p-0 hover:bg-white/[0.06]"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </GlassCard>
  );
}
