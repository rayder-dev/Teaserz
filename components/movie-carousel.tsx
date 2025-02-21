"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/ui/movie-card";

const movies = [
  {
    title: "Dune",
    description:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    previewUrl: "https://example.com/dune-preview.mp4",
    duration: "2h 35m",
    year: "2021",
    rating: "PG-13",
  },
  {
    title: "Blade Runner 2049",
    description:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    previewUrl: "https://example.com/blade-runner-preview.mp4",
    duration: "2h 44m",
    year: "2017",
    rating: "R",
  },
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    previewUrl: "https://example.com/inception-preview.mp4",
    duration: "2h 28m",
    year: "2010",
    rating: "PG-13",
  },
  // Add more movies as needed
];

export function MovieCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(movies.length / 2));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(movies.length / 2)) % Math.ceil(movies.length / 2)
    );
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-12 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-12 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={nextSlide}
        disabled={currentIndex === Math.ceil(movies.length / 2) - 1}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 gap-4 overflow-hidden">
        {movies.slice(currentIndex * 2, currentIndex * 2 + 2).map((movie) => (
          <MovieCard key={movie.title} {...movie} />
        ))}
      </div>
    </div>
  );
}
