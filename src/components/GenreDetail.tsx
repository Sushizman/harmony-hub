import { ArrowLeft, Play, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlbumCard from "./AlbumCard";

import albumCover1 from "@/assets/album-cover-1.jpg";
import albumCover2 from "@/assets/album-cover-2.jpg";
import albumCover3 from "@/assets/album-cover-3.jpg";
import albumCover4 from "@/assets/album-cover-4.jpg";

interface GenreDetailProps {
  genre: {
    id: number;
    name: string;
    views: number;
    rating: number;
    image?: string;
  };
  onBack: () => void;
}

const GenreDetail = ({ genre, onBack }: GenreDetailProps) => {
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{genre.name}</h1>
          <div className="flex items-center gap-4 mt-1 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{genre.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStars(genre.rating)}
            </div>
          </div>
        </div>
      </div>

      {/* Recently Played */}
      <section className="animate-fade-in">
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
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
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
  );
};

export default GenreDetail;
