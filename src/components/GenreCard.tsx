import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GenreCardProps {
  image?: string;
  name: string;
  onPlay?: () => void;
}

const GenreCard = ({ image, name, onPlay }: GenreCardProps) => {
  return (
    <div className="group relative rounded-xl overflow-hidden gradient-card transition-all duration-300 hover:scale-[1.02] hover:bg-secondary/50 cursor-pointer aspect-[16/9]">
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
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
        <h3 className="font-bold text-foreground text-lg">{name}</h3>
        <Button
          variant="player"
          size="icon"
          onClick={onPlay}
          className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 glow-primary"
        >
          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
        </Button>
      </div>
    </div>
  );
};

export default GenreCard;
