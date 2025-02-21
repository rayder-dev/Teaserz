"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import {
  Headphones,
  Users,
  Volume2,
  Volume1,
  Volume,
  VolumeX,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { useAudioVisualizer } from "@/hooks/use-audio-visualizer";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AudioPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [volume, setVolume] = useState(75);
  const [prevVolume, setPrevVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const { startVisualization, setAmplitude } = useAudioVisualizer(
    canvasRef as React.RefObject<HTMLCanvasElement>
  );

  useEffect(() => {
    startVisualization();
  }, [startVisualization]);

  useEffect(() => {
    setAmplitude(isMuted ? 0 : volume / 100);
  }, [volume, isMuted, setAmplitude]);

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX />;
    if (volume < 33) return <Volume />;
    if (volume < 66) return <Volume1 />;
    return <Volume2 />;
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume);
    } else {
      setIsMuted(true);
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  const toggleAudioMute = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  const handleVisualizerClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newVolume = Math.round((x / rect.width) * 100);
    setVolume(Math.max(0, Math.min(100, newVolume)));
    setIsMuted(false);
  };

  return (
    <GlassCard
      className="fixed bottom-0 left-0 w-[304px] border-t"
      gradient="from-black/40 to-black/20"
      blur="lg"
    >
      {/* Visualizer Container */}
      <div className="relative h-12 w-full overflow-hidden group">
        {/* Volume Tooltip */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none z-20">
          Volume: {volume}%
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onClick={handleVisualizerClick}
          className="absolute inset-0 w-full h-full cursor-pointer z-10"
        />

        {/* Volume Level Indicator */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-150 z-0"
          style={{ width: `${volume}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 h-12">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2023-06-14_212351-AMHpfMwvgsNz9HBQqzXf0FFk7G58sz.png" />
            <AvatarFallback>SF</AvatarFallback>
          </Avatar>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                  onClick={toggleMute}
                >
                  <VolumeIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isMuted ? "Unmute" : "Mute"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    isAudioMuted
                      ? "text-red-400 hover:text-red-300"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={toggleAudioMute}
                >
                  <Headphones className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isAudioMuted ? "Unmute Audio" : "Mute Audio"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <Users className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
