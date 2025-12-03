import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface NowPlayingBarProps {
  currentTrack?: {
    title: string;
    artist: string;
    cover: string;
    duration: number;
  };
}

const NowPlayingBar = ({ currentTrack }: NowPlayingBarProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([33]);
  const [volume, setVolume] = useState([70]);
  const [isLiked, setIsLiked] = useState(false);

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = (progress[0] / 100) * currentTrack.duration;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 glass border-t border-border/50 z-50">
      <div className="h-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 w-72 min-w-0">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-foreground truncate">{currentTrack.title}</h4>
            <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <Button
            variant="ghost"
            size="iconSm"
            onClick={() => setIsLiked(!isLiked)}
            className={isLiked ? "text-accent" : "text-muted-foreground"}
          >
            <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-4">
            <Button variant="playerSecondary" size="iconSm">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="playerSecondary" size="icon">
              <SkipBack className="w-5 h-5" fill="currentColor" />
            </Button>
            <Button
              variant="player"
              size="iconLg"
              onClick={() => setIsPlaying(!isPlaying)}
              className="glow-primary"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              )}
            </Button>
            <Button variant="playerSecondary" size="icon">
              <SkipForward className="w-5 h-5" fill="currentColor" />
            </Button>
            <Button variant="playerSecondary" size="iconSm">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 w-40">
          <Button variant="playerSecondary" size="iconSm">
            <Volume2 className="w-4 h-4" />
          </Button>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
