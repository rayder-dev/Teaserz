"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/ui/movie-card";
interface Movie {
  title: string;
  description: string;
  thumbnail: string;
  previewUrl: string;
  duration: string;
  year: string;
  rating: string;
}
export function MovieCarousel({ movies }: { movies: Movie[] }) {
  const moviesPerPage = 3; // Now showing 4 movies per view
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative w-full">
      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={nextSlide}
        disabled={currentIndex === totalPages - 1}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Movie Grid */}
      <div className="grid grid-cols-3 gap-4 overflow-hidden w-full">
        {movies
          .slice(
            currentIndex * moviesPerPage,
            currentIndex * moviesPerPage + moviesPerPage
          )
          .map((movies) => (
            <div key={movies.title} className="w-full">
              <MovieCard {...movies} />
            </div>
          ))}
      </div>
    </div>
  );
}
