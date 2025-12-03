import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import GenreCard from "@/components/GenreCard";
import GenreDetail from "@/components/GenreDetail";
import NowPlayingBar from "@/components/NowPlayingBar";
import Header from "@/components/Header";

import albumCover1 from "@/assets/album-cover-1.jpg";

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState<typeof genres[0] | null>(null);

  const featuredTrack = {
    title: "Midnight Dreams",
    artist: "Aurora Waves",
    cover: albumCover1,
    duration: "4:32",
    plays: "2.4M",
  };

  const currentTrack = {
    title: "Midnight Dreams",
    artist: "Aurora Waves",
    cover: albumCover1,
    duration: 272,
  };

  const genres = [
    { id: 1, name: "Pop", image: undefined, views: 12450, rating: 4 },
    { id: 2, name: "Hip-Hop", image: undefined, views: 18920, rating: 5 },
    { id: 3, name: "Rock", image: undefined, views: 9340, rating: 4 },
    { id: 4, name: "Electronic", image: undefined, views: 15670, rating: 5 },
    { id: 5, name: "R&B", image: undefined, views: 8120, rating: 4 },
    { id: 6, name: "Jazz", image: undefined, views: 5430, rating: 3 },
    { id: 7, name: "Classical", image: undefined, views: 4210, rating: 4 },
    { id: 8, name: "Country", image: undefined, views: 6780, rating: 3 },
  ];

  const handleGenreClick = (genre: typeof genres[0]) => {
    setSelectedGenre({ ...genre, views: genre.views + 1 });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-64 pb-32">
        <Header />
        <div className="max-w-6xl mx-auto px-8 pb-8 space-y-12">
          {selectedGenre ? (
            <GenreDetail genre={selectedGenre} onBack={() => setSelectedGenre(null)} />
          ) : (
            <>
              {/* Hero */}
              <HeroSection featuredTrack={featuredTrack} />

              {/* Music Genres */}
              <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Browse by Genre</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {genres.map((genre) => (
                    <GenreCard
                      key={genre.id}
                      name={genre.name}
                      image={genre.image}
                      views={genre.views}
                      rating={genre.rating}
                      onClick={() => handleGenreClick(genre)}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <NowPlayingBar currentTrack={currentTrack} />
    </div>
  );
};

export default Index;
