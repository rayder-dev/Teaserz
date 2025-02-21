"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Slider } from "@/components/ui/slider";
import { useVideoPlayer } from "@/hooks/use-video-player";

interface MoviePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  previewUrl: string;
  duration: string;
  year: string;
  rating: string;
}

export function MoviePreviewModal({
  open,
  onOpenChange,
  title,
  description,
  previewUrl,
  duration,
  year,
  rating,
}: MoviePreviewModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const {
    isPlaying,
    isMuted,
    progress,
    currentTime,
    durationTime,
    volume,
    setVolume,
    togglePlay,
    toggleMute,
    handleSeek,
    toggleFullscreen,
    handleTimeUpdate,
    handleSeekStart,
    handleSeekEnd,
  } = useVideoPlayer(videoRef, open);

  const [showVolume, setShowVolume] = useState(false);
  const [showControls, setShowControls] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl p-0 overflow-hidden bg-black/90 backdrop-blur-xl"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        aria-describedby="movie-description"
      >
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src={previewUrl}
            className="w-full h-full object-cover"
            loop
            onTimeUpdate={handleTimeUpdate}
          />

          {showControls && (
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/40">
              <DialogHeader className="flex flex-row items-start justify-between">
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold text-white">
                    {title}
                  </DialogTitle>
                  <div className="flex gap-2 text-sm text-gray-200 mt-1">
                    <span>{year}</span>
                    <span>•</span>
                    <span>{duration}</span>
                    <span>•</span>
                    <span>{rating}</span>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 absolute bottom-0 left-0 w-full">
                <p id="movie-description" className="text-gray-200 px-4">
                  {description}
                </p>
                <div className="bg-violet-500/5 backdrop-blur-lg p-2 pt-0">
                  <Slider
                    value={[progress]}
                    max={100}
                    step={0.1} // More precise control
                    onValueChange={(value) => handleSeek(value[0])}
                    onPointerDown={handleSeekStart} // Prevents updates while dragging
                    onPointerUp={handleSeekEnd} // Resumes progress tracking
                    className="w-full"
                  />

                  <div className="flex items-center gap-4 mt-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" fill="white" />
                      )}
                    </Button>

                    <div
                      className="relative flex"
                      onMouseEnter={() => setShowVolume(true)}
                      onMouseLeave={() => setShowVolume(false)}
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <VolumeX className="h-6 w-6" />
                        ) : (
                          <Volume2 className="h-6 w-6" />
                        )}
                      </Button>
                      {showVolume && (
                        <Slider
                          value={[volume]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setVolume(value[0])}
                          className="w-24 ml-2"
                        />
                      )}
                    </div>

                    <span className="ml-auto text-white text-sm">
                      {currentTime} / {durationTime}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={toggleFullscreen}
                    >
                      <Maximize className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
