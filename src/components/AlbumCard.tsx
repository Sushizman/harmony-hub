import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlbumCardProps {
  image: string;
  title: string;
  artist: string;
  onPlay?: () => void;
}

const AlbumCard = ({ image, title, artist, onPlay }: AlbumCardProps) => {
  return (
    <div className="group relative rounded-xl overflow-hidden gradient-card p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-secondary/50 cursor-pointer">
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="player"
            size="iconLg"
            onClick={onPlay}
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 glow-primary"
          >
            <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
          </Button>
        </div>
      </div>
      <h3 className="font-semibold text-foreground truncate">{title}</h3>
      <p className="text-sm text-muted-foreground truncate">{artist}</p>
    </div>
  );
};

export default AlbumCard;
