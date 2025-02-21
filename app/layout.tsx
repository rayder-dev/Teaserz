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
  title: "Create Next App",
  description: "Generated by create next app",
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
        <div>
          <AppHeader />
          <div className="grid grid-cols-[64px_240px_1fr_300px] h-[calc(100vh-48px)]">
            <LeftToolbar />
            <NavigationSidebar />
            <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-screen">
              <main className="p-6 space-y-8">{children}</main>
            </div>
            <RightSidebar />
          </div>
          <AudioPlayer />
        </div>
      </body>
    </html>
  );
}
