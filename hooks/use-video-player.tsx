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
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, [videoRef, volume]);

  useEffect(() => {
    if (videoRef.current) {
      if (open) {
        videoRef.current.currentTime = lastTime; // Resume from lastTime
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
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

  const handleSeekStart = () => {
    setSeeking(true);
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      const newTime = (videoRef.current.duration * value) / 100;
      videoRef.current.currentTime = newTime;
      setProgress(value);
      setLastTime(newTime);
    }
  };

  const handleSeekEnd = () => {
    setSeeking(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !seeking) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      setProgress((current / duration) * 100);
      setLastTime(current);

      const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      };

      setCurrentTime(formatTime(current));
      setDurationTime(formatTime(duration));

      // Stop when video reaches the end
      if (current >= duration) {
        setIsPlaying(false);
      }
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
    setIsPlaying,
    isMuted,
    progress,
    currentTime,
    durationTime,
    volume,
    setVolume,
    togglePlay,
    toggleMute,
    handleSeekStart,
    handleSeek,
    handleSeekEnd,
    toggleFullscreen,
    handleTimeUpdate,
  };
}
