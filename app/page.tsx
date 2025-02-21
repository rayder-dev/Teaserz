import { AppHeader } from "@/components/app-header";
import { LeftToolbar } from "@/components/left-toolbar";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { MainContent } from "@/components/main-content";
import { RightSidebar } from "@/components/right-sidebar";
import { AudioPlayer } from "@/components/audio-player";

export default function Home() {
  return (
    <div>
      <AppHeader />
      <div className="grid grid-cols-[64px_240px_1fr_300px] h-[calc(100vh-48px)]">
        <LeftToolbar />
        <NavigationSidebar />
        <div className="overflow-auto">
          <MainContent />
        </div>
        <RightSidebar />
      </div>
      <AudioPlayer />
    </div>
  );
}
