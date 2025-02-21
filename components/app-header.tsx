import { Search, Cloud, RefreshCw, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AppHeader() {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#1A1625]">
      <WindowControls />
      <SearchBar />
      <HeaderActions />
    </div>
  );
}

function WindowControls() {
  return (
    <div className="flex gap-2 items-center">
      <Image src="/logo.png" height={35} width={35} alt="Logo" />
      <h1 className="text-white font-bold text-xl">Teaserz</h1>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex-1 flex justify-center">
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          className="w-full bg-[#2D2258]/50 border-0 pl-10 pr-4 py-2 text-white placeholder:text-gray-400 rounded-lg"
          placeholder="Explore"
        />
      </div>
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      {[Cloud, RefreshCw, Settings].map((Icon, i) => (
        <Button
          key={i}
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  );
}
