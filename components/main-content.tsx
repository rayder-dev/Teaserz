import { MovieCarousel } from "@/components/movie-carousel";

export function MainContent() {
  return (
    <>
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
    </>
  );
}
