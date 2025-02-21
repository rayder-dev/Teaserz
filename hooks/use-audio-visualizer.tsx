"use client";

import type React from "react";
import { useCallback, useRef, useState } from "react";

export function useAudioVisualizer(
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const animationFrameId = useRef<number | null>(null);
  const [amplitude, setAmplitude] = useState(0.75);

  const startVisualization = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#06b6d4"); // cyan-500
      gradient.addColorStop(0.5, "#a855f7"); // purple-500
      gradient.addColorStop(1, "#ec4899"); // pink-500

      // Visualization settings
      const barWidth = 3;
      const barGap = 3;
      const barCount = Math.floor(canvas.width / (barWidth + barGap));
      const maxHeight = canvas.height * 0.7;

      ctx.shadowColor = "#a855f7"; // purple glow
      ctx.shadowBlur = 20;
      ctx.lineJoin = "round"; // Smooth edges

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + barGap);

        // Smooth waveform calculation
        const time = Date.now() * 0.002;
        const height =
          (Math.sin(i * 0.08 + time) * 0.6 +
            Math.sin(i * 0.03 + time * 1.5) * 0.3 +
            Math.sin(i * 0.02 + time * 0.7) * 0.1) *
          maxHeight *
          amplitude;

        const y = (canvas.height - Math.abs(height)) / 2;

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, Math.abs(height), 4); // Rounded bars
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [canvasRef, amplitude]);

  return { startVisualization, setAmplitude };
}
