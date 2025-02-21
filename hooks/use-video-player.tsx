"use client";

import { useState, useEffect, type RefObject } from "react";

export function useVideoPlayer(
  videoRef: RefObject<HTMLVideoElement>,
  open: boolean
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [durationTime, setDurationTime] = useState("0:00");
  const [volume, setVolume] = useState(50);
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (open) {
      if (videoRef.current) {
        videoRef.current.currentTime = lastTime; // Resume from last time
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (videoRef.current) {
        setLastTime(videoRef.current.currentTime); // Save last position
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [open]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current.duration * value) / 100;
      setLastTime(videoRef.current.currentTime); // Update last time for resuming
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      setProgress((current / duration) * 100);
      setLastTime(current); // Continuously update lastTime for accurate resuming

      const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      };

      setCurrentTime(formatTime(current));
      setDurationTime(formatTime(duration));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return {
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
  };
}
