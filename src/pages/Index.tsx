import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import GenreCard from "@/components/GenreCard";
import NowPlayingBar from "@/components/NowPlayingBar";

import albumCover1 from "@/assets/album-cover-1.jpg";

const Index = () => {
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
    { id: 1, name: "Pop", image: undefined },
    { id: 2, name: "Hip-Hop", image: undefined },
    { id: 3, name: "Rock", image: undefined },
    { id: 4, name: "Electronic", image: undefined },
    { id: 5, name: "R&B", image: undefined },
    { id: 6, name: "Jazz", image: undefined },
    { id: 7, name: "Classical", image: undefined },
    { id: 8, name: "Country", image: undefined },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-64 pb-32">
        <div className="max-w-6xl mx-auto p-8 space-y-12">
          {/* Hero */}
          <HeroSection featuredTrack={featuredTrack} />

          {/* Music Genres */}
          <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Browse by Genre</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {genres.map((genre) => (
                <GenreCard
                  key={genre.id}
                  name={genre.name}
                  image={genre.image}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <NowPlayingBar currentTrack={currentTrack} />
    </div>
  );
};

export default Index;
