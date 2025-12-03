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
  const songs = [
    { id: 1, title: "Neon Nights", artist: "Synthwave Collective", duration: "3:45", image: albumCover2 },
    { id: 2, title: "Sunset Glow", artist: "Chill Masters", duration: "4:12", image: albumCover3 },
    { id: 3, title: "Deep Waters", artist: "Ambient Dreams", duration: "5:03", image: albumCover4 },
    { id: 4, title: "Electric Soul", artist: "Future Bass", duration: "3:28", image: albumCover1 },
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

      {/* Songs */}
      <section className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Songs</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {songs.map((song) => (
            <AlbumCard
              key={song.id}
              title={song.title}
              artist={song.artist}
              image={song.image}
              duration={song.duration}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default GenreDetail;
