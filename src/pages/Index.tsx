import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import AlbumCard from "@/components/AlbumCard";
import NowPlayingBar from "@/components/NowPlayingBar";

import albumCover1 from "@/assets/album-cover-1.jpg";
import albumCover2 from "@/assets/album-cover-2.jpg";
import albumCover3 from "@/assets/album-cover-3.jpg";
import albumCover4 from "@/assets/album-cover-4.jpg";

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

  const recentlyPlayed = [
    { id: 1, title: "Neon Nights", artist: "Synthwave Collective", image: albumCover2 },
    { id: 2, title: "Sunset Glow", artist: "Chill Masters", image: albumCover3 },
    { id: 3, title: "Deep Waters", artist: "Ambient Dreams", image: albumCover4 },
    { id: 4, title: "Electric Soul", artist: "Future Bass", image: albumCover1 },
  ];

  const trendingNow = [
    { id: 5, title: "Digital Love", artist: "Retro Wave", image: albumCover3 },
    { id: 6, title: "Crystal Clear", artist: "Melodic House", image: albumCover4 },
    { id: 7, title: "Starlight", artist: "Nocturnal", image: albumCover2 },
    { id: 8, title: "Ocean Drive", artist: "Summer Hits", image: albumCover1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-64 pb-32">
        <div className="max-w-6xl mx-auto p-8 space-y-12">
          {/* Hero */}
          <HeroSection featuredTrack={featuredTrack} />

          {/* Recently Played */}
          <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Recently Played</h2>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                See all
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentlyPlayed.map((album) => (
                <AlbumCard
                  key={album.id}
                  title={album.title}
                  artist={album.artist}
                  image={album.image}
                />
              ))}
            </div>
          </section>

          {/* Trending Now */}
          <section className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                See all
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingNow.map((album) => (
                <AlbumCard
                  key={album.id}
                  title={album.title}
                  artist={album.artist}
                  image={album.image}
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
