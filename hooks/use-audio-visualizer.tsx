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

      // Draw visualization
      const barWidth = 2;
      const barGap = 2;
      const barCount = Math.floor(canvas.width / (barWidth + barGap));
      const maxHeight = canvas.height * 0.7;

      ctx.shadowColor = "#a855f7"; // purple glow
      ctx.shadowBlur = 15;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + barGap);

        // Create a more complex waveform
        const time = Date.now() * 0.002;
        const height =
          (Math.sin(i * 0.05 + time) * 0.5 +
            Math.sin(i * 0.025 + time * 1.2) * 0.3 +
            Math.sin(i * 0.0125 + time * 0.8) * 0.2) *
          maxHeight *
          amplitude;

        const y = (canvas.height - Math.abs(height)) / 2;

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, Math.abs(height));
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
