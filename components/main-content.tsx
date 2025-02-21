import { MovieCarousel } from "@/components/movie-carousel";

const trending = [
  {
    title: "Dune",
    description:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    thumbnail: "/thumbnail/dune.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "2h 35m",
    year: "2021",
    rating: "PG-13",
  },
  {
    title: "Blade Runner 2049",
    description:
      "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
    thumbnail: "/thumbnail/bladerunner.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "2h 44m",
    year: "2017",
    rating: "R",
  },
  {
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    thumbnail: "/thumbnail/interstellar.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "2h 49m",
    year: "2014",
    rating: "PG-13",
  },
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnail: "/thumbnail/inception.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "2h 28m",
    year: "2010",
    rating: "PG-13",
  },
  // Add more movies as needed
];

const latest = [
  {
    title: "The Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    thumbnail: "/thumbnail/thebatman.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "2h 55m",
    year: "2022",
    rating: "PG-13",
  },

  {
    title: "Edge of Tomorrow",
    description:
      "A soldier fighting aliens gets to relive the same day over and over again, the day restarting every time he dies.",
    thumbnail: "/thumbnail/edgeoftomorrow.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "1h 53m",
    year: "2014",
    rating: "PG-13",
  },
  {
    title: "The Hobbit",
    description:
      "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home—and the gold within it—from the dragon Smaug.",
    thumbnail: "/thumbnail/hobbit.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "2h 49m",
    year: "2012",
    rating: "PG-13",
  },
  {
    title: "The Lord of the Rings",
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    thumbnail: "/thumbnail/lotr.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: "3h 48m",
    year: "2001",
    rating: "PG-13",
  },
];

const unfinished = [
  {
    title: "Batman v Superman: Dawn of Justice",
    description:
      "Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.",
    thumbnail: "/thumbnail/batmanvsuperman.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    duration: "2h 31m",
    year: "2016",
    rating: "PG-13",
  },
  {
    title: "Star Wars: Episode IV - A New Hope",
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle station while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    thumbnail: "/thumbnail/starwars.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    duration: "2h 1m",
    year: "1977",
    rating: "PG",
  },
  {
    title: "Wonder Woman",
    description:
      "When an Amazon princess comes to the world of Man, she must discover her true destiny and become one of the greatest heroes the world has ever known.",
    thumbnail: "/thumbnail/wonderwoman.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    duration: "2h 21m",
    year: "2017",
    rating: "PG-13",
  },
  {
    title: "The Matrix",
    description:
      "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    thumbnail: "/thumbnail/matrix.jpg?height=400&width=600",
    previewUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    duration: "2h 16m",
    year: "1999",
    rating: "R",
  },
];

export function MainContent() {
  return (
    <div className="space-y-5">
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Trending Now</h2>
        <MovieCarousel movies={trending} />
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">New Releases</h2>
        <MovieCarousel movies={latest} />
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Continue Watching</h2>
        <MovieCarousel movies={unfinished} />
      </section>
    </div>
  );
}
