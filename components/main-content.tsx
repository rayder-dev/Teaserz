import { MovieCarousel } from "@/components/movie-carousel";

export function MainContent() {
  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Trending Now</h2>
        <MovieCarousel />
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">New Releases</h2>
        <MovieCarousel />
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Continue Watching</h2>
        <MovieCarousel />
      </section>
    </div>
  );
}
