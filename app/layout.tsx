import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LeftToolbar } from "@/components/left-toolbar";
import { AppHeader } from "@/components/app-header";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { AudioPlayer } from "@/components/audio-player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teaserz",
  description:
    "Teaserz, the ultimate platform for showcasing and promoting movie trailers! Our app is designed to connect movie studios with audiences, providing an engaging and seamless experience for watching and discovering the latest movies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <div className="grid h-[calc(100vh-48px)] grid-cols-[64px_1fr] md:grid-cols-[64px_1fr] lg:grid-cols-[64px_240px_1fr] xl:grid-cols-[64px_240px_1fr_300px]">
          <LeftToolbar />
          <NavigationSidebar />
          <div className="flex flex-1 flex-col h-screen overflow-hidden">
            <AppHeader />
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
              <main className="p-4 sm:p-6 md:p-8 lg:p-9 space-y-6 md:space-y-8 pb-16">
                {children}
              </main>
            </div>
          </div>
          <RightSidebar />
        </div>
        <AudioPlayer />
      </body>
    </html>
  );
}
