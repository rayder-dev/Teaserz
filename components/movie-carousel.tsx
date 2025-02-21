"use client";

import { useState, useEffect } from "react";
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
  const [moviesPerPage, setMoviesPerPage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateMoviesPerPage = () => {
      if (window.innerWidth < 640) {
        setMoviesPerPage(1);
      } else if (window.innerWidth < 1024) {
        setMoviesPerPage(2);
      } else {
        setMoviesPerPage(3);
      }
    };

    updateMoviesPerPage();
    window.addEventListener("resize", updateMoviesPerPage);
    return () => window.removeEventListener("resize", updateMoviesPerPage);
  }, []);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative w-full px-4">
      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={nextSlide}
        disabled={currentIndex === totalPages - 1}
      >
        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
      </Button>

      {/* Movie Grid */}
      <div
        className={`grid gap-4 overflow-hidden w-full transition-transform duration-300`}
        style={{
          gridTemplateColumns: `repeat(${moviesPerPage}, minmax(0, 1fr))`,
        }}
      >
        {movies
          .slice(
            currentIndex * moviesPerPage,
            currentIndex * moviesPerPage + moviesPerPage
          )
          .map((movie) => (
            <div key={movie.title} className="w-full">
              <MovieCard {...movie} />
            </div>
          ))}
      </div>
    </div>
  );
}
