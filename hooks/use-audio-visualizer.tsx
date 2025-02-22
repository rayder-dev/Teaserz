"use client";

import type React from "react";
import { useCallback, useRef, useState, useEffect } from "react";

export function useAudioVisualizer(
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const animationFrameId = useRef<number | null>(null);
  const [amplitude, setAmplitude] = useState(0.75);
  const gradientRef = useRef<CanvasGradient | null>(null);
  const barCountRef = useRef<number>(0);

  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;

    // Recalculate bar count on resize
    const barWidth = 3;
    const barGap = 3;
    barCountRef.current = Math.floor(canvas.width / (barWidth + barGap));

    // Recreate gradient on resize
    const ctx = canvas.getContext("2d");
    if (ctx) {
      gradientRef.current = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradientRef.current.addColorStop(0, "#06b6d4"); // cyan-500
      gradientRef.current.addColorStop(0.5, "#a855f7"); // purple-500
      gradientRef.current.addColorStop(1, "#ec4899"); // pink-500
    }
  }, [canvasRef]);

  const draw = useCallback(() => {
    if (!canvasRef.current || !gradientRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = 3;
    const barGap = 4;
    const maxHeight = canvas.height * 1;
    const time = Date.now() * 0.001;

    ctx.shadowColor = "#a855f7"; // purple glow
    ctx.shadowBlur = 20;
    ctx.lineJoin = "round"; // Smooth edges

    for (let i = 0; i < barCountRef.current; i++) {
      const x = i * (barWidth + barGap);

      // Smooth waveform calculation
      const height =
        (Math.sin(i * 0.9 + time) * 0.6 +
          Math.sin(i * 0.03 + time * 1.5) * 0.5 +
          Math.sin(i * 0.02 + time * 0.7) * 0.1) *
        maxHeight *
        amplitude;

      const y = (canvas.height - Math.abs(height)) / 2;

      ctx.fillStyle = gradientRef.current;
      ctx.beginPath();
      // Draw an ellipse instead of a rounded rectangle
      ctx.ellipse(
        x + barWidth / 2, // Center x
        y + Math.abs(height) / 2, // Center y
        barWidth / 2, // Radius x
        Math.abs(height) / 2, // Radius y
        0, // Rotation
        0, // Start angle
        2 * Math.PI // End angle
      );
      ctx.fill();
    }

    animationFrameId.current = requestAnimationFrame(draw);
  }, [amplitude, canvasRef]);

  const startVisualization = useCallback(() => {
    if (!canvasRef.current) return;

    resizeCanvas();
    const debouncedResize = debounce(resizeCanvas, 100);
    window.addEventListener("resize", debouncedResize);

    draw();

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [canvasRef, draw, resizeCanvas]);

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return { startVisualization, setAmplitude };
}

// Debounce function to limit the rate of resize events
function debounce(func: () => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(), wait);
  };
}
