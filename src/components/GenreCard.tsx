import { Play, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GenreCardProps {
  image?: string;
  name: string;
  views: number;
  rating: number;
  onPlay?: () => void;
  onClick?: () => void;
  onRate?: (rating: number) => void;
  canRate?: boolean;
}

const GenreCard = ({ image, name, views, rating, onPlay, onClick, onRate, canRate }: GenreCardProps) => {
  const handleStarClick = (e: React.MouseEvent, starIndex: number) => {
    e.stopPropagation();
    if (canRate && onRate) {
      onRate(starIndex + 1);
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative rounded-xl overflow-hidden gradient-card transition-all duration-300 hover:scale-[1.02] hover:bg-secondary/50 cursor-pointer aspect-[4/3]"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Add Image</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-foreground text-xl">{name}</h3>
          <Button
            variant="player"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onPlay?.();
            }}
            className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 glow-primary"
          >
            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
          </Button>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                onClick={(e) => handleStarClick(e, i)}
                className={`w-3 h-3 transition-colors ${
                  i < rating ? "text-primary fill-primary" : "text-muted-foreground"
                } ${canRate ? "cursor-pointer hover:text-primary hover:fill-primary" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreCard;
