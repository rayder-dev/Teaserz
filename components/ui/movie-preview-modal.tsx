"use client";

import { useEffect, useRef } from "react";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";
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
  const { isPlaying, isMuted, togglePlay, toggleMute, onTimeUpdate, progress } =
    useVideoPlayer(videoRef);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.play();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90 backdrop-blur-xl">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src={previewUrl}
            className="w-full h-full object-cover"
            loop
            onTimeUpdate={onTimeUpdate}
          />

          {/* Video Controls Overlay */}
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
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            {/* Bottom Controls */}
            <div className="space-y-4">
              <p className="text-gray-200">{description}</p>

              <div className="flex items-center gap-4">
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

                {/* Progress Bar */}
                <div className="relative flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-white transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
