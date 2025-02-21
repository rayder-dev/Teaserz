"use client";

import { useState } from "react";
import { Play, Info } from "lucide-react";
import { GlassCard } from "./glass-card";
import { Button } from "./button";
import { MoviePreviewModal } from "./movie-preview-modal";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  description: string;
  thumbnail: string;
  previewUrl: string;
  duration: string;
  year: string;
  rating: string;
}

export function MovieCard({
  title,
  description,
  thumbnail,
  previewUrl,
  duration,
  year,
  rating,
}: MovieCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <GlassCard
        className="group relative aspect-video overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setShowPreview(true)}
      >
        {/* Thumbnail */}
        <Image
          height={400}
          width={600}
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            {/* Top info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-bold">{title}</h3>
                <div className="flex gap-2 text-xs text-gray-200 mt-1">
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
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>

            {/* Center play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                variant="ghost"
                className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-transform"
              >
                <Play className="h-8 w-8 text-white" fill="white" />
              </Button>
            </div>

            {/* Bottom description */}
            <p className="text-sm text-gray-200 line-clamp-2">{description}</p>
          </div>
        </div>
      </GlassCard>

      <MoviePreviewModal
        open={showPreview}
        onOpenChange={setShowPreview}
        title={title}
        description={description}
        previewUrl={previewUrl}
        duration={duration}
        year={year}
        rating={rating}
      />
    </>
  );
}
